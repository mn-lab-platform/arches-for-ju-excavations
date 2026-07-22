"""Identifiers and helpers for legacy and ontology-based resource models."""

from arches.app.models.tile import Tile


RESOURCE_MODELS = {
    "context": {
        "legacy": "d6559924-9f52-11eb-96c4-020063fe0012",
        "ontology": "2c536779-d3e6-43ef-bc0c-cd4d97dc8c6c",
    },
    "trench": {
        "legacy": "9d82972a-f537-11ea-ac6d-9fb7e90de197",
        "ontology": "cc91f1ff-6ea8-422c-be14-b818660f66f8",
    },
    "iiif": {
        "legacy": "401b3051-d1c4-465c-8dd0-1d5784adee98",
        "ontology": "f1b9e37a-c3ba-4c26-a797-7f16302c031c",
    },
    "digital_resource_3d": {
        "legacy": "5465389c-bba7-4af1-bc9a-9fbb201e8408",
        "ontology": "039f5a45-82e2-4597-8609-d24c758bfd59",
    },
    "annotation": {
        "legacy": "2880934b-0015-4c5a-8ec1-1ab9bca329fd",
        "ontology": "d1894fdd-41b3-44d3-aebb-ab44999f881e",
    },
    "coordinate_system": {
        "legacy": "a5219c24-2907-4055-9d68-18216d214458",
        "ontology": "855343ec-9d7c-4947-970c-e80b6cfacc4f",
    },
    "special_find": {
        "legacy": "5c2809bb-325b-486a-a9fd-7788a7713572",
        "ontology": "ac939663-80ce-43df-967d-42def45ef333",
    },
}


