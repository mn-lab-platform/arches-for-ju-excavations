from collections import Counter, defaultdict
from contextlib import nullcontext
from uuid import UUID

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from arches.app.models.tile import Tile

from arches_slocal.utils.pottery.common import clean_cell
from arches_slocal.utils.pottery.concept_lookup import (
    apply_dictionary_alias,
    format_concept_tile_value,
    get_dictionary_node_ids,
    get_node_datatype,
    resolve_dictionary_value,
)
from arches_slocal.utils.pottery.constants import POTTERY_RECORD_TYPES


def is_uuid(value):
    try:
        UUID(clean_cell(value))
    except (TypeError, ValueError):
        return False

    return True


def extract_mappable_value(value):
    if value is None or value == "":
        return ""

    if isinstance(value, list):
        if len(value) == 1:
            return clean_cell(value[0])
        return ""

    if isinstance(value, dict):
        english_value = value.get("en")
        if isinstance(english_value, dict):
            return clean_cell(english_value.get("value"))

        for language_value in value.values():
            if isinstance(language_value, dict) and language_value.get("value"):
                return clean_cell(language_value.get("value"))

        return ""

    return clean_cell(value)


class Command(BaseCommand):
    help = "Dry-run/apply migration of pottery dictionary fields from strings to concept values."

    def add_arguments(self, parser):
        parser.add_argument(
            "--apply",
            action="store_true",
            default=False,
            help="Write mapped concept value IDs. Default is dry-run.",
        )
        parser.add_argument(
            "--record-type",
            choices=sorted(POTTERY_RECORD_TYPES.keys()),
            help="Limit migration to one pottery record type.",
        )
        parser.add_argument(
            "--limit",
            type=int,
            default=0,
            help="Limit processed tiles per field. 0 means no limit.",
        )
        parser.add_argument(
            "--verbose",
            action="store_true",
            default=False,
            help="Print every mapped or missing value.",
        )

    def handle(self, *args, **options):
        do_apply = options["apply"]
        record_type_filter = options.get("record_type")
        limit = options["limit"]
        verbose = options["verbose"]
        mode = "APPLY" if do_apply else "DRY-RUN"

        record_types = {
            record_type: record_config
            for record_type, record_config in POTTERY_RECORD_TYPES.items()
            if not record_type_filter or record_type == record_type_filter
        }

        invalid_nodes = []
        for record_type, record_config in record_types.items():
            for field, node_id in get_dictionary_node_ids(record_config).items():
                datatype = get_node_datatype(node_id)
                if datatype not in ("concept", "concept-list"):
                    invalid_nodes.append((record_type, field, node_id, datatype))

        if invalid_nodes:
            self.stdout.write("Dictionary nodes that are not concept/concept-list yet:")
            for record_type, field, node_id, datatype in invalid_nodes:
                self.stdout.write(f"  {record_type}.{field} {node_id} datatype={datatype}")

            if do_apply:
                raise CommandError(
                    "Refusing --apply while dictionary nodes are not concept/concept-list."
                )

            self.stdout.write("")

        self.stdout.write(f"Pottery dictionary migration [{mode}]")
        if limit:
            self.stdout.write(f"Limit per field: {limit}")
        self.stdout.write("")

        totals = defaultdict(int)
        missing_counter = Counter()
        to_update = []

        ctx = transaction.atomic() if do_apply else nullcontext()
        with ctx:
            for record_type, record_config in record_types.items():
                aliases = record_config.get("dictionary_aliases", {})
                dictionary_fields = record_config.get("dictionary_fields", {})
                node_ids = get_dictionary_node_ids(record_config)

                self.stdout.write(f"{record_config['label']} ({record_type})")

                for field, node_id in node_ids.items():
                    dictionary = dictionary_fields[field]
                    qs = Tile.objects.filter(
                        resourceinstance__graph_id=record_config["graph_id"],
                        data__has_key=node_id,
                    )

                    processed_for_field = 0

                    for tile in qs.iterator(chunk_size=200):
                        if limit and processed_for_field >= limit:
                            break

                        processed_for_field += 1
                        totals["processed"] += 1

                        data = tile.data or {}
                        raw_value = extract_mappable_value(data.get(node_id))

                        if not raw_value:
                            totals["empty"] += 1
                            continue

                        resolved_existing_value_id = resolve_dictionary_value(dictionary, raw_value)
                        if is_uuid(raw_value) and resolved_existing_value_id:
                            totals["already_concept"] += 1
                            continue

                        canonical_value = apply_dictionary_alias(field, raw_value, aliases)
                        value_id = resolve_dictionary_value(dictionary, canonical_value)

                        if not value_id:
                            totals["missing"] += 1
                            missing_counter[(record_type, field, dictionary, canonical_value)] += 1
                            if verbose:
                                self.stdout.write(
                                    f"  MISSING {field}: {canonical_value!r} in {dictionary}"
                                )
                            continue

                        totals["mapped"] += 1
                        if verbose:
                            self.stdout.write(
                                f"  MAP {field}: {raw_value!r} -> {canonical_value!r} -> {value_id}"
                            )

                        if do_apply:
                            data[node_id] = format_concept_tile_value(node_id, value_id)
                            tile.data = data
                            to_update.append(tile)

                            if len(to_update) >= 200:
                                Tile.objects.bulk_update(to_update, ["data"])
                                to_update = []

                    self.stdout.write(
                        f"  {field}: scanned={processed_for_field}"
                    )

            if to_update and do_apply:
                Tile.objects.bulk_update(to_update, ["data"])

        self.stdout.write("")
        self.stdout.write("Summary:")
        for key in ("processed", "mapped", "already_concept", "missing", "empty"):
            self.stdout.write(f"  {key}: {totals[key]}")

        if missing_counter:
            self.stdout.write("")
            self.stdout.write("Missing dictionary values:")
            for (record_type, field, dictionary, value), count in sorted(missing_counter.items()):
                self.stdout.write(
                    f"  {count}x {record_type}.{field} -> {dictionary}: {value!r}"
                )

        if not do_apply:
            self.stdout.write("")
            self.stdout.write("Dry-run only. Add --apply after graph datatypes are concept/concept-list.")

