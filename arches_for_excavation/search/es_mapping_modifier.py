"""Index related resource names for the standard Arches term search."""

from uuid import UUID

from arches.app.models.models import Node
from arches.app.models.resource import Resource
from arches.app.models.system_settings import settings
from arches.app.search.es_mapping_modifier import EsMappingModifier


RELATION_DATATYPES = ("resource-instance", "resource-instance-list")


def add_own_descriptors(document):
    """Make the resource's displayed name and description searchable as text."""
    nodegroups = {tile.nodegroup_id for tile in document["tiles"] if tile.nodegroup_id}
    provisional = document["provisional_resource"] != "false"
    existing = {
        (entry.get("string"), str(entry.get("nodegroup_id")), entry.get("language"))
        for entry in document["strings"]
    }

    for field in ("displayname", "displaydescription"):
        for descriptor in document[field]:
            value = descriptor.get("value")
            if not isinstance(value, str) or not value.strip() or value == "Undefined":
                continue

            language = descriptor.get("language")
            for nodegroup_id in nodegroups:
                key = (value, str(nodegroup_id), language)
                if key not in existing:
                    document["strings"].append(
                        {
                            "string": value,
                            "nodegroup_id": nodegroup_id,
                            "language": language,
                            "provisional": provisional,
                        }
                    )
                    existing.add(key)


class RelatedResourceNameModifier(EsMappingModifier):
    @staticmethod
    def add_search_terms(resourceinstance, document, terms):
        add_own_descriptors(document)

        relation_nodeids = {
            str(nodeid)
            for nodeid in Node.objects.filter(
                graph_id=resourceinstance.graph_id,
                datatype__in=RELATION_DATATYPES,
            ).values_list("nodeid", flat=True)
        }
        if not relation_nodeids:
            return

        references = []
        for tile in document["tiles"]:
            values = [(tile.data, False)]
            for edit in (tile.provisionaledits or {}).values():
                if edit.get("status") == "review":
                    values.append((edit.get("value") or {}, True))

            for data, provisional in values:
                for nodeid in relation_nodeids.intersection(data):
                    nodevalue = data[nodeid]
                    items = nodevalue if isinstance(nodevalue, list) else [nodevalue]
                    for item in items:
                        if (
                            isinstance(item, dict)
                            and item.get("resourceId")
                            and not item.get("resourceName")
                        ):
                            try:
                                resourceid = str(UUID(str(item["resourceId"])))
                            except (TypeError, ValueError, AttributeError):
                                continue
                            references.append((tile, str(nodeid), resourceid, provisional))

        if not references:
            return

        related_resources = {
            str(resource.pk): resource
            for resource in Resource.objects.filter(
                pk__in={resourceid for _, _, resourceid, _ in references}
            )
        }
        names = {}
        for resourceid, resource in related_resources.items():
            names[resourceid] = []
            seen = set()
            for language, _ in settings.LANGUAGES:
                name = resource.displayname({"language": language})
                if name and name != "Undefined" and name not in seen:
                    names[resourceid].append((language, name))
                    seen.add(name)

        for tile, nodeid, resourceid, provisional in references:
            for language, name in names.get(str(resourceid), []):
                document["strings"].append(
                    {
                        "string": name,
                        "nodegroup_id": tile.nodegroup_id,
                        "provisional": provisional,
                    }
                )
                terms.append(
                    {
                        "_id": f"related-name:{tile.tileid}:{nodeid}:{resourceid}:{language}:{provisional}",
                        "_source": {
                            "value": name,
                            "nodeid": nodeid,
                            "nodegroupid": tile.nodegroup_id,
                            "tileid": tile.tileid,
                            "language": language,
                            "resourceinstanceid": resourceinstance.resourceinstanceid,
                            "provisional": provisional,
                        },
                    }
                )
