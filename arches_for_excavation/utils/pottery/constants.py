# The project-managed Collections take precedence for dictionaries that were
# explicitly added in Arches. The remaining PAC ConceptScheme URLs are stable
# references to the RDF source in ``collectiones/``.
POTTERY_DICTIONARY_AMPHORAE_TYPE = "pottery types - amphorae"
POTTERY_DICTIONARY_LAMP_TYPE = "pottery types - lamps"
POTTERY_DICTIONARY_TABLE_WARE_TYPE = "pottery types - table ware"
POTTERY_DICTIONARY_FORM = "pottery - vessel form"
POTTERY_DICTIONARY_VESSEL_PART = "https://pac.cenagis.edu.pl/entity/Q451"
POTTERY_DICTIONARY_SUB_CATEGORY = "pottery - sub-category"
POTTERY_DICTIONARY_PROVENANCE = "provenance"
POTTERY_DICTIONARY_CHRONOLOGY = "chronology"
POTTERY_DICTIONARY_MORPHOLOGY = "https://pac.cenagis.edu.pl/entity/Q455"
POTTERY_DICTIONARY_STATE_OF_PRESERVATION = "pottery - state of preservation"
POTTERY_DICTIONARY_SURFACE_TREATMENT = "pottery - surface treatment"

# Retained for the legacy ``seed_pottery_dictionaries`` command. The detailed
# Excel importer does not use this broad local collection.
POTTERY_DICTIONARY_POTTERY_TYPE = "Pottery Type"

# ``collectiones`` contains no dedicated plain-ware/storage-vessel type
# scheme. Keep this explicit placeholder so their values are reported as
# unresolved instead of being matched to a different pottery category.
POTTERY_DICTIONARY_TYPE = "Pottery Type/Form Classification"

POTTERY_VESSEL_PART_ALIASES = {
    "R": "Rim",
    "H": "Handle",
    "B": "Base",
    "W": "Wall",
    # Source-sheet abbreviations and punctuation variants for ``lower part``.
    # Alias matching is case-insensitive, so this covers Low/LOW variants too.
    "low part": "lower part",
    "low. part": "lower part",
    "lower p": "lower part",
    "up part aa": "upper part",
    "upper part rn": "upper part",
}

# Shared Pottery Record configuration. Every record type has the same
# logical fields; only its graph and node UUIDs differ.
# Complete field set common to the five copied Pottery Record models.
# The report resolves the matching node IDs by visible field name in each graph.
POTTERY_RECORD_COLUMNS = [
    {"key": "formNo", "label": "Form_no"},
    {"key": "pNo", "label": "p_no"},
    {"key": "count", "label": "Count"},
    {"key": "mgNo", "label": "MG no"},
    {"key": "subcategory", "label": "SUBCATEGORY"},
    {"key": "vesselForm", "label": "VESSEL FORM"},
    {"key": "type", "label": "TYPE"},
    {"key": "typeUncertain", "label": "Type uncertainty"},
    {"key": "vesselPart", "label": "VESSEL PART"},
    {"key": "morphology", "label": "MORPHOLOGY"},
    {"key": "surfaceTreatment", "label": "SURFACE TREATMENT"},
    {"key": "stateOfPreservation", "label": "STATE OF PRESERVATION"},
    {"key": "chronology", "label": "CHRONOLOGY"},
    {"key": "chronologyUncertain", "label": "Chronology uncertainty"},
    {"key": "provenance", "label": "PROVENANCE"},
    {"key": "provenanceUncertain", "label": "Provenance uncertainty"},
    {"key": "author", "label": "AUTHOR"},
    {"key": "drawn", "label": "DRAWING"},
    {"key": "photo", "label": "PHOTO"},
    {"key": "specialFindId", "label": "SPECIAL FIND ID"},
    {"key": "comment", "label": "COMMENTS"},
    {"key": "resourceLink", "label": "Resource"},
]

