from arches_for_excavation.utils.pottery.generic_record_parser import (
    create_pottery_record,
    parse_pottery_record_workbook,
)


def parse_amphorae_workbook(uploaded_file):
    return parse_pottery_record_workbook(uploaded_file, "amphorae")


def create_amphorae_record(record, pottery_collection_resource_id):
    return create_pottery_record("amphorae", record, pottery_collection_resource_id)
