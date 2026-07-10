from arches_slocal.utils.pottery.generic_record_parser import (
    create_pottery_record,
    parse_pottery_record_workbook,
)


def parse_table_ware_workbook(uploaded_file):
    return parse_pottery_record_workbook(uploaded_file, "table-ware")


def create_table_ware_record(record, pottery_collection_resource_id):
    return create_pottery_record("table-ware", record, pottery_collection_resource_id)
