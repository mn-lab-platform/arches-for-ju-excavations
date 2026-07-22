# -*- coding: utf-8 -*-
"""
migrate_context_color_v2.py
============================
Wypełnia pole "Color of the soil v2" (concept-list, hierarchiczny słownik)
na podstawie kombinacji:
  - NEW_COLOR_SOIL     (5459e653) — "Color of the soil"    concept-list
  - NEW_COLOR_INTENSITY (eb5254d7-9c01-4ea6-...) — "Color intensit" concept-list

Logika:
  - intensity=Dark  + color=Brown  → "Dark Brown"
  - intensity=Light + color=Brown  → "Light Brown"
  - intensity=Other + color=*      → "Other"  (Other w intensity traktujemy jak brak)
  - intensity=brak  + color=Brown  → "Brown"  (szerszy kolor)
  - color=Other                    → "Other"
  - color=brak                     → null

Słownik v2 ("Hierarchical color of the soil") — value UUIDs:
  Beige, Black, Brown, Dark Beige, Dark Black, Dark Brown, Dark Green,
  Dark Grey, Dark Red, Dark White, Dark Yellow, Green, Grey,
  Light Beige, Light Black, Light Brown, Light Green, Light Grey,
  Light Red, Light White, Light Yellow, Other, Red, White, Yellow

Uruchomienie:
  docker exec -it arches python manage.py migrate_context_color_v2
  docker exec -it arches python manage.py migrate_context_color_v2 --apply
  docker exec -it arches python manage.py migrate_context_color_v2 --apply --verbose
"""

from contextlib import nullcontext

from django.core.management.base import BaseCommand
from django.db import transaction

from arches.app.models.tile import Tile
from arches.app.models.models import Value


# ---------------------------------------------------------------------------
# Node IDs
# ---------------------------------------------------------------------------

NODEGROUP_ID        = "d655993d-9f52-11eb-96c4-020063fe0012"  # Field - Characterization

# Źródłowe (już wypełnione przez migrate_context_nodes)
NEW_COLOR_SOIL      = "970b732f-cd8b-498c-8b8c-93abf7ae0bf0"   # concept-list
NEW_COLOR_INTENSITY = "59d0a3d7-fc7a-45d9-8915-547421bb8c97"   # concept-list  ← UWAGA: 4ea6

# Docelowe
COLOR_V2_NODE       = "393904f1-8240-4eb9-9b01-e981f1bad434"   # concept-list


# ---------------------------------------------------------------------------
# Mapowania concept Value UUID → label
# (z concepts.json, kolekcje "Color of the soil" i "Color intensity")
# ---------------------------------------------------------------------------

COLOR_SOIL_VALUE_TO_LABEL = {
    "54442de7-6950-411e-8cc6-58698cdc82e6": "Black",
    "718155c0-883b-43a8-81b0-834e040290d8": "Brown",
    "c268e995-b1ea-4126-9ff7-e29c443ffbc6": "Grey",
    "d2bdb6ea-defb-4a02-adb5-5b890a70217e": "Other",
    "6fbdf8be-0fab-4bfc-90c4-d643ac6b0ea6": "Red",
    "f0154eab-a54e-48df-8980-fcd55ed42715": "White",
}

COLOR_INTENSITY_VALUE_TO_LABEL = {
    "b7670796-0b26-416e-89a0-dd0051bcb972": "Dark",
    "39e2ba8e-a30d-4dad-b0fd-5e67dd8cf190": "Light",
    "4b310f9f-e365-4bd2-a313-4ba5884fa4ff": "Other",
}


# ---------------------------------------------------------------------------
# Słownik v2: label → Value UUID
# (z concepts.json, kolekcja "Hierarchical color of the soil")
# ---------------------------------------------------------------------------

