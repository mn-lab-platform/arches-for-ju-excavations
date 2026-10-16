"""Import `(O) Architectural Detail` resources from the legacy CSV export.

The export stores the old resource UUID in its ``URL`` column.  This is used
as the stable import key, rather than ``ID``: four rows have no ID and one ID
is repeated.  Running the command again therefore cannot duplicate a row.
"""

from __future__ import annotations

import csv
import mimetypes
import re
from collections import Counter
from datetime import date
from functools import lru_cache
from pathlib import Path, PurePosixPath
from urllib.parse import unquote
from uuid import NAMESPACE_URL, UUID, uuid4, uuid5

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from arches.app.models.system_settings import settings
from arches.app.models.models import File, Node, Resource, Value
from arches.app.models.tile import Tile
from arches.app.utils.date_utils import ExtendedDateFormat
from arches_for_excavation.utils.pottery.common import clean_cell, ensure_tile_parent, localized_string
from arches_for_excavation.utils.pottery.concept_lookup import (
    normalize_dictionary_label,
    resolve_dictionary_value,
)


GRAPH_ID = "55b6e26e-2da2-44a2-bacd-744c38114a4d"
LEGACY_FORM_COMPLETE_NODE_ID = "7eef3b6c-04b2-11eb-8e13-af0a1b2352a7"
CHRONOLOGY_DICTIONARY = "chronology"
STATE_OF_PRESERVATION_DICTIONARY = "architectural details - state of preservation"
DEFAULT_SOURCE = "/arches_data/detale_popr_fixed.csv"
DATASET_PREFIX = "architectural-detail-csv"

NODE_IDS = {
    "ID": "59ffe98c-627c-47c0-9e41-ace7d6a8248c",
    "Legacy ID": "76d7225d-bdbe-4c01-b07d-b300e5caf5a4",
    "Legacy ID Description": "42692533-75f8-4bc6-b8b4-99b30753179f",
    "Author": "2fad8bdc-f7b1-4413-9c5f-34ce0f26f5d5",
    "Architectural Study Status": "6b3526a9-543e-4354-bbec-745f2ff64334",
    "Images": "62175f04-cd6b-4887-ae28-848e81ceb41f",
    "Style": "95d46c26-2246-4bef-b411-2a4ff0b78eba",
    "Type of Element": "06f9ebe0-4fab-41ac-b676-008baa33cb8e",
    "Component": "cfcd06a5-93b5-47fd-8383-affe1687306c",
    "Functional Type": "6f7c3f44-8b49-4e5d-8dcb-65eb63925434",
    "Material": "28be3589-3bc6-4030-bdbe-38ff236a1277",
    "Ornaments": "d5ae492e-43be-46ed-b36d-152cff4045a4",
    "State of preservation": "7edf7f38-6dac-49d4-aa77-d00642f6ad47",
    "Description": "23179fbb-6f77-4d53-9709-22a4098c49e4",
    "Analogies": "4f83520b-d8b7-4aa6-ad0c-a793607775c0",
    "Length/Width": "da5e7e83-b3e6-4196-8797-26c70233abda",
    "Height": "5b9a85bc-bd23-4540-bf6c-31bc980a64dc",
    "Depth": "ce6e5cd0-b55f-4da1-9149-82fab0d761a8",
    "Diameter max": "544dbd7c-6e02-4a60-b369-7e99d09f5ced",
    "Diameter min": "99ea6b18-20ad-4d55-8be7-d075f7e14e3c",
    "Stone Mark - Type": "bbee9ccc-5398-4439-883e-a855295b8f73",
    "Stone Mark - Description": "29e89f24-f4ad-4edc-a7fc-46c06fd342e0",
    "Period": "fa279198-95f7-404b-b5f4-6ae670ab17af",
    "Uncertain": "ea69bc64-b6c0-4ff2-a399-d11c462204ae",
    "Chronology - Comment": "d880c22e-6106-4d23-9346-eb42bbc670f1",
    "Date of the Study": "8625729b-b319-4b0e-a8b4-7440c5b85fbc",
    "Present Location - Area": "7e453be2-652d-4e4e-a77e-a8b103ca8bcf",
    "Present Location - Position": "17eab30a-2466-4172-9410-cabddaf60077",
    "Present Location - Comment": "8d3b8c93-0d55-40c5-a85f-ab64f902913a",
    "Find Location - Area": "027b6c70-4dbf-4d6a-8858-f54fa50bbf9a",
    "Find Location - Comment": "8468a30b-8780-4354-a60e-df43411a24eb",
    "Original Location - Comment": "5203f41d-d2a8-4239-98dc-923ecb3d800a",
    "Realated to": "dd8d4349-ac80-4be5-ac32-167183a9997a",
    "Related with": "91dcb760-ba5e-4fd0-9116-81dbd91aebd1",
    "Related With": "4b35ad04-7e4b-4f63-9d25-83130f0858bd",
    "Related with Resource": "f59c254c-58ef-4cf6-9821-a3b4635cfad2",
}

