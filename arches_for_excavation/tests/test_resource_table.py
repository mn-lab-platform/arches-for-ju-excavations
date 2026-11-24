import csv
import io
import json
from types import SimpleNamespace
from unittest.mock import MagicMock, patch
from uuid import UUID

from django.test import RequestFactory, SimpleTestCase, override_settings

from arches_for_excavation.views.resource_table import (
    ResourceTableCsvView,
    ResourceTableCountView,
    ResourceTableDataView,
    accessible_resources,
    build_table_columns,
    display_tile_values,
    format_card_values,
    graph_nodes,
    normalize_filters,
    related_resource_name_map,
    resource_rows,
    row_matches_filters,
)


TABLE_COLUMNS = [
    {"node_id": "resource_name", "label": "Resource", "datatype": "text"},
    {"node_id": "field", "label": "Field", "datatype": "text"},
]
SELECTED_COLUMNS = [{"node_id": "field"}]


def table_state(payload, filters=None, sort_by=""):
    return (
        payload, "graph", SELECTED_COLUMNS, TABLE_COLUMNS,
        filters or {}, sort_by, "asc",
    )


def make_request(payload):
    request = RequestFactory().post(
        "/api/resource-table/data",
        data=json.dumps(payload),
        content_type="application/json",
    )
    request.user = SimpleNamespace(pk=1)
    return request


class ResourceTableDomainValueTests(SimpleTestCase):
    def test_domain_values_use_options_from_each_node(self):
        option_id = "b7cab87e-0476-482f-8574-5b38dfad4e8a"
        nodes = [
            SimpleNamespace(
                nodeid=UUID(int=index + 1), graph_id=UUID(int=10),
                name=name, alias="", datatype="domain-value", nodegroup_id=None,
                nodegroup=None, config={"options": [{"id": option_id, "text": {"en": label}}]},
            )
            for index, (name, label) in enumerate([("Prefix", "Z"), ("Other", "Different")])
        ]
        first_options = nodes[0].config["options"]
        nodes[0].config = SimpleNamespace(
            get=lambda key, default=None: first_options if key == "options" else default,
        )
        tile = SimpleNamespace(
            tileid=UUID(int=20), sortorder=0,
            data={str(node.nodeid): option_id for node in nodes},
        )
        resource = SimpleNamespace(
            resourceinstanceid=UUID(int=30), descriptors={"name": "Find"},
            tilemodel_set=SimpleNamespace(all=lambda: [tile]),
        )
        with patch("arches_for_excavation.views.resource_table.Node.objects.filter") as node_filter, \
                patch("arches_for_excavation.views.resource_table.Edge.objects.filter", return_value=[]), \
                patch("arches_for_excavation.views.resource_table.concept_label_map", return_value={}), \
                patch("arches_for_excavation.views.resource_table.related_resource_name_map", return_value={}):
            node_filter.return_value.select_related.return_value.order_by.return_value = nodes
            columns = list(graph_nodes(nodes[0].graph_id).values())
            row = resource_rows(None, [resource], columns, build_table_columns(columns))[0]

        self.assertEqual(row[str(nodes[0].nodeid)], "Z")
        self.assertEqual(row[str(nodes[1].nodeid)], "Different")
        self.assertEqual(row["_sort_values"][str(nodes[0].nodeid)], ["Z"])
        filters = normalize_filters(
            {str(nodes[0].nodeid): {"mode": "equals", "value": "Z"}},
            build_table_columns(columns),
        )
        self.assertTrue(row_matches_filters(row, filters))

    def test_domain_values_in_lists_and_compound_cards_use_labels(self):
        options = {"first": "MZ", "second": "TZ"}
        self.assertEqual(
            display_tile_values(["first", {"value": "second"}], "domain-value-list", {}, {}, options),
            ["MZ", "TZ"],
        )
        self.assertEqual(
            format_card_values(
                {"prefix": ["first"]},
                [{"node_id": "prefix", "datatype": "domain-value", "domain_options": options}],
                {}, {},
            ),
            "MZ",
        )
        self.assertEqual(display_tile_values("unknown", "domain-value", {}, {}, options), ["unknown"])


