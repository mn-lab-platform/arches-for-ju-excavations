import re
from django.core.management.base import BaseCommand
from django.db import transaction

from arches.app.models.models import GraphModel, MapLayer, MapSource
from arches.app.models.resource import Resource


OLD_RESOURCE_MODEL_GRAPH_IDS = {
    "d6559924-9f52-11eb-96c4-020063fe0012",  # Context / XXX Context legacy model
}

OLD_RESOURCE_MODEL_NAMES = {
    "Annotation",
    "Context",
    "Coordinate System",
    "Digital Resource 3D",
    "Digital Resource IIIF",
    "Special find",
    "Trench",
    "iiif-photo",
}

SCREENSHOT_RESOURCE_NAME_PATTERNS = [
    "NIEGEO",
    "coin test",
    "TEST Z RELACJA",
    "special 1",
    "nowa próba",
    "nowa proba",
    "test finalny pls",
    "XVCZXCZX",
    "aad",
    "s1e2",
    "bez resou",
    "test s1e1 geo",
    "s2e3",
    "s2e4",
    "<Name>",
    "s2e2",
    "tst resourse s2v1",
    "s3 resource O",
    "resource v2 o",
    "test aresource O",
    "T2 O",
    "testowy Anoo O",
    "test O",
    "special kamien o",
    "TEST o_<Context Number>",
    "TEST o",
]

UPLOADED_BASEMAP_TILE_RE = re.compile(r"/api/titiler/tiles/[0-9a-fA-F-]{36}/")

TEST_BASEMAP_NAME_PATTERNS = [
    "test",
    "nigeo",
    "coin",
]


def normalize_text(value):
    return re.sub(r"\s+", " ", str(value or "")).strip().casefold()


def value_matches_any(value, patterns):
    normalized = normalize_text(value)
    return any(normalize_text(pattern) in normalized for pattern in patterns)


def source_looks_uploaded(source):
    if not isinstance(source, dict):
        return False
    tiles = source.get("tiles") or []
    return any(UPLOADED_BASEMAP_TILE_RE.search(str(tile)) for tile in tiles)


def layer_definitions_look_uploaded(layerdefinitions):
    if not isinstance(layerdefinitions, list):
        return False
    return any(
        isinstance(definition, dict) and definition.get("basemap_dir")
        for definition in layerdefinitions
    )


