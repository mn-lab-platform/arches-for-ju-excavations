"""Read-only PAC Wikidata dictionary search for Arches clients."""

from hashlib import sha256
import re

import requests
from django.conf import settings
from django.core.cache import cache
from django.http import JsonResponse
from django.views import View


PAC_WIKIDATA_ENDPOINT = "https://pac.cenagis.edu.pl/wiki/sparql"
PAC_CACHE_TIMEOUT_SECONDS = 300
MAX_RESULTS = 100

# These are the controlled dictionary classes supplied by PAC Wikidata.
# The client can request one or more keys, but cannot send raw SPARQL.
DICTIONARY_TYPES = {
    "amphora_type": "Q449",
    "vessel_form": "Q450",
    "vessel_part": "Q451",
    "sub_category": "Q452",
    "provenance": "Q453",
    "chronology": "Q454",
    "morphology": "Q455",
    "state_of_preservation": "Q456",
    "surface_treatment": "Q457",
    "harris_relationship": "Q786",
    "trench_parameter": "Q790",
    "visual_item_metadata": "Q793",
    "linguistic_object_metadata": "Q796",
}

PREFIXES = """
PREFIX wd: <https://pac.cenagis.edu.pl/entity/>
PREFIX wdt: <https://pac.cenagis.edu.pl/prop/direct/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX schema: <http://schema.org/>
""".strip()


def _escape_sparql_string(value):
    return value.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ").replace("\r", " ")


def _parse_types(raw_types):
    requested_types = [
        value.strip()
        for value in (raw_types or "").split(",")
        if value.strip()
    ]

    if not requested_types:
        return list(DICTIONARY_TYPES.values()), []

    unknown_types = [value for value in requested_types if value not in DICTIONARY_TYPES]
    return [DICTIONARY_TYPES[value] for value in requested_types if value in DICTIONARY_TYPES], unknown_types


def _build_query(term, type_ids, language, limit):
    type_values = " ".join(f"wd:{type_id}" for type_id in type_ids)
    escaped_term = _escape_sparql_string(term)

    return f"""
{PREFIXES}

SELECT DISTINCT ?item ?itemLabel ?itemDescription WHERE {{
  VALUES ?plabel {{ "{escaped_term}" }}

  ?item rdfs:label ?itemL .
  FILTER(LANG(?itemL) = "{language}")
  FILTER(CONTAINS(LCASE(?itemL), LCASE(?plabel)))

  OPTIONAL {{
    ?item schema:description ?descL .
    FILTER(LANG(?descL) = "{language}")
  }}

  ?item wdt:P2/wdt:P20* ?type .
  VALUES ?type {{ {type_values} }}

  BIND(COALESCE(?itemL, STR(?item)) AS ?itemLabel)
  BIND(COALESCE(?descL, "") AS ?itemDescription)
}}
LIMIT {limit}
""".strip()


def _serialize_binding(binding):
    item_uri = binding.get("item", {}).get("value", "")
    return {
        "id": item_uri.rsplit("/", 1)[-1],
        "uri": item_uri,
        "label": binding.get("itemLabel", {}).get("value", ""),
        "description": binding.get("itemDescription", {}).get("value", ""),
    }


class PacWikidataDictionarySearchView(View):
    """Returns PAC Wikidata dictionary candidates in a frontend-friendly shape."""

    def get(self, request):
        term = (request.GET.get("q") or "").strip()
        language = (request.GET.get("lang") or "en").strip().lower()
        type_ids, unknown_types = _parse_types(request.GET.get("types"))

        try:
            limit = int(request.GET.get("limit", 25))
        except (TypeError, ValueError):
            limit = 25
        limit = max(1, min(limit, MAX_RESULTS))

        if not term:
            return JsonResponse(
                {"status": "error", "message": "Parameter q is required."},
                status=400,
            )

        if len(term) > 200:
            return JsonResponse(
                {"status": "error", "message": "Parameter q may contain at most 200 characters."},
                status=400,
            )

        if not re.fullmatch(r"[a-z]{2,8}(?:-[a-z0-9]{2,8})?", language):
            return JsonResponse(
                {"status": "error", "message": "Parameter lang must be a language tag."},
                status=400,
            )

        if unknown_types:
            return JsonResponse(
                {
                    "status": "error",
                    "message": "Unknown dictionary type.",
                    "unknownTypes": unknown_types,
                    "availableTypes": sorted(DICTIONARY_TYPES),
                },
                status=400,
            )

        cache_input = f"{term}|{language}|{','.join(type_ids)}|{limit}"
        cache_key = "pac-wikidata:" + sha256(cache_input.encode("utf-8")).hexdigest()
        cached_response = cache.get(cache_key)
        if cached_response is not None:
            return JsonResponse({**cached_response, "cached": True})

        query = _build_query(term, type_ids, language, limit)
        endpoint = getattr(settings, "PAC_WIKIDATA_ENDPOINT", PAC_WIKIDATA_ENDPOINT)

        try:
            response = requests.get(
                endpoint,
                params={"query": query},
                headers={"Accept": "application/sparql-results+json"},
                timeout=10,
            )
            response.raise_for_status()
            payload = response.json()
        except (requests.RequestException, ValueError):
            return JsonResponse(
                {
                    "status": "error",
                    "message": "PAC Wikidata dictionary service is unavailable.",
                },
                status=502,
            )

        result = {
            "status": "success",
            "query": term,
            "language": language,
            "types": [key for key, value in DICTIONARY_TYPES.items() if value in type_ids],
            "count": len(payload.get("results", {}).get("bindings", [])),
            "results": [
                _serialize_binding(binding)
                for binding in payload.get("results", {}).get("bindings", [])
            ],
            "cached": False,
        }
        cache.set(cache_key, result, PAC_CACHE_TIMEOUT_SECONDS)
        return JsonResponse(result)
