import json

from django.http import JsonResponse
from django.views import View
from arches.app.models.tile import Tile
from django.db import transaction
from arches_for_excavation.utils.pottery.common import normalize_tile_value
from arches_for_excavation.utils.pottery.constants import POTTERY_RECORD_TYPES
from arches_for_excavation.utils.pottery.concept_lookup import (
    apply_dictionary_alias,
    get_dictionary_options,
    get_invalid_dictionary_nodes,
    resolve_dictionary_value,
    validate_and_prepare_dictionary_records,
)
from arches_for_excavation.utils.pottery.generic_record_parser import (
    create_pottery_record,
    parse_pottery_record_workbook,
)


def get_record_config_response(record_type):
    record_config = POTTERY_RECORD_TYPES.get(record_type)

    if not record_config:
        return None, JsonResponse(
            {
                "status": "error",
                "message": f"Unknown pottery record type: {record_type}",
            },
            status=404,
        )

    return record_config, None


def get_dictionary_options_by_field(record_config):
    return {
        field: get_dictionary_options(dictionary)
        for field, dictionary in record_config.get("dictionary_fields", {}).items()
    }


def build_preview_record(record_config, record):
    dictionary_fields = record_config.get("dictionary_fields", {})
    aliases = record_config.get("dictionary_aliases", {})
    preview_record = {
        **record,
        "_dictionaryValues": {},
        "_missingDictionaryFields": [],
        "_cellErrors": {},
    }

    for field, dictionary in dictionary_fields.items():
        raw_value = record.get(field)
        canonical_value = apply_dictionary_alias(field, raw_value, aliases)
        value_id = resolve_dictionary_value(dictionary, canonical_value)

        preview_record["_dictionaryValues"][field] = value_id

        if raw_value and not value_id:
            preview_record["_missingDictionaryFields"].append(field)
            preview_record["_cellErrors"][field] = (
                f"Value '{canonical_value}' does not exist in {dictionary}."
            )

    return preview_record


def build_missing_dictionary_values(record_config, records):
    _, missing_dictionary_values = validate_and_prepare_dictionary_records(
        record_config,
        records,
    )

    return missing_dictionary_values


def serialize_created_record(record, resource):
    resource_id = str(resource.resourceinstanceid)

    return {
        **record,
        "resourceId": resource_id,
        "resourceLink": f"/report/{resource_id}",
    }


class PotteryRecordPreviewView(View):
    def post(self, request, record_type):
        record_config, error_response = get_record_config_response(record_type)
        if error_response:
            return error_response

        pottery_collection_resource_id = request.POST.get("potteryCollectionResourceId")
        uploaded_file = request.FILES.get("file")

        if not pottery_collection_resource_id:
            return JsonResponse({"status": "error", "message": "Missing potteryCollectionResourceId."}, status=400)

        if not uploaded_file:
            return JsonResponse({"status": "error", "message": "Missing file."}, status=400)

        invalid_dictionary_nodes = get_invalid_dictionary_nodes(record_config)

        sheet_name, records = parse_pottery_record_workbook(uploaded_file, record_type)
        preview_records = [
            build_preview_record(record_config, record)
            for record in records
        ]

        return JsonResponse({
            "status": "preview",
            "message": f"Parsed {record_config['label']} records.",
            "potteryCollectionResourceId": pottery_collection_resource_id,
            "sheet": sheet_name,
            "parsed": len(preview_records),
            "records": preview_records,
            "recordType": record_type,
            "label": record_config["label"],
            "columns": [
                column
                for column in record_config.get("columns", [])
                if column.get("key") != "resourceLink"
            ],
            "dictionaryFields": record_config.get("dictionary_fields", {}),
            "dictionaryOptionsByField": get_dictionary_options_by_field(record_config),
            "missingDictionaryValues": build_missing_dictionary_values(record_config, records),
            "invalidDictionaryNodes": invalid_dictionary_nodes,
        })


class PotteryRecordCommitView(View):
    def post(self, request, record_type):
        record_config, error_response = get_record_config_response(record_type)
        if error_response:
            return error_response

        try:
            payload = json.loads(request.body.decode("utf-8"))
        except (json.JSONDecodeError, UnicodeDecodeError):
            return JsonResponse({"status": "error", "message": "Invalid JSON payload."}, status=400)

        pottery_collection_resource_id = payload.get("potteryCollectionResourceId")
        records = payload.get("records") or []

        if not pottery_collection_resource_id:
            return JsonResponse({"status": "error", "message": "Missing potteryCollectionResourceId."}, status=400)

        if not records:
            return JsonResponse({"status": "error", "message": "No records to import."}, status=400)

        invalid_dictionary_nodes = get_invalid_dictionary_nodes(record_config)
        if invalid_dictionary_nodes:
            return JsonResponse(
                {
                    "status": "error",
                    "message": "Dictionary nodes must use concept or concept-list datatype.",
                    "invalidDictionaryNodes": invalid_dictionary_nodes,
                    "recordType": record_type,
                    "label": record_config["label"],
                },
                status=400,
            )

        normalized_records = []
        dictionary_fields = record_config.get("dictionary_fields", {})

        for record in records:
            normalized_record = {
                key: value
                for key, value in record.items()
                if not key.startswith("_")
            }
            dictionary_values = record.get("_dictionaryValues") or {}

            for field in dictionary_fields:
                if dictionary_values.get(field):
                    normalized_record[field] = dictionary_values[field]

            if normalized_record.get("count") == "":
                normalized_record["count"] = None
            elif isinstance(normalized_record.get("count"), str) and normalized_record["count"].isdigit():
                normalized_record["count"] = int(normalized_record["count"])

            normalized_records.append(normalized_record)

        prepared_records, missing_dictionary_values = validate_and_prepare_dictionary_records(
            record_config,
            normalized_records,
        )

        if missing_dictionary_values:
            return JsonResponse(
                {
                    "status": "error",
                    "message": "Missing dictionary values.",
                    "missingDictionaryValues": missing_dictionary_values,
                    "recordType": record_type,
                    "label": record_config["label"],
                },
                status=400,
            )

        created_records = []
        with transaction.atomic():
            for record, prepared_record in zip(normalized_records, prepared_records):
                resource = create_pottery_record(
                    record_type,
                    prepared_record,
                    pottery_collection_resource_id,
                )
                display_record = dict(record)
                for field in dictionary_fields:
                    if prepared_record.get(field):
                        display_record[field] = normalize_tile_value(prepared_record[field])

                created_records.append(serialize_created_record(display_record, resource))

        return JsonResponse({
            "status": "success",
            "message": f"Created {record_config['label']} records.",
            "potteryCollectionResourceId": pottery_collection_resource_id,
            "created": len(created_records),
            "records": created_records[:20],
            "recordType": record_type,
            "label": record_config["label"],
            "columns": record_config.get("columns", []),
        })


