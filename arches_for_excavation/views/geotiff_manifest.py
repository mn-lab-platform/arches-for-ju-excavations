# views_manifest.py
import json
import uuid
import requests
from pathlib import Path
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.http import JsonResponse, Http404
from django.utils.text import get_valid_filename
import re
from urllib.parse import unquote

def _manifest_dir(resource_name: str, resource_id: str) -> Path:
    # Store inside: {resource_name}_{resource_id}/manifest/
    safe_name = get_valid_filename(resource_name or "unnamed")
    root = Path(getattr(settings, "RASTER_DATA_DIR"))
    p = root / f"{safe_name}_{resource_id}" / "manifest"
    p.mkdir(parents=True, exist_ok=True)
    return p

def _public_manifest_url(resource_id: str) -> str:
    return f"/api/iiif/geotiff-manifest/{resource_id}"

def _fetch_info(service_url: str) -> dict:

    u = service_url.rstrip("/") + "/info.json"
    r = requests.get(u, timeout=10)
    r.raise_for_status()
    return r.json()

def _iiif_lang(v) -> dict:
    return {"en": [str(v)]}


def _to_iiif_metadata(meta: dict) -> list:
    """
    Convert flat/nested dict into IIIF v3 metadata array:
    [{ "label": {"en": ["key"]}, "value": {"en": ["value"]} }]
    """
    out = []
    if not isinstance(meta, dict):
        return out

    def walk(obj, prefix=""):
        if isinstance(obj, dict):
            for k, v in obj.items():
                key = f"{prefix}.{k}" if prefix else str(k)
                walk(v, key)
        elif isinstance(obj, list):
            out.append({"label": _iiif_lang(prefix), "value": _iiif_lang(json.dumps(obj, ensure_ascii=False))})
        else:
            out.append({"label": _iiif_lang(prefix), "value": _iiif_lang(obj)})

    walk(meta)
    return out

class BuildGeoTiffManifestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        rid = request.data.get("resource_id")
        resource_name = request.data.get("resource_name")
        label = request.data.get("label") or "GeoTIFF manifest"
        items = request.data.get("items") or []

        if not rid or not isinstance(items, list) or not items:
            return Response({"error": "resource_id and non-empty items are required"}, status=400)

        manifest_id = _public_manifest_url(rid)

        canvases = []
        for i, it in enumerate(items):
            svc = (it.get("iiif_service_url") or "").rstrip("/")
            if not svc:
                continue
            try:
                info = _fetch_info(svc)
                w = int(info.get("width") or 1)
                h = int(info.get("height") or 1)
            except Exception:
                w, h = 1, 1  

            canvas_id = f"{manifest_id}/canvas/{i+1}"
            page_id = f"{canvas_id}/page/1"
            ann_id = f"{page_id}/annotation/1"
            body_image_id = svc + "/full/max/0/default.jpg"

            canvas = {
                "id": canvas_id,
                "type": "Canvas",
                "width": w,
                "height": h,
                "label": {"en": [it.get("label") or f"Item {i+1}"]},
                "items": [{
                    "id": page_id,
                    "type": "AnnotationPage",
                    "items": [{
                        "id": ann_id,
                        "type": "Annotation",
                        "motivation": "painting",
                        "target": canvas_id,
                        "body": {
                            "id": body_image_id,
                            "type": "Image",
                            "format": "image/jpeg",
                            "service": [{
                                "id": svc,
                                "type": "ImageService3",
                                "profile": "level2"
                            }]
                        }
                    }]
                }]
            }

            # NEW: attach per-file metadata (from item.metadata)
            iiif_meta = _to_iiif_metadata(it.get("metadata") or {})
            if iiif_meta:
                canvas["metadata"] = iiif_meta

            canvases.append(canvas)

        if not canvases:
            return Response({"error": "No valid iiif_service_url items"}, status=400)

        manifest = {
            "@context": "http://iiif.io/api/presentation/3/context.json",
            "id": manifest_id,
            "type": "Manifest",
            "label": {"en": [label]},
            "items": canvases
        }

        out = _manifest_dir(resource_name, rid) / f"{rid}.json"
        out.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

        return Response({"manifest_url": manifest_id}, status=status.HTTP_201_CREATED)
    

