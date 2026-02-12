# views_manifest.py
import json
import requests
from pathlib import Path
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.http import JsonResponse, Http404
from django.utils.text import get_valid_filename

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

            canvases.append({
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
            })

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