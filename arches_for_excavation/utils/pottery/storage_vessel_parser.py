from arches_slocal.utils.pottery.generic_record_parser import (
    create_pottery_record,
    parse_pottery_record_workbook,
)


def parse_storage_vessel_workbook(uploaded_file):
    return parse_pottery_record_workbook(uploaded_file, "storage-vessel")


def create_storage_vessel_record(record, pottery_collection_resource_id):
    return create_pottery_record("storage-vessel", record, pottery_collection_resource_id)
