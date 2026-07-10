from uuid import uuid4

from django.core.management.base import BaseCommand
from django.db import transaction

from arches.app.models.models import CardXNodeXWidget, Concept, Relation, Value

from arches_slocal.utils.pottery.concept_lookup import (
    get_dictionary_node_ids,
    normalize_dictionary_label,
)
from arches_slocal.utils.pottery.constants import (
    POTTERY_DICTIONARY_CHRONOLOGY,
    POTTERY_DICTIONARY_FORM,
    POTTERY_DICTIONARY_MORPHOLOGY,
    POTTERY_DICTIONARY_POTTERY_TYPE,
    POTTERY_DICTIONARY_PROVENANCE,
    POTTERY_DICTIONARY_SUB_CATEGORY,
    POTTERY_DICTIONARY_TYPE,
    POTTERY_DICTIONARY_VESSEL_PART,
    POTTERY_RECORD_TYPES,
)


CONCEPT_SELECT_WIDGET_ID = "10000000-0000-0000-0000-000000000002"


POTTERY_DICTIONARIES = {
    POTTERY_DICTIONARY_POTTERY_TYPE: [
        ("Amphorae", []),
        ("Storage Vessel", []),
        ("Table Ware", []),
        ("Kitchen Ware", []),
        ("Plain Ware", []),
        ("Lamp", []),
    ],
    POTTERY_DICTIONARY_VESSEL_PART: [
        ("Rim", ["R", "rim"]),
        ("Handle", ["H", "handle"]),
        ("Base", ["B", "base"]),
        ("Wall", ["W", "wall"]),
        ("Body", ["body"]),
        ("Foot", ["foot"]),
    ],
    POTTERY_DICTIONARY_CHRONOLOGY: [
        ("AA B EH AA", []),
        ("B H AA", []),
        ("EH B", []),
        ("ER", []),
        ("ER R", []),
        ("H R", []),
        ("LH", []),
        ("LH ER", []),
        ("LH R", []),
        ("LH/ER", []),
        ("LR MH", []),
        ("MH", []),
        ("R", []),
        ("R H", ["R\nH"]),
        ("Byz", []),
    ],
    POTTERY_DICTIONARY_SUB_CATEGORY: [
        ("BG", []),
        ("CCW", []),
        ("ESA", []),
        ("Glazed", []),
    ],
    POTTERY_DICTIONARY_FORM: [
        ("Bowl", ["BOWL"]),
        ("Plate", ["PLATE"]),
    ],
    POTTERY_DICTIONARY_MORPHOLOGY: [
        ("Damaged", ["DAMAGED"]),
        ("Int. groove salt disc", ["INT. GROOVE salt disc"]),
        ("Mushroom-shaped", ["MUSHROOM-SHAPED"]),
    ],
    POTTERY_DICTIONARY_PROVENANCE: [
        ("Adriatic?", ["ADRIATIC?"]),
        ("Aegean", ["AEGEAN"]),
        ("Anemurium", ["ANEMURIUM"]),
        ("Black Sea?", ["BLACK SEA?"]),
        ("Campania", ["CAMPANIA"]),
        ("Caesarea", ["CEZAREA", "Cezarea"]),
        ("Chios Kos", []),
        ("Chios?", ["CHIOS?"]),
        ("Cilicia", ["CILICIA"]),
        ("Cilicia?", ["CILICIA?"]),
        ("Corinth", []),
        ("Crete", []),
        ("Crete?", ["CRETE?"]),
        ("Cyprus?", ["CYPRUS?"]),
        ("Ephesus", ["EPHESUS"]),
        ("Ephesus?", ["EPHESUS?"]),
        ("Knidos", ["KNIDOS"]),
        ("Kos", []),
        ("Kos?", []),
        ("Kourion", []),
        ("Levant", ["LEVANT"]),
        ("Levant?", ["LEVANT?"]),
        ("Local", []),
        ("Palestine?", ["PALESTINE?"]),
        ("Pergamon?", ["PERGAMON?"]),
        ("Rhodes", ["RHODES"]),
        ("Thasos", []),
        ("Thasos?", ["THASOS?"]),
        ("Tunisia", []),
        ("Unknown", ["UNKNOWN"]),
    ],
    POTTERY_DICTIONARY_TYPE: [
        ("1", []),
        ("2", []),
        ("6", []),
        ("2 1", ["2\n1"]),
        ("2A VAN", []),
        ("2A Van ?", []),
        ("A 5 VAN 11B 15", []),
        ("Agora G199", ["AGORA G199"]),
        ("Amrit", []),
        ("Amrit Koan", []),
        ("Beirut Agora M334", ["Beirut AGORA M334"]),
        ("Carrot-shaped", ["CARROT-SHAPED", "Carrot-SHAPED"]),
        ("Chian", []),
        ("Dressel 2-4", ["DRESSEL 2-4"]),
        ("Dressel 9", []),
        ("Greco-Italic", ["GRECO-ITALIC", "GRECO-Italic"]),
        ("Koan", ["KOAN"]),
        ("Kouriote", []),
        ("LRA 5", []),
        ("Paphos B", ["PAPHOS B"]),
        ("Pseudo-Koan", ["PSEUDO-KOAN"]),
        ("Pseudo-Koan A M334", ["PSEUDO-Koan A M334"]),
        ("Rhodian", ["RHODIAN"]),
        ("Rim", ["rim"]),
        ("Rim 1 9 11 11 15 41", ["RIM 1 9 11 11 15 41"]),
        ("Thasian", []),
        ("Unidentified", ["?"]),
    ],
}


