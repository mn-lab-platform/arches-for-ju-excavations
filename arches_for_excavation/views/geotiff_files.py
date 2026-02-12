# views_geotiff_files.py
import json
from pathlib import Path
from django.http import FileResponse, Http404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from rest_framework.renderers import JSONRenderer

def _get_data_root() -> Path:
    return Path(getattr(settings, "RASTER_DATA_DIR"))

def _find_job_index(job_id: str) -> Path:
    root = _get_data_root()
    matches = list(root.glob(f"**/{job_id}_job.json"))
    if not matches:
        raise FileNotFoundError
    return matches[0]

class GeoTiffFileView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [JSONRenderer]  

    def get(self, request, job_id: str, kind: str):
        try:
            idx_path = _find_job_index(job_id)
            idx = json.loads(idx_path.read_text(encoding="utf-8"))
        except Exception:
            raise Http404("Job not found")

        paths = idx.get("paths") or {}
        kind = (kind or "").lower()

        if kind == "original":
            p = paths.get("original")
        elif kind == "cog":
            p = paths.get("cog")
        elif kind == "meta":
            p = paths.get("meta")
        elif kind == "hillshade":
            cog = paths.get("cog")
            if not cog:
                raise Http404("COG path missing")
            folder = Path(cog).parent
            hit = next(folder.glob(f"*hillshade*_{job_id}.tif"), None)
            p = str(hit) if hit else ""
        elif kind == "colorrelief":
            cog = paths.get("cog")
            if not cog:
                raise Http404("COG path missing")
            folder = Path(cog).parent
            hit = next(folder.glob(f"*colorrelief*_{job_id}.tif"), None)
            p = str(hit) if hit else ""
        else:
            raise Http404("Unknown kind")

        if not p:
            raise Http404("File not found")

        fp = Path(p)
        if not fp.exists():
            raise Http404("File missing")

        return FileResponse(fp.open("rb"), as_attachment=True, filename=fp.name)
