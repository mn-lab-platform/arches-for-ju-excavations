"""Expand PAC chronology values selected in Pottery Collection tiles."""

from __future__ import annotations

import logging
import re

import requests
from arches.app.functions.base import BaseFunction
from arches.app.models.models import TileModel, Value
from arches.app.utils.date_utils import ExtendedDateFormat


logger = logging.getLogger(__name__)


PAC_SPARQL_ENDPOINT = "https://pac.cenagis.edu.pl/wiki/sparql"
REQUEST_TIMEOUT_SECONDS = 10


# This record is installed with ``manage.py fn register``.  The node mapping
# belongs to the Pottery Collection graph and covers its main chronology card
# as well as the chronology card nested under a pottery category.
details = {
    "functionid": "bf520c36-8de6-4f27-bf6a-c0a152e925b4",
    "name": "Expand Pottery Chronology",
    "type": "tile-update",
    "description": (
        "Reads selected PAC periods and fills the four chronology boundary "
        "nodes in the same tile."
    ),
    "defaultconfig": {
        "triggering_nodegroups": [
            "c6e7b936-3a60-4b5e-a557-4b5f02c5a4cf",
            "13c63c03-ffc3-455a-a1ce-23082b4111e8",
        ],
        "node_mappings": {
            "c6e7b936-3a60-4b5e-a557-4b5f02c5a4cf": {
                "period_node": "bdad4eee-bae5-4aaa-b2ae-4bf646f0abd5",
                "earliest_date": "e7f52189-ccea-4bce-9744-9fb3b1fbbc9e",
                "latest_start_date": "d9c31b43-00c2-4e3e-9fd1-53b3034b816e",
                "earliest_end_date": "92c0e019-b754-4385-95af-e2765cbfcdf4",
                "latest_date": "df592091-2a08-468a-b2b3-801bcc4bbeeb",
            },
            "13c63c03-ffc3-455a-a1ce-23082b4111e8": {
                "period_node": "ab05ac4b-4fd8-4eb9-9549-9d4a2a86893c",
                "earliest_date": "7cdc9d21-03ca-4721-a696-9c5410949a68",
                "latest_start_date": "2d982bc1-1e21-49dd-b942-a068a4fa645f",
                "earliest_end_date": "82c3a276-fd67-4ce0-b0f4-eda4026c679c",
                "latest_date": "1e59afd0-42aa-421a-85fe-1e0b72da6ca7",
            },
        },
    },
    "classname": "PotteryChronologyExpansionFunction",
    # The function has no settings panel in the graph designer.
    "component": "",
}


def parse_year(raw_date):
    """Return an integer year from a PAC timestamp, including BCE years."""
    if not isinstance(raw_date, str):
        return None

    match = re.match(r"^([+-]?\d+)-", raw_date)
    return int(match.group(1)) if match else None


def extract_pac_qid(legacyoid):
    """Extract a PAC entity identifier such as Q1406 from an Arches legacyoid."""
    if not isinstance(legacyoid, str):
        return None

    match = re.search(r"/entity/(Q\d+)(?:/|$)", legacyoid)
    return match.group(1) if match else None


def _build_period_query(period_id):
    return f"""
PREFIX wd: <https://pac.cenagis.edu.pl/entity/>
PREFIX wdt: <https://pac.cenagis.edu.pl/prop/direct/>

SELECT ?period ?earliest ?latestStart ?earliestEnd ?latest WHERE {{
  VALUES ?period {{ wd:{period_id} }}
  OPTIONAL {{ ?period wdt:P22 ?earliest }}
  OPTIONAL {{ ?period wdt:P23 ?latestStart }}
  OPTIONAL {{ ?period wdt:P25 ?earliestEnd }}
  OPTIONAL {{ ?period wdt:P24 ?latest }}
}}
""".strip()


def _year_from_binding(binding, field_name):
    return parse_year(binding.get(field_name, {}).get("value"))


def fetch_period_dates(period_id):
    """Fetch all chronology ranges declared by one PAC period identifier."""
    if not re.fullmatch(r"Q\d+", period_id or ""):
        raise ValueError(f"Invalid PAC period identifier: {period_id!r}")

    response = requests.get(
        PAC_SPARQL_ENDPOINT,
        params={"query": _build_period_query(period_id)},
        headers={"Accept": "application/sparql-results+json"},
        timeout=REQUEST_TIMEOUT_SECONDS,
    )
    response.raise_for_status()

    bindings = response.json().get("results", {}).get("bindings", [])
    return [
        {
            "period_id": period_id,
            "earliest_date": _year_from_binding(binding, "earliest"),
            "latest_start_date": _year_from_binding(binding, "latestStart"),
            "earliest_end_date": _year_from_binding(binding, "earliestEnd"),
            "latest_date": _year_from_binding(binding, "latest"),
        }
        for binding in bindings
    ]