class Command(BaseCommand):
    help = (
        "Dry-run/apply cleanup for recent uploaded basemaps, screenshot test resources, "
        "and resources from old pre-(O) data models."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--apply",
            action="store_true",
            default=False,
            help="Actually delete matched basemaps/resources. Default is dry-run.",
        )
        parser.add_argument(
            "--skip-basemaps",
            action="store_true",
            default=False,
            help="Do not include uploaded basemaps.",
        )
        parser.add_argument(
            "--skip-screenshot-resources",
            action="store_true",
            default=False,
            help="Do not include named resources visible in the screenshots.",
        )
        parser.add_argument(
            "--skip-old-models",
            action="store_true",
            default=False,
            help="Do not include resources from old, non-(O) resource models.",
        )
        parser.add_argument(
            "--basemap-name",
            action="append",
            default=[],
            help="Extra basemap name substring to include. Can be repeated.",
        )
        parser.add_argument(
            "--all-uploaded-basemaps",
            action="store_true",
            default=False,
            help="Include every basemap created through the uploaded GeoTIFF/titiler workflow. Dangerous; review dry-run first.",
        )
        parser.add_argument(
            "--resource-name",
            action="append",
            default=[],
            help="Extra resource display name substring to include. Can be repeated.",
        )
        parser.add_argument(
            "--old-model-name",
            action="append",
            default=[],
            help="Extra old graph/resource model name to include. Can be repeated.",
        )
        parser.add_argument(
            "--limit",
            type=int,
            default=0,
            help="Limit resource deletions after matching. 0 means no limit.",
        )
        parser.add_argument(
            "--no-index",
            action="store_true",
            default=False,
            help="Delete resources without updating search index.",
        )

    def handle(self, *args, **options):
        do_apply = options["apply"]
        mode = "APPLY" if do_apply else "DRY-RUN"
        self.stdout.write(self.style.WARNING(f"Cleanup test data [{mode}]"))
        if not do_apply:
            self.stdout.write("No data will be deleted. Add --apply to execute.")
        self.stdout.write("")

        basemaps = [] if options["skip_basemaps"] else self.find_basemap_candidates(options)
        resources = self.find_resource_candidates(options)

        self.print_basemap_plan(basemaps)
        self.print_resource_plan(resources)

        if not do_apply:
            self.stdout.write("")
            self.stdout.write(self.style.WARNING("Dry-run only. Review the list above, then rerun with --apply."))
            return

        with transaction.atomic():
            self.delete_basemaps(basemaps)
            self.delete_resources(resources, index=not options["no_index"])

        self.stdout.write("")
        self.stdout.write(self.style.SUCCESS("Cleanup complete."))

    def find_basemap_candidates(self, options):
        name_patterns = list(TEST_BASEMAP_NAME_PATTERNS) + list(options["basemap_name"])
        include_all_uploaded = options["all_uploaded_basemaps"]
        candidates = []

        for layer in MapLayer.objects.all().order_by("sortorder", "name"):
            source_names = self.layer_source_names(layer)
            sources = list(MapSource.objects.filter(name__in=source_names))
            uploaded_source = any(source_looks_uploaded(source.source) for source in sources)
            uploaded_layer = layer_definitions_look_uploaded(layer.layerdefinitions)
            uploaded = uploaded_source or uploaded_layer
            name_match = value_matches_any(layer.name, name_patterns) if name_patterns else False

            if (uploaded and include_all_uploaded) or name_match:
                candidates.append((layer, sources, uploaded_source, uploaded_layer, name_match))

        return candidates

    def find_resource_candidates(self, options):
        candidates_by_id = {}

        if not options["skip_old_models"]:
            old_model_names = set(OLD_RESOURCE_MODEL_NAMES)
            old_model_names.update(options["old_model_name"])
            old_graph_ids = set(OLD_RESOURCE_MODEL_GRAPH_IDS)
            for graph in GraphModel.objects.filter(isresource=True):
                if normalize_text(graph.name) in {normalize_text(name) for name in old_model_names}:
                    old_graph_ids.add(str(graph.graphid))
            old_graph_ids = list(old_graph_ids)
            for resource in Resource.objects.filter(graph_id__in=old_graph_ids).order_by("resourceinstanceid"):
                self.add_resource_candidate(candidates_by_id, resource, "old model")

        if not options["skip_screenshot_resources"]:
            patterns = list(SCREENSHOT_RESOURCE_NAME_PATTERNS) + list(options["resource_name"])
            for resource in Resource.objects.all().order_by("resourceinstanceid"):
                label = self.safe_displayname(resource)
                description = self.safe_displaydescription(resource)
                if value_matches_any(label, patterns) or value_matches_any(description, patterns):
                    self.add_resource_candidate(candidates_by_id, resource, "screenshot/name match")

        resources = list(candidates_by_id.values())
        limit = options["limit"]
        if limit and limit > 0:
            resources = resources[:limit]
        return resources

    def add_resource_candidate(self, candidates_by_id, resource, reason):
        resource_id = str(resource.resourceinstanceid)
        entry = candidates_by_id.setdefault(
            resource_id,
            {
                "resource": resource,
                "reasons": set(),
                "displayname": self.safe_displayname(resource),
                "displaydescription": self.safe_displaydescription(resource),
                "graph_name": self.graph_name(resource),
            },
        )
        entry["reasons"].add(reason)

    def print_basemap_plan(self, basemaps):
        self.stdout.write(self.style.NOTICE(f"Basemaps to delete: {len(basemaps)}"))
        for layer, sources, uploaded_source, uploaded_layer, name_match in basemaps:
            reasons = []
            if uploaded_source:
                reasons.append("uploaded source")
            if uploaded_layer:
                reasons.append("uploaded layer")
            if name_match:
                reasons.append("name match")
            source_names = ", ".join(source.name for source in sources) or "-"
            self.stdout.write(
                f"  - {layer.maplayerid} | {layer.name} | sources: {source_names} | {', '.join(reasons)}"
            )
        self.stdout.write("")

    def print_resource_plan(self, resources):
        self.stdout.write(self.style.NOTICE(f"Resources to delete: {len(resources)}"))
        by_graph = {}
        for entry in resources:
            by_graph[entry["graph_name"]] = by_graph.get(entry["graph_name"], 0) + 1

        for graph_name, count in sorted(by_graph.items()):
            self.stdout.write(f"  {graph_name}: {count}")

        self.stdout.write("")
        for entry in resources:
            resource = entry["resource"]
            self.stdout.write(
                "  - {id} | {graph} | {name} | {description} | {reasons}".format(
                    id=resource.resourceinstanceid,
                    graph=entry["graph_name"],
                    name=entry["displayname"] or "Undefined",
                    description=entry["displaydescription"] or "",
                    reasons=", ".join(sorted(entry["reasons"])),
                )
            )

    def delete_basemaps(self, basemaps):
        for layer, sources, *_ in basemaps:
            self.stdout.write(f"Deleting basemap: {layer.maplayerid} | {layer.name}")
            layer.delete()
            for source in sources:
                if not self.map_source_is_referenced(source.name):
                    self.stdout.write(f"Deleting map source: {source.name}")
                    source.delete()

    def delete_resources(self, resources, index=True):
        for entry in resources:
            resource = entry["resource"]
            self.stdout.write(f"Deleting resource: {resource.resourceinstanceid} | {entry['displayname']}")
            resource.delete(index=index)

    def layer_source_names(self, layer):
        names = []
        if isinstance(layer.layerdefinitions, list):
            for definition in layer.layerdefinitions:
                if isinstance(definition, dict) and definition.get("source"):
                    names.append(definition["source"])
        return names

    def map_source_is_referenced(self, source_name):
        for layer in MapLayer.objects.all().only("layerdefinitions"):
            if source_name in self.layer_source_names(layer):
                return True
        return False

    def safe_displayname(self, resource):
        try:
            return resource.displayname() or ""
        except Exception:
            return ""

    def safe_displaydescription(self, resource):
        try:
            return resource.displaydescription() or ""
        except Exception:
            return ""

    def graph_name(self, resource):
        try:
            return str(resource.graph.name)
        except Exception:
            return str(resource.graph_id)
