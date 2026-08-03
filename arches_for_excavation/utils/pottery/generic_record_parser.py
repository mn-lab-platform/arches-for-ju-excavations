from uuid import uuid4

from openpyxl import load_workbook

from arches.app.models.models import Resource

from arches_for_excavation.utils.pottery.common import (
    clean_cell,
    create_tile_for_node,
    decode_vessel_part,
    get_value,
    localized_string,
    normalize_header,
    parse_p_no_and_count,
    to_boolean,
)
from arches_for_excavation.utils.pottery.concept_lookup import format_concept_tile_value
from arches_for_excavation.utils.pottery.constants import POTTERY_RECORD_TYPES


DATA_SLOT_COUNT = 36


def get_record_config(record_type):
    record_config = POTTERY_RECORD_TYPES.get(record_type)

    if not record_config:
        raise ValueError(f"Unknown pottery record type: {record_type}")

    return record_config


def has_record_data(record, record_config):
    for key in record_config.get("record_data_keys", []):
        value = record.get(key)
        if value not in (None, ""):
            return True

    return False


def find_header_row(sheet, predicate):
    for row_index, row in enumerate(sheet.iter_rows(max_row=20), start=1):
        headers = [normalize_header(cell.value) for cell in row]
        if predicate(headers):
            return row_index, headers

    return None, []


def get_first_value(values, source_keys):
    return clean_cell(get_value(values, *source_keys))


def get_suffixed_value(values, source_keys, suffix, number):
    suffixed_keys = []

    for source_key in source_keys:
        suffixed_keys.append(f"{source_key}_{suffix}")
        suffixed_keys.append(f"{source_key}_0{number}")

    return clean_cell(get_value(values, *suffixed_keys))


def normalize_field_value(key, value):
    if key == "vesselPart":
        return decode_vessel_part(value)

    return clean_cell(value)


def build_base_record(record_config, sheet_title, row_index, context="", trench="", form_no=""):
    return {
        "potteryType": record_config["label"],
        "context": context,
        "trench": trench,
        "formNo": form_no,
        "pNo": "",
        "count": None,
        "sourceSheet": sheet_title,
        "sourceRow": row_index,
    }


def parse_table_sheet(sheet, record_type):
    record_config = get_record_config(record_type)
    header_row_index, headers = find_header_row(
        sheet,
        lambda header_values: "p_no" in header_values,
    )

    if not header_row_index:
        return []

    records = []

    for row_index, row in enumerate(sheet.iter_rows(min_row=header_row_index + 1), start=header_row_index + 1):
        values = {}

        for index, cell in enumerate(row):
            if index < len(headers):
                values[headers[index]] = clean_cell(cell.value)

        p_no, count = parse_p_no_and_count(values.get("p_no"))

        record = build_base_record(
            record_config,
            sheet.title,
            row_index,
            context=values.get("context", ""),
            trench=values.get("trench", ""),
            form_no=values.get("form_no", ""),
        )
        record["pNo"] = p_no
        record["count"] = count

        for key, source_keys in record_config.get("excel_fields", {}).items():
            record[key] = normalize_field_value(key, get_first_value(values, source_keys))

        if has_record_data(record, record_config):
            records.append(record)

    return records


def parse_data_sheet(sheet, record_type):
    record_config = get_record_config(record_type)
    header_row_index, headers = find_header_row(
        sheet,
        lambda header_values: "context_no" in header_values and any(header.startswith("no_p_") for header in header_values),
    )

    if not header_row_index:
        return []

    records = []

    for row_index, row in enumerate(sheet.iter_rows(min_row=header_row_index + 1), start=header_row_index + 1):
        values = {}

        for index, cell in enumerate(row):
            if index < len(headers):
                values[headers[index]] = cell.value

        context = clean_cell(values.get("context_no"))
        trench = clean_cell(values.get("trench"))
        form_no = clean_cell(values.get("form_no")) or clean_cell(values.get("id"))

        for number in range(1, DATA_SLOT_COUNT + 1):
            suffix = f"{number:02d}"
            raw_p_no = get_suffixed_value(values, ["no_p"], suffix, number)
            raw_quantity = get_suffixed_value(values, ["no_quantity"], suffix, number)
            p_no, count = parse_p_no_and_count(raw_p_no, raw_quantity)

            record = build_base_record(
                record_config,
                sheet.title,
                row_index,
                context=context,
                trench=trench,
                form_no=form_no,
            )
            record["pNo"] = p_no
            record["count"] = count

            for key, source_keys in record_config.get("excel_fields", {}).items():
                value = get_suffixed_value(values, source_keys, suffix, number)
                record[key] = normalize_field_value(key, value)

            if has_record_data(record, record_config):
                records.append(record)

    return records


def parse_pottery_record_workbook(uploaded_file, record_type):
    workbook = load_workbook(uploaded_file, read_only=True, data_only=True)
    record_config = get_record_config(record_type)

    for sheet_name in record_config.get("sheet_priority", ["Table", "Data"]):
        if sheet_name not in workbook.sheetnames:
            continue

        if sheet_name == "Table":
            records = parse_table_sheet(workbook[sheet_name], record_type)
        elif sheet_name == "Data":
            records = parse_data_sheet(workbook[sheet_name], record_type)
        else:
            records = []

        if records:
            return sheet_name, records

    return "", []


def create_pottery_record(record_type, record, pottery_collection_resource_id):
    record_config = get_record_config(record_type)
    dictionary_fields = record_config.get("dictionary_fields", {})
    resource = Resource.objects.create(graph_id=record_config["graph_id"])

    related_collection_value = [{
        "resourceId": pottery_collection_resource_id,
        "ontologyProperty": "",
        "inverseOntologyProperty": "",
        "resourceXresourceId": str(uuid4()),
    }]

    create_tile_for_node(
        resource,
        record_config["related_collection_node_id"],
        related_collection_value,
    )
    pottery_type_node_id = record_config.get("pottery_type_node_id")
    pottery_type_value = record.get("potteryType")
    if pottery_type_node_id:
        if "potteryType" in dictionary_fields and pottery_type_value:
            create_tile_for_node(
                resource,
                pottery_type_node_id,
                format_concept_tile_value(pottery_type_node_id, pottery_type_value),
            )
        else:
            create_tile_for_node(
                resource,
                pottery_type_node_id,
                localized_string(pottery_type_value),
            )

    for key, node_id in record_config.get("fields", {}).items():
        value = record.get(key)

        if key == "count":
            if value is not None:
                create_tile_for_node(resource, node_id, value)
        elif key == "drawn":
            create_tile_for_node(resource, node_id, to_boolean(value))
        elif key in dictionary_fields:
            if value:
                create_tile_for_node(resource, node_id, format_concept_tile_value(node_id, value))
        else:
            create_tile_for_node(resource, node_id, localized_string(value))

    if record_config.get("source_sheet_node_id"):
        create_tile_for_node(
            resource,
            record_config["source_sheet_node_id"],
            localized_string(record.get("sourceSheet")),
        )
    if record_config.get("source_row_node_id"):
        create_tile_for_node(
            resource,
            record_config["source_row_node_id"],
            record.get("sourceRow"),
        )

    return resource