POTTERY_RECORD_EXCEL_FIELDS = {
    "vesselPart": ["vessel_part"],
    "mgNo": ["mg_no", "tw_mg_no", "pw_mg_no", "pw_sv_mg_no", "lamp_mg_no"],
    "subcategory": ["subcategory", "sub_category"],
    "vesselForm": ["vessel_form"],
    "surfaceTreatment": ["surface_treatment"],
    "stateOfPreservation": ["state_of_preservation"],
    "author": ["author"],
    "type": ["type"],
    "typeUncertain": ["type_uncertain", "type_uncertainty"],
    "morphology": ["morphology"],
    "chronology": ["chronology", "period"],
    "chronologyUncertain": ["chronology_uncertain", "chronology_uncertainty", "uncertain"],
    "provenance": ["provenance"],
    "provenanceUncertain": ["provenance_uncertain", "provenance_uncertainty"],
    "drawn": ["drawn"],
    "photo": ["photo"],
    "comment": ["comment", "comments"],
}

POTTERY_RECORD_DATA_KEYS = [
    "pNo",
    "count",
    "vesselPart",
    "mgNo",
    "subcategory",
    "vesselForm",
    "surfaceTreatment",
    "stateOfPreservation",
    "author",
    "type",
    "morphology",
    "chronology",
    "provenance",
]

POTTERY_RECORD_TYPE_DICTIONARIES = {
    record_type: {
        "subcategory": POTTERY_DICTIONARY_SUB_CATEGORY,
        "vesselForm": POTTERY_DICTIONARY_FORM,
        "surfaceTreatment": POTTERY_DICTIONARY_SURFACE_TREATMENT,
        "stateOfPreservation": POTTERY_DICTIONARY_STATE_OF_PRESERVATION,
        "vesselPart": POTTERY_DICTIONARY_VESSEL_PART,
        "type": POTTERY_DICTIONARY_TYPE,
        "morphology": POTTERY_DICTIONARY_MORPHOLOGY,
        "chronology": POTTERY_DICTIONARY_CHRONOLOGY,
        "provenance": POTTERY_DICTIONARY_PROVENANCE,
    }
    for record_type in (
        "amphorae",
        "storage-vessel",
        "table-ware",
        "plain-ware",
        "kitchen-ware",
        "lamp",
    )
}

POTTERY_RECORD_TYPE_DICTIONARIES["amphorae"]["type"] = POTTERY_DICTIONARY_AMPHORAE_TYPE
POTTERY_RECORD_TYPE_DICTIONARIES["table-ware"]["type"] = POTTERY_DICTIONARY_TABLE_WARE_TYPE
POTTERY_RECORD_TYPE_DICTIONARIES["lamp"]["type"] = POTTERY_DICTIONARY_LAMP_TYPE
for _record_type in ("plain-ware", "storage-vessel", "kitchen-ware"):
    POTTERY_RECORD_TYPE_DICTIONARIES[_record_type].pop("type")

POTTERY_RECORD_DICTIONARY_ALIASES = {
    "vesselPart": POTTERY_VESSEL_PART_ALIASES,
}


def pottery_record_type(label, graph_id, related_collection_node_id, fields, dictionary_fields, sheet_priority=("Template", "Table", "Data")):
    return {
        "label": label,
        "graph_id": graph_id,
        "related_collection_node_id": related_collection_node_id,
        "pottery_type_node_id": None,
        "source_sheet_node_id": None,
        "source_row_node_id": None,
        "sheet_priority": list(sheet_priority),
        "dictionary_required": True,
        "dictionary_fields": dictionary_fields,
        "dictionary_aliases": POTTERY_RECORD_DICTIONARY_ALIASES,
        "dictionary_multi_value_fields": ("morphology", "chronology", "subcategory", "vesselForm", "surfaceTreatment"),
        "fields": fields,
        "columns": POTTERY_RECORD_COLUMNS,
        "excel_fields": POTTERY_RECORD_EXCEL_FIELDS,
        "record_data_keys": POTTERY_RECORD_DATA_KEYS,
    }


