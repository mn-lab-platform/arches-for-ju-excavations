from arches.app.models.models import GraphModel, Node, Edge
import re
from difflib import SequenceMatcher

def graph_label(graph):
    name = graph.name
    if hasattr(name, "get"):
        return name.get("en") or next(iter(name.values()), str(graph.graphid))
    return str(name)
def normalize_label(value):
    value = (value or "").lower()
    value = value.replace("_", " ")
    value = value.replace(":", " ")
    value = re.sub(r"[^a-z0-9]+", " ", value)
    return " ".join(value.split())


DATATYPE_COMPATIBILITY = {
    "string": {"string", "non-localized-string", "number"},
    "non-localized-string": {"string", "non-localized-string", "number"},
    "number": {"number", "string", "non-localized-string"},
    "domain-value": {"domain-value", "concept", "concept-list"},
    "concept": {"concept", "concept-list", "domain-value"},
    "concept-list": {"concept", "concept-list", "domain-value"},
    "resource-instance": {"resource-instance", "resource-instance-list"},
    "resource-instance-list": {"resource-instance", "resource-instance-list"},
    "date": {"date"},
    "boolean": {"boolean"},
    "file-list": {"file-list"},
    "geojson-feature-collection": {"geojson-feature-collection", "non-localized-string"},
}

def node_label(node):
    name = node.name
    if hasattr(name, "get"):
        return name.get("en") or next(iter(name.values()), str(node.nodeid))
    return str(name)

def get_graph_options():
    return [
        {
            "graph_id": str(graph.graphid),
            "name": graph_label(graph),
        }
        for graph in GraphModel.objects.filter(isresource=True).order_by("name")
    ]
def get_graph_nodes(graph_id):
    all_nodes = list(
        Node.objects
        .filter(graph_id=graph_id)
        .order_by("sortorder", "name", "nodeid")
    )

    nodes_by_id = {
        str(node.nodeid): node
        for node in all_nodes
    }

    parent_by_node_id = {
        str(edge.rangenode_id): str(edge.domainnode_id)
        for edge in Edge.objects.filter(graph_id=graph_id)
        if edge.rangenode_id and edge.domainnode_id
    }

    nodes = [
        node for node in all_nodes
        if node.datatype != "semantic"
    ]

    return [
        {
            "node_id": str(node.nodeid),
            "name": node_label(node),
            "path": build_node_path(node, nodes_by_id, parent_by_node_id),
            "alias": node.alias or "",
            "datatype": node.datatype,
            "nodegroup_id": str(node.nodegroup_id) if node.nodegroup_id else "",
            "parentnode_id": parent_by_node_id.get(str(node.nodeid), ""),
        }
        for node in nodes
    ]

def suggest_mapping(source_graph_id, target_graph_id):
    source_nodes = get_graph_nodes(source_graph_id)
    target_nodes = get_graph_nodes(target_graph_id)


    mappings = []

    for source in source_nodes:
        scored_targets = [
            (score_target(source, target), target)
            for target in target_nodes
        ]
        scored_targets.sort(key=lambda item: item[0], reverse=True)

        best_score, target = scored_targets[0] if scored_targets else (0, None)

        enabled = bool(target) and best_score >= 80

        mappings.append({
            "source_node_id": source["node_id"],
            "source_node_name": source["name"],
            "source_node_path": source.get("path", source["name"]),
            "source_datatype": source["datatype"],
            "target_node_id": target["node_id"] if enabled else "",
            "target_node_name": target["name"] if enabled else "",
            "target_node_path": target.get("path", target["name"]) if enabled else "",
            "target_datatype": target["datatype"] if enabled else "",
            "suggestion_score": best_score,
            "enabled": enabled,
        })
    return mappings
def get_graph_info(graph_id):
    graph = GraphModel.objects.get(graphid=graph_id)
    return {
        "graph_id": str(graph.graphid),
        "name": graph_label(graph),
    }

def build_node_path(node, nodes_by_id, parent_by_node_id):
    names = []
    current = node

    while current:
        label = node_label(current)
        if label:
            names.append(label)

        parent_id = parent_by_node_id.get(str(current.nodeid))
        if not parent_id:
            break

        current = nodes_by_id.get(parent_id)

    return " > ".join(reversed(names))

def datatypes_compatible(source_type, target_type):
    return target_type in DATATYPE_COMPATIBILITY.get(source_type, {source_type})


def datatype_score(source_type, target_type):
    if source_type == target_type:
        return 40
    if datatypes_compatible(source_type, target_type):
        return 10
    return -60


def score_target(source, target):
    score = 0

    source_alias = normalize_label(source.get("alias"))
    target_alias = normalize_label(target.get("alias"))
    source_name = normalize_label(source.get("name"))
    target_name = normalize_label(target.get("name"))
    source_path = normalize_label(source.get("path"))
    target_path = normalize_label(target.get("path"))

    if source_alias and source_alias == target_alias:
        score += 100

    if source_name and source_name == target_name:
        score += 80

    if source_name and target_name:
        score += int(SequenceMatcher(None, source_name, target_name).ratio() * 50)

    if source_path and target_path:
        score += int(SequenceMatcher(None, source_path, target_path).ratio() * 30)

    score += datatype_score(source["datatype"], target["datatype"])

    return score