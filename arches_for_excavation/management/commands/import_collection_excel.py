"""Import the simplified Pottery Collection workbook without the web workflow."""

import json
import re
from collections import Counter
from pathlib import Path
from uuid import UUID, uuid4

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from openpyxl import load_workbook
import requests

from arches.app.models.models import Node, Resource, TileModel, Value
from arches.app.models.tile import Tile
from arches.app.utils.date_utils import ExtendedDateFormat
from arches_for_excavation.utils.pottery.common import clean_cell, localized_string, to_boolean
from arches_for_excavation.utils.pottery.concept_lookup import (
    get_dictionary_index,
    normalize_dictionary_label,
    resolve_dictionary_value,
)
from arches_for_excavation.utils.pottery.constants import POTTERY_DICTIONARY_CHRONOLOGY
from arches_for_excavation.functions.chronology_expantion import (
    extract_pac_qid,
    fetch_period_dates,
    select_chronology_boundaries,
)


POTTERY_GRAPH_ID = "32a4c0b9-ab8c-47a0-a42f-99cd3ad392fe"
CONTEXT_GRAPH_ID = "2c536779-d3e6-43ef-bc0c-cd4d97dc8c6c"
CONTEXT_NUMBER_NODE_ID = "cf7f2532-74f3-487f-9261-bf27825fe04c"
TRENCH_GRAPH_ID = "cc91f1ff-6ea8-422c-be14-b818660f66f8"
CONTEXT_TRENCH_NODE_ID = "13e52ba6-b14d-41de-9a09-8bd1186edc10"
TRENCH_NAME_NODE_ID = "a9aff43e-0e89-4ea6-bd3d-1b56a6d756db"

# Both MAL and PAP source context identifiers end with the local Context
# Number, for example ``MAL-TT-X-1029`` and ``PAP-T-II-2111``. PAP is a
# valid excavation-area prefix, not a marker for missing data.
IGNORED_CONTEXT_PREFIXES = ("UNKNOWN-",)

# Root cards
CONTEXT_NODEGROUP_ID = "622addb9-60c1-498c-ab40-bef9ded91f2f"
CONTEXT_NODE_ID = "622addb9-60c1-498c-ab40-bef9ded91f2f"
ARCHAEOLOGICAL_REMAINS_NODE_ID = "6b77bb10-1d42-445f-bbc6-dc2e5db3f129"
SPECIAL_FINDS_NODE_ID = "e912a3bd-dfa8-485a-9a8b-0ed952aafbd9"
CONTEXT_REMARKS_NODE_ID = "150f3e4b-b190-4f35-9379-ee9a8281d4dc"
FORM_ID_NODEGROUP_ID = "25e31613-69ac-45ce-a6db-a15239de70a4"
FORM_ID_NODE_ID = "25e31613-69ac-45ce-a6db-a15239de70a4"
LAST_SHRED_NODEGROUP_ID = "51618119-e3a6-4bcb-bb93-ce2987f7ac56"
LAST_SHRED_NODE_ID = "51618119-e3a6-4bcb-bb93-ce2987f7ac56"

# General Context Chronology card
CONTEXT_CHRONOLOGY_NODEGROUP_ID = "c6e7b936-3a60-4b5e-a557-4b5f02c5a4cf"
CONTEXT_PERIOD_NODE_ID = "bdad4eee-bae5-4aaa-b2ae-4bf646f0abd5"
CONTEXT_CHRONOLOGY_COMMENT_NODE_ID = "84412f01-f54b-4cf1-8008-f627d3dccd3c"
CONTEXT_UNCERTAIN_NODE_ID = "bf2e13d5-0081-458f-bb64-b4c61ba4face"
CONTEXT_CHRONOLOGY_DATE_NODE_IDS = (
    "e7f52189-ccea-4bce-9744-9fb3b1fbbc9e",  # Earliest date
    "d9c31b43-00c2-4e3e-9fd1-53b3034b816e",  # Latest start date
    "92c0e019-b754-4385-95af-e2765cbfcdf4",  # Earliest end date
    "df592091-2a08-468a-b2b3-801bcc4bbeeb",  # Latest date
)

# Repeating Pottery Fragments card and nested chronology card
FRAGMENT_NODEGROUP_ID = "8f7a5ca4-9c49-405d-9a08-a8debb13a9ec"
POTTERY_TYPE_NODE_ID = "3bc235a3-2240-4e94-b8af-f4c70ee13af0"
DIAGNOSTIC_NODE_ID = "99affc33-fc6e-4fee-9ac4-e2d4f13087cc"
UNDIAGNOSTIC_NODE_ID = "edecb9f5-4b8e-4d6f-890b-76f8a3521b41"
NO_MATERIAL_NODE_ID = "3d57d956-38a5-4982-a0f6-d8fb388e1cb9"
CONTAINS_SPECIAL_FINDS_NODE_ID = "f0930ca8-a24f-458c-a27e-463601ca574a"
CATEGORY_REMARKS_NODE_ID = "3c371503-9028-464a-8b85-53a43c853781"
FINDS_REMARKS_NODE_ID = "0e3b3752-772b-427c-bd0e-95ccfc223eca"
CATEGORY_CHRONOLOGY_NODEGROUP_ID = "13c63c03-ffc3-455a-a1ce-23082b4111e8"
CATEGORY_PERIOD_NODE_ID = "ab05ac4b-4fd8-4eb9-9549-9d4a2a86893c"
CATEGORY_CHRONOLOGY_COMMENT_NODE_ID = "c2caa4cb-ab3e-4619-808a-b2a0ff4084d6"
CATEGORY_UNCERTAIN_NODE_ID = "ca337aae-aa58-4f47-8811-c1f994252fdf"
CATEGORY_CHRONOLOGY_DATE_NODE_IDS = (
    "7cdc9d21-03ca-4721-a696-9c5410949a68",  # Earliest date
    "2d982bc1-1e21-49dd-b942-a068a4fa645f",  # Latest start date
    "82c3a276-fd67-4ce0-b0f4-eda4026c679c",  # Earliest end date
    "1e59afd0-42aa-421a-85fe-1e0b72da6ca7",  # Latest date
)

CHRONOLOGY_DATE_FIELDS = (
    "earliest_date",
    "latest_start_date",
    "earliest_end_date",
    "latest_date",
)

CHRONOLOGY_REPAIR_MAPPINGS = {
    CONTEXT_CHRONOLOGY_NODEGROUP_ID: {
        "period_node": CONTEXT_PERIOD_NODE_ID,
        "date_nodes": dict(zip(CHRONOLOGY_DATE_FIELDS, CONTEXT_CHRONOLOGY_DATE_NODE_IDS)),
    },
    CATEGORY_CHRONOLOGY_NODEGROUP_ID: {
        "period_node": CATEGORY_PERIOD_NODE_ID,
        "date_nodes": dict(zip(CHRONOLOGY_DATE_FIELDS, CATEGORY_CHRONOLOGY_DATE_NODE_IDS)),
    },
}

# Find values are descendants of the Archaeological Remains concept in Trench Parameters New.
# Resolve by label because the Arches UUID differs between databases.
FINDS_DICTIONARY_ID = "faec3494-d274-3f73-a830-aa24accfa244"
PAC_ENTITY_URL = "https://thesaurus.mn.cenagis.edu.pl/entity/"
THESAURUS_ENTITY_URL = "https://thesaurus.mn.cenagis.edu.pl/entity/"

