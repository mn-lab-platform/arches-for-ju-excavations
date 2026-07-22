# -*- coding: utf-8 -*-
"""
migrate_context_nodes.py
========================
Migruje wartości ze starych node'ów do nowych concept-list node'ów
w modelu "Context" (Arches 8.x).

Stare pola:
  - d6559958  "What is the density of the soil? (old)"  -> domain-value
  - d655995f  "Color intensity (old)"                   -> concept (single)
  - d655995e  "Color of the soil (old)"                 -> concept (single)

Nowe pola:
  - a7954fb0  "Density of the soil"    -> concept-list
  - eb5254d7-9c01-4ea6-...  "Color intensit"   -> concept-list
  - 5459e653  "Color of the soil"      -> concept-list

Uruchomienie (dry-run):
  docker exec -it arches python manage.py migrate_context_nodes

Uruchomienie (zapis):
  docker exec -it arches python manage.py migrate_context_nodes --apply

Opcje:
  --apply       zapisuje zmiany do bazy (domyślnie dry-run)
  --limit N     ogranicz do N tiles (do testów)
  --verbose     wyświetlaj szczegóły każdego tile
"""

import json
from contextlib import nullcontext

from django.core.management.base import BaseCommand
from django.db import transaction

from arches.app.models.tile import Tile
from arches.app.models.models import Value


# ---------------------------------------------------------------------------
# Identyfikatory node'ów
# ---------------------------------------------------------------------------

NODEGROUP_ID = "d655993d-9f52-11eb-96c4-020063fe0012"  # Field - Characterization

# Stare node'y
OLD_DENSITY_NODE      = "d6559958-9f52-11eb-96c4-020063fe0012"  # domain-value
OLD_COLOR_INTENSITY   = "d655995f-9f52-11eb-96c4-020063fe0012"  # concept (single)
OLD_COLOR_SOIL        = "d655995e-9f52-11eb-96c4-020063fe0012"  # concept (single)

# Nowe node'y (concept-list)
NEW_DENSITY_NODE      = "37a2f4e3-bf7a-4bca-a9cb-9dbb3c47ea5a"
NEW_COLOR_INTENSITY   = "59d0a3d7-fc7a-45d9-8915-547421bb8c97"  
NEW_COLOR_SOIL        = "970b732f-cd8b-498c-8b8c-93abf7ae0bf0"


# ---------------------------------------------------------------------------
# Mapowanie domain-value ID -> label (dla OLD_DENSITY_NODE)
# Wartości wprost z konfiguracji node'a w graph JSON
# ---------------------------------------------------------------------------

DENSITY_DOMAIN_OPTIONS = {
    "17c537c9-8c44-41d6-a6ab-c9019ff5b3fc": "Very hard",
    "1afb30f5-319c-4503-9b64-69e75721bab0": "Normal",
    "9e3f4a26-3841-4925-b54a-92dd57fc838c": "Hard",
    "daedc1fe-183e-4cb9-b447-77be7df52776": "Soft",
    "dd0b02fc-5f07-4855-84fa-77fdf83eeabb": "Very soft",
}

# Mapowanie label -> nowy concept Value UUID (z concepts.json "Soil density")
DENSITY_LABEL_TO_NEW_VALUE = {
    "Hard":      "c7ad532f-a699-4e34-863c-7960db028987",
    "Normal":    "cd81009d-55bb-435f-acd1-fc782ce83ae8",
    "Soft":      "32297674-95f8-41a2-9d9c-c349372e5e35",
    "Very hard": "07b4e46c-6b29-4a92-87b5-c8b157ced95f",
    "Very soft": "d9d31dc9-1f48-4977-bd80-6b5c36a4e241",
}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def is_valid_uuid(s):
    return isinstance(s, str) and len(s) == 36 and s.count("-") == 4


def is_concept_value(valueid):
    """Sprawdza czy valueid istnieje w tabeli Value i ma concept_id."""
    if not is_valid_uuid(valueid):
        return False
    return Value.objects.filter(valueid=valueid, concept_id__isnull=False).exists()


def map_density_domain_value(old_val):
    """
    Stary density to domain-value — wartość to string UUID opcji domenowej.
    Zwraca nowy concept-list UUID lub None.
    """
    if not is_valid_uuid(old_val):
        return None
    label = DENSITY_DOMAIN_OPTIONS.get(old_val)
    if not label:
        return None
    return DENSITY_LABEL_TO_NEW_VALUE.get(label)


