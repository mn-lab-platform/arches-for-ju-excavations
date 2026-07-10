import json
from django.http import JsonResponse
from django.views import View
from pyproj.enums import TransformDirection
import numpy as np

from arches.app.models.models import Resource
from arches.app.models.tile import Tile
from .services.iiif_utils import _resolve_manifest_path_and_current
from .services.iiif_image_service import (
    public_origin,
    public_service_url_from_any,
    rewrite_manifest_image_services,
)
from .local_coordinate_system import CRSNodeIds, LocalCoordinateSystemAssignToResourcesView
from .services.crs.local_mercator.oblique_mercator import ObliqueMercator


class IiifAllmapsLayersView(View):
    IIIF_GRAPH_ID = "401b3051-d1c4-465c-8dd0-1d5784adee98"
    DERIVATIVE_SUFFIXES = (" (hillshade)", " (color relief)")

    def _get_base_url(self, request):
        return public_origin(request)

    def _absolute_url(self, request, value):
        value = str(value or "").strip()
        if not value:
            return ""
        if value.startswith("http://") or value.startswith("https://"):
            return value
        base_url = self._get_base_url(request).rstrip("/")
        return f"{base_url}/{value.lstrip('/')}"

    def _md_value(self, canvas, key):
        md = canvas.get("metadata") or []
        for row in md:
            label = ((row.get("label") or {}).get("en") or [None])[0]
            if label == key:
                return ((row.get("value") or {}).get("en") or [None])[0]
        return None

    def _get_local_crs_resource_id(self, iiif_resource_id):
        rel_node_id = LocalCoordinateSystemAssignToResourcesView.IIIF_CRS_NODE_ID
        tile = Tile.objects.filter(
            resourceinstance_id=iiif_resource_id,
            data__has_key=rel_node_id
        ).first()
        if not tile:
            return None
        rels = tile.data.get(rel_node_id) or []
        return rels[0].get("resourceId") if rels else None

    def _get_crs_definition(self, crs_resource_id):
        wkt2_node = getattr(CRSNodeIds, "WKT2_STRING_NODE_ID", None)
        if wkt2_node:
            tile = Tile.objects.filter(
                resourceinstance_id=crs_resource_id,
                data__has_key=wkt2_node
            ).first()
            if tile:
                wkt2 = tile.data.get(wkt2_node)
                if wkt2:
                    return wkt2, None

        # fallback proj4
        tile = Tile.objects.filter(
            resourceinstance_id=crs_resource_id,
            data__has_key=CRSNodeIds.PROJ4_STRING_NODE_ID
        ).first()
        if tile:
            proj4 = tile.data.get(CRSNodeIds.PROJ4_STRING_NODE_ID)
            if proj4:
                return None, proj4

        return None, None
    def _build_oblique_mercator(self, wkt2=None, proj4=None) -> ObliqueMercator:
        import pyproj
        if wkt2:
            crs = pyproj.CRS.from_wkt(wkt2)
        else:
            crs = pyproj.CRS.from_proj4(proj4)
        return ObliqueMercator(crs)

    def _parse_float_list(self, raw):
        if raw is None:
            return None
        if isinstance(raw, list):
            return [float(v) for v in raw]
        try:
            return [float(v) for v in json.loads(raw)]
        except (ValueError, TypeError):
            return None

    def _canvas_label(self, canvas):
        return ((canvas.get("label") or {}).get("en") or [None])[0]

    def _base_label_for_derivative(self, label):
        if not label:
            return None
        for suffix in self.DERIVATIVE_SUFFIXES:
            if label.endswith(suffix):
                return label[: -len(suffix)]
        return None

    def _md_bool(self, canvas, key):
        raw = self._md_value(canvas, key)
        if isinstance(raw, bool):
            return raw
        return str(raw or "").strip().lower() in {"1", "true", "yes", "on"}

    def _should_include_canvas(self, canvas, layer_kind, base_label):
        if layer_kind == "all":
            return True

        is_dem = self._md_bool(canvas, "is_dem_hint")
        is_derivative = bool(base_label)

        if layer_kind == "ortho":
            return not is_dem and not is_derivative

        if layer_kind == "dem":
            return is_dem or is_derivative

        return False

    def _md_bool(self, canvas, key):
        raw = self._md_value(canvas, key)
        if isinstance(raw, bool):
            return raw
        return str(raw or "").strip().lower() in {"1", "true", "yes", "on"}

    def _should_include_canvas(self, canvas, layer_kind, base_label):
        if layer_kind == "all":
            return True

        is_dem = self._md_bool(canvas, "is_dem_hint")
        is_derivative = bool(base_label)

        if layer_kind == "ortho":
            return not is_dem and not is_derivative

        if layer_kind == "dem":
            return is_dem or is_derivative

        return False

    def _get_canvas_dimensions(self, canvas, fallback_canvas=None):
        def _read_dims(c):
            if not c:
                return 1, 1
            try:
                w = int(self._md_value(c, "width") or c.get("width", 1))
                h = int(self._md_value(c, "height") or c.get("height", 1))
            except (ValueError, TypeError):
                w = c.get("width", 1)
                h = c.get("height", 1)
            return w, h

        w, h = _read_dims(canvas)
        if (w <= 1 or h <= 1) and fallback_canvas is not None:
            fw, fh = _read_dims(fallback_canvas)
            if fw > 1 and fh > 1:
                return fw, fh
        return w, h

    def _canvas_to_gcps(self, canvas, mercator: ObliqueMercator, fallback_canvas=None):
        transform_raw = self._md_value(canvas, "transform")
        if transform_raw is None and fallback_canvas is not None:
            transform_raw = self._md_value(fallback_canvas, "transform")

        transform = self._parse_float_list(transform_raw)
        if not transform or len(transform) < 6:
            return None

        a, b, x0, c, d, y0 = transform
        px_w, px_h = self._get_canvas_dimensions(canvas, fallback_canvas=fallback_canvas)

        pixel_corners = [
            (0, 0),
            (px_w, 0),
            (px_w, px_h),
            (0, px_h),
        ]

        local_points = np.array([
            [x0 + a * col + b * row,
             y0 + c * col + d * row]
            for col, row in pixel_corners
        ], dtype=np.float64)

        wgs84_points = mercator.transform(TransformDirection.INVERSE, local_points)

        return [
            {
                "resource": [col, row],
                "world": [float(lon), float(lat)],
            }
            for (col, row), (lon, lat) in zip(pixel_corners, wgs84_points)
        ]

    def _build_georeference_annotation(self, request, canvas, gcps, manifest_url, canvas_index, fallback_canvas=None):
        canvas_id = canvas.get("id", "")
        if not canvas_id.startswith("http"):
            canvas_id = self._absolute_url(request, canvas_id)

        px_w, px_h = self._get_canvas_dimensions(canvas, fallback_canvas=fallback_canvas)
        service_url = None
        items = canvas.get("items", [])
        if items:
            annotations = items[0].get("items", [])
            if annotations:
                body = annotations[0].get("body", {})
                service = body.get("service", [])
                if service:
                    raw = service[0].get("@id") or service[0].get("id", "")
                    service_url = public_service_url_from_any(request, raw).rstrip("/")
                    service_url = self._absolute_url(request, service_url)

        return {
            "type": "Annotation",
            "@context": [
                "http://www.w3.org/ns/anno.jsonld",
                "http://geojson.org/geojson-ld/geojson-context.jsonld",
                "http://iiif.io/api/presentation/3/context.json",
            ],
            "id": f"{manifest_url}/georef/{canvas_index}",
            "motivation": "georeferencing",
            "target": {
                "source": canvas_id,
                "type": "SpecificResource",
                "service": [
                    {
                        "@id": service_url,
                        "type": "ImageService3",
                        "profile": "level2",
                    }
                ] if service_url else [],
                "selector": {
                    "type": "SvgSelector",
                    "value": f'<svg width="{px_w}" height="{px_h}"><polygon points="0,0 {px_w},0 {px_w},{px_h} 0,{px_h}"/></svg>',
                },
            },
            "body": {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {
                            "pixelCoords": gcp["resource"],
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": gcp["world"],
                        },
                    }
                    for gcp in gcps
                ],
            },
        }

    def get(self, request, resource_id: str):
        try:
            Resource.objects.get(
                resourceinstanceid=resource_id,
                graph_id=self.IIIF_GRAPH_ID
            )
        except Resource.DoesNotExist:
            return JsonResponse(
                {"status": "error", "message": "IIIF resource not found"},
                status=404
            )
        path, manifest, _ = _resolve_manifest_path_and_current(
            resource_id=resource_id, resource_name=None, current=None
        )
        if not manifest:
            return JsonResponse(
                {"status": "error", "message": "Manifest not found"},
                status=404
            )
        rewrite_manifest_image_services(manifest, request)
        crs_resource_id = self._get_local_crs_resource_id(resource_id)
        if not crs_resource_id:
            return JsonResponse(
                {"status": "error", "message": "No local CRS assigned to this resource"},
                status=400
            )
        wkt2, proj4 = self._get_crs_definition(crs_resource_id)
        if not wkt2 and not proj4:
            return JsonResponse(
                {"status": "error", "message": "CRS definition not found in resource"},
                status=400
            )
        try:
            mercator = self._build_oblique_mercator(wkt2=wkt2, proj4=proj4)
        except Exception as e:
            return JsonResponse(
                {"status": "error", "message": f"Failed to build CRS transformer: {e}"},
                status=500
            )
        layer_kind = (request.GET.get("kind") or "all").strip().lower()
        if layer_kind not in {"all", "ortho", "dem"}:
            return JsonResponse(
                {"status": "error", "message": "Invalid kind. Use one of: all, ortho, dem"},
                status=400
            )

        annotations = []
        skipped = []
        manifest_id = manifest.get("id", f"/api/iiif/geotiff-manifest/{resource_id}")
        manifest_url = self._absolute_url(request, manifest_id).rstrip("/")

        canvases = manifest.get("items") or []
        label_to_canvas = {}
        for c in canvases:
            lbl = self._canvas_label(c)
            if lbl and lbl not in label_to_canvas:
                label_to_canvas[lbl] = c

        for idx, canvas in enumerate(canvases, start=1):
            label = self._canvas_label(canvas) or f"canvas-{idx}"
            fallback_canvas = None

            base_label = self._base_label_for_derivative(label)
            if not self._should_include_canvas(canvas, layer_kind, base_label):
                skipped.append({
                    "canvas_index": idx,
                    "label": label,
                    "reason": f"filtered by kind={layer_kind}",
                })
                continue

            if base_label:
                fallback_canvas = label_to_canvas.get(base_label)

            gcps = self._canvas_to_gcps(canvas, mercator, fallback_canvas=fallback_canvas)
            if gcps is None:
                skipped.append({
                    "canvas_index": idx,
                    "label": label,
                    "reason": "missing transform metadata",
                })
                continue

            annotations.append(
                self._build_georeference_annotation(
                    request, canvas, gcps, manifest_url, idx, fallback_canvas=fallback_canvas
                )
            )

        annotation_page = {
            "type": "AnnotationPage",
            "@context": "http://www.w3.org/ns/anno.jsonld",
            "id": f"{manifest_url}/georef",
            "items": annotations,
        }

        return JsonResponse({
            "status": "success",
            "resource_id": resource_id,
            "kind": layer_kind,
            "local_crs_resource_id": crs_resource_id,
            "crs_source": "wkt2" if wkt2 else "proj4",
            "annotation_page": annotation_page,
            "skipped_canvases": skipped,
        }, status=200)
