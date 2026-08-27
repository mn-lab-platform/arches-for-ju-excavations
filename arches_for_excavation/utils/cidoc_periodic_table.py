import json
import os
from functools import lru_cache
from pathlib import Path

from django.conf import settings
from rdflib import Graph, RDF, RDFS, OWL


RDF_PROPERTY = RDF.Property
RDFS_CLASS = RDFS.Class
OWL_CLASS = OWL.Class
OWL_OBJECT_PROPERTY = OWL.ObjectProperty


def get_cidoc_ontology_dir():
    return Path("/opt/venv/lib/python3.13/site-packages/arches_for_excavation") / "pkg" / "ontologies" / "cidoc_crm"


def get_ontology_config():
    ontology_dir = get_cidoc_ontology_dir()
    config_path = ontology_dir / "ontology_config.json"

    with config_path.open("r", encoding="utf-8") as config_file:
        return json.load(config_file)


def get_file_mtimes():
    ontology_dir = get_cidoc_ontology_dir()
    config = get_ontology_config()
    filenames = [config["base"]] + config.get("extensions", [])

    return tuple(
        (filename, os.path.getmtime(ontology_dir / filename))
        for filename in filenames
    )


def make_code(value):
    text = str(value)
    if "#" in text:
        text = text.rsplit("#", 1)[-1]
    if "/" in text:
        text = text.rstrip("/").rsplit("/", 1)[-1]
    return text


def get_preferred_literal(graph, subject, predicate):
    values = list(graph.objects(subject, predicate))

    for value in values:
        if getattr(value, "language", None) == "en":
            return str(value)

    if values:
        return str(values[0])

    return ""


def get_label(graph, subject):
    label = get_preferred_literal(graph, subject, RDFS.label)
    if label:
        return label

    return make_code(subject).replace("_", " ")


def get_comment(graph, subject):
    return get_preferred_literal(graph, subject, RDFS.comment)


def has_type(graph, subject, rdf_type):
    return (subject, RDF.type, rdf_type) in graph


def is_class(graph, subject):
    return (
        has_type(graph, subject, RDFS_CLASS)
        or has_type(graph, subject, OWL_CLASS)
    )


def is_property(graph, subject):
    return (
        has_type(graph, subject, RDF_PROPERTY)
        or has_type(graph, subject, OWL_OBJECT_PROPERTY)
    )


def load_graph_for_file(filename):
    ontology_dir = get_cidoc_ontology_dir()
    graph = Graph()
    graph.parse(str(ontology_dir / filename))
    return graph

def make_ref(value):
    return {
        "id": make_code(value),
        "uri": str(value),
    }


def get_refs(graph, subject, predicate):
    return [
        make_ref(value)
        for value in graph.objects(subject, predicate)
    ]


def get_class_subjects(graph):
    subjects = set(graph.subjects(RDF.type, RDFS_CLASS))
    subjects.update(graph.subjects(RDF.type, OWL_CLASS))
    return sorted(subjects, key=lambda value: make_code(value))


def get_property_subjects(graph):
    subjects = set(graph.subjects(RDF.type, RDF_PROPERTY))
    subjects.update(graph.subjects(RDF.type, OWL_OBJECT_PROPERTY))
    return sorted(subjects, key=lambda value: make_code(value))


def serialize_class(graph, subject, source_file):
    return {
        "id": make_code(subject),
        "uri": str(subject),
        "source": source_file,
        "label": get_label(graph, subject),
        "comment": get_comment(graph, subject),
        "superclasses": get_refs(graph, subject, RDFS.subClassOf),
    }


def serialize_property(graph, subject, source_file):
    code = make_code(subject)

    return {
        "id": code,
        "uri": str(subject),
        "source": source_file,
        "label": get_label(graph, subject),
        "comment": get_comment(graph, subject),
        "domain": get_refs(graph, subject, RDFS.domain),
        "range": get_refs(graph, subject, RDFS.range),
        "superproperties": get_refs(graph, subject, RDFS.subPropertyOf),
        "inverse": code.endswith("i") or "_was_" in code or "_is_" in code,
    }


def parse_ontology_file(filename):
    graph = load_graph_for_file(filename)

    classes = [
        serialize_class(graph, subject, filename)
        for subject in get_class_subjects(graph)
    ]

    properties = [
        serialize_property(graph, subject, filename)
        for subject in get_property_subjects(graph)
    ]

    return {
        "filename": filename,
        "classes": classes,
        "properties": properties,
    }
