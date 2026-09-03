from django.apps import AppConfig


class ArchesForExcavationConfig(AppConfig):
    name = "arches_for_excavation"
    is_arches_application = True

    def ready(self):
        """Register project-level Django signal handlers."""
        from . import signals  # noqa: F401
