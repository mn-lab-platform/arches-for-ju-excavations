import csv
import io
import json
import re
from collections import defaultdict
from datetime import datetime
from decimal import Decimal, InvalidOperation
from uuid import UUID

from django.http import JsonResponse, HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views import View
from arches.app.models.models import Edge, Graph, Node, Resource, Value
from arches.app.utils import permission_backend


def localized_label(value):
    if isinstance(value, dict):
        value = value.get("en") or next(iter(value.values()), "")
    if isinstance(value, list):
        return value[0] if value else ""
    return str(value or "")


def node_label(node):
    return localized_label(node.name) or node.alias or str(node.nodeid)


def flatten_value(value):
    if value is None:
        return ""
    if isinstance(value, dict):
        if "value" in value:
            return flatten_value(value["value"])
        if "en" in value:
            return flatten_value(value["en"])
        return ", ".join(
            f"{key}: {flatten_value(item)}" for key, item in value.items()
        )
    if isinstance(value, list):
        return ", ".join(flatten_value(item) for item in value if item is not None)
    if isinstance(value, bool):
        return "Yes" if value else "No"
    return str(value)


def build_node_paths(nodes):
    by_id = {str(node.nodeid): node for node in nodes}
    parent_by_id = {
        str(edge.rangenode_id): str(edge.domainnode_id)
        for edge in Edge.objects.filter(
            graph_id=nodes[0].graph_id if nodes else None,
            rangenode__in=nodes,
            domainnode__in=nodes,
        )
    }

    paths = {}
    for node in nodes:
        names = [node_label(node)]
        current_id = parent_by_id.get(str(node.nodeid))
        visited = {str(node.nodeid)}
        while current_id and current_id not in visited and current_id in by_id:
            visited.add(current_id)
            names.append(node_label(by_id[current_id]))
            current_id = parent_by_id.get(current_id)
        paths[str(node.nodeid)] = " > ".join(reversed(names))
    return paths


def graph_nodes(graph_id):
    nodes = list(
        Node.objects.filter(graph_id=graph_id)
        .select_related("nodegroup")
        .order_by("sortorder", "name", "nodeid")
    )
    parent_by_id = {
        str(edge.rangenode_id): str(edge.domainnode_id)
        for edge in Edge.objects.filter(
            graph_id=graph_id,
            rangenode__in=nodes,
            domainnode__in=nodes,
        )
    }
    nodes_by_id = {str(node.nodeid): node for node in nodes}
    nodegroups_by_id = {
        str(node.nodegroup_id): node.nodegroup
        for node in nodes
        if node.nodegroup_id
    }
    children_by_id = defaultdict(list)
    roots = []
    for node in nodes:
        node_id = str(node.nodeid)
        parent_id = parent_by_id.get(node_id)
        if parent_id and parent_id in nodes_by_id:
            children_by_id[parent_id].append(node)
        else:
            roots.append(node)

    ordered = []

    def visit(node, depth):
        node_id = str(node.nodeid)
        ordered.append((node, depth))
        for child in children_by_id[node_id]:
            visit(child, depth + 1)

    for root in roots:
        visit(root, 0)

    def repeating_nodegroup_id(node):
        nodegroup = node.nodegroup
        visited = set()
        while nodegroup and str(nodegroup.nodegroupid) not in visited:
            nodegroup_id = str(nodegroup.nodegroupid)
            visited.add(nodegroup_id)
            if nodegroup.cardinality == "n":
                return nodegroup_id
            parent_id = str(nodegroup.parentnodegroup_id or "")
            nodegroup = nodegroups_by_id.get(parent_id)
        return ""

    paths = build_node_paths(nodes)
    return {
        str(node.nodeid): {
            "node_id": str(node.nodeid),
            "label": node_label(node),
            "path": paths[str(node.nodeid)],
            "datatype": node.datatype,
            "nodegroup_id": str(node.nodegroup_id) if node.nodegroup_id else "",
            "nodegroup_is_multiple": bool(node.nodegroup and node.nodegroup.cardinality == "n"),
            "repeating_nodegroup_id": repeating_nodegroup_id(node),
            "parent_node_id": parent_by_id.get(str(node.nodeid), ""),
            "depth": depth,
            "selectable": node.datatype != "semantic",
        }
        for node, depth in ordered
    }