class ResourceTablePermissionTests(SimpleTestCase):
    def test_permission_result_is_shared_with_related_names_within_one_request(self):
        for is_exclusive in (True, False):
            with self.subTest(is_exclusive=is_exclusive):
                request = SimpleNamespace(user=SimpleNamespace(is_superuser=False))
                resources = MagicMock()
                allowed_resource = SimpleNamespace(
                    resourceinstanceid=UUID(int=1), descriptors={"name": "Allowed"},
                )
                method = resources.filter if is_exclusive else resources.exclude
                method.return_value = [allowed_resource]
                with patch("arches_for_excavation.views.resource_table.Resource.objects.filter", return_value=resources), \
                        patch("arches_for_excavation.views.resource_table.permission_backend.get_filtered_instances", return_value=(is_exclusive, [str(UUID(int=1))])) as permissions:
                    accessible_resources(request, "graph")
                    names = related_resource_name_map(request, {str(UUID(int=1)), str(UUID(int=2))})
                    accessible_resources(SimpleNamespace(user=SimpleNamespace(is_superuser=False)), "graph")

                self.assertEqual(permissions.call_count, 2)
                self.assertEqual(method.call_count, 3)
                method.assert_any_call(resourceinstanceid__in=[str(UUID(int=1))])
                self.assertEqual(names, {str(UUID(int=1)): "Allowed"})

    def test_empty_related_ids_do_not_query_permissions(self):
        request = SimpleNamespace(user=SimpleNamespace(is_superuser=False))
        with patch("arches_for_excavation.views.resource_table.Resource.objects.filter") as resources, \
                patch("arches_for_excavation.views.resource_table.permission_backend.get_filtered_instances") as permissions:
            self.assertEqual(related_resource_name_map(request, set()), {})
        resources.assert_not_called()
        permissions.assert_not_called()


