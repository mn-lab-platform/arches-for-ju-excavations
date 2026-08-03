"""Attach the shared chronology expansion function to pottery resource models."""

from collections import Counter
import re

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from arches.app.models.models import Function, FunctionXGraph, GraphModel, Node
from arches.app.models.tile import Tile
from arches_for_excavation.functions.chronology_expantion import (
    PotteryChronologyExpansionFunction,
    details,
)


DATE_NODE_NAMES = {
    "earliest_date": "Earliest date",
    "latest_start_date": "Latest start date",
    "earliest_end_date": "Earliest end date",
    "latest_date": "Latest date",
}


class Command(BaseCommand):
    help = (
        "Discover pottery chronology cards, attach the shared expansion "
        "function, and optionally backfill existing tiles."
    )

    def add_arguments(self, parser):
        parser.add_argument("--apply", action="store_true")
        parser.add_argument(
            "--backfill",
            action="store_true",
            help="Recalculate dates on existing chronology tiles (requires --apply).",
        )
        parser.add_argument(
            "--graph-id",
            action="append",
            default=[],
            help="Limit to a graph UUID. Can be repeated.",
        )

    def handle(self, *args, **options):
        apply = options["apply"]
        backfill = options["backfill"]
        if backfill and not apply:
            raise CommandError("--backfill requires --apply")
        graph_queryset = GraphModel.objects.filter(isresource=True)
        if options["graph_id"]:
            graphs = list(graph_queryset.filter(graphid__in=options["graph_id"]))
        else:
            graphs = [
                graph
                for graph in graph_queryset
                if graph.publication_id is not None
                and re.match(
                    r"^\(O\) Pottery (Collection|Record -)",
                    str(graph.name),
                    flags=re.IGNORECASE,
                )
            ]

        function = Function.objects.filter(functionid=details["functionid"]).first()
        if function is None:
            raise CommandError(
                "Expand Pottery Chronology is not registered. Run: "
                "python manage.py fn register"
            )

        mode = "APPLY" if apply else "DRY-RUN"
        self.stdout.write(f"Configure pottery chronology [{mode}]")
        totals = Counter()

        for graph in sorted(graphs, key=lambda item: str(item.name)):
            mappings = self._discover_mappings(graph)
            if not mappings:
                self.stdout.write(f"  {graph.name}: no complete chronology card")
                totals["graphs_skipped"] += 1
                continue

            config = {
                "triggering_nodegroups": list(mappings),
                "node_mappings": mappings,
            }
            invalid_edtf_nodes = list(
                Node.objects.filter(
                    graph=graph,
                    datatype="edtf",
                    config__has_key="rdmCollection",
                )
            )

            existing = FunctionXGraph.objects.filter(
                function=function,
                graph=graph,
            ).first()
            action = "update" if existing else "create"
            self.stdout.write(
                f"  {graph.name}: {action} mapping for {len(mappings)} card(s); "
                f"clean {len(invalid_edtf_nodes)} EDTF config(s)"
            )

            if apply:
                with transaction.atomic():
                    for node in invalid_edtf_nodes:
                        node.config = dict(node.config or {})
                        node.config.pop("rdmCollection", None)
                        node.save(update_fields=["config"])

                    registration, _ = FunctionXGraph.objects.update_or_create(
                        function=function,
                        graph=graph,
                        defaults={"config": config},
                    )

                totals[f"registrations_{action}d"] += 1
            else:
                registration = existing

            totals["graphs_configured"] += 1
            totals["chronology_cards"] += len(mappings)
            totals["edtf_configs_cleaned"] += len(invalid_edtf_nodes)

            if backfill:
                changed, unchanged = self._backfill_graph(graph, config)
                totals["tiles_backfilled"] += changed
                totals["tiles_unchanged"] += unchanged
                self.stdout.write(
                    f"    backfill: {changed} changed, {unchanged} unchanged"
                )

        self.stdout.write("Summary:")
        for key in (
            "graphs_configured",
            "graphs_skipped",
            "chronology_cards",
            "registrations_created",
            "registrations_updated",
            "edtf_configs_cleaned",
            "tiles_backfilled",
            "tiles_unchanged",
        ):
            self.stdout.write(f"  {key}: {totals[key]}")
        if not apply:
            self.stdout.write("Dry-run only. Add --apply, optionally with --backfill.")

    @staticmethod
    def _discover_mappings(graph):
        mappings = {}
        period_nodes = Node.objects.filter(
            graph=graph,
            name__iexact="Period",
            datatype__in=("concept", "concept-list"),
        ).exclude(nodegroup_id=None)

        for period_node in period_nodes:
            nodes = list(Node.objects.filter(nodegroup_id=period_node.nodegroup_id))
            nodes_by_name = {node.name.casefold(): node for node in nodes}
            mapping = {"period_node": str(period_node.nodeid)}
            complete = True
            for field, node_name in DATE_NODE_NAMES.items():
                node = nodes_by_name.get(node_name.casefold())
                if node is None or node.datatype != "edtf":
                    complete = False
                    break
                mapping[field] = str(node.nodeid)
            if complete:
                mappings[str(period_node.nodegroup_id)] = mapping

        return mappings

    @staticmethod
    def _backfill_graph(graph, config):
        function = PotteryChronologyExpansionFunction(config=config)
        changed = 0
        unchanged = 0

        for nodegroup_id, mapping in config["node_mappings"].items():
            tiles = Tile.objects.filter(
                resourceinstance__graph=graph,
                nodegroup_id=nodegroup_id,
                data__has_key=mapping["period_node"],
            )
            for tile in tiles.iterator():
                before = dict(tile.data or {})
                function.save(
                    tile,
                    context={"force_chronology_expansion": True},
                )
                if tile.data == before:
                    unchanged += 1
                    continue
                tile.save()
                changed += 1

        return changed, unchanged