def plain_config(config):
    if not config:
        return {}

    return {
        key: value
        for key, value in dict(config).items()
    }


def find_collection(label):
    normalized_label = normalize_dictionary_label(label)

    for value in Value.objects.filter(
        valuetype_id="prefLabel",
        concept__nodetype_id="Collection",
    ).select_related("concept"):
        if normalize_dictionary_label(value.value) == normalized_label:
            return value.concept

    return None


def find_collection_member(collection, labels):
    label_set = {normalize_dictionary_label(label) for label in labels}
    member_ids = Relation.objects.filter(
        conceptfrom=collection,
        relationtype_id="member",
    ).values_list("conceptto_id", flat=True)

    for value in Value.objects.filter(
        concept_id__in=member_ids,
        valuetype_id__in=("prefLabel", "altLabel", "hiddenLabel"),
    ).select_related("concept"):
        if normalize_dictionary_label(value.value) in label_set:
            return value.concept

    return None


def value_exists(concept, value, valuetype):
    return Value.objects.filter(
        concept=concept,
        valuetype_id=valuetype,
        value=value,
        language_id="en",
    ).exists()


class Command(BaseCommand):
    help = "Seeds pottery RDM dictionaries and optionally converts pottery nodes to concept datatype."

    def add_arguments(self, parser):
        parser.add_argument(
            "--apply",
            action="store_true",
            default=False,
            help="Write changes. Default is dry-run.",
        )
        parser.add_argument(
            "--patch-nodes",
            action="store_true",
            default=False,
            help="Also set configured pottery dictionary nodes to datatype=concept.",
        )

    def handle(self, *args, **options):
        do_apply = options["apply"]
        patch_nodes = options["patch_nodes"]
        mode = "APPLY" if do_apply else "DRY-RUN"
        created_collections = 0
        created_concepts = 0
        created_values = 0
        created_relations = 0
        patched_nodes = 0
        patched_widgets = 0
        collection_by_name = {}

        self.stdout.write(f"Seed pottery dictionaries [{mode}]")
        self.stdout.write("")

        ctx = transaction.atomic() if do_apply else transaction.atomic()
        with ctx:
            for dictionary_name, terms in POTTERY_DICTIONARIES.items():
                collection = find_collection(dictionary_name)

                if collection:
                    self.stdout.write(f"Collection exists: {dictionary_name}")
                else:
                    created_collections += 1
                    self.stdout.write(f"Create collection: {dictionary_name}")
                    collection = Concept.objects.create(
                        conceptid=uuid4(),
                        nodetype_id="Collection",
                        legacyoid=str(uuid4()),
                    )
                    Value.objects.create(
                        valueid=uuid4(),
                        concept=collection,
                        valuetype_id="prefLabel",
                        value=dictionary_name,
                        language_id="en",
                    )
                    created_values += 1

                collection_by_name[dictionary_name] = collection

                for pref_label, alt_labels in terms:
                    labels = [pref_label, *alt_labels]
                    concept = find_collection_member(collection, labels)

                    if not concept:
                        created_concepts += 1
                        created_relations += 1
                        self.stdout.write(f"  create concept: {pref_label}")
                        concept = Concept.objects.create(
                            conceptid=uuid4(),
                            nodetype_id="Concept",
                            legacyoid=str(uuid4()),
                        )
                        Relation.objects.create(
                            relationid=uuid4(),
                            conceptfrom=collection,
                            conceptto=concept,
                            relationtype_id="member",
                        )

                    if not value_exists(concept, pref_label, "prefLabel"):
                        created_values += 1
                        self.stdout.write(f"    add prefLabel: {pref_label}")
                        Value.objects.create(
                            valueid=uuid4(),
                            concept=concept,
                            valuetype_id="prefLabel",
                            value=pref_label,
                            language_id="en",
                        )

                    for alt_label in alt_labels:
                        if value_exists(concept, alt_label, "altLabel"):
                            continue

                        created_values += 1
                        self.stdout.write(f"    add altLabel: {alt_label}")
                        Value.objects.create(
                            valueid=uuid4(),
                            concept=concept,
                            valuetype_id="altLabel",
                            value=alt_label,
                            language_id="en",
                        )

                    relation_exists = Relation.objects.filter(
                        conceptfrom=collection,
                        conceptto=concept,
                        relationtype_id="member",
                    ).exists()

                    if not relation_exists:
                        created_relations += 1
                        self.stdout.write(f"    add member relation: {pref_label}")
                        Relation.objects.create(
                            relationid=uuid4(),
                            conceptfrom=collection,
                            conceptto=concept,
                            relationtype_id="member",
                        )

            if patch_nodes:
                self.stdout.write("")
                self.stdout.write("Patch graph nodes:")

                for record_type, record_config in POTTERY_RECORD_TYPES.items():
                    dictionary_fields = record_config.get("dictionary_fields", {})
                    dictionary_nodes = get_dictionary_node_ids(record_config)

                    for field, node_id in dictionary_nodes.items():
                        dictionary_name = dictionary_fields[field]
                        collection = collection_by_name.get(dictionary_name) or find_collection(dictionary_name)

                        if not collection:
                            self.stdout.write(
                                f"  skip {record_type}.{field}: missing collection {dictionary_name}"
                            )
                            continue

                        from arches.app.models.models import Node

                        node = Node.objects.get(nodeid=node_id)
                        desired_config = {
                            **plain_config(node.config),
                            "options": [],
                            "rdmCollection": str(collection.conceptid),
                        }

                        if node.datatype != "concept" or plain_config(node.config) != desired_config:
                            patched_nodes += 1
                            self.stdout.write(
                                f"  patch node {record_type}.{field}: {node.datatype} -> concept"
                            )
                            if do_apply:
                                node.datatype = "concept"
                                node.config = desired_config
                                node.save(update_fields=["datatype", "config"])

                        for widget in CardXNodeXWidget.objects.filter(node_id=node_id):
                            current_widget_config = plain_config(widget.config)
                            placeholder = current_widget_config.get("placeholder")
                            if placeholder in ("", "Enter text", None):
                                placeholder = "Select an option"

                            widget_config = {
                                **current_widget_config,
                                "options": [],
                                "placeholder": placeholder,
                                "defaultValue": "",
                                "i18n_properties": ["placeholder"],
                            }

                            if (
                                str(widget.widget_id) != CONCEPT_SELECT_WIDGET_ID
                                or current_widget_config != widget_config
                            ):
                                patched_widgets += 1
                                self.stdout.write(f"    patch widget: {widget.label}")
                                if do_apply:
                                    widget.widget_id = CONCEPT_SELECT_WIDGET_ID
                                    widget.config = widget_config
                                    widget.save(update_fields=["widget", "config"])

            if not do_apply:
                transaction.set_rollback(True)

        self.stdout.write("")
        self.stdout.write("Summary:")
        self.stdout.write(f"  collections to create: {created_collections}")
        self.stdout.write(f"  concepts to create: {created_concepts}")
        self.stdout.write(f"  values to create: {created_values}")
        self.stdout.write(f"  relations to create: {created_relations}")
        self.stdout.write(f"  nodes to patch: {patched_nodes}")
        self.stdout.write(f"  widgets to patch: {patched_widgets}")

        if not do_apply:
            self.stdout.write("")
            self.stdout.write("Dry-run only. Add --apply to write changes.")
        elif patch_nodes:
            graph_ids = ",".join(
                sorted({record_config["graph_id"] for record_config in POTTERY_RECORD_TYPES.values()})
            )
            self.stdout.write("")
            self.stdout.write("Next publish changed graphs:")
            self.stdout.write(
                f"  docker exec arches python manage.py graph publish --graphs {graph_ids} --username admin --update"
            )
