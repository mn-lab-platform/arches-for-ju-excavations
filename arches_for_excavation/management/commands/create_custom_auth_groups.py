from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group

class Command(BaseCommand):
    help = 'Creates custom permission groups for the Arches application on startup'

    def handle(self, *args, **options):
        group_names = [
            'Restricted Basemap Access',
            'Plugin Access'
        ]

        for name in group_names:
            group, created = Group.objects.get_or_create(name=name)
            
            if created:
                self.stdout.write(self.style.SUCCESS(f'Successfully created group: "{name}"'))
            else:
                self.stdout.write(self.style.WARNING(f'Group "{name}" already exists, skipping.'))