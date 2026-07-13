# -*- coding: utf-8 -*-
"""
clear_old_context_nodes.py
==========================
Usuwa klucze starych node'ów z pola data w tiles modelu Context.

Stare node'y do wyczyszczenia:
  - d6559958  "What is the density of the soil? (old)"  domain-value
  - d655995f  "Color intensity (old)"                   concept
  - d655995e  "Color of the soil (old)"                 concept

WAŻNE: Uruchom najpierw dry-run i upewnij się że nowe pola są wypełnione!

Weryfikacja przed uruchomieniem:
  docker exec -it arches python manage.py clear_old_context_nodes

Zapis:
  docker exec -it arches python manage.py clear_old_context_nodes --apply --confirm
"""

from contextlib import nullcontext

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from arches.app.models.tile import Tile


# ---------------------------------------------------------------------------
# Node IDs
# ---------------------------------------------------------------------------

NODEGROUP_ID = "d655993d-9f52-11eb-96c4-020063fe0012"

# Stare node'y — do usunięcia z data JSON
OLD_NODES = {
    "d6559958-9f52-11eb-96c4-020063fe0012": "What is the density of the soil? (old)",
    "d655995f-9f52-11eb-96c4-020063fe0012": "Color intensity (old)",
    "d655995e-9f52-11eb-96c4-020063fe0012": "Color of the soil (old)",
}

# Nowe node'y — sprawdzamy czy są wypełnione przed czyszczeniem
NEW_NODES = {
    "a7954fb0-17a7-45ac-9eda-ba84581af5cb": "Density of the soil (new)",
    "eb5254d7-9c01-4ea6-94b1-38e56a6d4211": "Color intensit (new)",
    "5459e653-eaf8-4f41-b60a-947b062f15bf": "Color of the soil (new)",
}


# ---------------------------------------------------------------------------
# Management command
# ---------------------------------------------------------------------------

class Command(BaseCommand):
    help = "Usuwa stare node'y (old) z tiles modelu Context."

    def add_arguments(self, parser):
        parser.add_argument(
            "--apply",
            action="store_true",
            default=False,
            help="Zapisuje zmiany (domyślnie: dry-run).",
        )
        parser.add_argument(
            "--confirm",
            action="store_true",
            default=False,
            help="Wymagane razem z --apply jako potwierdzenie.",
        )
        parser.add_argument(
            "--limit",
            type=int,
            default=0,
            help="Ogranicz do N tile'ów (do testów).",
        )
        parser.add_argument(
            "--skip-verification",
            action="store_true",
            default=False,
            help="Pomiń sprawdzanie czy nowe pola są wypełnione.",
        )
        parser.add_argument(
            "--verbose",
            action="store_true",
            default=False,
        )

    def handle(self, *args, **opts):
        do_apply       = opts["apply"]
        confirmed      = opts["confirm"]
        limit          = opts["limit"]
        skip_verify    = opts["skip_verification"]
        verbose        = opts["verbose"]

        # Wymagaj --confirm przy --apply
        if do_apply and not confirmed:
            raise CommandError(
                "Przy --apply musisz też podać --confirm.\n"
                "Upewnij się że masz backup i że nowe pola są wypełnione!"
            )

        mode = "APPLY" if do_apply else "DRY-RUN"
        self.stdout.write(f"\n{'='*60}")
        self.stdout.write(f"  clear_old_context_nodes  [{mode}]")
        self.stdout.write(f"{'='*60}\n")

        # ── Weryfikacja: czy nowe pola mają dane ─────────────────────────────
        if not skip_verify:
            self.stdout.write("Weryfikacja wypełnienia nowych pól...\n")
            all_ok = True
            for new_id, new_name in NEW_NODES.items():
                count_filled = Tile.objects.filter(
                    nodegroup_id=NODEGROUP_ID,
                    data__has_key=new_id,
                ).exclude(
                    **{f"data__{new_id}": None}
                ).count()
                count_old_id = new_id.replace(
                    "a7954fb0-17a7-45ac-9eda-ba84581af5cb",
                    "d6559958-9f52-11eb-96c4-020063fe0012"
                )
                self.stdout.write(f"  {new_name}: {count_filled} tile'ów z wartością")

            # Sprawdź ile starych tile'ów ma wartość w starym polu ale nie w nowym
            self.stdout.write("")
            for old_id, old_name in OLD_NODES.items():
                # Tile'y z wartością w starym polu
                has_old = Tile.objects.filter(
                    nodegroup_id=NODEGROUP_ID,
                    data__has_key=old_id,
                ).exclude(**{f"data__{old_id}": None}).count()

                self.stdout.write(f"  Stare '{old_name}': {has_old} tile'ów z wartością")

            self.stdout.write("")

        # ── Główna pętla ──────────────────────────────────────────────────────

        # Pobierz tile'y które mają choć jeden stary klucz
        qs = Tile.objects.filter(
            nodegroup_id=NODEGROUP_ID,
        ).filter(
            data__has_any_keys=list(OLD_NODES.keys())
        )

        total = qs.count()
        scan  = min(total, limit) if limit else total
        self.stdout.write(f"Tile'y ze starymi kluczami: {total} (do przetworzenia: {scan})\n")

        if total == 0:
            self.stdout.write("  Nic do roboty — stare pola już puste. ✅\n")
            return

        stats = {
            "processed": 0,
            "changed":   0,
            "skipped":   0,
        }
        # Liczniki per node
        removed_per_node = {nid: 0 for nid in OLD_NODES}

        to_update = []

        ctx = transaction.atomic() if do_apply else nullcontext()
        with ctx:
            for tile in qs.iterator(chunk_size=200):
                if limit and stats["processed"] >= limit:
                    break

                stats["processed"] += 1
                data         = tile.data or {}
                tile_changed = False

                for old_id, old_name in OLD_NODES.items():
                    if old_id in data:
                        old_val = data.pop(old_id)  # usuń klucz z JSON
                        tile_changed = True
                        removed_per_node[old_id] += 1

                        if verbose:
                            self.stdout.write(
                                f"  [tile {tile.tileid}] usunięto '{old_name}': {old_val!r}"
                            )

                if tile_changed:
                    tile.data = data
                    to_update.append(tile)
                    stats["changed"] += 1
                else:
                    stats["skipped"] += 1

                if len(to_update) >= 200:
                    if do_apply:
                        Tile.objects.bulk_update(to_update, ["data"])
                        self.stdout.write(
                            f"  Zapisano batch, łącznie zmienionych: {stats['changed']}..."
                        )
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
        self.stdout.write(f"")
        self.stdout.write(f"  Usunięte klucze per node:")
        for nid, name in OLD_NODES.items():
            self.stdout.write(f"    {removed_per_node[nid]:4d}x  {name}")
        self.stdout.write(f"{'='*60}\n")

        if not do_apply:
            self.stdout.write(
                "  ⚠️  DRY-RUN: żadnych zmian w bazie.\n"
                "  Jeśli wyniki wyglądają OK, uruchom:\n\n"
                "  python manage.py clear_old_context_nodes --apply --confirm\n"
            )
        else:
            self.stdout.write(
                "  ✅ Gotowe. Uruchom reindeksację:\n"
                "  docker exec -it arches python manage.py es reindex_database\n"
            )