POTTERY_RECORD_TYPES = {
    "amphorae": pottery_record_type(
        "Amphorae",
        "c09880b6-f404-4747-8038-a53938093437",
        "5fa2dbcf-0e8e-4abd-81e5-a9304350da91",
        {
            "formNo": "9689e2b4-9e0c-4a24-8319-55ae1290ef1a",
            "pNo": "8b0b63cb-f348-412b-8bef-ed76fb9f8e09",
            "count": "b406db32-905b-4d45-ad93-684ea7a0233a",
            "vesselPart": "c05274e0-9134-4387-aa37-7f702cda797b",
            "mgNo": "08aab7c3-edf8-48f4-b601-2fd660e7d6f1",
            "subcategory": "0fcf663f-7491-437c-b1bf-f62390434117",
            "vesselForm": "eeb1eb0e-f650-4f6c-a75a-291483c47db8",
            "surfaceTreatment": "b19dcb7b-29a4-4bba-ada4-e45328549c3c",
            "stateOfPreservation": "74c65f24-af0a-4b04-8678-a88be7102beb",
            "author": "f9e6e252-923a-4eed-b69c-d0ad00f8dc1f",
            "type": "03193ba9-4433-45fd-b079-86ca4fc613b6",
            "morphology": "a2672b17-a96f-4ce9-9ea6-435cfaf15377",
            "chronology": "cc58d73a-9188-4e1b-9722-cf005f1d4dd9",
            "provenance": "115bce80-734b-47b4-b41d-04403a8aea2a",
            "drawn": "17fd9b5d-7946-4cd6-a4ce-f43507752830",
            "photo": "747d3558-a705-49c8-bd38-03df72324e3e",
            "typeUncertain": "faf409fc-8a1b-43e6-9ce5-f6971b793214",
            "chronologyUncertain": "4ffe1750-39e9-4d61-bf55-a674b64334eb",
            "provenanceUncertain": "f35ae98b-99ca-4740-8acc-bd18d02d60ae",
            "comment": "cd1e1667-84e5-493b-94f3-345ebd7116ca",
        },
        POTTERY_RECORD_TYPE_DICTIONARIES["amphorae"],
    ),
    "storage-vessel": pottery_record_type(
        "Storage Vessel",
        "aeeea75c-9251-45fe-9fa6-85e5153e9091",
        "7ac51ec0-67f6-42ae-96f1-662dd53815df",
        {
            "formNo": "279ca533-0ab6-4572-ac7a-0355cd351a0d",
            "pNo": "da99e9c5-1073-4363-992c-9ec72f4ea42f",
            "count": "ce441402-62a0-4955-90d7-a9be3c3bc7d6",
            "vesselPart": "1d5ed880-1a1a-4e31-9ac1-9ec4d264caea",
            "type": "5359d68b-b3a0-4867-9842-95dc0ee0b1b4",
            "morphology": "8f98b546-258c-4a17-92e0-94dbd421b809",
            "chronology": "32c4f9c6-2ece-4e2c-afc2-ca0ad8216ef5",
            "provenance": "02e50cd0-0d03-4ee8-95d6-e79db3a014c8",
            "drawn": "b253c8ea-8ab6-4fa6-8021-461927d1457e",
            "photo": "b4a7b664-16b9-4e73-bbb9-1ba882135cb0",
            "mgNo": "1f8927a3-7432-4d00-8436-11b96e76a843",
            "subcategory": "9ae41f28-d43c-4569-9b27-625a5cc43085",
            "vesselForm": "ecd44720-8cd7-438e-9c97-5b7886960fdd",
            "surfaceTreatment": "3498af89-5372-43dc-8abb-843ff3c2fe14",
            "stateOfPreservation": "d37e518b-59f5-402a-9dcd-1f350a6439dc",
            "author": "b2d01d43-82e3-4bb7-b2bf-f79d37ad2b70",
            "typeUncertain": "c9ba7486-9152-468a-83d8-d72c3f977204",
            "chronologyUncertain": "eff0bc8a-9573-47a2-8f94-380b054c2161",
            "provenanceUncertain": "b480ea8e-b0e9-4b5f-9180-5f2813fe5532",
            "comment": "687acb67-c883-4ddf-a7ef-3270233e7f16",
        },
        POTTERY_RECORD_TYPE_DICTIONARIES["storage-vessel"],
    ),
    "table-ware": pottery_record_type(
        "Table Ware",
        "124255a2-f11d-4a52-94f4-a06b791c4a60",
        "e875de72-6540-470d-b188-3e0323832ac1",
        {
            "formNo": "91645d5b-6c20-40f2-a89c-da697718d6a8",
            "pNo": "513a9f95-9a71-4c1d-b6fa-eb9debf0a32a",
            "count": "2a848599-cb96-4b7f-bd86-526aa80fb22a",
            "vesselPart": "1a70da40-0007-4a11-ab56-a9235839847f",
            "mgNo": "e7a5e00c-a5fa-41c9-97bd-9ecea21760ce",
            "subcategory": "e1cc37a7-7be8-4cd2-9f3f-8ca3f84d1769",
            "vesselForm": "38c60f78-015a-4a20-99a4-58331b399b23",
            "surfaceTreatment": "b16d1ad7-b37f-42b6-b525-3bee02a4800c",
            "stateOfPreservation": "822a6fdb-3673-456a-8c16-f05ee69641fc",
            "author": "1bc1eb28-451a-46a7-881f-79c56e197d31",
            "type": "7b819c78-641f-4828-a289-c1d8bedee096",
            "morphology": "a21b065b-a135-4098-b783-9f316fe2d375",
            "chronology": "f9563ebd-3584-44f8-aa45-f1d36b6925aa",
            "provenance": "0cc82d71-8ac6-4fed-ab7a-36018af53e02",
            "drawn": "4ca15fd8-1e4e-4f3f-a487-c5cf4f515c3a",
            "photo": "1b911b3d-43e5-4a42-b483-de8279afd186",
            "typeUncertain": "55f59eb1-831e-4bd3-8bf5-6e9e0f5882ac",
            "chronologyUncertain": "d6dd6d03-479c-471c-bf69-db4cc7cf45d7",
            "provenanceUncertain": "122abc0f-9088-4338-a645-2609f3ddd3f4",
            "comment": "6a4336b8-115d-4bea-b52c-70de5f675701",
        },
        POTTERY_RECORD_TYPE_DICTIONARIES["table-ware"],
        sheet_priority=("Template", "Data", "Table"),
    ),
    "plain-ware": pottery_record_type(
        "Plain Ware",
        "08c52b0f-c734-455b-aaef-e2f70ddae793",
        "fd7451a5-d754-4bc3-a613-57fd229e22fe",
        {
            "formNo": "e366dd7e-46db-46a9-a988-1be43221b816",
            "pNo": "11103163-79f8-46bc-98d1-b905ff254e98",
            "count": "9440daad-cf34-4bb0-811a-643db54c9786",
            "vesselPart": "07712342-79d8-4cdb-a4cf-87aa2ae34ce8",
            "mgNo": "4ba8d85f-e410-40a1-a444-9db0feaff10c",
            "subcategory": "9563d7a9-a6f3-4ddd-9623-78cc3bfc6890",
            "vesselForm": "9662494d-2679-4f70-9b7f-e4c2f513ee05",
            "surfaceTreatment": "65837d73-e414-43bb-bf30-55601750f7d6",
            "stateOfPreservation": "81ca8aa4-24c8-484b-97eb-75dd407e163c",
            "author": "2b4823f7-3503-4f5e-bbd6-8057acab8651",
            "type": "b81131af-54a8-4f18-9af0-25efd94a1aac",
            "morphology": "ef0e9603-8aa6-4e7c-a70f-632a35932758",
            "chronology": "0d854919-500b-4330-b084-8e7d1485de3a",
            "provenance": "3b0aad60-7c57-4c8b-ac6c-ff3e7992f7dc",
            "drawn": "8b23962c-3a02-4087-b940-e97b7e2bc3a1",
            "photo": "9b4892e5-e077-467e-addd-a2259a4cb90e",
            "typeUncertain": "fe951386-a6fd-45d7-a15e-bca7b506dd11",
            "chronologyUncertain": "63ee5659-cdcd-4130-a286-b444715aea34",
            "provenanceUncertain": "77d55955-e3e5-4ca9-9c79-a2158d7091bb",
            "comment": "f9e64a36-b2e0-46e9-aeb9-f86e3172de65",
        },
        POTTERY_RECORD_TYPE_DICTIONARIES["plain-ware"],
    ),
    "kitchen-ware": pottery_record_type(
        "Kitchen Ware",
        "bea2b69c-87bd-43e3-912e-942d66455e5f",
        "ed13158d-3086-4b26-b5b9-c4e46f71d6d9",
        {
            "formNo": "4e1c200c-6cec-4c9e-ab09-eac53e5f1774",
            "pNo": "db5f0b03-ad81-42aa-aa99-5995d17e2d16",
            "count": "1eeb08f1-b499-4bad-9085-b9abf4516660",
            "vesselPart": "38e7aa35-0ae0-4888-a386-6fcef73d3788",
            "mgNo": "9cc719b7-1685-4ba7-8e39-b6862eb914f6",
            "subcategory": "ef3b429f-726a-4eca-93dc-4d8217a552ac",
            "vesselForm": "347d39d9-ecf0-4268-b741-972542a5cf9e",
            "surfaceTreatment": "0e2e3c76-754b-481c-a61f-abd3d72be7a1",
            "stateOfPreservation": "d374e83b-db4f-44e7-b3b6-b3286df8639b",
            "author": "26ba2439-7af3-4d54-98c6-956cfecdd116",
            "morphology": "008c47d3-b4e3-45db-b05f-36bf9e096137",
            "chronology": "0b403fbd-62cb-45f1-bacd-36b9208adbe8",
            "provenance": "da8f4d3d-c1d1-44f8-afe0-de59ca7d2aba",
            "drawn": "f4015e16-5fc4-4ce2-8dc1-6239283a5d60",
            "photo": "5c69a115-8ac3-4d66-be62-b4ac8a9037b5",
            "typeUncertain": "c7b2c6dd-e025-41a4-860c-9d3ad25b423f",
            "chronologyUncertain": "3d1d64fb-2a1b-4d27-92aa-8f0dbc50ff71",
            "provenanceUncertain": "82f2ad67-3795-4772-bd00-889513edd0f0",
            "comment": "526b40d8-b4e7-4f3e-9855-523bb1ba182a",
        },
        POTTERY_RECORD_TYPE_DICTIONARIES["kitchen-ware"],
    ),
    "lamp": pottery_record_type(
        "Lamp",
        "61b403ae-906c-4cba-ab64-8393c91561d1",
        "5a270090-4d63-4086-9f7b-7b5cba39d917",
        {
            "formNo": "50cc2627-dfd7-4d8b-9c36-d070c0d25225",
            "pNo": "74ac5def-35fb-4ad0-a06a-3bacebe36702",
            "count": "f2247b04-f1c7-40ca-be67-ab8f77f8fe36",
            "vesselPart": "faf441cc-c180-47cb-988b-87bd7d4c3c72",
            "mgNo": "5694d5a1-8501-43dd-9c55-fb1b53d50396",
            "subcategory": "3226a7a9-d719-42df-9b27-33bd7bd667dd",
            "vesselForm": "8176d8fe-a691-46fa-bebe-efdae625e929",
            "surfaceTreatment": "5638eb7a-8ebf-4156-8f9c-90ebbece67ee",
            "stateOfPreservation": "14de5b24-b037-4b9f-8ed5-3b58fac42737",
            "author": "cf1967f5-0018-44d5-a733-95afe35e5a65",
            "type": "7f6c938f-1fa8-41e5-9338-71828aa1df29",
            "morphology": "ba867ac5-e0c6-4978-9c61-3c49749c422e",
            "chronology": "26237e79-6a26-41af-907d-ae1e3f0bbd1a",
            "provenance": "87a05a56-8b88-4690-900d-0773b879c42b",
            "drawn": "ba35c751-e07b-4f64-b728-46c629659c64",
            "photo": "cd50769c-f5cf-4ee8-be54-cb44cb9eca56",
            "typeUncertain": "764cc169-d1b8-4b90-ac99-2a4edd968011",
            "chronologyUncertain": "e0ee25db-9f7f-4a58-bde3-29c124048ada",
            "provenanceUncertain": "05cb893e-f533-4f9d-8b4b-e9040aad3688",
            "comment": "656d611b-7430-4f16-85e3-fbbcf183dc54",
        },
        POTTERY_RECORD_TYPE_DICTIONARIES["lamp"],
    ),
}