def graph_name(graph):
    return localized_label(graph.name) or str(graph.graphid)


def selected_columns(graph_id, requested_ids):
    if not Graph.objects.filter(graphid=graph_id, isresource=True, is_active=True).exists():
        raise LookupError("Resource model not found.")
    available = graph_nodes(graph_id)
    requested = requested_ids or []
    if not isinstance(requested, list) or not requested:
        return [], available
    unknown = [
        str(node_id)
        for node_id in requested
        if str(node_id) not in available or not available[str(node_id)]["selectable"]
    ]
    if unknown:
        raise ValueError("Selected columns do not belong to the selected resource model.")
    return [available[str(node_id)] for node_id in requested], available


def accessible_resources(request, graph_id):
    resources = Resource.objects.filter(graph_id=graph_id)
    if request.user.is_superuser:
        return resources

    is_exclusive, restricted_ids = permission_backend.get_filtered_instances(request.user)
    if is_exclusive:
        return resources.filter(resourceinstanceid__in=restricted_ids)
    return resources.exclude(resourceinstanceid__in=restricted_ids)


def build_table_columns(columns):
    """Collapse fields below one repeatable nodegroup into one table column."""
    fields_by_repeating_nodegroup = defaultdict(list)
    for column in columns:
        repeating_nodegroup_id = column["repeating_nodegroup_id"]
        if repeating_nodegroup_id:
            fields_by_repeating_nodegroup[repeating_nodegroup_id].append(column)

    output_columns = [{
        "node_id": "resource_name",
        "label": "Resource",
        "datatype": "text",
        "nodegroup_id": "",
        "fields": [],
        "is_resource_link": True,
    }]
    emitted_nodegroups = set()
    for column in columns:
        repeating_nodegroup_id = column["repeating_nodegroup_id"]
        grouped_fields = fields_by_repeating_nodegroup.get(repeating_nodegroup_id, [])
        is_compound = bool(repeating_nodegroup_id and len(grouped_fields) > 1)
        if is_compound:
            if repeating_nodegroup_id in emitted_nodegroups:
                continue
            emitted_nodegroups.add(repeating_nodegroup_id)
            output_columns.append({
                "node_id": f"nodegroup:{repeating_nodegroup_id}",
                "label": "; ".join(field["label"] for field in grouped_fields),
                "datatype": "text",
                "nodegroup_id": repeating_nodegroup_id,
                "fields": grouped_fields,
            })
        else:
            output_columns.append({
                **column,
                "fields": [column],
            })
    return output_columns


def uuid_string(value):
    try:
        return str(UUID(str(value)))
    except (TypeError, ValueError, AttributeError):
        return ""


def concept_value_ids(value):
    if isinstance(value, list):
        return [value_id for item in value for value_id in concept_value_ids(item)]
    if isinstance(value, dict):
        return concept_value_ids(value.get("value") or value.get("valueid"))
    value_id = uuid_string(value)
    return [value_id] if value_id else []


def related_resource_ids(value):
    if isinstance(value, list):
        return [resource_id for item in value for resource_id in related_resource_ids(item)]
    if isinstance(value, dict):
        resource_id = uuid_string(value.get("resourceId") or value.get("resourceid"))
        return [resource_id] if resource_id else []
    resource_id = uuid_string(value)
    return [resource_id] if resource_id else []


def resource_display_name(resource):
    descriptors = resource.descriptors or {}
    candidates = [descriptors.get("name")]
    for language in ("en", "en-US", "pl", "pl-PL"):
        localized_descriptors = descriptors.get(language)
        if isinstance(localized_descriptors, dict):
            candidates.append(localized_descriptors.get("name"))
    for candidate in candidates:
        name = localized_label(candidate).strip()
        if name:
            return name
    return ""


