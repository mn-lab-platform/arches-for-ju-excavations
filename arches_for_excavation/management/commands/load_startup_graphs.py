import os
import json
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from arches.app.utils.data_management.resource_graphs import importer as GraphImporter


class Command(BaseCommand):
    help = 'Import Resource Models from JSON files in the startup_graphs directory.'
    STARTUP_GRAPHS_DIR = os.path.join(os.path.dirname(__file__), '..', '..', 'startup_graphs')

    def handle(self, *args, **options):
        if not os.path.exists(self.STARTUP_GRAPHS_DIR):
            self.stdout.write(self.style.ERROR(f"Directory '{self.STARTUP_GRAPHS_DIR}' does not exist."))
            return
        
        user = User.objects.filter(is_superuser=True).first()
        if not user:
            self.stdout.write(self.style.ERROR("No superuser found to assign as the graph author."))
            return

        for filename in os.listdir(self.STARTUP_GRAPHS_DIR):
            if filename.endswith('.json'):
                file_path = os.path.join(self.STARTUP_GRAPHS_DIR, filename)
                with open(file_path, 'r', encoding='utf-8') as f:
                    try:
                        data = json.load(f)

                        graphs = data.get("graph", [])
                        if not graphs:
                            self.stdout.write(self.style.WARNING(f"No 'graph' key found in {filename}"))
                            continue
                        
                        GraphImporter.import_graph(graphs, user=user)
                        self.stdout.write(self.style.SUCCESS(f"Successfully imported '{filename}'"))

                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f"Failed to import '{filename}': {e}"))