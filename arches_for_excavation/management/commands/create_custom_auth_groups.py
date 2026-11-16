from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission


class Command(BaseCommand):
    help = "Creates custom permission groups for the Arches application on startup"

    def handle(self, *args, **options):
        groups_config = {
            "Restricted Basemap Access": [],
            "Plugin Access": [],
            "Resource Viewer": [
                ("models", "view_resourceinstance"),
            ],
        }

        for group_name, permissions_list in groups_config.items():
            group, created = Group.objects.get_or_create(name=group_name)
            if created:
                self.stdout.write(
                    self.style.SUCCESS(
                        f'Successfully created group: "{group_name}"'
                    )
                )
            else:
                self.stdout.write(
                    self.style.WARNING(
                        f'Group "{group_name}" already exists, checking permissions...'
                    )
                )

            for app_label, codename in permissions_list:
                try:
                    permission = Permission.objects.get(
                        content_type__app_label=app_label,
                        codename=codename,
                    )
                except Permission.DoesNotExist:
                    self.stdout.write(
                        self.style.ERROR(
                            f'Permission "{app_label}.{codename}" does not exist!'
                        )
                    )
                    continue

                group.permissions.add(permission)
                self.stdout.write(
                    self.style.SUCCESS(
                        f'  -> Assigned "{app_label}.{codename}" '
                        f'({permission.name}) to "{group_name}"'
                    )
                )