def concept_label_map(concept_ids):
    labels = {}
    for value in Value.objects.filter(
        valueid__in=concept_ids,
        valuetype_id="prefLabel",
    ).order_by("language_id"):
        value_id = str(value.valueid)
        if value_id not in labels or value.language_id in {"en", "en-US"}:
            labels[value_id] = value.value
    return labels


def related_resource_name_map(request, resource_ids):
    resources = Resource.objects.filter(resourceinstanceid__in=resource_ids)
    if not request.user.is_superuser:
        is_exclusive, restricted_ids = permission_backend.get_filtered_instances(request.user)
        if is_exclusive:
            resources = resources.filter(resourceinstanceid__in=restricted_ids)
        else:
            resources = resources.exclude(resourceinstanceid__in=restricted_ids)
    return {
        str(resource.resourceinstanceid): resource_display_name(resource)
        for resource in resources
    }


def display_tile_values(value, datatype, concept_labels, related_resource_names):
    if datatype in {"concept", "concept-list"}:
        return [
            concept_labels[value_id]
            for value_id in concept_value_ids(value)
            if value_id in concept_labels
        ]
    if datatype in {"resource-instance", "resource-instance-list"}:
        return [
            related_resource_names[resource_id]
            for resource_id in related_resource_ids(value)
            if related_resource_names.get(resource_id)
        ]
    flattened = flatten_value(value).strip()
    return [flattened] if flattened else []


def display_tile_value(value, datatype, concept_labels, related_resource_names):
    return ", ".join(display_tile_values(
        value,
        datatype,
        concept_labels,
        related_resource_names,
    ))


def format_repeated_values(values, formatter=flatten_value):
    """Format one nodegroup card with commas and repeated cards with semicolons."""
    occurrences = [formatter(value).strip() for value in values]
    occurrences = [value for value in occurrences if value]
    return "; ".join(occurrences)


NATURAL_SORT_PARTS = re.compile(r"(\d+)")


def natural_sort_key(value):
    return tuple(
        (0, int(part)) if part.isdigit() else (1, part.casefold())
        for part in NATURAL_SORT_PARTS.split(str(value))
        if part
    )


def normalized_sort_values(values, formatter):
    labels = []
    for value in values:
        labels.extend(label.strip() for label in formatter(value) if label and label.strip())
    return sorted(labels, key=natural_sort_key)


def typed_scalar_sort_value(value, datatype):
    value = str(value or "").strip()
    if datatype in {"number", "integer", "decimal"}:
        try:
            return (0, Decimal(value.replace(" ", "").replace(",", ".")))
        except InvalidOperation:
            pass
    elif datatype in {"date", "datetime"}:
        try:
            return (0, datetime.fromisoformat(value.replace("Z", "+00:00")).timestamp())
        except ValueError:
            pass
    elif datatype == "boolean":
        normalized = value.casefold()
        if normalized in {"true", "yes", "1"}:
            return (0, 1)
        if normalized in {"false", "no", "0"}:
            return (0, 0)

    return (1, natural_sort_key(value))


def typed_sort_value(values, datatype):
    if not isinstance(values, (list, tuple)):
        values = [values]
    values = [value for value in values if str(value or "").strip()]
    if not values:
        return None
    return tuple(sorted(typed_scalar_sort_value(value, datatype) for value in values))


def format_card_values(card_data, fields, concept_labels, related_resource_names):
    values = []
    for field in fields:
        field_values = [
            display_tile_value(
                raw_value,
                field["datatype"],
                concept_labels,
                related_resource_names,
            ).strip()
            for raw_value in card_data.get(field["node_id"], [])
        ]
        field_values = [value for value in field_values if value]
        values.append(" / ".join(field_values) if field_values else "—")
    return ", ".join(values)


def repeating_ancestor_tile(tile, nodegroup_id, tiles_by_id):
    current = tile
    visited = set()
    while current and str(current.tileid) not in visited:
        visited.add(str(current.tileid))
        if str(current.nodegroup_id) == nodegroup_id:
            return current
        current = tiles_by_id.get(str(current.parenttile_id or ""))
    return None


