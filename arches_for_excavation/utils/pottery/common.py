from functools import lru_cache
from uuid import UUID, uuid4

from django.db import transaction

from arches.app.models.models import Node, Resource, Value
from arches.app.models.tile import Tile


VESSEL_PART_ALIASES = {
    "R": "Rim",
    "H": "Handle",
    "B": "Base",
    "W": "Wall",
}


def clean_cell(value):
    if value is None:
        return ""
    return str(value).strip()


def normalize_header(value):
    return (
        clean_cell(value)
        .lower()
        .replace(" ", "_")
        .replace("-", "_")
        .replace("/", "_")
    )


def parse_p_no_and_count(raw_p_no, raw_quantity=""):
    raw_p_no = clean_cell(raw_p_no)
    raw_quantity = clean_cell(raw_quantity)

    if raw_p_no.upper() == "P" and raw_quantity:
        return f"P{raw_quantity}", None

    if raw_p_no.upper().startswith("P"):
        return raw_p_no, None

    if raw_p_no.isdigit():
        return "", int(raw_p_no)

    if raw_quantity.isdigit():
        return "", int(raw_quantity)

    return raw_p_no, None


def decode_vessel_part(value):
    raw = clean_cell(value)
    return VESSEL_PART_ALIASES.get(raw.upper(), raw)


def get_value(values, *keys):
    for key in keys:
        if key in values and values[key] not in (None, ""):
            return values[key]
    return ""


def localized_string(value):
    return {
        "en": {
            "value": value or "",
            "direction": "ltr",
        }
    }


def to_boolean(value):
    normalized = str(value or "").strip().lower()
    return normalized in ["1", "yes", "y", "true", "x"]

def create_tile_for_node(resource, node_id, value):
    node = Node.objects.get(nodeid=node_id)

    tile = Tile.get_blank_tile_from_nodegroup_id(
        str(node.nodegroup_id),
        resourceid=str(resource.resourceinstanceid),
    )

    tile.data[node_id] = value
    tile.save()

    return tile


def is_uuid(value):
    try:
        UUID(clean_cell(value))
    except (TypeError, ValueError):
        return False

    return True


@lru_cache(maxsize=4096)
def get_concept_value_label(value_id):
    value_id = clean_cell(value_id)

    if not is_uuid(value_id):
        return ""

    value = (
        Value.objects.filter(valueid=value_id, valuetype_id="prefLabel")
        .order_by("language_id")
        .first()
    )

    return value.value if value else ""


def normalize_tile_value(value):
    if value is None:
        return ""
    if isinstance(value, bool):
        return "Yes" if value else ""
    if isinstance(value, list):
        labels = [normalize_tile_value(item) for item in value]
        return ", ".join(label for label in labels if label)
    if isinstance(value, dict):
        english_value = value.get("en")
        if isinstance(english_value, dict):
            return english_value.get("value", "")

        for language_value in value.values():
            if isinstance(language_value, dict) and language_value.get("value"):
                return language_value.get("value", "")

        return ""
    if isinstance(value, str):
        return get_concept_value_label(value) or value

    return value