COLOR_V2_LABEL_TO_VALUE = {
    "Beige":        "35f2ca16-b3ad-4da3-a738-56c1d12bb8ec",
    "Black":        "32fc79c5-1570-4bd8-8531-4053f2cb843f",
    "Brown":        "29026988-5dfc-43d9-bded-9b88e88dc327",
    "Dark Beige":   "d05e6630-82da-42ff-9678-e6b4ba434a98",
    "Dark Black":   "d6a8f3ea-7bb4-4725-872a-9c9c95d2253f",
    "Dark Brown":   "c81fbaa4-ba05-4d6c-aabf-85c807730ba8",
    "Dark Green":   "97302a34-be24-4e92-b77d-83a1cbdf669f",
    "Dark Grey":    "b416fda3-7856-471b-b0ae-5e9326e30848",
    "Dark Red":     "50294bc8-6cf2-41e1-8be5-cb1dfbc51c4f",
    "Dark White":   "7c80d82e-a0d6-448a-9e85-45a38a3e189c",
    "Dark Yellow":  "6d9d0a16-6b55-43c1-8e4d-4cb8b0c3c4cd",
    "Green":        "e6e93ef7-f57c-4062-b521-b1d3267dc6ca",
    "Grey":         "0fbc6ba5-966c-48e2-abea-a688d445062d",
    "Light Beige":  "296d0668-266a-484b-9176-7b49fbf83ef3",
    "Light Black":  "549e8779-9881-4a50-a2cc-3c104fafd357",
    "Light Brown":  "76fcf063-767c-465f-85e8-e85d999b1c44",
    "Light Green":  "6f1a05ac-84bf-4b26-9408-68a4d10d90e2",
    "Light Grey":   "8e293485-84b5-4a2c-ba8d-5c041a696fa7",
    "Light Red":    "adb99484-fceb-45f0-b3c7-cbbf4ef2fcb4",
    "Light White":  "67e3db62-bf83-4e3d-8a22-71d3da523f14",
    "Light Yellow": "6c955500-e6a3-4fd2-ba4d-e749d5cea09d",
    "Other":        "4b310f9f-e365-4bd2-a313-4ba5884fa4ff",
    "Red":          "669b319b-6a31-4083-afe6-ed8f71b8ef5c",
    "White":        "7ee9f8dc-ca03-4d56-95df-d336e61f28cd",
    "Yellow":       "7c9c86de-87dd-4fd5-844b-5b76561e9c34",
}


# ---------------------------------------------------------------------------
# Logika mapowania
# ---------------------------------------------------------------------------

def resolve_v2_label(color_label, intensity_label):
    """
    Łączy kolor i intensywność w label dla słownika v2.

    Zasady:
      1. color=Other  LUB intensity=Other  → "Other"
      2. intensity=Dark/Light + color      → "{intensity} {color}" np. "Dark Brown"
         (jeśli kombinacja nie istnieje w słowniku → fallback do samego koloru)
      3. intensity=brak + color            → sam kolor np. "Brown"
      4. color=brak                        → None
    """
    if not color_label:
        return None

    if color_label == "Other" or intensity_label == "Other":
        return "Other"

    if intensity_label in ("Dark", "Light"):
        combined = f"{intensity_label} {color_label}"
        if combined in COLOR_V2_LABEL_TO_VALUE:
            return combined
        # Fallback: kombinacja nie istnieje → sam kolor
        return color_label if color_label in COLOR_V2_LABEL_TO_VALUE else None

    # Brak intensywności → sam kolor
    return color_label if color_label in COLOR_V2_LABEL_TO_VALUE else None


def get_first_label(value_ids, mapping):
    """
    Bierze pierwszy UUID z listy i zwraca jego label z mapping dict.
    concept-list może mieć wiele wartości, ale dla Color zazwyczaj jest jedna.
    """
    if not value_ids or not isinstance(value_ids, list):
        return None
    for vid in value_ids:
        label = mapping.get(vid)
        if label:
            return label
    return None


# ---------------------------------------------------------------------------
# Management command
# ---------------------------------------------------------------------------

