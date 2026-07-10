import json
import re
from uuid import uuid4

from django.db import transaction
from django.http import JsonResponse
from django.views import View
from openpyxl import load_workbook

from arches.app.models.models import Node, Resource
from arches.app.models.tile import Tile

POTTERY_GRAPH_ID = "55777e89-af36-44f5-b699-d7b90d08a1e8"

COLLECTION_NAME_NODE_ID = "7199f731-b60e-4c05-ae20-23af2e01415f"
RELATED_CONTEXT_NODE_ID = "9688408d-f3e7-4c36-9e1d-53166a092497"
DIAGNOSTIC_NODE_ID = "47988953-93a5-4197-866e-7fec390d1c77"
UNDIAGNOSTIC_NODE_ID = "c4d47ac4-d516-4fdf-a0bd-a1ea3741beeb"
NO_MATERIAL_NODE_ID = "852f6e56-0287-4ee1-b5c4-356c309bfd24"
SPECIAL_FIND_NODE_ID = "c9489a63-31f2-461f-a0f1-afc17c6fe6aa"
REMARKS_NODE_ID = "7b943c5b-16af-4baf-b2dd-0639ce2b0a3e"
FIELD_REMAINS_NODE_ID = "d6559928-9f52-11eb-96c4-020063fe0012"

FIELD_REMAINS_VALUE_MAP = {
    "b_presence": "03f66a84-26a1-44c6-ac89-ce965886531a",   # Bones
    "g_presence": "e01489aa-c889-45ca-aea7-04fb82d69d30",   # Glass
    "m_presence": "1a0640f5-b59f-4907-b5da-18173a99b681",   # Metals
    "sh_presence": "407e6ab0-b42a-45d5-954d-4bc0a2000e93",  # Shells
    "s_presence": "01920fbf-4a20-46b5-ac11-b48848f90276",   # Stones
}


def normalize_header(header):
    normalized = re.sub(r"[\s\-/]+", "_", str(header or "").replace("\x00", "").strip().lower())
    normalized = re.sub(r"[^a-z0-9_]+", "", normalized)
    normalized = re.sub(r"_+", "_", normalized)
    return normalized.strip("_")


def clean_workbook_cell(value):
    if value is None:
        return ""

    if isinstance(value, bool):
        return "true" if value else "false"

    if isinstance(value, float) and value.is_integer():
        return str(int(value))

    return str(value).strip()


def parse_pottery_workbook(uploaded_file):
    workbook = load_workbook(uploaded_file, read_only=True, data_only=True)

    for sheet in workbook.worksheets:
        rows = list(sheet.iter_rows(values_only=True))
        header_index = None

        for index, row in enumerate(rows):
            if any(clean_workbook_cell(value) for value in row):
                header_index = index
                break

        if header_index is None:
            continue

        headers = [clean_workbook_cell(value) for value in rows[header_index]]
        normalized_headers = [normalize_header(header) for header in headers]
        data_rows = []
        preview_rows = []

        for row in rows[header_index + 1:]:
            cleaned_values = [clean_workbook_cell(value) for value in row[:len(headers)]]

            if not any(cleaned_values):
                continue

            row_data = {}

            for index, header in enumerate(normalized_headers):
                if header:
                    row_data[header] = cleaned_values[index] if index < len(cleaned_values) else ""

            data_rows.append(row_data)

            if len(preview_rows) < 5:
                preview_rows.append(cleaned_values)

        if headers:
            return {
                "sheet": sheet.title,
                "headers": headers,
                "rows": data_rows,
                "previewRows": preview_rows,
                "rowCount": len(data_rows),
            }

    raise ValueError("XLSX does not contain a usable table.")


def localized_string(value):
    return {
        "en": {
            "value": value or "",
            "direction": "ltr",
        }
    }


def build_field_remains_value(field_remains):
    concept_value_ids = []

    for csv_key, concept_value_id in FIELD_REMAINS_VALUE_MAP.items():
        if field_remains.get(csv_key):
            concept_value_ids.append(concept_value_id)

    return concept_value_ids


class PotteryImportWorkbookPreviewView(View):
    def post(self, request):
        uploaded_file = request.FILES.get("file")

        if not uploaded_file:
            return JsonResponse(
                {"status": "error", "message": "Missing file."},
                status=400,
            )

        if not uploaded_file.name.lower().endswith(".xlsx"):
            return JsonResponse(
                {"status": "error", "message": "Choose an XLSX file."},
                status=400,
            )

        try:
            parsed = parse_pottery_workbook(uploaded_file)
        except Exception as error:
            return JsonResponse(
                {"status": "error", "message": f"Could not read XLSX: {error}"},
                status=400,
            )

        return JsonResponse({
            "status": "success",
            "format": "xlsx",
            "encoding": "xlsx",
            "delimiter": "",
            "columnCount": len(parsed["headers"]),
            **parsed,
        })


