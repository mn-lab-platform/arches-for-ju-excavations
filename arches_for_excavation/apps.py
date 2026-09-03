from django.apps import AppConfig


class ArchesForExcavationConfig(AppConfig):
    name = "arches_for_excavation"
    is_arches_application = True

    def ready(self):
        from .signals import geometries_refresh
        from .signals import maplayers
