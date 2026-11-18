"""Add the pottery SVG classes to Arches' standard icon selector."""

from django.core.management.base import BaseCommand
from django.db import transaction

from arches.app.models.models import Icon


POTTERY_ICONS = {
    "pottery-icon-a": "pottery - amphorae",
    "pottery-icon-kw": "pottery - kitchen ware",
    "pottery-icon-l": "pottery - lamps",
    "pottery-icon-pw": "pottery - plain ware",
    "pottery-icon-sv": "pottery - storage vessels",
    "pottery-icon-tw": "pottery - table ware",
}


class Command(BaseCommand):
    help = "Register pottery SVG classes in Arches' icon selector"

    @transaction.atomic
    def handle(self, *args, **options):
        for cssclass, name in POTTERY_ICONS.items():
            icon, created = Icon.objects.get_or_create(
                cssclass=cssclass,
                defaults={"name": name},
            )
            if not created and icon.name != name:
                icon.name = name
                icon.save(update_fields=["name"])
            action = "Added" if created else "Present"
            self.stdout.write(f"{action}: {name} ({cssclass})")