CONCEPT_FIELDS = {
    "Style": False,
    "Type of Element": True,
    "Component": True,
    "Functional Type": False,
    "Material": True,
    "Ornaments": True,
    "State of preservation": True,
    "Stone Mark - Type": False,
    "Period": True,
    "Present Location - Area": True,
    "Find Location - Area": True,
    "Realated to": True,
}
STRING_FIELDS = {
    "Legacy ID Description",
    "Description",
    "Analogies",
    "Stone Mark - Description",
    "Present Location - Comment",
    "Find Location - Comment",
}
NON_LOCALIZED_FIELDS = {"ID", "Legacy ID", "Author", "Original Location - Comment"}
NUMBER_FIELDS = {"Length/Width", "Height", "Depth", "Diameter max", "Diameter min"}
RELATION_FIELDS = {"Related with", "Related With", "Related with Resource"}
UUID_PATTERN = re.compile(r"[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}", re.IGNORECASE)
GEOMETRYCOLLECTION_PATTERN = re.compile(
    r"^(?:(?P<comment>.*?)\s*\|\s*)?GEOMETRYCOLLECTION\s*\((?P<points>.+)\)\s*$",
    re.IGNORECASE,
)
POINT_PATTERN = re.compile(
    r"POINT\s*\(\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s*\)",
    re.IGNORECASE,
)
STUDY_DATE_PATTERN = re.compile(r"^Date:\s*(\d{4}-\d{2}-\d{2})$", re.IGNORECASE)

PERIOD_RANGES = {
    normalize_dictionary_label("1st c. CE \u2013 2nd c. CE"): ("1st c. CE", "2nd c. CE"),
    normalize_dictionary_label("Late Hellenistic / Early Roman"): ("Late Hellenistic", "Early Roman"),
}