# Other_* columns are ignored until their data msdaodel is agreed.
CATEGORY_TYPES = {
    "PI": "Q928",
    "P": "Q929",
    "A": "Q969",
    "KW": "Q970",
    "PW": "Q938",
    "SV": "Q971",
    "TW": "Q937",
    "U": "Q972",
    "L": "Q697",
}

# Source workbook labels mapped to the preferred labels in Trench Parameters.
FIND_VALUE_LABELS = {
    "bones": "bone (B)",
    "shells": "shell (SH)",
    "plasters": "plaster (Pl)",
    "glass": "glass (G)",
    "tiles": "tile (T)",
    "stones": "stone (ST)",
    "pipes": "pipe (PP)",
    "metals": "metal (M)",
    "varia": "varia (V)",
    "coins": "coin (C)",
}


CHRONOLOGY_ABBREVIATIONS = {
    "LCL": "Late Classical",
    "LH": "Late Hellenistic",
    "EH": "Early Hellenistic",
    "MH": "Middle Hellenistic",
    "ER": "Early Roman",
}


# Explicit decisions for the values found in 17_08_Main_popr.xlsx.  Keep
# this table before the generic parser: each source value is archaeological
# data, so a reviewed decision must win over heuristic interpretation.
CHRONOLOGY_VALUE_MAPPINGS = {
    "1st c. bc": ("1st c. BCE",),
    "1st ad": ("1st c. CE",),
    "early 1st c. ce": ("1st c. CE",),
    "until 1st c. bc": ("1st c. BCE",),
    "1st 2nd c. ce": ("1st c. CE", "2nd c. CE"),
    "1st 2nd ce": ("1st c. CE", "2nd c. CE"),
    "1st ce": ("1st c. CE",),
    "2nd bc": ("2nd c. BCE",),
    "2nd c. bc": ("2nd c. BCE",),
    "3rd 1st bc": ("3rd c. BCE", "2nd c. BCE", "1st c. BCE"),
    "3rd 2nd c bc": ("3rd c. BCE", "2nd c. BCE"),
    "3rd 2nd c. bc": ("3rd c. BCE", "2nd c. BCE"),
    "5th c. ad": ("5th c. CE",),
    "e h": ("Early Hellenistic",),
    "early 1st ce": ("1st c. CE",),
    # Reviewed source combinations from the detailed pottery sheets. These
    # are lists of their existing individual chronology concepts, not new
    # transition concepts.
    "early hellenistic / middle hellenistic": (
        "Early Hellenistic", "Middle Hellenistic",
    ),
    "early roman / late hellenistic": (
        "Early Roman", "Late Hellenistic",
    ),
    "early roman / late roman": ("Early Roman", "Late Roman"),
    "early roman / middle roman": ("Early Roman", "Middle Roman"),
    "lh late roman": ("Late Hellenistic", "Late Roman"),
    "late hellenistic / early roman / late roman": (
        "Late Hellenistic", "Early Roman", "Late Roman",
    ),
    "late hellenistic / early hellenistic": ("Middle Hellenistic",),
    "late hellenistic / middle hellenistic": (
        "Late Hellenistic", "Middle Hellenistic",
    ),
    # This source abbreviation is ambiguous, but the reviewed decision is
    # Medieval.  Do not let the generic parser reinterpret it.
    "m": ("Medieval",),
    "m h": ("Middle Hellenistic",),
    "middle hellenistic / early roman": (
        "Middle Hellenistic", "Early Roman",
    ),
    "middle roman / early roman": ("Middle Roman", "Early Roman"),
    "mid 1st bc": ("1st c. BCE",),
    "mixed": ("Unknown",),
    "top": ("Unknown",),
    "until 1st bc": ("1st c. BCE",),
    "with late roman": ("Late Roman",),
}


CENTURY_ERA_ALIASES = {
    "AD": "CE",
    "CE": "CE",
    "BC": "BCE",
    "BCE": "BCE",
}


ROMAN_CENTURIES = {
    "I": 1,
    "II": 2,
    "III": 3,
    "IV": 4,
    "V": 5,
    "VI": 6,
    "VII": 7,
    "VIII": 8,
    "IX": 9,
    "X": 10,
}


THIRD_SECOND_BCE_TRANSITION_PATTERN = re.compile(
    r"^3(?:rd)?\s*(?:c(?:entury)?)?\s*(?:bc|bce)?\s*/\s*"
    r"2(?:nd)?\s*(?:c(?:entury)?)?\s*(?:bc|bce)\s*\??$",
    flags=re.IGNORECASE,
)

# Late quarter of the 3rd c. BCE followed by the early quarter of the 2nd
# c. BCE. EDTF uses astronomical year numbering: -224 is 225 BCE and -175 is
# 176 BCE, giving exactly 25 years from each century.
THIRD_SECOND_BCE_TRANSITION_BOUNDARIES = (-224, -175)

CHRONOLOGY_COMMENT_ONLY_VALUES = frozenset({
    "h / early roman late roman",
})


def cell_number(value):
    raw = clean_cell(value)
    if not raw:
        return None
    try:
        number = float(raw)
    except ValueError:
        return None
    return int(number) if number.is_integer() else number


def normalize_source_context(value):
    """Normalize separators, including the compact ``PAP-TTX`` form.

    Some source workbooks omit the separator between the ``T``/``TT`` trench
    marker and its Roman numeral, e.g. ``PAP-TTX-951``. Expand that form so
    it follows the canonical source syntax used by :meth:`_source_trench_name`.
    """
    context = re.sub(r"\s*[_-]\s*", "-", clean_cell(value).upper())
    return re.sub(
        r"^(PAP|MAL)-(TT|T)([IVXLCDM]+)-((?:C)?\d+)$",
        r"\1-\2-\3-\4",
        context,
    )


class SkipRow(Exception):
    """A source row intentionally excluded from this importer."""


