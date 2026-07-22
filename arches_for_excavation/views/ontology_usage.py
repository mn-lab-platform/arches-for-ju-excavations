import json
from pathlib import Path

from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views import View

from arches.app.models.models import Card, Edge, Graph, Node, Relation, Value

LAYOUTS_DIR = Path(__file__).resolve().parents[1] / "ontology_usage_layouts"


def serialize_i18n(value, language="en"):
    if value is None:
        return ""

    if isinstance(value, str):
        return value

    try:
        return value[language]
    except (KeyError, TypeError):
        pass

    try:
        return value.get(language, "")
    except AttributeError:
        pass

    return str(value)
def make_code(value):
    text = str(value or "")

    if "#" in text:
        text = text.rsplit("#", 1)[-1]

    if "/" in text:
        text = text.rstrip("/").rsplit("/", 1)[-1]

    return text
def plain_config(config):
    if not config:
        return {}

    return dict(config)


def get_collection_label(collection_id):
    if not collection_id:
        return ""

    return (
        Value.objects.filter(
            concept_id=collection_id,
            valuetype_id="prefLabel",
        )
        .values_list("value", flat=True)
        .first()
        or ""
    )


def serialize_node_concepts(node):
    if node.datatype not in ("concept", "concept-list"):
        return {
            "collection": None,
            "values": [],
        }

    config = plain_config(node.config)
    collection_id = config.get("rdmCollection")

    if not collection_id:
        return {
            "collection": None,
            "values": [],
        }

    member_ids = list(
        Relation.objects.filter(
            conceptfrom_id=collection_id,
            relationtype_id="member",
        ).values_list("conceptto_id", flat=True)
    )

    concepts = {
        str(concept_id): {
            "id": str(concept_id),
            "prefLabel": "",
            "altLabels": [],
            "hiddenLabels": [],
        }
        for concept_id in member_ids
    }

    values = Value.objects.filter(
        concept_id__in=member_ids,
        valuetype_id__in=("prefLabel", "altLabel", "hiddenLabel"),
    ).order_by("value")

    for value in values:
        concept = concepts.setdefault(str(value.concept_id), {
            "id": str(value.concept_id),
            "prefLabel": "",
            "altLabels": [],
            "hiddenLabels": [],
        })

        if value.valuetype_id == "prefLabel" and not concept["prefLabel"]:
            concept["prefLabel"] = value.value
        elif value.valuetype_id == "altLabel":
            concept["altLabels"].append(value.value)
        elif value.valuetype_id == "hiddenLabel":
            concept["hiddenLabels"].append(value.value)

    return {
        "collection": {
            "id": str(collection_id),
            "label": get_collection_label(collection_id),
        },
        "values": sorted(
            concepts.values(),
            key=lambda item: item["prefLabel"] or item["id"],
        ),
    }

def get_layout_path(graph_id):
    return LAYOUTS_DIR / f"{graph_id}.json"


def load_layout(graph_id):
    path = get_layout_path(graph_id)

    if not path.exists():
        return None

    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return None


def save_layout(graph_id, layout):
    LAYOUTS_DIR.mkdir(parents=True, exist_ok=True)
    get_layout_path(graph_id).write_text(
        json.dumps(layout, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def delete_layout(graph_id):
    path = get_layout_path(graph_id)

    if path.exists():
        path.unlink()


class OntologyUsageModelsView(View):
    def get(self, request):
        graphs = Graph.objects.filter(isresource=True).order_by("name")

        data = [
            {
                "graphid": str(graph.graphid),
                "name": serialize_i18n(graph.name),
                "subtitle": serialize_i18n(getattr(graph, "subtitle", "") or ""),
                "iconclass": getattr(graph, "iconclass", "") or "",
            }
            for graph in graphs
        ]

        return JsonResponse(
            {"models": data},
            json_dumps_params={"ensure_ascii": False},
        )
class OntologyUsageModelGraphView(View):
    def get(self, request, graph_id):
        graph = Graph.objects.get(graphid=graph_id)

        cards = Card.objects.filter(graph_id=graph_id)
        card_by_nodegroup = {
            str(card.nodegroup_id): {
                "cardid": str(card.cardid),
                "name": serialize_i18n(card.name),
                "sortorder": card.sortorder,
            }
            for card in cards
        }

        nodes = Node.objects.filter(graph_id=graph_id).order_by("istopnode", "name")
        node_data = []

        for node in nodes:
            nodegroup_id = str(node.nodegroup_id) if node.nodegroup_id else ""

            node_data.append({
                "id": str(node.nodeid),
                "name": serialize_i18n(node.name),
                "alias": node.alias or "",
                "datatype": node.datatype,
                "isTopNode": node.istopnode,
                "nodegroupId": nodegroup_id,
                "card": card_by_nodegroup.get(nodegroup_id),
                "ontologyClass": node.ontologyclass or "",
                "ontologyClassCode": make_code(node.ontologyclass),
                "parentProperty": "",
                "parentPropertyCode": "",
                "config": plain_config(node.config),
                "concepts": serialize_node_concepts(node),
            })

        edges = Edge.objects.filter(graph_id=graph_id)
        edge_data = [
            {
                "id": str(edge.edgeid),
                "source": str(edge.domainnode_id),
                "target": str(edge.rangenode_id),
                "ontologyProperty": edge.ontologyproperty or "",
                "ontologyPropertyCode": make_code(edge.ontologyproperty),
            }
            for edge in edges
        ]

        class_usage = {}
        property_usage = {}

        for node in node_data:
            code = node["ontologyClassCode"]
            if code:
                class_usage[code] = class_usage.get(code, 0) + 1

        for edge in edge_data:
            code = edge["ontologyPropertyCode"]
            if code:
                property_usage[code] = property_usage.get(code, 0) + 1

        return JsonResponse(
            {
                "model": {
                    "graphid": str(graph.graphid),
                    "name": serialize_i18n(graph.name),
                    "subtitle": serialize_i18n(getattr(graph, "subtitle", "")),
                },
                "nodes": node_data,
                "edges": edge_data,
                "classUsage": [
                    {"code": code, "count": count}
                    for code, count in sorted(class_usage.items())
                ],
                "propertyUsage": [
                    {"code": code, "count": count}
                    for code, count in sorted(property_usage.items())
                ],
                "layout": load_layout(graph_id),
            },
            json_dumps_params={"ensure_ascii": False},
        )


@method_decorator(csrf_exempt, name="dispatch")
class OntologyUsageModelLayoutView(View):
    def get(self, request, graph_id):
        return JsonResponse(
            {"layout": load_layout(graph_id)},
            json_dumps_params={"ensure_ascii": False},
        )

    def post(self, request, graph_id):
        try:
            payload = json.loads(request.body.decode("utf-8") or "{}")
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        layout = payload.get("layout")

        if not isinstance(layout, dict):
            return JsonResponse({"error": "Missing layout object"}, status=400)

        save_layout(graph_id, layout)

        return JsonResponse(
            {"ok": True, "layout": layout},
            json_dumps_params={"ensure_ascii": False},
        )

    def delete(self, request, graph_id):
        delete_layout(graph_id)

        return JsonResponse({"ok": True})