class Command(BaseCommand):
    help = "Import (O) Architectural Detail records from detale_popr_fixed.csv."

    def add_arguments(self, parser):
        parser.add_argument("--source", default=DEFAULT_SOURCE, help=f"Semicolon-delimited CSV (default: {DEFAULT_SOURCE}).")
        parser.add_argument("--apply", action="store_true", help="Create records. Without this flag the command validates only.")
        parser.add_argument("--update-existing", action="store_true", help="Also merge source values into resources previously created by this importer.")
        parser.add_argument(
            "--images-only",
            action="store_true",
            help="Repair only image metadata on existing imported resources, without indexing them.",
        )
        parser.add_argument("--allow-unknown-concepts", action="store_true", help="Skip unresolved concept labels instead of aborting before writing.")
        parser.add_argument("--dataset", default=DATASET_PREFIX, help="Prefix for stable resource legacy IDs.")

    def handle(self, *args, **options):
        source = Path(options["source"])
        if not source.is_file():
            raise CommandError(f"CSV file not found: {source}")

        self.allow_unknown_concepts = options["allow_unknown_concepts"]
        self.dataset = clean_cell(options["dataset"]) or DATASET_PREFIX
        self.unknown_concepts = Counter()
        rows = self._read_rows(source)
        self._validate_model()
        self.legacy_file_names = self._load_legacy_file_names(rows)
        prepared = [self._prepare_row(row, index + 2) for index, row in enumerate(rows)]
        legacy_resource_ids, legacy_statuses = self._legacy_form_complete_statuses(
            record["old_resource_id"] for record in prepared
        )
        for record in prepared:
            status = legacy_statuses.get(record["old_resource_id"])
            if status is not None:
                record["data"][NODE_IDS["Architectural Study Status"]] = status
        if options["verbosity"] >= 2:
            self.stdout.write("Legacy Is this form complete? values:")
            for record in prepared:
                status = legacy_statuses.get(record["old_resource_id"])
                rendered_status = "MISSING" if status is None else str(status).lower()
                self.stdout.write(
                    f"  row {record['row_number']}; ID {record['source_id'] or '-'}; "
                    f"UUID {record['old_resource_id']}; {rendered_status}"
                )

        if self.unknown_concepts and not self.allow_unknown_concepts:
            lines = ["Unresolved concept labels (no data was written):"]
            for (field, value), count in sorted(self.unknown_concepts.items()):
                lines.append(f"  {field}: {value!r} ({count} rows)")
            lines.append("Correct the model dictionaries, or rerun with --allow-unknown-concepts to omit only these values.")
            raise CommandError("\n".join(lines))

        keys = [record["key"] for record in prepared]
        existing = {
            resource.legacyid: resource
            for resource in Resource.objects.filter(graph_id=GRAPH_ID, legacyid__in=keys)
        }
        creates = [record for record in prepared if record["key"] not in existing]
        updates = [record for record in prepared if record["key"] in existing]

        if options["images_only"] and creates:
            raise CommandError(
                "--images-only can repair only existing imports; "
                f"{len(creates)} source records have not been imported yet."
            )

        self.stdout.write(f"Architectural Detail import [{'APPLY' if options['apply'] else 'DRY-RUN'}]")
        self.stdout.write(f"Source: {source}")
        self.stdout.write(f"Rows: {len(prepared)}; create: {len(creates)}; existing: {len(updates)}")
        self.stdout.write(
            "Legacy Architectural Detail v1: "
            f"resources found: {len(legacy_resource_ids)}/{len(prepared)}; "
            f"Is this form complete? found: {len(legacy_statuses)} "
            f"(true: {sum(legacy_statuses.values())}; false: {len(legacy_statuses) - sum(legacy_statuses.values())})"
        )
        if self.unknown_concepts:
            self.stdout.write(f"Unknown concept values skipped: {sum(self.unknown_concepts.values())}")

        if not options["apply"]:
            self.stdout.write("Dry-run only. Add --apply to create records.")
            return

        with transaction.atomic():
            resource_by_old_id = {
                record["old_resource_id"]: existing[record["key"]]
                for record in updates
            }
            for record in creates:
                resource = Resource.objects.create(graph_id=GRAPH_ID, legacyid=record["key"])
                resource_by_old_id[record["old_resource_id"]] = resource

            written = 0
            for record in prepared:
                resource = resource_by_old_id[record["old_resource_id"]]
                is_existing = record["key"] in existing
                if options["images_only"]:
                    written += self._save_images(resource, record)
                    continue
                if is_existing and not options["update_existing"]:
                    continue
                self._save_record(resource, record)
                written += 1

            # Relations can reference a resource which appears later in the CSV,
            # hence the separate second pass after every resource has been made.
            relation_writes = 0
            if not options["images_only"]:
                for record in prepared:
                    resource = resource_by_old_id[record["old_resource_id"]]
                    is_existing = record["key"] in existing
                    if is_existing and not options["update_existing"]:
                        continue
                    relation_writes += self._save_relations(resource, record, resource_by_old_id)

        self.stdout.write(f"Resources written: {written}; relation tiles written: {relation_writes}")

    @staticmethod
    def _read_rows(source):
        with source.open(encoding="utf-8-sig", newline="") as handle:
            reader = csv.DictReader(handle, delimiter=";")
            headers = set(reader.fieldnames or [])
            missing = set(NODE_IDS) - headers
            if missing:
                raise CommandError("CSV is missing columns: " + ", ".join(sorted(missing)))
            rows = list(reader)
        if not rows:
            raise CommandError("CSV has no data rows.")
        return rows

    @staticmethod
    def _validate_model():
        found = set(Node.objects.filter(graph_id=GRAPH_ID, nodeid__in=NODE_IDS.values()).values_list("nodeid", flat=True))
        missing = set(NODE_IDS.values()) - {str(node_id) for node_id in found}
        if missing:
            raise CommandError(
                "The (O) Architectural Detail graph is not loaded, or it differs from the supplied JSON. Missing node IDs: "
                + ", ".join(sorted(missing))
            )

    def _prepare_row(self, row, row_number):
        url = clean_cell(row["URL"])
        old_resource_id = self._uuid_from_text(url)
        if not old_resource_id:
            raise CommandError(f"Row {row_number}: URL must contain the legacy resource UUID.")

        data = {}
        for field in NON_LOCALIZED_FIELDS:
            if value := clean_cell(row[field]):
                data[NODE_IDS[field]] = value
        for field in STRING_FIELDS:
            if value := clean_cell(row[field]):
                data[NODE_IDS[field]] = localized_string(value)
        for field in NUMBER_FIELDS:
            if value := clean_cell(row[field]):
                data[NODE_IDS[field]] = self._number(value, field, row_number)
        # The CSV's Architectural Study Status column is corrupt (mostly blank,
        # with author names in two rows). Its real value is copied in one query
        # from the linked Architectural Detail v1 resource below.
        for field in ("Uncertain",):
            if value := clean_cell(row[field]):
                data[NODE_IDS[field]] = self._boolean(value, field, row_number)
        # Chronology requires Uncertain; a blank source cell means False.
        data.setdefault(NODE_IDS["Uncertain"], False)
        if images := clean_cell(row["Images"]):
            data[NODE_IDS["Images"]] = self._files(images, row_number)

        chronology_comment = clean_cell(row["Chronology - Comment"])
        study_date = self._study_date_from_comment(chronology_comment)
        if study_date:
            data[NODE_IDS["Date of the Study"]] = study_date
        elif chronology_comment:
            # Preserve the sole non-date legacy note (currently "Hellenistic")
            # instead of discarding meaningful chronology commentary.
            data[NODE_IDS["Chronology - Comment"]] = localized_string(chronology_comment)

        for field, is_multiple in CONCEPT_FIELDS.items():
            value_ids = self._concept_values(field, row[field], is_multiple)
            if value_ids:
                data[NODE_IDS[field]] = value_ids if is_multiple else value_ids[0]

        # In this legacy export coordinates are placed in ``Find Location -
        # Comment`` although the JSON model has a dedicated Position field.
        # Preserve non-WKT text as a comment; turn recognised WKT points into
        # the Arches GeoJSON feature collection expected by the map widget.
        find_location = clean_cell(row["Find Location - Comment"])
        if find_location:
            geometry, location_comment = self._geometry_and_comment(find_location)
            if geometry:
                data[NODE_IDS["Present Location - Position"]] = geometry
                if location_comment:
                    data[NODE_IDS["Find Location - Comment"]] = localized_string(location_comment)
                else:
                    data.pop(NODE_IDS["Find Location - Comment"], None)

        return {
            "key": f"{self.dataset}:{old_resource_id}",
            "old_resource_id": old_resource_id,
            "row_number": row_number,
            "source_id": clean_cell(row["ID"]),
            "data": data,
            "relations": {
                field: self._relation_ids(row[field])
                for field in RELATION_FIELDS
            },
        }

    def _concept_values(self, field, raw_value, is_multiple):
        if field == "Period":
            labels = self._period_labels(raw_value)
        elif is_multiple:
            labels = [clean_cell(value) for value in clean_cell(raw_value).split("|")]
        else:
            labels = [clean_cell(raw_value)]
        result = []
        for label in labels:
            if not label:
                continue
            value_id = self._concept_value(field, label)
            if value_id:
                result.append(value_id)
            else:
                self.unknown_concepts[(field, label)] += 1
        return list(dict.fromkeys(result))

    @staticmethod
    @lru_cache(maxsize=512)
    def _global_concept_value(label):
        normalized = normalize_dictionary_label(label)
        values = Value.objects.filter(valuetype_id__in=("prefLabel", "altLabel", "hiddenLabel")).select_related("concept")
        candidates = {}
        for value in values.iterator():
            if normalize_dictionary_label(value.value) != normalized:
                continue
            preferred = Value.objects.filter(concept_id=value.concept_id, valuetype_id="prefLabel").order_by("language_id").first()
            if preferred:
                candidates[str(preferred.valueid)] = preferred
        return next(iter(candidates), "") if len(candidates) == 1 else ""

    @staticmethod
    def _period_labels(raw_value):
        label = clean_cell(raw_value)
        return list(PERIOD_RANGES.get(normalize_dictionary_label(label), (label,)))

    @staticmethod
    def _study_date_from_comment(value):
        """Extract an ISO study date from the legacy ``Date: YYYY-MM-DD`` note."""
        match = STUDY_DATE_PATTERN.fullmatch(clean_cell(value))
        if not match:
            return ""
        raw_date = match.group(1)
        try:
            date.fromisoformat(raw_date)
        except ValueError as error:
            raise CommandError(f"Invalid study date in Chronology - Comment: {raw_date!r}.") from error
        return str(ExtendedDateFormat(raw_date).edtf)

    def _concept_value(self, field, label):
        if field == "Period":
            return resolve_dictionary_value(CHRONOLOGY_DICTIONARY, label)
        if field == "State of preservation":
            return resolve_dictionary_value(STATE_OF_PRESERVATION_DICTIONARY, label)
        return self._global_concept_value(label)

    @staticmethod
    def _number(value, field, row_number):
        try:
            number = float(value.replace(",", "."))
        except ValueError as error:
            raise CommandError(f"Row {row_number}: {field} must be numeric, got {value!r}.") from error
        return int(number) if number.is_integer() else number

    @staticmethod
    def _boolean(value, field, row_number):
        normalized = value.casefold()
        if normalized in {"1", "true", "yes", "y", "x"}:
            return True
        if normalized in {"0", "false", "no", "n"}:
            return False
        raise CommandError(f"Row {row_number}: {field} must be boolean, got {value!r}.")

    @classmethod
    def _legacy_form_complete_statuses(cls, resource_ids):
        resource_ids = set(resource_ids)
        found_resource_ids = {
            str(resource_id)
            for resource_id in Resource.objects.filter(resourceinstanceid__in=resource_ids).values_list(
                "resourceinstanceid", flat=True
            )
        }
        tile_rows = Tile.objects.filter(resourceinstance_id__in=resource_ids).values_list(
            "resourceinstance_id", "data"
        )
        return found_resource_ids, cls._statuses_from_legacy_tiles(tile_rows)

    @classmethod
    def _statuses_from_legacy_tiles(cls, tile_rows):
        statuses = {}
        for resource_id, data in tile_rows:
            resource_id = str(resource_id)
            data = data or {}
            value = data.get(LEGACY_FORM_COMPLETE_NODE_ID)
            if value is None:
                continue
            status = value if isinstance(value, bool) else cls._boolean(
                clean_cell(value), "Is this form complete?", resource_id
            )
            previous = statuses.get(resource_id)
            if previous is not None and previous != status:
                raise CommandError(
                    f"Legacy resource {resource_id} has conflicting Is this form complete? values."
                )
            statuses[resource_id] = status
        return statuses

    @staticmethod
    def _url(value):
        # Arches' URL datatype stores an optionally labelled hyperlink as an
        # object. A bare string fails when the datatype indexes or renders it.
        return {"url": value, "url_label": ""}

    @staticmethod
    def _referenced_legacy_file_ids(rows):
        file_ids = set()
        for row in rows:
            for url in (clean_cell(value) for value in clean_cell(row["Images"]).split("|")):
                path = url.split("?", 1)[0].split("#", 1)[0]
                file_match = UUID_PATTERN.fullmatch(path.removeprefix("/files/"))
                if file_match and path.startswith("/files/"):
                    file_ids.add(str(UUID(file_match.group(0))))
        return file_ids

    @classmethod
    def _load_legacy_file_names(cls, rows):
        file_ids = cls._referenced_legacy_file_ids(rows)
        file_names = {
            str(file_id): PurePosixPath(unquote(str(path))).name
            for file_id, path in File.objects.filter(fileid__in=file_ids).values_list("fileid", "path")
        }
        missing = sorted(file_ids - set(file_names))
        if missing:
            preview = ", ".join(missing[:10])
            suffix = "" if len(missing) <= 10 else f" (and {len(missing) - 10} more)"
            raise CommandError(f"Legacy image File records are missing: {preview}{suffix}")
        return file_names

    def _files(self, raw_value, row_number):
        files = []
        for url in (clean_cell(value) for value in raw_value.split("|")):
            if not url:
                continue
            path = url.split("?", 1)[0].split("#", 1)[0]
            file_match = UUID_PATTERN.fullmatch(path.removeprefix("/files/"))
            if file_match and path.startswith("/files/"):
                # Clone the legacy File reference under a stable ID. A File
                # belongs to one tile, so reusing its old ID would detach it
                # from the legacy resource when Arches saves the new tile.
                legacy_file_id = str(UUID(file_match.group(0)))
                name = self.legacy_file_names[legacy_file_id]
                file_id = str(uuid5(NAMESPACE_URL, f"{row_number}:{legacy_file_id}"))
                file_url = f"{settings.MEDIA_URL}{file_id}"
            elif path.startswith("/files/uploadedfiles/"):
                # Arches accepts only MEDIA_URL + UUID in a file-list tile.
                name = PurePosixPath(unquote(path)).name
                if not name:
                    raise CommandError(f"Row {row_number}: image URL has no filename: {url!r}.")
                file_id = str(uuid5(NAMESPACE_URL, f"{row_number}:{path}"))
                file_url = f"{settings.MEDIA_URL}{file_id}"
            else:
                raise CommandError(f"Row {row_number}: unsupported image URL {url!r}.")

            mime_type = mimetypes.guess_type(name)[0] or "application/octet-stream"
            files.append(
                {
                    "accepted": mime_type.startswith("image/"),
                    "file_id": file_id,
                    "name": name,
                    "status": "uploaded",
                    "type": mime_type,
                    "url": file_url,
                }
            )
        return files

    @staticmethod
    def _geometry_and_comment(value):
        match = GEOMETRYCOLLECTION_PATTERN.match(value)
        if not match:
            return None, value
        points = [
            [float(longitude), float(latitude)]
            for longitude, latitude in POINT_PATTERN.findall(match.group("points"))
        ]
        if not points:
            return None, value
        return {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {"type": "Point", "coordinates": point},
                }
                for point in points
            ],
        }, clean_cell(match.group("comment"))

    @staticmethod
    def _uuid_from_text(value):
        match = UUID_PATTERN.search(value)
        if not match:
            return ""
        return str(UUID(match.group(0)))

    def _relation_ids(self, value):
        result = []
        for candidate in UUID_PATTERN.findall(clean_cell(value)):
            source_id = str(UUID(candidate))
            if source_id not in result:
                result.append(source_id)
        return result

    def _save_record(self, resource, record):
        for nodegroup_id, data in self._group_data(record["data"]).items():
            self._save_tile(resource, nodegroup_id, data)
        resource.name = record["source_id"] or f"Architectural Detail {record['row_number'] - 1}"
        resource.save(update_fields=["name"])

    def _save_images(self, resource, record):
        image_node_id = NODE_IDS["Images"]
        if image_node_id not in record["data"]:
            return 0
        node = Node.objects.get(nodeid=image_node_id)
        self._save_tile(
            resource,
            str(node.nodegroup_id),
            {image_node_id: record["data"][image_node_id]},
            index=False,
        )
        return 1

    def _save_relations(self, resource, record, resource_by_old_id):
        written = 0
        for field, source_ids in record["relations"].items():
            if not source_ids:
                continue
            unresolved = [source_id for source_id in source_ids if source_id not in resource_by_old_id]
            if unresolved:
                raise CommandError(
                    f"Row {record['row_number']}: relation references resources outside this CSV: {', '.join(unresolved)}"
                )
            relations = [self._relation(resource_by_old_id[source_id]) for source_id in source_ids]
            node = Node.objects.get(nodeid=NODE_IDS[field])
            self._save_tile(resource, str(node.nodegroup_id), {NODE_IDS[field]: relations})
            written += 1
        return written

    @staticmethod
    def _group_data(data):
        grouped = {}
        nodegroups = {
            str(node.nodeid): str(node.nodegroup_id)
            for node in Node.objects.filter(nodeid__in=data)
        }
        for node_id, value in data.items():
            grouped.setdefault(nodegroups[node_id], {})[node_id] = value
        return grouped

    @staticmethod
    def _save_tile(resource, nodegroup_id, data, index=True):
        node = Node.objects.get(nodeid=next(iter(data)))
        tile = Tile.objects.filter(resourceinstance_id=resource.resourceinstanceid, nodegroup_id=nodegroup_id).first()
        if tile is None:
            tile = Tile.get_blank_tile_from_nodegroup_id(nodegroup_id, resourceid=str(resource.resourceinstanceid))
        ensure_tile_parent(resource, tile, node)
        tile.data = dict(tile.data or {})
        tile.data.update(data)
        tile.save(index=index)

    @staticmethod
    def _relation(resource):
        return {
            "resourceId": str(resource.resourceinstanceid),
            "ontologyProperty": "",
            "inverseOntologyProperty": "",
            "resourceXresourceId": str(uuid4()),
        }