NODE_IDS = {
    "context": {
        "number": {
            "legacy": "1b5b4e9a-a38d-11eb-96c4-020063fe0012",
            "ontology": "cf7f2532-74f3-487f-9261-bf27825fe04c",
        },
        "archaeological_remains": {
            "legacy": "d6559928-9f52-11eb-96c4-020063fe0012",
            "ontology": "232ce77c-3098-4b06-8f11-c76be3610303",
        },
        "footprint": {
            "legacy": "d6559931-9f52-11eb-96c4-020063fe0012",
            "ontology": "e2605398-9cbc-4ce0-bc88-46a96e8bcec8",
        },
        "measurement_geojson": {
            "legacy": "bd290f65-b2fe-4de2-a9b6-fa056036facb",
            "ontology": "a9b48ce5-7590-4972-8f09-38c16294592d",
        },
        "measurement_text": {
            "legacy": "1d9f2ee2-d024-4c4e-a668-48951c55af63",
            "ontology": "0fc80919-a200-4cfd-981b-27c901a4f5df",
        },
    },
    "trench": {
        "footprint": {
            "legacy": "3a9f46c0-f538-11ea-ac6d-9fb7e90de197",
            "ontology": "ecd3d094-57fb-4dd0-80fe-bc17fc4ca7e7",
        },
        "measurement_geojson": {
            "legacy": "6d6accec-cde3-4a6d-b10b-ea217a01c6e7",
            "ontology": "ca3ca0ce-78df-4594-991c-47c3720cb1fd",
        },
        "measurement_text": {
            "legacy": "55693a63-9800-4439-8c64-34b72aa2d36b",
            "ontology": "39c128ad-df05-4395-8ccf-cf052ac90908",
        },
    },
    "iiif": {
        "label": {
            "legacy": "78422c09-4994-4eff-b764-60f21f3290cd",
            "ontology": "b9a36003-ef1c-4150-83dc-4d979e874065",
        },
        "manifest": {
            "legacy": "e0216dc7-89ba-4a27-9126-bf7e06d859a8",
            "ontology": "df47642e-dfc0-442f-a5cf-8c1247e9c5bb",
        },
        "related_resource": {
            "legacy": "9c317e5f-76b4-407d-9b8d-b64f446ea17a",
            "ontology": "8bedf116-657a-4eb5-af06-b4de29839966",
        },
        "used_files": {
            "legacy": "b1947f78-f339-4e32-b24d-11f78a2b52bd",
            "ontology": "9469c29f-85c2-4fce-bdb8-cd5d101d49d9",
        },
        "crs": {
            "legacy": "dd30ff3c-95a2-4d8d-bde8-eca158e7887b",
            "ontology": "dd068843-d477-4602-9457-71b31b97a564",
        },
        "geospatial": {
            "legacy": None,
            "ontology": "2d50ef5e-e70b-47fe-ba18-b645a3c7f182",
        },
    },
    "digital_resource_3d": {
        "label": {
            "legacy": "e86d68d2-04f0-4d26-b9a1-ee2d17d18232",
            "ontology": "5b1ab6bd-faf6-4120-93ae-8e6f4ea1de32",
        },
        "date": {
            "legacy": "79e9e772-d8cb-41e5-87a3-f4a0cce70f69",
            "ontology": "664b24d2-b94d-4cfd-be93-eb7d94ea0c03",
        },
        "georeferenced": {
            "legacy": "6f57cc4e-3c15-4483-8517-753a999ac448",
            "ontology": "dc5d3b0a-f66a-4c66-b951-0d99fc68367b",
        },
        "url": {
            "legacy": "5c156476-b54c-4e7b-80b2-005667812d4e",
            "ontology": "c38b2683-4297-4a83-87ba-de31a4ec88d8",
        },
        "related_resource": {
            "legacy": "19d7fe5b-59ff-46e4-8366-9b2cc77b0a8d",
            "ontology": "f67c4c42-fe0e-489b-9af7-58405ad7c65f",
        },
        "crs": {
            "legacy": "63781343-8aac-47ee-95f5-3b523bbb3484",
            "ontology": "26125877-dc4e-402e-a925-78859a703ec3",
        },
    },
    "annotation": {
        "name": {
            "legacy": "e202ea9f-e0a9-42a3-85a1-6380bc1115b9",
            "ontology": "c6840b34-8614-4734-bdb2-10d52f258afc",
        },
        "description": {
            "legacy": "e4c6d7e5-317d-4d04-9936-e4ad1886ba05",
            "ontology": "897a4abf-32dd-4d1f-925e-45c8d82828b9",
        },
        "color": {
            "legacy": "d691d389-6259-4765-b2d3-7f7f98057101",
            "ontology": "2a0b5108-ef64-47e3-9460-61c064e397b1",
        },
        "geometry": {
            "legacy": "4277f805-09e7-4db1-bf26-49c09132c720",
            "ontology": "2586e7f6-3610-4666-bc27-7efe9639dcaf",
        },
        "related_resource": {
            "legacy": "5266b89c-72f7-41cf-a7f4-cde1df9efef9",
            "ontology": "a2ef2d24-20ae-4070-b11b-207834905809",
        },
    },
    "coordinate_system": {
        "name": {
            "legacy": "d52b7c0c-c948-43ab-896d-30b266416d6b",
            "ontology": "9c0f5c73-f6bd-4fd4-8f14-ea4182771ea5",
        },
        "description": {
            "legacy": "32d0c83f-7de5-4389-8b8d-84c0fca12f6b",
            "ontology": "7e487749-15f0-495c-a2aa-8a4fcbb601f6",
        },
        "origin_local_x": {
            "legacy": "2e5bd906-cdf4-4d6d-9b6d-502e66ff146b",
            "ontology": "1e71c16f-98e9-4c8e-a0db-3598c55d43c5",
        },
        "origin_local_y": {
            "legacy": "6354545f-a37c-4502-b6cc-a76c04b8223d",
            "ontology": "711f581c-8960-493c-9910-6c22a5d85190",
        },
        "origin_longitude": {
            "legacy": "fb65c048-399b-4fdd-8ea8-9ceafcaacb8c",
            "ontology": "d60cfa59-5d6e-433d-be02-9535763c2056",
        },
        "origin_latitude": {
            "legacy": "2cbd84ea-2a4d-4e7f-b956-e0af814a6b80",
            "ontology": "003479b2-c6fa-4760-ae6a-4c858ba4389f",
        },
        "direction_longitude": {
            "legacy": "773938c1-2334-4954-a66a-0bc56c5e74a3",
            "ontology": "bd1d70f6-e300-40ed-bb93-1cb2442df386",
        },
        "direction_latitude": {
            "legacy": "5c42db2f-d64b-4dc0-87a7-b27796405283",
            "ontology": "142469c8-d5f4-4b0b-9bfc-7e28f30199d7",
        },
    },
}


def graph_ids(model_name):
    return tuple(RESOURCE_MODELS[model_name].values())


def graph_variant(model_name, graph_id):
    graph_id = str(graph_id)
    for variant, candidate in RESOURCE_MODELS[model_name].items():
        if graph_id == candidate:
            return variant
    return None


def node_id(model_name, field_name, graph_id):
    variant = graph_variant(model_name, graph_id)
    if not variant:
        return None
    return NODE_IDS[model_name][field_name].get(variant)


def node_ids(model_name, field_name):
    return tuple(
        value
        for value in NODE_IDS[model_name][field_name].values()
        if value
    )


def tile_value(resource, candidate_node_ids):
    candidates = tuple(candidate_node_ids)
    for tile in Tile.objects.filter(
        resourceinstance=resource,
        data__has_any_keys=list(candidates),
    ):
        for candidate in candidates:
            if candidate in (tile.data or {}):
                return tile.data[candidate]
    return None