class PotteryImportPreviewView(View):
    def _find_existing_pottery_collection(self, context_resource_id):
        tiles = Tile.objects.filter(
            nodegroup_id=RELATED_CONTEXT_NODE_ID,
        )

        for tile in tiles:
            value = tile.data.get(RELATED_CONTEXT_NODE_ID)

            if not isinstance(value, list):
                continue

            for relation in value:
                if relation.get("resourceId") == context_resource_id:
                    return tile.resourceinstance

        return None

    def _upsert_tile_for_node(self, resource, node_id, value):
        node = Node.objects.get(nodeid=node_id)
        nodegroup_id = str(node.nodegroup_id)

        tile = Tile.objects.filter(
            resourceinstance=resource,
            nodegroup_id=nodegroup_id,
        ).first()

        if not tile:
            tile = Tile.get_blank_tile_from_nodegroup_id(
                nodegroup_id,
                resourceid=str(resource.resourceinstanceid),
            )

        tile.data[node_id] = value
        tile.save()

        return tile

    def _summarize_pottery_rows(self, pottery_rows):
        diagnostic_total = 0
        undiagnostic_total = 0
        no_material = False
        special_find = False
        remarks = []

        for row in pottery_rows:
            for item in row.get("pottery", []):
                diagnostic = item.get("diagnostic")
                undiagnostic = item.get("undiagnostic")

                if isinstance(diagnostic, (int, float)):
                    diagnostic_total += diagnostic

                if isinstance(undiagnostic, (int, float)):
                    undiagnostic_total += undiagnostic

                if item.get("noMaterial"):
                    no_material = True

                if item.get("specialFind"):
                    special_find = True

                if item.get("remarks"):
                    remarks.append(f"{item.get('type')}: {item.get('remarks')}")

        return {
            "diagnostic_total": diagnostic_total,
            "undiagnostic_total": undiagnostic_total,
            "no_material": no_material,
            "special_find": special_find,
            "remarks": "\n".join(remarks),
        }

    def post(self, request):
        try:
            payload = json.loads(request.body or "{}")
        except json.JSONDecodeError:
            return JsonResponse(
                {"status": "error", "message": "Invalid JSON payload."},
                status=400,
            )

        context_resource_id = payload.get("contextResourceId")
        context_number = payload.get("contextNumber")
        pottery_rows = payload.get("rows", [])

        field_remains = {}
        if pottery_rows:
            field_remains = pottery_rows[0].get("fieldRemains", {})

        field_remains_value = build_field_remains_value(field_remains)

        if not context_resource_id:
            return JsonResponse(
                {"status": "error", "message": "Missing contextResourceId."},
                status=400,
            )

        if not isinstance(pottery_rows, list):
            return JsonResponse(
                {"status": "error", "message": "rows must be a list."},
                status=400,
            )

        if not pottery_rows:
            return JsonResponse(
                {"status": "error", "message": "No pottery rows with importable pottery data were found."},
                status=400,
            )

        collection_name = f"Pottery Collection [for Context {context_number}]"

        related_context_value = [{
            "resourceId": context_resource_id,
            "ontologyProperty": "",
            "inverseOntologyProperty": "",
            "resourceXresourceId": str(uuid4()),
        }]
        summary = self._summarize_pottery_rows(pottery_rows)
        with transaction.atomic():
            pottery_resource = self._find_existing_pottery_collection(context_resource_id)
            created = False
            context_resource = Resource.objects.get(resourceinstanceid=context_resource_id)

            if field_remains_value:
                self._upsert_tile_for_node(
                    context_resource,
                    FIELD_REMAINS_NODE_ID,
                    field_remains_value,
                )

            if pottery_resource is None:
                pottery_resource = Resource.objects.create(graph_id=POTTERY_GRAPH_ID)
                created = True

            self._upsert_tile_for_node(
                pottery_resource,
                DIAGNOSTIC_NODE_ID,
                summary["diagnostic_total"],
            )

            self._upsert_tile_for_node(
                pottery_resource,
                UNDIAGNOSTIC_NODE_ID,
                summary["undiagnostic_total"],
            )

            self._upsert_tile_for_node(
                pottery_resource,
                NO_MATERIAL_NODE_ID,
                summary["no_material"],
            )

            self._upsert_tile_for_node(
                pottery_resource,
                SPECIAL_FIND_NODE_ID,
                summary["special_find"],
            )

            self._upsert_tile_for_node(
                pottery_resource,
                REMARKS_NODE_ID,
                localized_string(summary["remarks"]),
            )

            self._upsert_tile_for_node(
                pottery_resource,
                COLLECTION_NAME_NODE_ID,
                localized_string(collection_name),
            )

            self._upsert_tile_for_node(
                pottery_resource,
                RELATED_CONTEXT_NODE_ID,
                related_context_value,
            )

        message = (
            "Created Pottery Collection resource."
            if created
            else "Updated Pottery Collection resource."
        )

        return JsonResponse({
            "status": "success",
            "message": message,
            "potteryCollectionResourceId": str(pottery_resource.resourceinstanceid),
            "collectionName": collection_name,
            "contextResourceId": context_resource_id,
            "contextNumber": context_number,
            "rowCount": len(pottery_rows),
            "summaryCount": sum(len(row.get("pottery", [])) for row in pottery_rows),
            "rows": pottery_rows,
            "summary": summary,
            "created": created,
            "updated": not created,
        })