def select_chronology_boundaries(periods):
    """
    The latest-start date is taken only from the period with the earliest
    date. The earliest-end date is taken only from the period with the latest
    date. They are deliberately not independently aggregated.
    """
    earliest_candidates = [
        period for period in periods if period.get("earliest_date") is not None
    ]
    latest_candidates = [
        period for period in periods if period.get("latest_date") is not None
    ]

    earliest_period = (
        min(earliest_candidates, key=lambda period: period["earliest_date"])
        if earliest_candidates
        else None
    )
    latest_period = (
        max(latest_candidates, key=lambda period: period["latest_date"])
        if latest_candidates
        else None
    )

    return {
        "earliest_date": (
            earliest_period["earliest_date"] if earliest_period else None
        ),
        "latest_start_date": (
            earliest_period["latest_start_date"] if earliest_period else None
        ),
        "earliest_end_date": (
            latest_period["earliest_end_date"] if latest_period else None
        ),
        "latest_date": latest_period["latest_date"] if latest_period else None,
    }


def fetch_chronology_boundaries(period_ids):
    """Fetch all selected PAC periods and return their four Arches boundaries."""
    ranges = []
    for period_id in period_ids:
        ranges.extend(fetch_period_dates(period_id))

    return select_chronology_boundaries(ranges)


class PotteryChronologyExpansionFunction(BaseFunction):
    """Populate chronology boundary nodes when a Pottery ``Period`` changes."""

    DATE_FIELDS = (
        "earliest_date",
        "latest_start_date",
        "earliest_end_date",
        "latest_date",
    )

    def save(self, tile, request=None, context=None):
        """Set the four dates before Arches persists the changed tile."""
        mapping = (self.config or {}).get("node_mappings", {}).get(
            str(tile.nodegroup_id)
        )
        if mapping is None:
            return

        if not self._period_changed(tile, mapping["period_node"]):
            return

        period_ids = self._selected_pac_period_ids(
            tile.data.get(mapping["period_node"])
        )

        try:
            boundaries = (
                fetch_chronology_boundaries(period_ids)
                if period_ids
                else {field: None for field in self.DATE_FIELDS}
            )
        except (requests.RequestException, ValueError):
            # A temporarily unavailable PAC service must not prevent an editor
            # from saving their Period selection. Existing calculated dates are
            # kept until a later successful edit.
            logger.exception(
                "Could not expand PAC chronology for tile %s", tile.tileid
            )
            return

        for field in self.DATE_FIELDS:
            node_id = mapping[field]
            value = self._format_edtf_year(boundaries[field])
            if self._tile_value(tile.data.get(node_id)) != value:
                tile.data[node_id] = value

    @staticmethod
    def _tile_value(value):
        """Return the raw EDTF value from either normal or indexed tile data."""
        if isinstance(value, dict):
            return value.get("value")
        return value

    @staticmethod
    def _period_changed(tile, period_node_id):
        """Return true for a new tile or when its Period value was edited."""
        if tile.tileid is None:
            return True

        existing_tile = TileModel.objects.filter(pk=tile.tileid).only("data").first()
        if existing_tile is None:
            return True

        return (
            existing_tile.data.get(period_node_id)
            != tile.data.get(period_node_id)
        )

    @staticmethod
    def _format_edtf_year(year):
        """Return Arches' canonical EDTF year form, or a blank value."""
        if year is None:
            return None
        return str(ExtendedDateFormat(str(year)).edtf)

    @staticmethod
    def _as_value_ids(selected_values):
        if selected_values is None:
            return []
        if isinstance(selected_values, str):
            return [selected_values]
        if isinstance(selected_values, (list, tuple, set)):
            return [str(value) for value in selected_values if value]
        return []

    def _selected_pac_period_ids(self, selected_values):
        """Resolve selected Arches Value IDs to PAC Q identifiers."""
        value_ids = self._as_value_ids(selected_values)
        if not value_ids:
            return []

        periods = []
        values = Value.objects.filter(valueid__in=value_ids).select_related("concept")
        for value in values:
            period_id = extract_pac_qid(value.concept.legacyoid)
            if period_id and period_id not in periods:
                periods.append(period_id)

        return periods


if __name__ == "__main__":
    selected_period_ids = ["Q1406", "Q496"]
    print(fetch_chronology_boundaries(selected_period_ids))