class PotteryRecordImportView(View):
    record_type = None

    def post(self, request):
        record_config = POTTERY_RECORD_TYPES.get(self.record_type)
        pottery_collection_resource_id = request.POST.get("potteryCollectionResourceId")
        uploaded_file = request.FILES.get("file")

        if not record_config:
            return JsonResponse(
                {
                    "status": "error",
                    "message": f"Unknown pottery record type: {self.record_type}",
                },
                status=404,
            )

        if not pottery_collection_resource_id:
            return JsonResponse({"status": "error", "message": "Missing potteryCollectionResourceId."}, status=400)

        if not uploaded_file:
            return JsonResponse({"status": "error", "message": "Missing file."}, status=400)

        sheet_name, records = parse_pottery_record_workbook(uploaded_file, self.record_type)
        prepared_records, missing_dictionary_values = validate_and_prepare_dictionary_records(
            record_config,
            records,
        )

        if missing_dictionary_values:
            return JsonResponse(
                {
                    "status": "error",
                    "message": "Missing dictionary values.",
                    "missingDictionaryValues": missing_dictionary_values,
                    "recordType": self.record_type,
                    "label": record_config["label"],
                    "sheet": sheet_name,
                },
                status=400,
            )

        invalid_dictionary_nodes = get_invalid_dictionary_nodes(record_config)
        if invalid_dictionary_nodes:
            return JsonResponse(
                {
                    "status": "error",
                    "message": "Dictionary nodes must use concept or concept-list datatype.",
                    "invalidDictionaryNodes": invalid_dictionary_nodes,
                    "recordType": self.record_type,
                    "label": record_config["label"],
                    "sheet": sheet_name,
                },
                status=400,
            )

        created_records = []

        with transaction.atomic():
            for record, prepared_record in zip(records, prepared_records):
                resource = create_pottery_record(
                    self.record_type,
                    prepared_record,
                    pottery_collection_resource_id,
                )
                resource_id = str(resource.resourceinstanceid)

                created_records.append({
                    **record,
                    "resourceId": resource_id,
                    "resourceLink": f"/report/{resource_id}",
                })

        return JsonResponse({
            "status": "success",
            "message": f"Created {record_config['label']} records.",
            "potteryCollectionResourceId": pottery_collection_resource_id,
            "sheet": sheet_name,
            "created": len(created_records),
            "records": created_records[:20],
            "recordType": self.record_type,
            "label": record_config["label"],
            "columns": record_config.get("columns", []),
        })

class AmphoraeRecordImportView(PotteryRecordImportView):
    record_type = "amphorae"

class StorageVesselRecordImportView(PotteryRecordImportView):
    record_type = "storage-vessel"

class TableWareRecordImportView(PotteryRecordImportView):
    record_type = "table-ware"

class PotteryRecordsForCollectionView(View):
    def get(self, request, collection_resource_id, record_type):
        record_config = POTTERY_RECORD_TYPES.get(record_type)

        if not record_config:
            return JsonResponse(
                {
                    "status": "error",
                    "message": f"Unknown pottery record type: {record_type}",
                },
                status=404,
            )

        relation_node_id = record_config["related_collection_node_id"]
        field_map = record_config["fields"]

        relation_tiles = Tile.objects.filter(
            nodegroup_id=relation_node_id,
        )

        records = []

        for relation_tile in relation_tiles:
            relation_value = relation_tile.data.get(relation_node_id)

            if not isinstance(relation_value, list):
                continue

            is_related_to_collection = any(
                relation.get("resourceId") == str(collection_resource_id)
                for relation in relation_value
            )

            if not is_related_to_collection:
                continue

            resource = relation_tile.resourceinstance
            tiles = Tile.objects.filter(resourceinstance=resource)

            row = {
                "resourceId": str(resource.resourceinstanceid),
                "resourceLink": f"/report/{resource.resourceinstanceid}",
            }

            for output_key in field_map.keys():
                row[output_key] = ""

            for tile in tiles:
                data = tile.data or {}

                for output_key, node_id in field_map.items():
                    if node_id in data:
                        row[output_key] = normalize_tile_value(data.get(node_id))
            source_sheet = row.get("sourceSheet", "")
            source_row = row.get("sourceRow", "")

            if source_sheet and source_row:
                row["source"] = f"{source_sheet} #{source_row}"
            elif source_sheet:
                row["source"] = source_sheet
            else:
                row["source"] = ""            
            records.append(row)

        return JsonResponse({
            "status": "success",
            "collectionResourceId": str(collection_resource_id),
            "recordType": record_type,
            "label": record_config["label"],
            "columns": record_config.get("columns", []),
            "count": len(records),
            "records": records,
        })