class GetGeoTiffManifestView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, resource_id: str):
        # Try to read from any "{name}_{resource_id}/manifest/{resource_id}.json"
        root = Path(getattr(settings, "RASTER_DATA_DIR"))
        matches = list(root.glob(f"*_{resource_id}/manifest/{resource_id}.json"))
        if not matches:
            raise Http404("Manifest not found")
        p = matches[0]
        data = json.loads(p.read_text(encoding="utf-8"))
        return JsonResponse(data, safe=False)
    
# --- Manifest editing (override on disk) ------------------------------------
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from django.utils.timezone import now

def _get_data_root() -> Path:
    return Path(getattr(settings, "RASTER_DATA_DIR"))
def _manifest_override_dir() -> Path:
    # trzymamy obok rastrów, żeby TiTiler/Twoje serwisy miały wspólny storage
    return _get_data_root() / "manifests"

def _generated_manifest_path(resource_id: str) -> Path | None:
    root = Path(getattr(settings, "RASTER_DATA_DIR"))
    matches = list(root.glob(f"*_{resource_id}/manifest/{resource_id}.json"))
    return matches[0] if matches else None  

def _manifest_override_path(resource_name: str, resource_id: str) -> Path:
    # Zapisuj override w tym samym katalogu co manifest generowany
    return _manifest_dir(resource_name, resource_id) / f"{resource_id}.json"

def _ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)

def _atomic_write_json(path: Path, data: dict) -> None:
    _ensure_dir(path.parent)
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    tmp.replace(path)

def _find_canvas(manifest: dict, canvas_id: str) -> dict | None:
    items = manifest.get("items") or []
    for c in items:
        if c.get("id") == canvas_id:
            return c
    return None

def _ensure_annotation_page(canvas: dict) -> dict:
    """
    Ensures canvas.annotations exists and first page is embedded with items[].
    Returns the first annotation page object.
    """
    anns = canvas.get("annotations")
    if not isinstance(anns, list):
        anns = []
        canvas["annotations"] = anns

    # find first embedded page with items
    for p in anns:
      if isinstance(p, dict) and isinstance(p.get("items"), list):
        return p

    # create a new embedded page
    page_id = f"{canvas.get('id','')}/annotation-page/1"
    page = {
        "id": page_id,
        "type": "AnnotationPage",
        "items": []
    }
    anns.append(page)
    return page

def _upsert_annotation_v3(manifest: dict, canvas_id: str, annotation: dict) -> dict:
    """
    Upsert by annotation.id; if missing id -> generate one.
    Stores annotation inside Canvas.annotations[0].items[].
    """
    if not isinstance(manifest, dict):
        raise ValueError("Manifest must be a JSON object")
    if not canvas_id:
        raise ValueError("Missing canvas_id")
    canvas = _find_canvas(manifest, canvas_id)
    if not canvas:
        raise ValueError(f"Canvas not found: {canvas_id}")

    page = _ensure_annotation_page(canvas)

    anno = dict(annotation or {})
    anno_id = anno.get("id") or f"{canvas_id}/annotation/{uuid.uuid4()}"
    anno["id"] = anno_id
    anno.setdefault("type", "Annotation")

    # NOTE: minimal safety
    if "target" not in anno:
        anno["target"] = canvas_id

    items = page.get("items")
    if not isinstance(items, list):
        page["items"] = []
        items = page["items"]

    # replace if exists
    for i, a in enumerate(items):
        if isinstance(a, dict) and a.get("id") == anno_id:
            items[i] = anno
            return {"action": "updated", "annotation_id": anno_id}

    items.append(anno)
    return {"action": "created", "annotation_id": anno_id}