def resource_rows(request, graph_id, columns, table_columns):
    node_ids = [column["node_id"] for column in columns]
    columns_by_id = {column["node_id"]: column for column in columns}
    compound_columns_by_nodegroup = {
        column["nodegroup_id"]: column
        for column in table_columns
        if len(column["fields"]) > 1
    }
    compound_nodegroup_by_field = {
        field["node_id"]: column["nodegroup_id"]
        for column in compound_columns_by_nodegroup.values()
        for field in column["fields"]
    }
    resources = list(
        accessible_resources(request, graph_id)
        .order_by("resourceinstanceid")
        .prefetch_related("tilemodel_set")
    )
    values_by_resource = []
    concept_ids = set()
    related_resource_ids_set = set()

    for resource in resources:
        values = defaultdict(list)
        tiles = sorted(
            resource.tilemodel_set.all(),
            key=lambda tile: (tile.sortorder or 0, str(tile.tileid)),
        )
        tiles_by_id = {str(tile.tileid): tile for tile in tiles}
        cards_by_nodegroup_id = defaultdict(dict)
        card_order_by_nodegroup = defaultdict(list)

        for tile in tiles:
            tile_data = tile.data or {}
            for node_id in node_ids:
                if node_id not in tile_data:
                    continue
                value = tile_data[node_id]
                values[node_id].append(value)
                datatype = columns_by_id[node_id]["datatype"]
                if datatype in {"concept", "concept-list"}:
                    concept_ids.update(concept_value_ids(value))
                elif datatype in {"resource-instance", "resource-instance-list"}:
                    related_resource_ids_set.update(related_resource_ids(value))

                repeating_nodegroup_id = compound_nodegroup_by_field.get(node_id)
                if not repeating_nodegroup_id:
                    continue
                root_tile = repeating_ancestor_tile(
                    tile,
                    repeating_nodegroup_id,
                    tiles_by_id,
                )
                if not root_tile:
                    continue
                root_tile_id = str(root_tile.tileid)
                if root_tile_id not in cards_by_nodegroup_id[repeating_nodegroup_id]:
                    cards_by_nodegroup_id[repeating_nodegroup_id][root_tile_id] = defaultdict(list)
                    card_order_by_nodegroup[repeating_nodegroup_id].append(root_tile_id)
                cards_by_nodegroup_id[repeating_nodegroup_id][root_tile_id][node_id].append(value)

        cards_by_nodegroup = {
            nodegroup_id: [
                cards_by_nodegroup_id[nodegroup_id][tile_id]
                for tile_id in card_order_by_nodegroup[nodegroup_id]
            ]
            for nodegroup_id in cards_by_nodegroup_id
        }
        values_by_resource.append((resource, values, cards_by_nodegroup))

    concept_labels = concept_label_map(concept_ids)
    related_resource_names = related_resource_name_map(request, related_resource_ids_set)
    rows = []
    for resource, values, cards_by_nodegroup in values_by_resource:
        resource_id = str(resource.resourceinstanceid)
        resource_name = resource_display_name(resource) or resource_id
        row = {
            "resource_id": resource_id,
            "resource_name": resource_name,
            "resource_url": f"/report/{resource_id}",
            "_sort_values": {},
        }
        for table_column in table_columns:
            output_node_id = table_column["node_id"]
            fields = table_column["fields"]
            if table_column.get("is_resource_link"):
                row["_sort_values"][output_node_id] = [resource_name]
                continue
            if len(fields) > 1:
                card_values = [
                    format_card_values(
                        card_data,
                        fields,
                        concept_labels,
                        related_resource_names,
                    )
                    for card_data in cards_by_nodegroup.get(table_column["nodegroup_id"], [])
                ]
                card_values = [value for value in card_values if value]
                row[output_node_id] = "; ".join(card_values)
                row["_sort_values"][output_node_id] = normalized_sort_values(
                    card_values,
                    lambda value: [value],
                )
                continue

            field = fields[0]
            node_id = field["node_id"]
            datatype = field["datatype"]
            formatter = lambda value, datatype=datatype: display_tile_value(
                value,
                datatype,
                concept_labels,
                related_resource_names,
            )
            sort_value_formatter = lambda value, datatype=datatype: display_tile_values(
                value,
                datatype,
                concept_labels,
                related_resource_names,
            )
            row[output_node_id] = format_repeated_values(values[node_id], formatter)
            row["_sort_values"][output_node_id] = normalized_sort_values(
                values[node_id],
                sort_value_formatter,
            )
        rows.append(row)
    return rows