def coerce_to_list(val):
    """
    Stare concept (single) pole może mieć wartość string lub listę.
    Zwraca listę lub None.
    """
    if val is None or val == "" or val == []:
        return None
    if isinstance(val, list):
        cleaned = [v for v in val if is_valid_uuid(v)]
        return cleaned if cleaned else None
    if isinstance(val, str) and is_valid_uuid(val):
        return [val]
    return None


# ---------------------------------------------------------------------------
# Management command
# ---------------------------------------------------------------------------

class Command(BaseCommand):
    help = "Migruje dane ze starych node'ów Context do nowych concept-list node'ów."

    def add_arguments(self, parser):
        parser.add_argument(
            "--apply",
            action="store_true",
            default=False,
            help="Zapisuje zmiany do bazy (domyślnie: dry-run).",
        )
        parser.add_argument(
            "--limit",
            type=int,
            default=0,
            help="Ogranicz przetwarzanie do N tile'ów (0 = bez limitu).",
        )
        parser.add_argument(
            "--verbose",
            action="store_true",
            default=False,
            help="Wyświetla szczegółowe informacje o każdym tile.",
        )

    def handle(self, *args, **opts):
        do_apply = opts["apply"]
        limit    = opts["limit"]
        verbose  = opts["verbose"]

        mode = "APPLY" if do_apply else "DRY-RUN"
        self.stdout.write(f"\n{'='*60}")
        self.stdout.write(f"  Tryb: {mode}")
        if limit:
            self.stdout.write(f"  Limit: {limit} tile'ów")
        self.stdout.write(f"{'='*60}\n")

        # Pobierz tylko tile'y które mają choć jeden ze starych node'ów
        qs = Tile.objects.filter(
            nodegroup_id=NODEGROUP_ID,
        ).filter(
            # co najmniej jedno stare pole nie jest puste
            data__has_any_keys=[OLD_DENSITY_NODE, OLD_COLOR_INTENSITY, OLD_COLOR_SOIL]
        )

        total = qs.count()
        scan  = min(total, limit) if limit else total
        self.stdout.write(f"Znaleziono {total} tile'ów ze starymi danymi (do przetworzenia: {scan})\n")

        stats = {
            "processed":   0,
            "changed":     0,
            "skipped":     0,
            # density
            "density_ok":       0,
            "density_already":  0,
            "density_unmapped": 0,
            "density_empty":    0,
            # color soil
            "color_soil_ok":      0,
            "color_soil_already": 0,
            "color_soil_invalid": 0,
            "color_soil_empty":   0,
            # color intensity
            "color_int_ok":      0,
            "color_int_already": 0,
            "color_int_invalid": 0,
            "color_int_empty":   0,
        }

        to_update = []

        ctx = transaction.atomic() if do_apply else nullcontext()
        with ctx:
            for tile in qs.iterator(chunk_size=200):
                if limit and stats["processed"] >= limit:
                    break

                stats["processed"] += 1
                data         = tile.data or {}
                tile_changed = False

                # ── 1. DENSITY: domain-value → concept-list ──────────────────
                old_density = data.get(OLD_DENSITY_NODE)
                if old_density and old_density != "":
                    new_density_val = map_density_domain_value(old_density)
                    if new_density_val:
                        current_new = data.get(NEW_DENSITY_NODE)
                        if current_new != [new_density_val]:
                            data[NEW_DENSITY_NODE] = [new_density_val]
                            tile_changed = True
                            stats["density_ok"] += 1
                            if verbose:
                                self.stdout.write(
                                    f"  [tile {tile.tileid}] density: {old_density!r} "
                                    f"→ label='{DENSITY_DOMAIN_OPTIONS.get(old_density)}' "
                                    f"→ {new_density_val}"
                                )
                        else:
                            stats["density_already"] += 1
                    else:
                        stats["density_unmapped"] += 1
                        if verbose:
                            self.stdout.write(
                                f"  [tile {tile.tileid}] density: NIE ZMAPOWANO {old_density!r}"
                            )
                else:
                    stats["density_empty"] += 1

                # ── 2. COLOR OF THE SOIL: concept (single) → concept-list ────
                old_color = data.get(OLD_COLOR_SOIL)
                if old_color and old_color != "":
                    color_list = coerce_to_list(old_color)
                    if color_list and all(is_concept_value(v) for v in color_list):
                        current_new = data.get(NEW_COLOR_SOIL)
                        if current_new != color_list:
                            data[NEW_COLOR_SOIL] = color_list
                            tile_changed = True
                            stats["color_soil_ok"] += 1
                            if verbose:
                                self.stdout.write(
                                    f"  [tile {tile.tileid}] color_soil: {old_color!r} → {color_list}"
                                )
                        else:
                            stats["color_soil_already"] += 1
                    else:
                        stats["color_soil_invalid"] += 1
                        if verbose:
                            self.stdout.write(
                                f"  [tile {tile.tileid}] color_soil: NIEPOPRAWNA wartość {old_color!r}"
                            )
                else:
                    stats["color_soil_empty"] += 1

                # ── 3. COLOR INTENSITY: concept (single) → concept-list ──────
                old_intensity = data.get(OLD_COLOR_INTENSITY)
                if old_intensity and old_intensity != "":
                    intensity_list = coerce_to_list(old_intensity)
                    if intensity_list and all(is_concept_value(v) for v in intensity_list):
                        current_new = data.get(NEW_COLOR_INTENSITY)
                        if current_new != intensity_list:
                            data[NEW_COLOR_INTENSITY] = intensity_list
                            tile_changed = True
                            stats["color_int_ok"] += 1
                            if verbose:
                                self.stdout.write(
                                    f"  [tile {tile.tileid}] color_intensity: {old_intensity!r} → {intensity_list}"
                                )
                        else:
                            stats["color_int_already"] += 1
                    else:
                        stats["color_int_invalid"] += 1
                        if verbose:
                            self.stdout.write(
                                f"  [tile {tile.tileid}] color_intensity: NIEPOPRAWNA wartość {old_intensity!r}"
                            )
                else:
                    stats["color_int_empty"] += 1

                # ── Zapisz tile ───────────────────────────────────────────────
                if tile_changed:
                    tile.data = data
                    to_update.append(tile)
                    stats["changed"] += 1
                else:
                    stats["skipped"] += 1

                # Flush co 200
                if len(to_update) >= 200:
                    if do_apply:
                        Tile.objects.bulk_update(to_update, ["data"])
                        self.stdout.write(f"  Zapisano {stats['changed']} tile'ów...")
                    to_update = []

            # Ostatni flush
            if to_update and do_apply:
                Tile.objects.bulk_update(to_update, ["data"])

        # ── Raport ────────────────────────────────────────────────────────────
        self.stdout.write(f"\n{'='*60}")
        self.stdout.write(f"  WYNIKI ({mode})")
        self.stdout.write(f"{'='*60}")
        self.stdout.write(f"  Przetworzono tile'ów : {stats['processed']}")
        self.stdout.write(f"  Zmienionych          : {stats['changed']}")
        self.stdout.write(f"  Bez zmian            : {stats['skipped']}")
        self.stdout.write(f"")
        self.stdout.write(f"  DENSITY (domain-value → concept-list):")
        self.stdout.write(f"    Zmapowanych OK     : {stats['density_ok']}")
        self.stdout.write(f"    Już ustawionych    : {stats['density_already']}")
        self.stdout.write(f"    Niezmapowanych     : {stats['density_unmapped']}")
        self.stdout.write(f"    Pustych            : {stats['density_empty']}")
        self.stdout.write(f"")
        self.stdout.write(f"  COLOR OF THE SOIL (concept → concept-list):")
        self.stdout.write(f"    Przeniesiono OK    : {stats['color_soil_ok']}")
        self.stdout.write(f"    Już ustawionych    : {stats['color_soil_already']}")
        self.stdout.write(f"    Niepoprawnych      : {stats['color_soil_invalid']}")
        self.stdout.write(f"    Pustych            : {stats['color_soil_empty']}")
        self.stdout.write(f"")
        self.stdout.write(f"  COLOR INTENSITY (concept → concept-list):")
        self.stdout.write(f"    Przeniesiono OK    : {stats['color_int_ok']}")
        self.stdout.write(f"    Już ustawionych    : {stats['color_int_already']}")
        self.stdout.write(f"    Niepoprawnych      : {stats['color_int_invalid']}")
        self.stdout.write(f"    Pustych            : {stats['color_int_empty']}")
        self.stdout.write(f"{'='*60}\n")

        if not do_apply:
            self.stdout.write(
                "  ⚠️  DRY-RUN: żadnych zmian w bazie.\n"
                "  Dodaj --apply żeby zapisać zmiany.\n"
            )
        else:
            self.stdout.write(
                "  ✅ Zmiany zapisane. Uruchom reindeksację:\n"
                "  docker exec -it arches python manage.py es reindex_database\n"
            )