import json
from pathlib import Path

from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views import View

from arches.app.models.models import Card, Edge, Graph, Node

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
