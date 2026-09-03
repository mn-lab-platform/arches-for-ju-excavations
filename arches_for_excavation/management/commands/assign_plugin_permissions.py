from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group
from arches.app.models.models import Plugin
from guardian.shortcuts import assign_perm

class Command(BaseCommand):
    help = 'Assigns permissions for specific plugins to custom groups'

    def handle(self, *args, **options):
        try:
            plugin_group = Group.objects.get(name='Plugin Access')
        except Group.DoesNotExist:
            self.stdout.write(self.style.ERROR('Group "Plugin Access" does not exist.'))
            return

        plugins_to_assign = {
            "Map Plugin": "d5f0b4b7-07a9-4c5b-9c9b-b51e4828d211",
            "3D Plugin": "d5f0b4b7-07a9-4c5b-9c9b-b51e4828d218",
            "Workflow Launcher": "04f76d7f-b399-4efd-a1fe-981397a8813b",
            "Basemap Addition": "299d7d8f-bf50-4162-8ffd-9b9789cafed2",
            "GNSS/Total Station Data Import Workflow": "6cf9f4ff-b9f4-4268-95d9-a3b883bbfeca",
            "CRS Assignment Workflow": "86aea2a5-4298-46d6-ae1d-fd7d84d2ad35",
            "CRS Workflow": "34fae378-9f3f-424e-a209-0dbc66c77ccb",
            "IIIF resource addition": "d5f0b4b7-07a9-4c5b-9c9b-b51e4828d2fd",
            "IIIF annotation workflow": "f5bad586-b7c5-44a5-9781-072557c2e4c5",
            "IIIF resource append": "6b863ca5-9f51-4b57-9a29-5f0e6961ea73",
            "IIIF RTI resource addition": "f2efb087-c39b-46ab-b5b8-0c53c9d6b6e1",
            "Digital Resource 3D Addition": "492615d2-865f-496f-8ab1-257842794a32",
            "Digital Resource 3D Annotation Workflow": "7956078c-e25e-4e23-bec9-104e60a72b2d",
            "Pottery CSV Upload Workflow": "2a55a8e2-0219-4f9f-a87e-3efb2d72f9ef",
            "Pottery Record Import Workflow": "8e6a63b9-24f1-4cf3-aac2-9b4f2a95d7d1",
        }

        for plugin_name, plugin_id in plugins_to_assign.items():
            try:
                plugin = Plugin.objects.get(pk=plugin_id)
                assign_perm('view_plugin', plugin_group, plugin)
                self.stdout.write(self.style.SUCCESS(f'Successfully granted "Plugin Access" group access to: {plugin_name}'))
            except Plugin.DoesNotExist:
                self.stdout.write(self.style.ERROR(f'Plugin "{plugin_name}" ({plugin_id}) not found.'))