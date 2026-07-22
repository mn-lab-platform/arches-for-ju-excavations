import io
import json
import tempfile
from pathlib import Path

from django.core.management import call_command
from django.http import JsonResponse
from django.views import View

from arches_slocal.utils.resource_mapping import (
    get_graph_info,
    get_graph_nodes,
    get_graph_options,
    suggest_mapping,
)


class StaffJsonView(View):
    def dispatch(self, request, *args, **kwargs):
        user = getattr(request, "user", None)
        if not user or not user.is_authenticated or not user.is_staff:
            return JsonResponse(
                {"status": "error", "message": "Staff user required."},
                status=403,
            )
        return super().dispatch(request, *args, **kwargs)


class ResourceMappingGraphsView(StaffJsonView):
    def get(self, request):
        return JsonResponse(
            {"graphs": get_graph_options()},
            json_dumps_params={"ensure_ascii": False},
        )


class ResourceMappingSuggestView(StaffJsonView):
    def get(self, request):
        source_graph_id = request.GET.get("source_graph_id")
        target_graph_id = request.GET.get("target_graph_id")

        if not source_graph_id or not target_graph_id:
            return JsonResponse(
                {"status": "error", "message": "Missing source_graph_id or target_graph_id."},
                status=400,
            )

        source = get_graph_info(source_graph_id)
        target = get_graph_info(target_graph_id)

        return JsonResponse(
            {
                "source_graph_id": source["graph_id"],
                "source_graph_name": source["name"],
                "target_graph_id": target["graph_id"],
                "target_graph_name": target["name"],
                "source_nodes": get_graph_nodes(source_graph_id),
                "target_nodes": get_graph_nodes(target_graph_id),
                "mappings": suggest_mapping(source_graph_id, target_graph_id),
            },
            json_dumps_params={"ensure_ascii": False},
        )


class ResourceMappingMigrateView(StaffJsonView):
    def post(self, request):
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except (json.JSONDecodeError, UnicodeDecodeError):
            return JsonResponse(
                {"status": "error", "message": "Invalid JSON payload."},
                status=400,
            )

        mapping = payload.get("mapping")
        if not isinstance(mapping, dict):
            return JsonResponse(
                {"status": "error", "message": "Missing mapping object."},
                status=400,
            )

        apply_changes = bool(payload.get("apply"))
        update_existing = bool(payload.get("update_existing"))
        limit = int(payload.get("limit") or 0)
        stdout = io.StringIO()
        tmp_path = None

        try:
            with tempfile.NamedTemporaryFile(
                mode="w",
                suffix=".json",
                prefix="resource_mapping_",
                delete=False,
                encoding="utf-8",
            ) as tmp:
                json.dump(mapping, tmp, indent=2, ensure_ascii=False)
                tmp_path = tmp.name

            call_command(
                "migrate_data",
                mapping=tmp_path,
                apply=apply_changes,
                update_existing=update_existing,
                limit=limit,
                verbose=True,
                stdout=stdout,
            )
        except Exception as exc:
            return JsonResponse(
                {
                    "status": "error",
                    "message": str(exc),
                    "output": stdout.getvalue(),
                },
                status=500,
                json_dumps_params={"ensure_ascii": False},
            )
        finally:
            if tmp_path:
                try:
                    Path(tmp_path).unlink()
                except FileNotFoundError:
                    pass

        return JsonResponse(
            {
                "status": "applied" if apply_changes else "dry-run",
                "output": stdout.getvalue(),
            },
            json_dumps_params={"ensure_ascii": False},
        )