def filter_and_sort_rows(rows, columns, filters=None, sort_by="", sort_direction="asc"):
    filters = filters if isinstance(filters, dict) else {}
    active_filters = {
        column["node_id"]: str(filters.get(column["node_id"], "")).strip().casefold()
        for column in columns
        if str(filters.get(column["node_id"], "")).strip()
    }
    if active_filters:
        rows = [
            row for row in rows
            if all(
                search in str(row.get(node_id, "")).casefold()
                for node_id, search in active_filters.items()
            )
        ]

    column_by_id = {column["node_id"]: column for column in columns}
    if sort_by in column_by_id:
        column = column_by_id[sort_by]
        present_rows = []
        empty_rows = []
        for row in rows:
            value = typed_sort_value(row.get("_sort_values", {}).get(sort_by), column["datatype"])
            if value is None:
                empty_rows.append(row)
            else:
                present_rows.append((value, row))
        present_rows.sort(key=lambda item: item[0], reverse=sort_direction == "desc")
        rows = [row for _, row in present_rows] + empty_rows

    return rows


@method_decorator(ensure_csrf_cookie, name="dispatch")
class ResourceTableModelsView(View):
    def get(self, request):
        graphs = Graph.objects.filter(isresource=True, is_active=True).order_by("name")
        return JsonResponse({
            "models": [
                {"graph_id": str(graph.graphid), "name": graph_name(graph), "icon": graph.iconclass or ""}
                for graph in graphs
            ]
        }, json_dumps_params={"ensure_ascii": False})


class ResourceTableColumnsView(View):
    def get(self, request, graph_id):
        if not Graph.objects.filter(graphid=graph_id, isresource=True, is_active=True).exists():
            return JsonResponse({"error": "Resource model not found."}, status=404)
        return JsonResponse({"columns": list(graph_nodes(graph_id).values())}, json_dumps_params={"ensure_ascii": False})


class ResourceTableDataView(View):
    def post(self, request):
        try:
            payload = json.loads(request.body.decode("utf-8"))
            graph_id = str(payload.get("graph_id") or "")
            columns, _ = selected_columns(graph_id, payload.get("columns"))
            if not columns:
                return JsonResponse({"error": "Select at least one column."}, status=400)
            table_columns = build_table_columns(columns)
            rows = resource_rows(request, graph_id, columns, table_columns)
            rows = filter_and_sort_rows(
                rows,
                table_columns,
                payload.get("filters"),
                str(payload.get("sort_by") or ""),
                str(payload.get("sort_direction") or "asc"),
            )
            return JsonResponse({"columns": table_columns, "rows": rows, "total": len(rows)}, json_dumps_params={"ensure_ascii": False})
        except LookupError as error:
            return JsonResponse({"error": str(error)}, status=404)
        except (ValueError, json.JSONDecodeError) as error:
            return JsonResponse({"error": str(error)}, status=400)


class ResourceTableCsvView(ResourceTableDataView):
    def post(self, request):
        response = super().post(request)
        if response.status_code != 200:
            return response
        payload = json.loads(response.content.decode("utf-8"))
        output = io.StringIO(newline="")
        writer = csv.writer(output, lineterminator="\r\n")
        columns = payload["columns"]
        writer.writerow([column["label"] for column in columns])
        for row in payload["rows"]:
            writer.writerow([row.get(column["node_id"], "") for column in columns])
        csv_data = output.getvalue().rstrip("\r\n")
        csv_response = HttpResponse(csv_data, content_type="text/csv; charset=utf-8")
        csv_response["Content-Disposition"] = "attachment; filename=resource-table.csv"
        return csv_response
