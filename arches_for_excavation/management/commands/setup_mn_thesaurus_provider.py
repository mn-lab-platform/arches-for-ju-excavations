import uuid
from django.core.management.base import BaseCommand
from arches.app.models.tile import Tile
from arches.app.models.models import ResourceInstance

class Command(BaseCommand):
    help = 'Registers the MN Thesaurus SPARQL provider into Arches System Settings'

    def handle(self, *args, **kwargs):
        PROVIDER_PATH = "arches_for_excavation.sparql_providers.mn_thesaurus_provider.MNThesaurusProvider"
        
        RESOURCE_ID = "a106c400-260c-11e7-a604-14109fd34195" 
        PARENT_TILE_ID = "a70b6016-5145-4513-a6be-5901944347b4" 
        NODEGROUP_ID = "c5a2b530-fadd-11e6-b5f6-6c4008b05c4c"
        NODE_ID = "c5a2ba63-fadd-11e6-9306-6c4008b05c4c"

        self.stdout.write("Checking for existing MN Thesaurus SPARQL Provider...")

        try:
            sys_settings = ResourceInstance.objects.get(resourceinstanceid=RESOURCE_ID)
        except ResourceInstance.DoesNotExist:
            self.stderr.write(self.style.ERROR("System Settings resource not found. Make sure Arches is fully initialized."))
            return

        existing_tiles = Tile.objects.filter(resourceinstance=sys_settings, nodegroup_id=NODEGROUP_ID)
        for tile in existing_tiles:
            node_data = tile.data.get(NODE_ID, {})
            en_value = node_data.get("en", {}).get("value", "")
            
            if en_value == PROVIDER_PATH:
                self.stdout.write(self.style.WARNING("MN Thesaurus provider is already configured. Skipping."))
                return

        self.stdout.write(f"Adding new provider: {PROVIDER_PATH}")
        new_tile = Tile(
            tileid=uuid.uuid4(),
            resourceinstance=sys_settings,
            nodegroup_id=NODEGROUP_ID,
            parenttile_id=PARENT_TILE_ID,
            data={
                NODE_ID: {
                    "en": {"direction": "ltr", "value": PROVIDER_PATH},
                    "en-US": {"direction": "ltr", "value": ""},
                    "ar": {"direction": "rtl", "value": ""},
                    "he": {"direction": "rtl", "value": ""}
                }
            },
            sortorder=1 
        )
        
        new_tile.save()
        self.stdout.write(self.style.SUCCESS("Successfully added MN Thesaurus Service Provider!"))