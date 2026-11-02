import csv
import io
import json
from types import SimpleNamespace
from unittest.mock import patch
from uuid import UUID

from django.test import RequestFactory, SimpleTestCase, override_settings

from arches_for_excavation.views.resource_table import (
    ResourceTableCsvView,
    ResourceTableDataView,
    normalize_filters,
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
                patch("arches_for_excavation.views.resource_table.matching_rows", side_effect=matching):
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