class Command(BaseCommand):
    help = "Import simplified Pottery Collection Excel rows without the web workflow."

    def add_arguments(self, parser):
        parser.add_argument("--file", required=True, help="Path to the .xlsx file inside the Arches container.")
        parser.add_argument("--context-resource-id", help="Optional fixed (O) Context resource UUID for every workbook row.")
        parser.add_argument("--context-map", help="Optional JSON map from Excel Context values to (O) Context resource UUIDs.")
        parser.add_argument(
            "--create-missing-contexts",
            action="store_true",
            help="Create a minimal (O) Context linked to its full PAP/MAL Trench when it is missing.",
        )
        parser.add_argument("--apply", action="store_true", help="Create resources. Without this flag the command only validates the workbook.")
        parser.add_argument(
            "--repair-comment-only-periods",
            action="store_true",
            help=(
                "Repair reviewed comment-only chronology in existing Form_ID "
                "resources (requires --apply)."
            ),
        )
        parser.add_argument(
            "--repair-chronology",
            action="store_true",
            help=(
                "Verify chronology boundaries in all existing Pottery Collection "
                "tiles against PAC and repair missing or inconsistent dates "
                "(requires --apply)."
            ),
        )
        parser.add_argument("--sheet", help="Optional workbook sheet name. Defaults to the first sheet.")

    def handle(self, *args, **options):
        self.apply = options["apply"]
        self.repair_comment_only_periods = options["repair_comment_only_periods"]
        self.repair_chronology_enabled = options["repair_chronology"]
        self.context_resource_id = options.get("context_resource_id")
        self.context_map = self._load_context_map(options.get("context_map"))
        self.create_missing_contexts = options["create_missing_contexts"]
        self.created_contexts = {}
        self.trench_resource_ids = None
        if self.context_resource_id and self.context_map:
            raise CommandError("Use either --context-resource-id or --context-map, not both.")
        if self.repair_comment_only_periods and not self.apply:
            raise CommandError("--repair-comment-only-periods requires --apply.")
        if self.repair_chronology_enabled and not self.apply:
            raise CommandError("--repair-chronology requires --apply.")

        workbook_path = Path(options["file"])
        if not workbook_path.is_file():
            raise CommandError(f"Workbook not found: {workbook_path}")

        workbook = load_workbook(workbook_path, read_only=True, data_only=True)
        sheet = workbook[options["sheet"]] if options.get("sheet") else workbook.active
        rows = self._read_rows(sheet)
        self.stdout.write(f"Simplified Pottery import [{'APPLY' if self.apply else 'DRY-RUN'}]")
        self.stdout.write(f"Workbook: {workbook_path.name}; sheet: {sheet.title}; rows: {len(rows)}")

        totals = Counter()
        for row_number, row in rows:
            try:
                if self.apply:
                    with transaction.atomic():
                        report = self._validate_row(row_number, row)
                        resource_id = self._create_resource(row, report)
                    self.stdout.write(f"  row {row_number}: created {resource_id}")
                else:
                    report = self._validate_row(row_number, row)
                    self.stdout.write(
                        f"  row {row_number}: would create "
                        f"{'one Context and ' if report['totals']['contexts_created'] else ''}"
                        f"one collection, "
                        f"{report['totals']['fragments']} fragment(s)"
                    )
                totals.update(report["totals"])
                totals["rows_ok"] += 1
            except SkipRow as reason:
                totals["rows_skipped"] += 1
                repaired = 0
                if self.repair_comment_only_periods:
                    with transaction.atomic():
                        repaired = self._repair_existing_comment_only_periods(row)
                    totals["comment_only_periods_repaired"] += repaired
                repair_text = (
                    f"; repaired {repaired} comment-only period(s)"
                    if repaired
                    else ""
                )
                self.stdout.write(
                    f"  row {row_number}: skipped ({reason}){repair_text}"
                )
            except CommandError as error:
                totals["rows_error"] += 1
                self.stderr.write(self.style.ERROR(f"  row {row_number}: {error}"))

        if self.repair_chronology_enabled:
            totals.update(self._repair_chronology_tiles())

        self.stdout.write("Summary:")
        for key in (
            "rows_ok",
            "rows_skipped",
            "rows_error",
            "collections",
            "contexts_created",
            "fragments",
            "unknown_find_values",
            "unknown_chronology_values",
            "comment_only_periods_repaired",
            "chronology_periods_checked",
            "chronology_periods_failed",
            "chronology_tiles_checked",
            "chronology_tiles_ok",
            "chronology_tiles_repaired",
            "chronology_tiles_failed",
            "chronology_tiles_without_period",
        ):
            self.stdout.write(f"  {key}: {totals[key]}")
        if not self.apply:
            self.stdout.write("Dry-run only. Run again with --apply after reviewing the result.")

    @staticmethod
    def _is_marked_red(cell):
        """Return whether the source cell carries the pink 'remove' marker."""
        color = cell.fill.fgColor
        return color.type == "rgb" and (color.rgb or "").upper().endswith("FFB6C1")

    @classmethod
    def _read_rows(cls, sheet):
        header_cells = next(sheet.iter_rows(min_row=1, max_row=1, values_only=False))
        headers = [clean_cell(cell.value) for cell in header_cells]
        required = {"Form_ID", "Context"}
        missing = required - set(headers)
        if missing:
            raise CommandError(f"Missing required column(s): {', '.join(sorted(missing))}")

        rows = []
        context_index = headers.index("Context")
        for row_number, cells in enumerate(sheet.iter_rows(min_row=2, values_only=False), start=2):
            values = [cell.value for cell in cells]
            row = dict(zip(headers, values))
            row["_skip_red_context"] = cls._is_marked_red(cells[context_index])
            if any(clean_cell(value) for value in values):
                rows.append((row_number, row))
        return rows

    def _load_context_map(self, context_map_path):
        if not context_map_path:
            return {}
        path = Path(context_map_path)
        if not path.is_file():
            raise CommandError(f"Context map not found: {path}")
        try:
            mapping = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as error:
            raise CommandError(f"Invalid context map JSON: {error}") from error
        if not isinstance(mapping, dict):
            raise CommandError("Context map must be a JSON object: {\"Excel Context\": \"Arches UUID\"}.")
        return {clean_cell(key): clean_cell(value) for key, value in mapping.items()}

    def _context_for_row(self, row):
        raw_context = clean_cell(row.get("Context"))
        excel_context = normalize_source_context(raw_context)
        if row.get("_skip_red_context"):
            raise SkipRow(f"Context {excel_context!r} is marked red")
        if excel_context.upper().startswith(IGNORED_CONTEXT_PREFIXES):
            raise SkipRow(f"Context {excel_context!r} is excluded")

        resource_id = (
            (self.context_map.get(raw_context) or self.context_map.get(excel_context))
            if self.context_map else self.context_resource_id
        )
        if resource_id:
            return self._get_context_resource(resource_id)

        # Older imports used identifiers such as ``...-C1029``. The current
        # ceramics sheets use ``...-1029`` instead. In both formats the
        # terminal number is the (O) Context Number.
        match = re.search(r"-(?:C)?(\d+)$", excel_context.replace("_", "-"), flags=re.IGNORECASE)
        if not match:
            raise SkipRow(f"cannot derive Context Number from {excel_context!r}")

        context_number = int(match.group(1))
        context_ids = list(
            TileModel.objects.filter(
                resourceinstance__graph_id=CONTEXT_GRAPH_ID,
                data__contains={CONTEXT_NUMBER_NODE_ID: context_number},
            )
            .values_list("resourceinstance_id", flat=True)
            .distinct()
        )
        trench_name = self._source_trench_name(excel_context)
        matching_ids = self._context_ids_in_trench(context_ids, trench_name)
        if len(matching_ids) == 1:
            return Resource.objects.get(resourceinstanceid=matching_ids[0])
        if len(matching_ids) > 1:
            raise CommandError(
                f"more than one local Context {context_number} belongs to {trench_name}"
            )
        if not self.create_missing_contexts:
            if context_ids:
                raise SkipRow(f"no local Context {context_number} belongs to its Trench")
            raise SkipRow(f"no local Context with Context Number {context_number}")
        return self._create_missing_context(excel_context, context_number)

    @staticmethod
    def _source_trench_name(excel_context):
        match = re.match(
            r"^(PAP|MAL)-(TT|T)-([A-Z0-9]+)-(?:C)?\d+$",
            excel_context.upper().replace("_", "-"),
        )
        if not match:
            raise SkipRow(
                f"cannot derive Trench from Context {excel_context!r}"
            )
        # PAP_TT_X and MAL_TT_X are distinct Trench resources. Do not
        # collapse the excavation-area prefix: matching just TT_X could join
        # a source row to a Context from the other area.
        return f"{match.group(1)}_{match.group(2)}_{match.group(3)}"

    def _trench_resources(self):
        if self.trench_resource_ids is not None:
            return self.trench_resource_ids
        trenches = {}
        tiles = (
            TileModel.objects.filter(
                resourceinstance__graph_id=TRENCH_GRAPH_ID,
                data__has_key=TRENCH_NAME_NODE_ID,
            )
            .values_list("resourceinstance_id", "data")
        )
        for resource_id, data in tiles:
            trench_name = clean_cell((data or {}).get(TRENCH_NAME_NODE_ID)).upper()
            if not trench_name:
                continue
            if trench_name in trenches and trenches[trench_name] != str(resource_id):
                raise CommandError(f"more than one local Trench named {trench_name!r}")
            trenches[trench_name] = str(resource_id)
        self.trench_resource_ids = trenches
        return trenches

    def _context_ids_in_trench(self, context_ids, trench_name):
        trench_resource_id = self._trench_resources().get(trench_name)
        if not trench_resource_id:
            return []
        matches = []
        tiles = (
            TileModel.objects.filter(
                resourceinstance_id__in=context_ids,
                data__has_key=CONTEXT_TRENCH_NODE_ID,
            )
            .values_list("resourceinstance_id", "data")
        )
        for resource_id, data in tiles:
            relations = (data or {}).get(CONTEXT_TRENCH_NODE_ID) or []
            if any(
                isinstance(relation, dict)
                and str(relation.get("resourceId")) == trench_resource_id
                for relation in relations
            ):
                matches.append(resource_id)
        return matches

    def _create_missing_context(self, excel_context, context_number):
        trench_name = self._source_trench_name(excel_context)
        cache_key = (trench_name, context_number)
        if cache_key in self.created_contexts:
            context = self.created_contexts[cache_key]
            context._created_by_pottery_import = False
            return context
        trench_resource_id = self._trench_resources().get(trench_name)
        if not trench_resource_id:
            raise SkipRow(f"no local Trench named {trench_name!r}")
        if self.apply:
            context = Resource.objects.create(graph_id=CONTEXT_GRAPH_ID)
            number_node = Node.objects.get(nodeid=CONTEXT_NUMBER_NODE_ID)
            trench_node = Node.objects.get(nodeid=CONTEXT_TRENCH_NODE_ID)
            self._save_tile(
                context, str(number_node.nodegroup_id),
                {CONTEXT_NUMBER_NODE_ID: context_number},
            )
            self._save_tile(
                context, str(trench_node.nodegroup_id),
                {CONTEXT_TRENCH_NODE_ID: [{
                    "resourceId": trench_resource_id,
                    "ontologyProperty": "",
                    "inverseOntologyProperty": "",
                    "resourceXresourceId": str(uuid4()),
                }]},
            )
        else:
            context = Resource(graph_id=CONTEXT_GRAPH_ID)
        context._created_by_pottery_import = True
        self.created_contexts[cache_key] = context
        return context


    @staticmethod
    def _get_context_resource(resource_id):
        try:
            context = Resource.objects.get(resourceinstanceid=UUID(resource_id))
        except (Resource.DoesNotExist, ValueError) as error:
            raise CommandError(f"Context resource does not exist: {resource_id}") from error
        if str(context.graph_id) != CONTEXT_GRAPH_ID:
            raise CommandError(f"Resource {resource_id} is not an (O) Context resource.")
        return context

    @staticmethod
    def _pac_value_id(qid):
        values = Value.objects.filter(
            concept__legacyoid__in=(
                f"{PAC_ENTITY_URL}{qid}",
                f"{THESAURUS_ENTITY_URL}{qid}",
            ),
            valuetype_id="prefLabel",
        ).order_by("language_id")
        english = values.filter(language_id="en").first()
        value = english or values.first()
        if value is None:
            raise CommandError(f"No local Arches value found for PAC {qid}.")
        return str(value.valueid)

    @staticmethod
    def _collection_exists(form_id):
        """Keep repeated --apply runs from creating duplicate collections."""
        return TileModel.objects.filter(
            resourceinstance__graph_id=POTTERY_GRAPH_ID,
            data__contains={FORM_ID_NODE_ID: form_id},
        ).exists()

    @staticmethod
    def _collection_resource_id(form_id):
        form_tile = TileModel.objects.filter(
            resourceinstance__graph_id=POTTERY_GRAPH_ID,
            data__contains={FORM_ID_NODE_ID: form_id},
        ).only("resourceinstance_id").first()
        return str(form_tile.resourceinstance_id) if form_tile else ""

    @staticmethod
    def _upsert_comment_only_chronology(
        resource_id,
        parent_tile,
        nodegroup_id,
        period_node_id,
        date_node_ids,
        comment_node_id,
        uncertain_node_id,
        comment,
        uncertain,
    ):
        tile = Tile.objects.filter(
            resourceinstance_id=resource_id,
            nodegroup_id=nodegroup_id,
            parenttile_id=parent_tile.tileid,
        ).first()
        is_new = tile is None
        if is_new:
            tile = Tile.get_blank_tile_from_nodegroup_id(
                nodegroup_id,
                resourceid=resource_id,
            )
            tile.parenttile = parent_tile

        before = dict(tile.data or {})
        data = dict(before)
        data.pop(period_node_id, None)
        for node_id in date_node_ids:
            data.pop(node_id, None)
        data[comment_node_id] = localized_string(comment)
        data[uncertain_node_id] = uncertain
        if not is_new and data == before:
            return 0

        tile.data = data
        tile.save()
        return 1

    def _repair_existing_comment_only_periods(self, row):
        resource_id = self._collection_resource_id(clean_cell(row.get("Form_ID")))
        if not resource_id:
            return 0

        repaired = 0
        context_period = clean_cell(row.get("General_Context_Chronology_Period"))
        if self._is_comment_only_period(context_period):
            context_tile = Tile.objects.filter(
                resourceinstance_id=resource_id,
                nodegroup_id=CONTEXT_NODEGROUP_ID,
            ).first()
            if context_tile is not None:
                comment = self._append_period_to_comment(
                    row.get("General_Context_Chronology_Comment"),
                    context_period,
                )
                repaired += self._upsert_comment_only_chronology(
                    resource_id,
                    context_tile,
                    CONTEXT_CHRONOLOGY_NODEGROUP_ID,
                    CONTEXT_PERIOD_NODE_ID,
                    CONTEXT_CHRONOLOGY_DATE_NODE_IDS,
                    CONTEXT_CHRONOLOGY_COMMENT_NODE_ID,
                    CONTEXT_UNCERTAIN_NODE_ID,
                    comment,
                    self._is_uncertain_period(context_period),
                )

        for prefix in CATEGORY_TYPES:
            prefix_key = f"{prefix}_"
            period = clean_cell(
                row.get(f"{prefix_key}General_Chronology_of_Category_Period")
            )
            if not self._is_comment_only_period(period):
                continue

            type_value = self._pac_value_id(CATEGORY_TYPES[prefix])
            fragment_tile = Tile.objects.filter(
                resourceinstance_id=resource_id,
                nodegroup_id=FRAGMENT_NODEGROUP_ID,
                data__contains={POTTERY_TYPE_NODE_ID: type_value},
            ).first()
            if fragment_tile is None:
                self.stderr.write(
                    self.style.WARNING(
                        f"  Form_ID {clean_cell(row.get('Form_ID'))!r}: "
                        f"cannot repair {prefix} chronology; fragment not found"
                    )
                )
                continue

            comment = self._append_period_to_comment(
                row.get(f"{prefix_key}General_Chronology_of_Category_Comment"),
                period,
            )
            repaired += self._upsert_comment_only_chronology(
                resource_id,
                fragment_tile,
                CATEGORY_CHRONOLOGY_NODEGROUP_ID,
                CATEGORY_PERIOD_NODE_ID,
                CATEGORY_CHRONOLOGY_DATE_NODE_IDS,
                CATEGORY_CHRONOLOGY_COMMENT_NODE_ID,
                CATEGORY_UNCERTAIN_NODE_ID,
                comment,
                self._is_uncertain_period(period),
            )

        return repaired

    @staticmethod
    def _chronology_value_ids(selected_values):
        """Normalize a concept-list Period value to a list of Arches Value IDs."""
        if selected_values is None:
            return []
        if isinstance(selected_values, str):
            return [selected_values]
        if isinstance(selected_values, (list, tuple, set)):
            return [str(value) for value in selected_values if value]
        return []

    @staticmethod
    def _chronology_tile_value(value):
        """Return the raw EDTF value from either normal or indexed tile data."""
        if isinstance(value, dict):
            return value.get("value")
        return value

    @staticmethod
    def _format_chronology_year(year):
        if year is None:
            return None
        return str(ExtendedDateFormat(str(year)).edtf)

    def _repair_chronology_tiles(self):
        """Verify and repair every Pottery chronology tile against PAC.

        The repair deliberately queries each unique PAC QID at most once per
        command run. Successful responses are additionally retained by the
        lru_cache in ``fetch_period_dates``. If one QID still fails after the
        retry policy implemented by ``chronology_expantion.py``, every tile
        depending on that QID is left unchanged and reported as failed.
        """
        stats = Counter()
        nodegroup_ids = tuple(CHRONOLOGY_REPAIR_MAPPINGS)
        tiles = list(
            Tile.objects.filter(
                resourceinstance__graph_id=POTTERY_GRAPH_ID,
                nodegroup_id__in=nodegroup_ids,
            ).order_by("resourceinstance_id", "nodegroup_id", "tileid")
        )

        tile_value_ids = {}
        all_value_ids = set()
        for tile in tiles:
            mapping = CHRONOLOGY_REPAIR_MAPPINGS[str(tile.nodegroup_id)]
            value_ids = self._chronology_value_ids(
                (tile.data or {}).get(mapping["period_node"])
            )
            tile_value_ids[tile.tileid] = value_ids
            all_value_ids.update(value_ids)

        value_to_qid = {}
        values = Value.objects.filter(valueid__in=all_value_ids).select_related("concept")
        for value in values:
            period_id = extract_pac_qid(value.concept.legacyoid)
            if period_id:
                value_to_qid[str(value.valueid)] = period_id

        unique_period_ids = sorted(set(value_to_qid.values()))
        failed_period_ids = set()
        period_ranges_by_qid = {}
        self.stdout.write(
            "Chronology repair: "
            f"{len(tiles)} chronology tile(s), "
            f"{len(unique_period_ids)} unique PAC period(s) to verify."
        )

        # Warm the shared PAC cache once per unique QID. This is important for
        # large imports: hundreds of tiles commonly reuse the same periods.
        for period_id in unique_period_ids:
            stats["chronology_periods_checked"] += 1
            try:
                period_ranges_by_qid[period_id] = fetch_period_dates(period_id)
            except (requests.RequestException, ValueError) as error:
                failed_period_ids.add(period_id)
                stats["chronology_periods_failed"] += 1
                self.stderr.write(
                    self.style.WARNING(
                        f"  chronology PAC {period_id}: verification failed "
                        f"({error.__class__.__name__}: {error})"
                    )
                )

        for tile in tiles:
            mapping = CHRONOLOGY_REPAIR_MAPPINGS[str(tile.nodegroup_id)]
            value_ids = tile_value_ids[tile.tileid]
            if not value_ids:
                stats["chronology_tiles_without_period"] += 1
                continue

            stats["chronology_tiles_checked"] += 1
            unresolved_value_ids = [
                value_id for value_id in value_ids if value_id not in value_to_qid
            ]
            if unresolved_value_ids:
                stats["chronology_tiles_failed"] += 1
                self.stderr.write(
                    self.style.WARNING(
                        f"  chronology tile {tile.tileid}: cannot resolve local "
                        f"Period Value ID(s) to PAC: {', '.join(unresolved_value_ids)}"
                    )
                )
                continue

            period_ids = list(dict.fromkeys(value_to_qid[value_id] for value_id in value_ids))
            unavailable_period_ids = [
                period_id for period_id in period_ids if period_id in failed_period_ids
            ]
            if unavailable_period_ids:
                stats["chronology_tiles_failed"] += 1
                self.stderr.write(
                    self.style.WARNING(
                        f"  chronology tile {tile.tileid}: left unchanged because "
                        f"PAC lookup failed for {', '.join(unavailable_period_ids)}"
                    )
                )
                continue

            # Build exactly the same aggregate boundaries as the registered
            # chronology function, but only from the per-QID results fetched
            # once above. This stays safe even if there are more than 256
            # unique QIDs and the function's lru_cache starts evicting entries.
            ranges = []
            for period_id in period_ids:
                ranges.extend(period_ranges_by_qid[period_id])
            boundaries = select_chronology_boundaries(ranges)

            updated_data = dict(tile.data or {})
            changed_fields = []
            for field in CHRONOLOGY_DATE_FIELDS:
                node_id = mapping["date_nodes"][field]
                expected = self._format_chronology_year(boundaries.get(field))
                current = self._chronology_tile_value(updated_data.get(node_id))
                if current != expected:
                    updated_data[node_id] = expected
                    changed_fields.append(field)

            if not changed_fields:
                stats["chronology_tiles_ok"] += 1
                continue

            # Period itself is unchanged. Consequently the registered
            # chronology-expansion tile function sees _period_changed == False
            # on this save and does not perform another SPARQL request.
            tile.data = updated_data
            try:
                with transaction.atomic():
                    tile.save()
            except Exception as error:
                stats["chronology_tiles_failed"] += 1
                self.stderr.write(
                    self.style.ERROR(
                        f"  chronology tile {tile.tileid}: could not save repair "
                        f"({error.__class__.__name__}: {error})"
                    )
                )
                continue

            stats["chronology_tiles_repaired"] += 1
            self.stdout.write(
                f"  chronology tile {tile.tileid}: repaired "
                f"{', '.join(changed_fields)}"
            )

        self.stdout.write(
            "Chronology repair finished: "
            f"checked={stats['chronology_tiles_checked']}, "
            f"ok={stats['chronology_tiles_ok']}, "
            f"repaired={stats['chronology_tiles_repaired']}, "
            f"failed={stats['chronology_tiles_failed']}, "
            f"without_period={stats['chronology_tiles_without_period']}"
        )
        return stats

    @staticmethod
    def _find_values(raw_value, unknown_values):
        resolved = []
        for label in (clean_cell(value) for value in clean_cell(raw_value).split(",")):
            if not label:
                continue
            canonical_label = FIND_VALUE_LABELS.get(normalize_dictionary_label(label), label)
            value_id = resolve_dictionary_value(FINDS_DICTIONARY_ID, canonical_label)
            if value_id:
                resolved.append(value_id)
            else:
                unknown_values.append(label)
        return list(dict.fromkeys(resolved))

    @staticmethod
    def _resolve_period_label(label):
        """Resolve one complete PAC period label, including a transition."""
        value_id = resolve_dictionary_value(POTTERY_DICTIONARY_CHRONOLOGY, label)
        if value_id:
            return value_id

        # Accept spreadsheet spelling such as "Late Hellenistic/Early Roman"
        # for PAC's "Late Hellenistic / Early Roman".
        normalized_slash_label = re.sub(r"\s*/\s*", " / ", label)
        return resolve_dictionary_value(
            POTTERY_DICTIONARY_CHRONOLOGY,
            normalized_slash_label,
        )

    @staticmethod
    def _range_period_values(label):
        """Split a source range into locally available chronology periods.

        A slash is retained because it can form a PAC transition period. A
        hyphen and parentheses are range separators. Spaces can also separate
        consecutive period labels, for example ``Early Hellenistic Middle
        Hellenistic``. The longest matching dictionary label always wins.
        """
        dictionary = get_dictionary_index(POTTERY_DICTIONARY_CHRONOLOGY)
        remaining = normalize_dictionary_label(label)
        remaining = re.sub(r"\s*[-–—]\s*", " ", remaining)
        remaining = re.sub(r"[()]", " ", remaining)
        remaining = re.sub(r"\s*/\s*", " / ", remaining)
        remaining = re.sub(r"\s+", " ", remaining).strip()
        candidates = sorted(
            dictionary.values_by_label.items(),
            key=lambda item: len(item[0]),
            reverse=True,
        )
        resolved = []

        while remaining:
            match = next(
                (
                    (period_label, value_id)
                    for period_label, value_id in candidates
                    if remaining == period_label
                    or (
                        remaining.startswith(f"{period_label} ")
                        and not remaining[len(period_label):].strip().startswith("/")
                    )
                ),
                None,
            )
            if not match:
                return resolved, remaining

            period_label, value_id = match
            resolved.append(value_id)
            remaining = remaining[len(period_label):].strip()
            if remaining.startswith("/"):
                remaining = remaining[1:].strip()

        return resolved, ""
    @staticmethod
    def _century_suffix(century):
        if 10 <= century % 100 <= 20:
            return "th"
        return {1: "st", 2: "nd", 3: "rd"}.get(century % 10, "th")

    @staticmethod
    def _expand_chronology_abbreviations(value):
        return re.sub(
            r"\b(L\s*C\s*L|L\s*H|E\s*H|M\s*H|E\s*R)\b",
            lambda match: CHRONOLOGY_ABBREVIATIONS[
                re.sub(r"\s+", "", match.group(1)).upper()
            ],
            clean_cell(value),
            flags=re.IGNORECASE,
        )

    @staticmethod
    def _mapped_period_labels(label):
        """Return reviewed labels for one source chronology value, if any."""
        return CHRONOLOGY_VALUE_MAPPINGS.get(normalize_dictionary_label(label), ())

    @staticmethod
    def _century_number(value):
        """Return an Arabic century number for an Arabic or Roman numeral."""
        value = clean_cell(value).upper()
        if value.isdigit():
            return int(value)
        return ROMAN_CENTURIES.get(value)

    @classmethod
    def _canonical_century_labels(cls, label):
        """Normalize spreadsheet century notation to PAC labels.

        BCE sequences intentionally retain their source order (3rd, then
        2nd): toward the present, BCE century numbers decrease.
        """
        normalized = clean_cell(label).replace("\u00ad", " ").replace("\u00a0", " ")
        normalized = re.sub(r"[.]", "", normalized)
        normalized = re.sub(r"\s+", " ", normalized).strip()
        number = r"(?:\d+|[IVXL]+)(?:st|nd|rd|th)?"
        era = r"(?:AD|CE|BC|BCE)"

        def as_label(raw_number, raw_era):
            century = cls._century_number(re.sub(r"(?:st|nd|rd|th)$", "", raw_number, flags=re.IGNORECASE))
            if not century or century > 10:
                return ""
            return f"{century}{cls._century_suffix(century)} c. {CENTURY_ERA_ALIASES[raw_era.upper()]}"

        shared_era = re.fullmatch(
            rf"(?:until|up to|end of|from|early|mid(?:dle)?|late|(?:first|1st|second|2nd) half of)?\s*"
            rf"(?P<numbers>{number}(?:\s*(?:/|[-–—])?\s*{number})*)\s*"
            rf"(?:c|century)?\s*(?P<era>{era})",
            normalized,
            flags=re.IGNORECASE,
        )
        if shared_era:
            raw_numbers = re.findall(number, shared_era.group("numbers"), flags=re.IGNORECASE)
            centuries = [
                cls._century_number(re.sub(r"(?:st|nd|rd|th)$", "", raw_number, flags=re.IGNORECASE))
                for raw_number in raw_numbers
            ]
            if not all(century and century <= 10 for century in centuries):
                return []
            era_name = CENTURY_ERA_ALIASES[shared_era.group("era").upper()]
            labels = [
                f"{century}{cls._century_suffix(century)} c. {era_name}"
                for century in centuries
            ]
            # A slash denotes one transition concept, never two independent
            # chronology values.  It will resolve only if that transition is
            # present in PAC; otherwise the audit reports the exact missing
            # canonical label.
            if "/" in shared_era.group("numbers"):
                return [" / ".join(labels)]
            # Two stated endpoints denote every century between them.  For
            # BCE the regular source order is descending (3rd to 1st BCE).
            if len(centuries) == 2:
                start, end = centuries
                if era_name == "BCE" and start > end:
                    labels = [
                        f"{century}{cls._century_suffix(century)} c. {era_name}"
                        for century in range(start, end - 1, -1)
                    ]
                elif era_name == "CE" and start < end:
                    labels = [
                        f"{century}{cls._century_suffix(century)} c. {era_name}"
                        for century in range(start, end + 1)
                    ]
            return labels

        pairs = list(re.finditer(
            rf"(?P<number>{number})\s*(?:c|century)?\s*(?P<era>{era})",
            normalized,
            flags=re.IGNORECASE,
        ))
        if len(pairs) != 2:
            return []
        start = as_label(pairs[0].group("number"), pairs[0].group("era"))
        end = as_label(pairs[1].group("number"), pairs[1].group("era"))
        if not start or not end:
            return []
        start_era = CENTURY_ERA_ALIASES[pairs[0].group("era").upper()]
        end_era = CENTURY_ERA_ALIASES[pairs[1].group("era").upper()]
        start_number = cls._century_number(re.sub(r"(?:st|nd|rd|th)$", "", pairs[0].group("number"), flags=re.IGNORECASE))
        end_number = cls._century_number(re.sub(r"(?:st|nd|rd|th)$", "", pairs[1].group("number"), flags=re.IGNORECASE))
        if "/" in normalized:
            return [f"{start} / {end}"]
        if start_era == "BCE" and end_era == "CE":
            return [
                *(f"{number}{cls._century_suffix(number)} c. BCE" for number in range(start_number, 0, -1)),
                *(f"{number}{cls._century_suffix(number)} c. CE" for number in range(1, end_number + 1)),
            ]
        return [start, end]

    @classmethod
    def _century_range_labels(cls, label):
        """Return every canonical century covered by a source century range."""
        match = re.fullmatch(
            r"\s*(\d+)(?:st|nd|rd|th)?\s*(?:c(?:entury)?\.?)?\s*[-–—]\s*"
            r"(\d+)(?:st|nd|rd|th)?\s*(?:c(?:entury)?\.?)?\s*(AD|CE|BC|BCE)\s*",
            clean_cell(label),
            flags=re.IGNORECASE,
        )
        if not match:
            return cls._canonical_century_labels(label)
        start, end = (int(value) for value in match.group(1, 2))
        if start > end:
            # ``3rd-2nd c. BC`` is in normal BCE source order.
            if match.group(3).upper() in {"BC", "BCE"}:
                return [
                    f"{century}{cls._century_suffix(century)} c. BCE"
                    for century in range(start, end - 1, -1)
                ]
            return []
        # Only low-numbered source ranges denote centuries. Higher values
        # in the amphora sheets are calendar years, even when an earlier
        # conversion added ordinal or ``c.`` markers.
        if max(start, end) > 10:
            return []
        era = CENTURY_ERA_ALIASES[match.group(3).upper()]
        return [
            f"{century}{cls._century_suffix(century)} c. {era}"
            for century in range(start, end + 1)
        ]

    @classmethod
    def _period_values(cls, raw_value, unknown_values):
        """Resolve one or more Excel periods separated with a vertical bar.

        A question mark is an import marker for the Dating > Uncertain field;
        it is not part of the PAC chronology label used for lookup.
        """
        resolved = []
        for label in (
            clean_cell(value)
            for value in re.split(r"\s*(?:\||,|;)\s*", clean_cell(raw_value))
        ):
            label = clean_cell(label.replace("?", "").replace("\u00ad", " ").replace("\u00a0", " "))
            # A dot is a visual placeholder, not an unresolved chronology.
            if not label or label == "." or re.fullmatch(r"(?:[0-9A-F]{2})?FFB6C1", label, flags=re.IGNORECASE):
                continue
            # The broad period is usable; ``contamination`` is a source
            # qualification, not a PAC chronology label.
            label = re.sub(r"^(?:with\s+)?(.+?)\s+contamination$", r"\1", label, flags=re.IGNORECASE)
            mapped_labels = cls._mapped_period_labels(label)
            if mapped_labels:
                for mapped_label in mapped_labels:
                    value_id = cls._resolve_period_label(mapped_label)
                    if value_id:
                        resolved.append(value_id)
                    else:
                        # A reviewed mapping must not silently disappear if
                        # its dictionary entry is removed later.
                        unknown_values.append(mapped_label)
                continue
            label = cls._expand_chronology_abbreviations(label)
            value_id = cls._resolve_period_label(label)
            if value_id:
                resolved.append(value_id)
                continue

            century_labels = cls._century_range_labels(label)
            if century_labels:
                for century_label in century_labels:
                    value_id = cls._resolve_period_label(century_label)
                    if value_id:
                        resolved.append(value_id)
                    else:
                        unknown_values.append(century_label)
                continue

            range_value_ids, unknown_tail = cls._range_period_values(label)
            resolved.extend(range_value_ids)
            if unknown_tail:
                mapped_tail_labels = cls._mapped_period_labels(unknown_tail)
                if mapped_tail_labels:
                    for mapped_label in mapped_tail_labels:
                        value_id = cls._resolve_period_label(mapped_label)
                        if value_id:
                            resolved.append(value_id)
                        else:
                            unknown_values.append(mapped_label)
                else:
                    unknown_values.append(unknown_tail)
        return list(dict.fromkeys(resolved))

    @staticmethod
    def _is_uncertain_period(raw_value):
        """Return whether the source Dating value is explicitly uncertain."""
        return "?" in clean_cell(raw_value)

    @staticmethod
    def _transition_period_boundaries(raw_value):
        """Return exact dates for a reviewed two-century transition."""
        normalized = re.sub(r"[.]", "", clean_cell(raw_value))
        normalized = re.sub(r"\s+", " ", normalized).strip()
        if THIRD_SECOND_BCE_TRANSITION_PATTERN.fullmatch(normalized):
            return THIRD_SECOND_BCE_TRANSITION_BOUNDARIES
        return None

    @classmethod
    def _is_comment_only_period(cls, raw_value):
        value = clean_cell(raw_value).replace("?", "")
        value = value.replace("\u00ad", " ").replace("\u00a0", " ")
        value = cls._expand_chronology_abbreviations(value)
        value = re.sub(r"[.]", "", value)
        value = re.sub(r"\s*(?:-|\u2013|\u2014)\s*", " ", value)
        value = re.sub(r"\s+", " ", value).strip()
        return normalize_dictionary_label(value) in CHRONOLOGY_COMMENT_ONLY_VALUES

    @staticmethod
    def _append_period_to_comment(comment, raw_period):
        note = f"Period: {clean_cell(raw_period)}"
        existing = clean_cell(comment)
        if note in existing.splitlines():
            return existing
        return "\n".join(value for value in (existing, note) if value)

    @staticmethod
    def _chronology_boundary_data(node_ids, boundaries):
        start_year, end_year = boundaries
        years = (start_year, start_year, end_year, end_year)
        return {
            node_id: str(ExtendedDateFormat(str(year)).edtf)
            for node_id, year in zip(node_ids, years)
        }

    def _category_data(self, row, prefix):
        prefix_key = f"{prefix}_"
        raw_type = clean_cell(row.get(f"{prefix_key}Pottery_Type"))
        diagnostic = cell_number(row.get(f"{prefix_key}Number_of_Diagnostic_Fragments"))
        undiagnostic = cell_number(row.get(f"{prefix_key}Number_of_Undiagnostic_Fragments"))
        period = clean_cell(row.get(f"{prefix_key}General_Chronology_of_Category_Period"))
        comment = clean_cell(row.get(f"{prefix_key}General_Chronology_of_Category_Comment"))
        category_remarks = clean_cell(row.get(f"{prefix_key}Remarks_from_Pottery_Category_Form"))
        no_material = to_boolean(row.get(f"{prefix_key}No_Material"))
        special_finds = to_boolean(row.get(f"{prefix_key}Contains_Special_Finds"))
        if (
            not raw_type
            and diagnostic in (None, 0)
            and undiagnostic in (None, 0)
            and not no_material
            and not special_finds
            and not period
            and not comment
            and not category_remarks
        ):
            return None

        return {
            "type_value": self._pac_value_id(CATEGORY_TYPES[prefix]),
            "diagnostic": diagnostic,
            "undiagnostic": undiagnostic,
            "no_material": no_material,
            "special_finds": special_finds,
            "period": period,
            "comment": comment,
            "category_remarks": category_remarks,
            "finds_remarks": clean_cell(row.get(f"{prefix_key}Remarks_from_Finds_Recording_Form")),
        }

    def _validate_row(self, row_number, row):
        form_id = clean_cell(row.get("Form_ID"))
        if not form_id:
            raise CommandError("Form_ID is empty.")
        if self._collection_exists(form_id):
            raise SkipRow(f"Pottery Collection with Form_ID {form_id!r} already exists")
        context = self._context_for_row(row)
        unknown_values = []
        archaeological_remains = self._find_values(row.get("Archaeological_Remains"), unknown_values)
        special_finds = self._find_values(row.get("Special_Finds"), unknown_values)
        unknown_periods = []
        context_period = clean_cell(row.get("General_Context_Chronology_Period"))
        context_comment_only = self._is_comment_only_period(context_period)
        context_period_boundaries = self._transition_period_boundaries(context_period)
        context_period_value_ids = (
            []
            if context_period_boundaries or context_comment_only
            else self._period_values(context_period, unknown_periods)
        )
        context_chronology_comment = clean_cell(
            row.get("General_Context_Chronology_Comment")
        )
        if context_period_boundaries or context_comment_only:
            context_chronology_comment = self._append_period_to_comment(
                context_chronology_comment,
                context_period,
            )
        context_period_uncertain = self._is_uncertain_period(context_period)

        categories = []
        for prefix in CATEGORY_TYPES:
            category = self._category_data(row, prefix)
            if category is None:
                continue
            category["period_boundaries"] = self._transition_period_boundaries(
                category["period"]
            )
            category["period_comment_only"] = self._is_comment_only_period(
                category["period"]
            )
            if category["period_boundaries"] or category["period_comment_only"]:
                category["period_value_ids"] = []
                category["comment"] = self._append_period_to_comment(
                    category["comment"],
                    category["period"],
                )
            elif category["period"]:
                category["period_value_ids"] = self._period_values(
                    category["period"],
                    unknown_periods,
                )
            category["period_uncertain"] = self._is_uncertain_period(
                category["period"]
            )
            categories.append(category)

        for value in unknown_values:
            self.stderr.write(self.style.WARNING(f"  row {row_number}: ignored unknown find value {value!r}"))
        for value in unknown_periods:
            self.stderr.write(self.style.WARNING(f"  row {row_number}: ignored unknown chronology {value!r}"))

        return {
            "context": context,
            "archaeological_remains": archaeological_remains,
            "special_finds": special_finds,
            "context_period_value_ids": context_period_value_ids,
            "context_period_boundaries": context_period_boundaries,
            "context_chronology_comment": context_chronology_comment,
            "context_period_uncertain": context_period_uncertain,
            "categories": categories,
            "totals": Counter(
                collections=1,
                contexts_created=int(getattr(context, "_created_by_pottery_import", False)),
                fragments=len(categories),
                unknown_find_values=len(unknown_values),
                unknown_chronology_values=len(unknown_periods),
            ),
        }

    @staticmethod
    def _save_tile(resource, nodegroup_id, data, parent_tile=None):
        tile = Tile.get_blank_tile_from_nodegroup_id(
            nodegroup_id,
            resourceid=str(resource.resourceinstanceid),
        )
        tile.parenttile = parent_tile
        tile.data.update(data)
        tile.save()
        return tile

    def _create_resource(self, row, report):
        resource = Resource.objects.create(graph_id=POTTERY_GRAPH_ID)
        context_data = {
            CONTEXT_NODE_ID: [{
                "resourceId": str(report["context"].resourceinstanceid),
                "ontologyProperty": "",
                "inverseOntologyProperty": "",
                "resourceXresourceId": str(uuid4()),
            }],
        }
        if report["archaeological_remains"]:
            context_data[ARCHAEOLOGICAL_REMAINS_NODE_ID] = report["archaeological_remains"]
        if report["special_finds"]:
            context_data[SPECIAL_FINDS_NODE_ID] = report["special_finds"]
        if clean_cell(row.get("Remarks_about_Context")):
            context_data[CONTEXT_REMARKS_NODE_ID] = localized_string(
                clean_cell(row["Remarks_about_Context"])
            )
        context_tile = self._save_tile(resource, CONTEXT_NODEGROUP_ID, context_data)

        self._save_tile(resource, FORM_ID_NODEGROUP_ID, {FORM_ID_NODE_ID: clean_cell(row["Form_ID"])})
        last_shred = cell_number(row.get("Last_Shred_No"))
        if last_shred is not None:
            self._save_tile(resource, LAST_SHRED_NODEGROUP_ID, {LAST_SHRED_NODE_ID: last_shred})

        chronology_data = {}
        if report["context_period_value_ids"]:
            chronology_data[CONTEXT_PERIOD_NODE_ID] = report["context_period_value_ids"]
        if report["context_period_boundaries"]:
            chronology_data.update(self._chronology_boundary_data(
                CONTEXT_CHRONOLOGY_DATE_NODE_IDS,
                report["context_period_boundaries"],
            ))
        if report["context_chronology_comment"]:
            chronology_data[CONTEXT_CHRONOLOGY_COMMENT_NODE_ID] = localized_string(
                report["context_chronology_comment"]
            )
        if chronology_data:
            # Uncertain is required by the current Dating card. Explicitly
            # write False when the Excel value has no question-mark marker.
            chronology_data[CONTEXT_UNCERTAIN_NODE_ID] = report["context_period_uncertain"]
            self._save_tile(
                resource,
                CONTEXT_CHRONOLOGY_NODEGROUP_ID,
                chronology_data,
                parent_tile=context_tile,
            )

        for category in report["categories"]:
            fragment_data = {
                POTTERY_TYPE_NODE_ID: category["type_value"],
                NO_MATERIAL_NODE_ID: category["no_material"],
                CONTAINS_SPECIAL_FINDS_NODE_ID: category["special_finds"],
            }
            if category["diagnostic"] is not None:
                fragment_data[DIAGNOSTIC_NODE_ID] = category["diagnostic"]
            if category["undiagnostic"] is not None:
                fragment_data[UNDIAGNOSTIC_NODE_ID] = category["undiagnostic"]
            if category["category_remarks"]:
                fragment_data[CATEGORY_REMARKS_NODE_ID] = localized_string(
                    category["category_remarks"]
                )
            if category["finds_remarks"]:
                fragment_data[FINDS_REMARKS_NODE_ID] = localized_string(
                    category["finds_remarks"]
                )
            fragment_tile = self._save_tile(resource, FRAGMENT_NODEGROUP_ID, fragment_data)

            chronology_data = {}
            if category.get("period_value_ids"):
                chronology_data[CATEGORY_PERIOD_NODE_ID] = category["period_value_ids"]
            if category.get("period_boundaries"):
                chronology_data.update(self._chronology_boundary_data(
                    CATEGORY_CHRONOLOGY_DATE_NODE_IDS,
                    category["period_boundaries"],
                ))
            if category["comment"]:
                chronology_data[CATEGORY_CHRONOLOGY_COMMENT_NODE_ID] = localized_string(
                    category["comment"]
                )
            if chronology_data:
                chronology_data[CATEGORY_UNCERTAIN_NODE_ID] = category["period_uncertain"]
                self._save_tile(
                    resource,
                    CATEGORY_CHRONOLOGY_NODEGROUP_ID,
                    chronology_data,
                    parent_tile=fragment_tile,
                )

        return resource.resourceinstanceid