def _delete_annotation_v3(manifest: dict, canvas_id: str, annotation_id: str) -> dict:
    if not isinstance(manifest, dict):
        raise ValueError("Manifest must be a JSON object")
    if not canvas_id or not annotation_id:
        raise ValueError("Missing canvas_id or annotation_id")

    canvas = _find_canvas(manifest, canvas_id)
    if not canvas:
        raise ValueError(f"Canvas not found: {canvas_id}")

    anns = canvas.get("annotations") or []
    deleted = False
    for page in anns:
        if not (isinstance(page, dict) and isinstance(page.get("items"), list)):
            continue
        items = page["items"]
        new_items = [a for a in items if not (isinstance(a, dict) and a.get("id") == annotation_id)]
        if len(new_items) != len(items):
            page["items"] = new_items
            deleted = True

    return {"action": "deleted" if deleted else "not_found", "annotation_id": annotation_id}

def _delete_annotation_resource(annotation_resource_id: str) -> dict:
    if not annotation_resource_id:
        return {"resource_action": "skipped"}

    try:
        from arches.app.models.models import ResourceInstance
        deleted_count, _ = ResourceInstance.objects.filter(
            resourceinstanceid=annotation_resource_id
        ).delete()
        return {
            "resource_action": "deleted" if deleted_count else "not_found",
            "annotation_resource_id": annotation_resource_id
        }
    except Exception as e:
        return {
            "resource_action": "error",
            "annotation_resource_id": annotation_resource_id,
            "resource_error": str(e)
        }

