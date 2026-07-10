import json
import re
import uuid
import requests

from pathlib import Path
from urllib.parse import unquote

from django.conf import settings
from django.http import JsonResponse, Http404
from django.utils.text import get_valid_filename
from .iiif_image_service import public_service_url_from_any

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework import status


def _manifest_dir(resource_name: str, resource_id: str) -> Path:
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
            out.append({
                "label": _iiif_lang(prefix),
                "value": _iiif_lang(json.dumps(obj, ensure_ascii=False))
            })
        else:
            out.append({
                "label": _iiif_lang(prefix),
                "value": _iiif_lang(obj)
            })

    walk(meta)
    return out


def _generated_manifest_path(resource_id: str) -> Path | None:
    root = Path(getattr(settings, "RASTER_DATA_DIR"))
    matches = list(root.glob(f"*_{resource_id}/manifest/{resource_id}.json"))
    return matches[0] if matches else None


def _manifest_override_path(resource_name: str, resource_id: str) -> Path:
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
    anns = canvas.get("annotations")
    if not isinstance(anns, list):
        anns = []
        canvas["annotations"] = anns

    for p in anns:
        if isinstance(p, dict) and isinstance(p.get("items"), list):
            return p

    page_id = f"{canvas.get('id', '')}/annotation-page/1"
    page = {
        "id": page_id,
        "type": "AnnotationPage",
        "items": []
    }
    anns.append(page)
    return page


def _upsert_annotation_v3(manifest: dict, canvas_id: str, annotation: dict) -> dict:
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

    if "target" not in anno:
        anno["target"] = canvas_id

    items = page.get("items")
    if not isinstance(items, list):
        page["items"] = []
        items = page["items"]

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
        new_items = [
            a for a in items
            if not (isinstance(a, dict) and a.get("id") == annotation_id)
        ]

        if len(new_items) != len(items):
            page["items"] = new_items
            deleted = True

    return {
        "action": "deleted" if deleted else "not_found",
        "annotation_id": annotation_id
    }


def _resolve_manifest_path_and_current(resource_id: str, resource_name: str | None, current: dict | None = None):
    """
    Resolve manifest path for append/edit operations.
    Prefers explicit resource_name, then existing generated path, then falls back to
    extracting the name from current manifest/service URL/label.
    Returns (path, current_manifest, resolved_resource_name).
    """
    resolved_name = resource_name or None
    path = _manifest_override_path(resolved_name or "unnamed", resource_id)

    if current is None and path.exists():
      try:
          current = json.loads(path.read_text(encoding="utf-8"))
      except Exception:
          current = None

    if current is None:
        gen_path = _generated_manifest_path(resource_id)
        if gen_path and gen_path.exists():
            try:
                current = json.loads(gen_path.read_text(encoding="utf-8"))
                path = gen_path
            except Exception:
                current = None

    if not resolved_name and isinstance(current, dict):
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
                decoded_service_id = unquote(service_id)
                resource_id_str = str(resource_id)
                match = re.search(
                    r'/iiif_raster/([^/]+)_' + re.escape(resource_id_str),
                    decoded_service_id
                )
                if match:
                    resolved_name = match.group(1)
        except Exception:
            pass

    if not resolved_name and isinstance(current, dict):
        label = current.get("label", {})
        if isinstance(label, dict):
            resolved_name = label.get("en", ["unnamed"])[0]
        else:
            resolved_name = str(label or "unnamed")

    if resolved_name:
        path = _manifest_override_path(resolved_name, resource_id)

    return path, current, (resolved_name or "unnamed")



def _append_items_v3(manifest: dict, manifest_id: str, items: list[dict], request=None) -> dict:
    if not isinstance(manifest, dict):
        raise ValueError("Manifest must be a JSON object")
    if not isinstance(items, list) or not items:
        raise ValueError("items must be a non-empty list")

    existing_items = manifest.get("items")
    if not isinstance(existing_items, list):
        manifest["items"] = []
        existing_items = manifest["items"]

    created = []
    start_idx = len(existing_items)

    for it in items:
        svc = (it.get("iiif_service_url") or "").rstrip("/")
        if request is not None:
            svc = public_service_url_from_any(request, svc).rstrip("/")
        if not svc:
            continue

        try:
            info = _fetch_info(svc)
            w = int(info.get("width") or (it.get("metadata") or {}).get("width") or 1)
            h = int(info.get("height") or (it.get("metadata") or {}).get("height") or 1)
        except Exception:
            meta = it.get("metadata") or {}
            w = int(meta.get("width") or 1)
            h = int(meta.get("height") or 1)

        idx = start_idx + len(created) + 1
        canvas_id = f"{manifest_id}/canvas/{idx}"
        page_id = f"{canvas_id}/page/1"
        ann_id = f"{page_id}/annotation/1"
        body_image_id = svc + "/full/max/0/default.png"

        canvas = {
            "id": canvas_id,
            "type": "Canvas",
            "width": w,
            "height": h,
            "label": {"en": [it.get("label") or f"Item {idx}"]},
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
                        "format": "image/png",
                        "service": [{
                            "id": svc,
                            "type": "ImageService3",
                            "profile": "level2"
                        }]
                    }
                }]
            }]
        }

        iiif_meta = _to_iiif_metadata(it.get("metadata") or {})
        if iiif_meta:
            canvas["metadata"] = iiif_meta

        existing_items.append(canvas)
        created.append(canvas_id)

    if not created:
        raise ValueError("No valid iiif_service_url items")

    return {
        "action": "appended",
        "appended_count": len(created),
        "canvas_ids": created,
    }
