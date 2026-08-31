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
            "Workflow Launcher": "04f76d7f-b399-4efd-a1fe-981397a8813b"
        }

        for plugin_name, plugin_id in plugins_to_assign.items():
            try:
                plugin = Plugin.objects.get(pk=plugin_id)
                assign_perm('view_plugin', plugin_group, plugin)
                self.stdout.write(self.style.SUCCESS(f'Successfully granted "Plugin Access" group access to: {plugin_name}'))
            except Plugin.DoesNotExist:
                self.stdout.write(self.style.ERROR(f'Plugin "{plugin_name}" ({plugin_id}) not found.'))