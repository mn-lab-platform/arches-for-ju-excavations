

from pathlib import Path

from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.conf import settings  # <-- add
try:
    import rasterio
except Exception:  # pragma: no cover
    rasterio = None


def _is_within(child: Path, parent: Path) -> bool:
    try:
        child.relative_to(parent)
        return True
    except Exception:
        return False


def _safe_data_path(file_path: str) -> Path:
    """
    Accept:
      - TiTiler path: /data/...
      - local Arches path: <MEDIA_ROOT>/<UPLOADED_FILES_DIR>/...
    """
    raw = str(file_path or "").strip()
    if not raw:
        raise ValueError("file_path is required")

    p = Path(raw).resolve()

    titiler_base = Path(getattr(settings, "TITILER_DATA_MOUNT", "/data")).resolve()
    local_uploads_base = Path(settings.MEDIA_ROOT, settings.UPLOADED_FILES_DIR).resolve()

    # If request uses TiTiler mount (/data/...), map to local uploadedfiles mount
    if _is_within(p, titiler_base):
        rel = p.relative_to(titiler_base)
        mapped = (local_uploads_base / rel).resolve()
        if not _is_within(mapped, local_uploads_base):
            raise ValueError("file_path escapes uploadedfiles root")
        return mapped

    # Also allow already-local absolute paths under uploadedfiles
    if _is_within(p, local_uploads_base):
        return p

    raise ValueError("file_path must be inside /data or uploadedfiles root")

@require_GET
def dem_pixel_sample(request):
    """
    GET /api/iiif/dem/pixel?file_path=/data/...tif&x=123&y=456&band=1
    Zwraca wartość piksela DEM po indeksie kolumna/wiersz.
    """
    if rasterio is None:
        return JsonResponse({"error": "rasterio not available"}, status=500)

    file_path = request.GET.get("file_path", "")
    x_raw = request.GET.get("x", "")
    y_raw = request.GET.get("y", "")
    band_raw = request.GET.get("band", "1")
    print(f"Received request for DEM pixel sample: file_path={file_path}, x={x_raw}, y={y_raw}, band={band_raw}")
    y_raw = float(y_raw) * -1
    print(f"Adjusted y coordinate: {y_raw}")
    try:
        x = int(float(x_raw))
        y = int(float(y_raw))
        band = int(band_raw)
    except Exception:
        return JsonResponse({"error": "Invalid x/y/band"}, status=400)

    try:
        p = _safe_data_path(file_path)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

    if not p.exists():
        return JsonResponse({"error": "Raster file not found"}, status=404)

    try:
        with rasterio.open(p) as ds:
            if band < 1 or band > ds.count:
                return JsonResponse({"error": f"Band out of range: 1..{ds.count}"}, status=400)

            if x < 0 or y < 0 or x >= ds.width or y >= ds.height:
                return JsonResponse(
                    {"error": "Pixel out of bounds", "width": ds.width, "height": ds.height},
                    status=400,
                )

            arr = ds.read(band, window=((y, y + 1), (x, x + 1)), masked=True)
            val = arr[0, 0]

            if hasattr(val, "mask") and bool(getattr(val, "mask", False)):
                return JsonResponse({"value": None, "nodata": True})

            value = float(val)
            nodata = ds.nodata is not None and value == float(ds.nodata)

            return JsonResponse(
                {
                    "value": None if nodata else value,
                    "nodata": bool(nodata),
                    "x": x,
                    "y": y,
                    "band": band,
                    "width": ds.width,
                    "height": ds.height,
                }
            )
    except Exception as e:
        return JsonResponse({"error": f"Sampling failed: {e}"}, status=500)