def get_ontology_filenames(config):
    return [config["base"]] + config.get("extensions", [])


def build_relationships(properties):
    relationships = []

    for ontology_property in properties:
        for domain_ref in ontology_property["domain"]:
            for range_ref in ontology_property["range"]:
                relationships.append({
                    "property": {
                        "id": ontology_property["id"],
                        "uri": ontology_property["uri"],
                        "label": ontology_property["label"],
                    },
                    "domain": domain_ref,
                    "range": range_ref,
                    "source": ontology_property["source"],
                    "inverse": ontology_property["inverse"],
                })

    return relationships


def add_subclasses(classes):
    class_by_id = {
        ontology_class["id"]: ontology_class
        for ontology_class in classes
    }

    for ontology_class in classes:
        ontology_class["subclasses"] = []

    for ontology_class in classes:
        for superclass in ontology_class["superclasses"]:
            superclass_id = superclass["id"]
            if superclass_id in class_by_id:
                class_by_id[superclass_id]["subclasses"].append({
                    "id": ontology_class["id"],
                    "uri": ontology_class["uri"],
                    "label": ontology_class["label"],
                })

    return classes


@lru_cache(maxsize=8)
def build_periodic_table_data_cached(mtimes):
    config = get_ontology_config()
    filenames = get_ontology_filenames(config)

    ontologies = []
    classes = []
    properties = []

    for filename in filenames:
        parsed = parse_ontology_file(filename)

        ontologies.append({
            "filename": filename,
            "class_count": len(parsed["classes"]),
            "property_count": len(parsed["properties"]),
        })

        classes.extend(parsed["classes"])
        properties.extend(parsed["properties"])

    classes = add_subclasses(classes)
    relationships = build_relationships(properties)

    return {
        "metadata": {
            "base": config["base"],
            "base_name": config["base_name"],
            "base_version": config["base_version"],
            "base_id": config["base_id"],
            "extensions": config.get("extensions", []),
        },
        "ontologies": ontologies,
        "classes": classes,
        "properties": properties,
        "relationships": relationships,
    }


def build_periodic_table_data():
    return build_periodic_table_data_cached(get_file_mtimes())


def _remogrillo_label(value):
    return {
        "-xml:lang": "en",
        "#text": value,
    }


def _remogrillo_ref(value):
    return {
        "-rdf:resource": value,
    }


def _remogrillo_refs(values):
    refs = [_remogrillo_ref(value["id"]) for value in values]
    if len(refs) == 1:
        return refs[0]
    return refs


def _remogrillo_class(entry):
    converted = {
        "-rdf:about": entry["id"],
        "rdfs:label": _remogrillo_label(entry["label"]),
    }

    if entry.get("comment"):
        converted["rdfs:comment"] = entry["comment"]

    if entry.get("superclasses"):
        converted["rdfs:subClassOf"] = _remogrillo_refs(entry["superclasses"])

    return converted


def _remogrillo_property(entry):
    converted = {
        "-rdf:about": entry["id"],
        "rdfs:label": _remogrillo_label(entry["label"]),
    }

    if entry.get("comment"):
        converted["rdfs:comment"] = entry["comment"]

    if entry.get("domain"):
        converted["rdfs:domain"] = _remogrillo_ref(entry["domain"][0]["id"])

    if entry.get("range"):
        converted["rdfs:range"] = _remogrillo_ref(entry["range"][0]["id"])

    if entry.get("superproperties"):
        converted["rdfs:subPropertyOf"] = _remogrillo_refs(entry["superproperties"])

    return converted


def build_remogrillo_periodic_table_json():
    data = build_periodic_table_data()

    return {
        "rdf:RDF": {
            "-xml:lang": "en",
            "-xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
            "-xmlns:rdfs": "http://www.w3.org/2000/01/rdf-schema#",
            "-xmlns:owl": "http://www.w3.org/2002/07/owl#",
            "-xml:base": "http://www.cidoc-crm.org/cidoc-crm/",
            "rdf:Property": [
                _remogrillo_property(entry)
                for entry in data["properties"]
                if entry.get("domain") and entry.get("range")
            ],
            "rdfs:Class": [
                _remogrillo_class(entry)
                for entry in data["classes"]
            ],
        }
    }