class ResourceTablePaginationTests(SimpleTestCase):
    def test_filters_match_all_modes(self):
        column = [TABLE_COLUMNS[1]]
        cases = [
            ({"mode": "contains", "value": "am"}, "Amphora", True),
            ({"mode": "equals", "value": " amphora "}, "Amphora", True),
            ({"mode": "not-contains", "value": "pot"}, "Amphora", True),
            ({"mode": "empty", "value": ""}, "", True),
            ({"mode": "not-empty", "value": ""}, "Amphora", True),
            ({"mode": "empty", "value": ""}, "Amphora", False),
        ]
        for condition, value, expected in cases:
            with self.subTest(condition=condition, value=value):
                filters = normalize_filters({"field": condition}, column)
                self.assertEqual(row_matches_filters({"field": value}, filters), expected)

    def test_unsorted_pages_do_not_skip_or_repeat_rows(self):
        rows = [
            {"resource_id": str(UUID(int=index + 1)), "resource_name": str(index), "field": "x"}
            for index in range(405)
        ]

        def matching(*args, **kwargs):
            after_id = args[-1] if len(args) > 7 else None
            return (row for row in rows if not after_id or row["resource_id"] > after_id)

        collected = []
        cursor = None
        with patch("arches_for_excavation.views.resource_table.table_request") as parsed, \
                patch("arches_for_excavation.views.resource_table.matching_rows", side_effect=matching), \
                patch("arches_for_excavation.views.resource_table.accessible_resources") as accessible:
            accessible.return_value.count.return_value = len(rows)
            while True:
                payload = {"page_size": 200, "cursor": cursor or ""}
                parsed.return_value = table_state(payload)
                response = ResourceTableDataView.as_view()(make_request(payload))
                self.assertEqual(response.status_code, 200)
                data = json.loads(response.content)
                collected.extend(row["resource_id"] for row in data["rows"])
                cursor = data["next_cursor"]
                if not cursor:
                    break

        self.assertEqual(collected, [row["resource_id"] for row in rows])

    def test_filtered_first_page_returns_before_scanning_all_matches(self):
        rows = [
            {"resource_id": str(UUID(int=index + 1)), "field": "keep"}
            for index in range(405)
        ]
        consumed = []

        def matching(*args, **kwargs):
            for row in rows:
                consumed.append(row["resource_id"])
                yield row

        filters = {"field": {"mode": "equals", "value": "keep"}}
        payload = {"page_size": 200, "include_total_count": False}
        with patch("arches_for_excavation.views.resource_table.table_request", return_value=table_state(payload, filters)), \
                patch("arches_for_excavation.views.resource_table.matching_rows", side_effect=matching):
            response = ResourceTableDataView.as_view()(make_request(payload))

        data = json.loads(response.content)
        self.assertEqual(len(data["rows"]), 200)
        self.assertEqual(data["next_cursor"], rows[199]["resource_id"])
        self.assertNotIn("total_count", data)
        self.assertEqual(len(consumed), 201)

    def test_count_endpoint_scans_all_filtered_rows_without_sorting(self):
        rows = [{"resource_id": str(UUID(int=index + 1))} for index in range(405)]
        filters = {"field": {"mode": "not-empty", "value": ""}}
        payload = {"filters": filters}
        with patch("arches_for_excavation.views.resource_table.table_request", return_value=table_state(payload, filters, sort_by="field")), \
                patch("arches_for_excavation.views.resource_table.matching_rows", return_value=iter(rows)) as matching:
            response = ResourceTableCountView.as_view()(make_request(payload))

        self.assertEqual(json.loads(response.content), {"total_count": 405})
        self.assertEqual(matching.call_args.args[-2:], ("", "asc"))

    def test_csv_exports_all_filtered_rows_beyond_first_page(self):
        rows = [
            {
                "resource_id": str(UUID(int=index + 1)),
                "resource_name": f"Resource {index}",
                "field": "keep" if index % 2 == 0 else "drop",
            }
            for index in range(405)
        ]
        filters = normalize_filters({"field": {"mode": "equals", "value": "keep"}}, TABLE_COLUMNS)
        payload = {"page_size": 200, "filters": filters}
        with patch("arches_for_excavation.views.resource_table.table_request", return_value=table_state(payload, filters)), \
                patch("arches_for_excavation.views.resource_table.iter_resource_rows", return_value=iter(rows)):
            response = ResourceTableCsvView.as_view()(make_request(payload))
            self.assertEqual(response.status_code, 200)
            content = b"".join(response.streaming_content).decode("utf-8")

        exported = list(csv.reader(io.StringIO(content)))
        self.assertEqual(exported[0], ["Resource", "Field"])
        self.assertEqual(len(exported), 204)
        self.assertEqual(exported[-1], ["Resource 404", "keep"])


@override_settings(CACHES={"default": {"BACKEND": "django.core.cache.backends.locmem.LocMemCache"}})
class ResourceTableSortedPaginationTests(SimpleTestCase):
    def test_sorted_pages_use_cached_global_order(self):
        rows = [
            {"resource_id": str(UUID(int=index + 1)), "resource_name": f"Resource {index}", "field": "x"}
            for index in range(405)
        ]
        rows.reverse()
        payload = {"page_size": 200}
        with patch("arches_for_excavation.views.resource_table.table_request", return_value=table_state(payload, sort_by="resource_name")), \
                patch("arches_for_excavation.views.resource_table.matching_rows", return_value=rows) as matching, \
                patch("arches_for_excavation.views.resource_table.rows_for_resource_ids") as hydrate:
            first = json.loads(ResourceTableDataView.as_view()(make_request(payload)).content)
            payload["cursor"] = first["next_cursor"]
            hydrate.side_effect = lambda request, graph_id, ids, columns, table_columns: [
                next(row for row in rows if row["resource_id"] == resource_id)
                for resource_id in ids
            ]
            second = json.loads(ResourceTableDataView.as_view()(make_request(payload)).content)

        self.assertEqual(matching.call_count, 1)
        self.assertEqual(len(first["rows"]), 200)
        self.assertEqual(len(second["rows"]), 200)
        self.assertEqual(first["rows"][-1]["resource_id"], rows[199]["resource_id"])
        self.assertEqual(second["rows"][0]["resource_id"], rows[200]["resource_id"])
