"""RDM audit that also recognises collections configured on node widgets."""

from __future__ import annotations

import json
from collections import defaultdict

from django.apps import apps

from arches_for_excavation.management.commands.audit_rdm_collections import Command as BaseCommand
from arches_for_excavation.management.commands.audit_rdm_collections import configured_collections


def as_json(value):
    if isinstance(value, str):
        try:
            return json.loads(value)
        except (TypeError, ValueError):
            return value
    try:
        return dict(value)
    except (TypeError, ValueError):
        return value


class Command(BaseCommand):
    help = (
        "Read-only RDM audit including rdmCollection values from both Node.config "
        "and CardXNodeXWidget.config."
    )

    @staticmethod
    def _configured_nodes(collection_ids):
        nodes_by_collection = defaultdict(set)
        for node in apps.get_model("models", "Node").objects.exclude(config=None).values("nodeid", "config"):
            for collection_id in set(configured_collections(as_json(node["config"]))) & collection_ids:
                nodes_by_collection[collection_id].add(str(node["nodeid"]))

        widget_model = apps.get_model("models", "CardXNodeXWidget")
        for widget in widget_model.objects.exclude(config=None).values("node_id", "config"):
            for collection_id in set(configured_collections(as_json(widget["config"]))) & collection_ids:
                nodes_by_collection[collection_id].add(str(widget["node_id"]))
        return nodes_by_collection