class Command(BaseCommand):
    help = (
        "Wypełnia 'Color of the soil v2' na podstawie "
        "'Color of the soil' + 'Color intensit'."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--apply",
            action="store_true",
            default=False,
            help="Zapisuje zmiany (domyślnie: dry-run).",
        )
        parser.add_argument(
            "--limit",
            type=int,
            default=0,
            help="Ogranicz do N tile'ów.",
        )
        parser.add_argument(
            "--verbose",
            action="store_true",
            default=False,
            help="Szczegółowe logi.",
        )

    def handle(self, *args, **opts):
        do_apply = opts["apply"]
        limit    = opts["limit"]
        verbose  = opts["verbose"]

        mode = "APPLY" if do_apply else "DRY-RUN"
        self.stdout.write(f"\n{'='*60}")
        self.stdout.write(f"  migrate_context_color_v2  [{mode}]")
        self.stdout.write(f"{'='*60}\n")

        # Tile'y z wypełnionym Color of the soil (nowym)
        qs = Tile.objects.filter(
            nodegroup_id=NODEGROUP_ID,
        ).filter(
            data__has_key=NEW_COLOR_SOIL
        )

        total = qs.count()
        scan  = min(total, limit) if limit else total
        self.stdout.write(f"Tile'y z polem Color of the soil: {total} (do przetworzenia: {scan})\n")

        stats = {
            "processed":  0,
            "changed":    0,
            "skipped":    0,
            "no_color":   0,
            "unmapped":   0,
        }

        # Podgląd kombinacji (do raportu)
        combination_counts = {}

        to_update = []

        ctx = transaction.atomic() if do_apply else nullcontext()
        with ctx:
            for tile in qs.iterator(chunk_size=200):
                if limit and stats["processed"] >= limit:
                    break

                stats["processed"] += 1
                data = tile.data or {}

                color_ids     = data.get(NEW_COLOR_SOIL)
                intensity_ids = data.get(NEW_COLOR_INTENSITY)

                # Pobierz label pierwszej wartości (zazwyczaj jedna)
                color_label     = get_first_label(color_ids, COLOR_SOIL_VALUE_TO_LABEL)
                intensity_label = get_first_label(intensity_ids, COLOR_INTENSITY_VALUE_TO_LABEL)

                if not color_label:
                    stats["no_color"] += 1
                    continue

                v2_label = resolve_v2_label(color_label, intensity_label)

                # Statystyki kombinacji
                combo_key = f"{color_label} + {intensity_label or '(brak)'} → {v2_label or 'BRAK'}"
                combination_counts[combo_key] = combination_counts.get(combo_key, 0) + 1

                if not v2_label:
                    stats["unmapped"] += 1
                    if verbose:
                        self.stdout.write(
                            f"  [tile {tile.tileid}] NIEZMAPOWANO: "
                            f"color={color_label!r} intensity={intensity_label!r}"
                        )
                    continue

                v2_value_id  = COLOR_V2_LABEL_TO_VALUE[v2_label]
                new_v2_list  = [v2_value_id]
                current_v2   = data.get(COLOR_V2_NODE)

                if current_v2 == new_v2_list:
                    stats["skipped"] += 1
                    continue

                data[COLOR_V2_NODE] = new_v2_list
                tile.data = data
                to_update.append(tile)
                stats["changed"] += 1

                if verbose:
                    self.stdout.write(
                        f"  [tile {tile.tileid}] "
                        f"color={color_label!r} + intensity={intensity_label!r} "
                        f"→ v2={v2_label!r} ({v2_value_id})"
                    )

                if len(to_update) >= 200:
                    if do_apply:
                        Tile.objects.bulk_update(to_update, ["data"])
                        self.stdout.write(f"  Zapisano batch, łącznie: {stats['changed']}...")
                    to_update = []

            if to_update and do_apply:
                Tile.objects.bulk_update(to_update, ["data"])

        # ── Raport ────────────────────────────────────────────────────────────
        self.stdout.write(f"\n{'='*60}")
        self.stdout.write(f"  WYNIKI [{mode}]")
        self.stdout.write(f"{'='*60}")
        self.stdout.write(f"  Przetworzono : {stats['processed']}")
        self.stdout.write(f"  Zmienionych  : {stats['changed']}")
        self.stdout.write(f"  Bez zmian    : {stats['skipped']}")
        self.stdout.write(f"  Brak koloru  : {stats['no_color']}")
        self.stdout.write(f"  Niezmapowanych: {stats['unmapped']}")

        if combination_counts:
            self.stdout.write(f"\n  Kombinacje:")
            for combo, count in sorted(combination_counts.items(), key=lambda x: -x[1]):
                self.stdout.write(f"    {count:4d}x  {combo}")

        self.stdout.write(f"{'='*60}\n")

        if not do_apply:
            self.stdout.write(
                "  ⚠️  DRY-RUN: żadnych zmian w bazie.\n"
                "  Dodaj --apply żeby zapisać.\n"
            )
        else:
            self.stdout.write(
                "  ✅ Gotowe. Uruchom reindeksację:\n"
                "  docker exec -it arches python manage.py es reindex_database\n"
            )