import json
from pathlib import Path

from django.conf import settings
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseRedirect

from arches.app.views.thumbnail import ThumbnailView


DERIVATIVE_LABELS = ("(hillshade)", "(color relief)")


def _first(value):
    if isinstance(value, list):
        return value[0] if value else None
    return value


def _thumbnail_id(thumbnail):
    thumbnail = _first(thumbnail)
    if isinstance(thumbnail, str):
        return thumbnail
    if isinstance(thumbnail, dict):
        return thumbnail.get("id") or thumbnail.get("@id")
    return None


def _lang_value(value):
    if isinstance(value, dict):
        value = value.get("en") or value.get("none") or _first(list(value.values()))
    value = _first(value)
    return str(value or "")


def _canvas_label(canvas):
    return _lang_value(canvas.get("label"))


def _metadata_value(canvas, key):
    for row in canvas.get("metadata") or []:
        if not isinstance(row, dict):
            continue
        if _lang_value(row.get("label")) == key:
            return _lang_value(row.get("value"))
    return None


def _metadata_bool(canvas, key):
    value = _metadata_value(canvas, key)
    if value is None:
        return None
    return value.strip().lower() in {"1", "true", "yes", "on"}


def _is_hillshade(canvas):
    return _canvas_label(canvas).strip().lower().endswith("(hillshade)")


def _is_color_relief(canvas):
    return _canvas_label(canvas).strip().lower().endswith("(color relief)")


def _is_derivative(canvas):
    label = _canvas_label(canvas).strip().lower()
    return label.endswith(DERIVATIVE_LABELS)


def _is_ortho(canvas):
    is_dem = _metadata_bool(canvas, "is_dem_hint")
    if is_dem is False and not _is_derivative(canvas):
        return True

    label = _canvas_label(canvas).lower()
    return (
        is_dem is not True
        and not _is_derivative(canvas)
        and "_dem" not in label
        and " dem" not in label
    )


def _thumbnail_url_for_canvas(canvas):
    thumbnail_url = _thumbnail_id(canvas.get("thumbnail"))
    if thumbnail_url:
        return thumbnail_url

    service_id = _service_id_from_canvas(canvas)
    if service_id:
        return f"{service_id}/full/!300,300/0/default.png"

    return None


def _service_id_from_canvas(canvas):
    page = _first(canvas.get("items")) if isinstance(canvas, dict) else None
    annotation = _first(page.get("items")) if isinstance(page, dict) else None
    body = _first(annotation.get("body")) if isinstance(annotation, dict) else None

    if not isinstance(body, dict):
        return None

    service = _first(body.get("service"))
    if isinstance(service, dict):
        service_id = service.get("id") or service.get("@id")
        if service_id:
            return str(service_id).rstrip("/")

    body_id = body.get("id") or body.get("@id")
    if isinstance(body_id, str) and "/full/" in body_id:
        return body_id.split("/full/", 1)[0].rstrip("/")

    return None


def _manifest_path(resource_id):
    root = Path(getattr(settings, "RASTER_DATA_DIR"))
    matches = list(root.glob(f"*_{resource_id}/manifest/{resource_id}.json"))
    return matches[0] if matches else None


def _iiif_thumbnail_url(resource_id):
    path = _manifest_path(str(resource_id))
    if not path:
        return None

    try:
        manifest = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return None

    canvases = [c for c in manifest.get("items") or [] if isinstance(c, dict)]

    for matcher in (_is_ortho, _is_hillshade):
        for canvas in canvases:
            if matcher(canvas):
                thumbnail_url = _thumbnail_url_for_canvas(canvas)
                if thumbnail_url:
                    return thumbnail_url

    for canvas in canvases:
        if _is_color_relief(canvas):
            continue
        thumbnail_url = _thumbnail_id(canvas.get("thumbnail"))
        if thumbnail_url:
            return thumbnail_url

        thumbnail_url = _thumbnail_url_for_canvas(canvas)
        if thumbnail_url:
            return thumbnail_url

    thumbnail_url = _thumbnail_id(manifest.get("thumbnail"))
    if thumbnail_url:
        return thumbnail_url

    return None


class IiifThumbnailView(ThumbnailView):
    def head(self, request, resource_id):
        if _iiif_thumbnail_url(resource_id):
            return HttpResponse()
        return super().head(request, resource_id)

    def get(self, request, resource_id):
        thumbnail_url = _iiif_thumbnail_url(resource_id)
        if thumbnail_url:
            return HttpResponseRedirect(thumbnail_url)
        return super().get(request, resource_id)