class ManifestEditView(APIView):
    """
    Disk-backed override manifest editor.

    Endpoints (example):
      - GET  /api/iiif/manifest-override/<resource_id>
      - POST /api/iiif/manifest-override/<resource_id>

    POST modes:
      1) Replace:
         { "mode": "replace", "manifest": {...} }

      2) Upsert annotation:
         {
           "mode": "upsert_annotation",
           "canvas_id": "<canvas id>",
           "annotation": { ... IIIF v3 Annotation ... }
         }

      3) Delete annotation:
         {
           "mode": "delete_annotation",
           "canvas_id": "<canvas id>",
           "annotation_id": "<annotation id>"
         }
    """
    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, resource_id: str):
        path = _manifest_override_path(resource_id)
        if not path.exists():
            return Response({"error": "override manifest not found", "resource_id": resource_id}, status=status.HTTP_404_NOT_FOUND)
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"cannot read override manifest: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, resource_id: str):
        manifest = request.data.get("manifest")
        resource_name = request.data.get("resource_name")
        mode = (request.data.get("mode") or "replace").strip().lower()

        print(f"[ManifestEditView] POST called")
        print(f"  mode: {mode}")
        print(f"  resource_id: {resource_id}")
        print(f"  resource_name: {resource_name}")
        print(f"  manifest type: {type(manifest)}")
        print(f"  manifest keys: {list(manifest.keys()) if isinstance(manifest, dict) else manifest}")

        # Ustal ścieżkę na podstawie przekazanego resource_name (lub domyślnej wartości)
        temp_resource_name = resource_name or "unnamed"
        path = _manifest_override_path(temp_resource_name, resource_id)
        print(f"  manifest path: {path}")

        current = None
        if path.exists():
            try:
                current = json.loads(path.read_text(encoding="utf-8"))
            except Exception as e:
                print(f"[ManifestEditView] ERROR reading manifest: {e}")

        if current is None and mode in ("upsert_annotation", "delete_annotation", "delete_annotation_everywhere"):
            gen_path = _generated_manifest_path(resource_id)
            if gen_path and gen_path.exists():
                try:
                    current = json.loads(gen_path.read_text(encoding="utf-8"))
                    path = gen_path  # zapisuj z powrotem do realnej ścieżki, nie unnamed_*
                    print(f"[ManifestEditView] Loaded generated manifest for mode={mode}: {gen_path}")
                except Exception as e:
                    print(f"[ManifestEditView] ERROR reading generated manifest: {e}")

        if not resource_name and isinstance(current, dict):
            # Wyciągnij nazwę z body.service[0].id (ścieżka TiTiler)
            try:
                first_canvas = current.get("items", [])[0] if current.get("items") else None
                if first_canvas:
                    service_id = (
                        first_canvas.get("items", [{}])[0]
                        .get("items", [{}])[0]
                        .get("body", {})
                        .get("service", [{}])[0]
                        .get("id", "")
                    )
                    print(f"  service_id from manifest: {service_id}")
                    
                    # ✅ Dekoduj URL (zamień %2F na /)
                    decoded_service_id = unquote(service_id)
                    print(f"  decoded service_id: {decoded_service_id}")
                    
                    # Regex: /iiif_raster/{resource_name}_{resource_id}/...
                    resource_id_str = str(resource_id)
                    match = re.search(r'/iiif_raster/([^/]+)_' + re.escape(resource_id_str), decoded_service_id)
                    if match:
                        resource_name = match.group(1)
                        print(f"  extracted resource_name from service_id: {resource_name}")
            except Exception as e:
                print(f"[ManifestEditView] ERROR extracting resource_name from manifest: {e}")

            if not resource_name:
                # Fallback do labela (jeśli regex nie zadziałał)
                label = current.get("label", {})
                print(f"  loaded manifest label: {label}")
                if isinstance(label, dict):
                    resource_name = label.get("en", ["unnamed"])[0]
                else:
                    resource_name = str(label or "unnamed")
                print(f"  resolved resource_name from label: {resource_name}")
            
            # Przeładuj ścieżkę jeśli nazwa się zmieniła
            path = _manifest_override_path(resource_name, resource_id)
            print(f"  updated manifest path: {path}")

        try:
            if mode == "replace":
                manifest = request.data.get("manifest")
                if not isinstance(manifest, dict):  
                    return Response({"error": "manifest must be an object"}, status=status.HTTP_400_BAD_REQUEST)
                manifest.setdefault("metadata", [])
                _atomic_write_json(path, manifest)
                return Response({"ok": True, "mode": "replace", "path": str(path)}, status=status.HTTP_200_OK)

            if mode == "upsert_annotation":
                canvas_id = request.data.get("canvas_id")
                annotation = request.data.get("annotation")
                if not isinstance(annotation, dict):
                    return Response({"error": "annotation must be an object"}, status=status.HTTP_400_BAD_REQUEST)

                if current is None:
                    return Response({"error": "override manifest does not exist and cannot be loaded; use mode=replace first"}, status=status.HTTP_400_BAD_REQUEST)

                result = _upsert_annotation_v3(current, canvas_id, annotation)
                _atomic_write_json(path, current)
                return Response({"ok": True, "mode": "upsert_annotation", **result}, status=status.HTTP_200_OK)

            if mode in ("delete_annotation", "delete_annotation_everywhere"):
                canvas_id = request.data.get("canvas_id")
                print(request.data)
                annotation_id = request.data.get("annotation_id")
                annotation_resource_id = request.data.get("annotation_resource_id")

                if current is None:
                    return Response({"error": "override manifest does not exist; use mode=replace first"}, status=status.HTTP_400_BAD_REQUEST)

                result = _delete_annotation_v3(current, canvas_id, annotation_id)
                resource_result = {}

                if mode == "delete_annotation_everywhere" and annotation_resource_id:
                    print(f"[ManifestEditView] Deleting annotation resource: {annotation_resource_id}")
                    resource_result = _delete_annotation_resource(annotation_resource_id)

                _atomic_write_json(path, current)
                return Response(
                    {"ok": True, "mode": mode, **result, **resource_result},
                    status=status.HTTP_200_OK
                )

            return Response({"error": f"unknown mode: {mode}"}, status=status.HTTP_400_BAD_REQUEST)

        except ValueError as ve:
            return Response({"error": str(ve)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": f"manifest edit failed: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)