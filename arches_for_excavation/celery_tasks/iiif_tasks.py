# iiif_tasks.py
import json
import logging
from pathlib import Path
from typing import Any, Dict

from celery import shared_task
from django.conf import settings
from django.urls import reverse
from urllib.parse import urlencode

from ..views.services.raster_metadata import _read_geotiff_metadata
import numpy as np
import rasterio
from rasterio.transform import Affine
from rasterio.shutil import copy as rio_copy
logger = logging.getLogger(__name__)
from ..views.iiif_titler_proxy import titiler_iiif_proxy


def _ensure_dir(p: Path) -> None:
    p.mkdir(parents=True, exist_ok=True)


def _titiler_mount() -> str:
    # in your compose: uploads:/data
    return str(getattr(settings, "TITILER_DATA_MOUNT", "/data")).rstrip("/")


def _map_arche_path_to_titiler_path(p: Path) -> str:
    """
    it was suprisingly problematic
    Convert Arches container path (inside uploads volume) to TiTiler-visible path.
    Example:
      /arches_app/.../uploadedfiles/rasters/data/foo/bar.tif  ->  /data/rasters/data/foo/bar.tif

    This assumes both containers share the same named volume `uploads`.
    """
    s = str(p).replace("\\", "/")
    marker = "/uploadedfiles/"
    idx = s.find(marker)
    if idx == -1:
        raise ValueError(f"Path is not under /uploadedfiles/: {s}")

    rel = s[idx + len(marker):]  # e.g. "rasters/data/<id>/file.tif"
    return f"{_titiler_mount()}/{rel}"


def _normalize_dem_to_unit_interval(dem: np.ndarray, mask: np.ndarray) -> tuple[np.ndarray, float, float]:
    """
    Normalize DEM to [0..1] using robust percentiles (2..98) on valid pixels.
    Returns: (t, lo, hi)
    """
    valid = dem[~mask]
    if valid.size == 0:
        # fallback
        lo, hi = 0.0, 1.0
        t = np.zeros_like(dem, dtype="float32")
        return t, lo, hi

    lo = float(np.nanpercentile(valid, 0.5))
    hi = float(np.nanpercentile(valid, 99.5))
    print(f"DEM normalization: lo={lo}, hi={hi}")
    if (not np.isfinite(lo)) or (not np.isfinite(hi)) or hi <= lo:
        lo = float(np.nanmin(valid))
        hi = float(np.nanmax(valid))
        if (not np.isfinite(lo)) or (not np.isfinite(hi)) or hi <= lo:
            lo, hi = 0.0, 1.0

    t = (dem - lo) / (hi - lo)
    t = np.clip(t, 0.0, 1.0).astype("float32")
    return t, lo, hi


def _apply_blue_green_brown_ramp(t: np.ndarray) -> np.ndarray:
    """
    Piecewise-linear ramp: blue -> green -> brown.
    Input: t in [0..1], shape (H,W)
    Output: RGB uint8, shape (3,H,W)
    """
    # Control points in [0..1]
    t0, t1, t2 = 0.0, 0.5, 1.
    c0 = np.array([  0,  70, 255], dtype="float32")  # blue (low)
    c1 = np.array([ 40, 170,  60], dtype="float32")  # green (mid)
    c2 = np.array([160, 110,  60], dtype="float32")  # brown (high)

    H, W = t.shape
    rgb = np.zeros((3, H, W), dtype="float32")

    m0 = t <= t1
    m1 = ~m0

    u0 = np.zeros_like(t, dtype="float32")
    u1 = np.zeros_like(t, dtype="float32")

    denom0 = (t1 - t0) if (t1 - t0) != 0 else 1.0
    denom1 = (t2 - t1) if (t2 - t1) != 0 else 1.0

    u0[m0] = (t[m0] - t0) / denom0
    u1[m1] = (t[m1] - t1) / denom1

    for i in range(3):
        rgb[i][m0] = c0[i] + (c1[i] - c0[i]) * u0[m0]
        rgb[i][m1] = c1[i] + (c2[i] - c1[i]) * u1[m1]

    rgb = np.clip(rgb, 0, 255).astype("uint8")
    return rgb

@shared_task(bind=True)
def process_geotiff_metadata_task(self, payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    After COG conversion, read metadata, write meta json, and return TiTiler path.

    Expected payload:
      {
        job_id, base_name, folder_name, role, resource_id,
        original_filename,
        paths: { original, cog, meta },
        metadata_original: {...}
      }
    """
    logger.info("[IIIF TASK] Starting process_geotiff_metadata_task")

    job_id = payload.get("job_id")
    base_name = payload.get("base_name")
    folder_name = payload.get("folder_name")
    role = (payload.get("role") or "unknown").lower()
    resource_id = payload.get("resource_id") or job_id

    paths = payload.get("paths") or {}
    cog_path = paths.get("cog")
    meta_path = paths.get("meta")
    original_path = paths.get("original")

    if not job_id or not base_name or not folder_name or not cog_path or not meta_path:
        raise ValueError("payload missing job_id/base_name/folder_name or paths.{cog,meta}")

    cog = Path(cog_path)
    meta_dst = Path(meta_path)

    if not cog.exists():
        raise FileNotFoundError(f"COG file not found: {cog}")

    _ensure_dir(meta_dst.parent)

    # read metadata from COG
    meta_cog = _read_geotiff_metadata(str(cog))

    if role == "unknown":
        role = "dem" if meta_cog.get("is_dem_hint") else "ortho"

    # write meta json
    result_meta = {
        "job_id": job_id,
        "resource_id": resource_id,
        "base_name": base_name,
        "folder_name": folder_name,
        "role": role,
        "original_filename": payload.get("original_filename"),
        "paths": {
            "original": original_path,
            "cog": str(cog),
            "meta": str(meta_dst),
        },
        "metadata": meta_cog,
    }
    meta_dst.write_text(json.dumps(result_meta, ensure_ascii=False, indent=2), encoding="utf-8")

    # map path for TiTiler
    titiler_cog_path = _map_arche_path_to_titiler_path(cog)
    titiler_service_url = reverse("titiler-iiif-proxy") + "?" + urlencode({"path": titiler_cog_path})
    options = payload.get("options") or {}
    return {
        "job_id": job_id,
        "resource_id": resource_id,
        "base_name": base_name,
        "folder_name": folder_name,
        "role": role,
        "options": options,        
        "paths": {
            "original": original_path,
            "cog": str(cog),
            "meta": str(meta_dst),
        },
        "metadata": meta_cog,
        "download_url_cog": f"/api/iiif/geotiff-file/{job_id}/cog",
        "download_url_meta": f"/api/iiif/geotiff-file/{job_id}/meta",

        "titiler": {
            "file_path": titiler_cog_path,         
            "iiif_service_url": titiler_service_url
        },
    }

@shared_task(bind=True)
def generate_hillshade_task(self, result):
    options = (result or {}).get("options") or {}
    role = ((result or {}).get("role") or "").lower()

    if role != "dem" or not options.get("make_hillshade"):
        return result

    cog_path = Path(result["paths"]["cog"])
    folder = cog_path.parent
    job_id = result["job_id"]
    base_name = result["base_name"]

    hs_tmp = folder / f"{base_name}_hillshade_tmp_{job_id}.tif"
    hs_cog = folder / f"{base_name}_hillshade_{job_id}.tif"

    with rasterio.open(cog_path) as src:
        dem = src.read(1).astype("float32")
        transform = src.transform
        crs = src.crs

        xres = abs(transform.a)
        yres = abs(transform.e)

        gy, gx = np.gradient(dem, yres, xres)
        azimuth = np.deg2rad(315.0)
        altitude = np.deg2rad(45.0)

        slope = np.pi/2.0 - np.arctan(np.sqrt(gx*gx + gy*gy))
        aspect = np.arctan2(-gx, gy)

        shaded = (np.sin(altitude)*np.sin(slope) +
                  np.cos(altitude)*np.cos(slope)*np.cos(azimuth - aspect))

        hs = np.clip(shaded, 0, 1)
        hs8 = (hs * 255.0).astype("uint8")

        profile = src.profile.copy()
        profile.update(
            driver="GTiff",
            count=1,
            dtype="uint8",
            compress="DEFLATE",
            predictor=2,
            nodata=0,
            crs=crs
        )

        with rasterio.open(hs_tmp, "w", **profile) as dst:
            dst.write(hs8, 1)

    rio_copy(
        str(hs_tmp),
        str(hs_cog),
        driver="COG",
        compress="DEFLATE",
        overview_resampling="NEAREST",
        blocksize=512
    )
    try:
        hs_tmp.unlink(missing_ok=True)
    except Exception:
        pass

    hs_titiler_path = _map_arche_path_to_titiler_path(hs_cog)
    hs_service_url = reverse("titiler-iiif-proxy") + "?" + urlencode({"path": hs_titiler_path})

    result.setdefault("derived", {})
    result["derived"].setdefault("hillshade", {})
    result["derived"]["hillshade"]["download_url_cog"] = {
        "paths": {"cog": str(hs_cog)},
        "download_url_cog": f"/api/iiif/geotiff-file/{job_id}/cog",
        "download_url_meta": f"/api/iiif/geotiff-file/{job_id}/meta",
        "titiler": {
            "file_path": hs_titiler_path,
            "iiif_service_url": hs_service_url
        }
    }
    return result

@shared_task(bind=True)
def generate_color_relief_task(self, result: Dict[str, Any]) -> Dict[str, Any]:
    """
    Generate color-relief (hypsometric tint) from DEM:
      - robust normalization (2..98 percentile)
      - ramp: blue -> green -> brown
      - outputs RGB GeoTIFF -> COG
      - adds derived.color_relief with TiTiler IIIF service url
    """
    role = ((result or {}).get("role") or "").lower()
    if role != "dem":
        return result

    cog_path = Path(result["paths"]["cog"])
    folder = cog_path.parent
    job_id = result["job_id"]
    base_name = result["base_name"]

    cr_tmp = folder / f"{base_name}_colorrelief_tmp_{job_id}.tif"
    cr_cog = folder / f"{base_name}_colorrelief_{job_id}.tif"

    with rasterio.open(cog_path) as src:
        dem_m = src.read(1, masked=True).astype("float32")
        mask = np.ma.getmaskarray(dem_m)
        dem = dem_m.filled(np.nan)
        t, lo, hi = _normalize_dem_to_unit_interval(dem, mask)
        rgb = _apply_blue_green_brown_ramp(t)  # (3,H,W) uint8
        rgb[0, mask] = 0
        rgb[1, mask] = 70
        rgb[2, mask] = 255

        profile = {
            "driver": "GTiff",
            "height": src.height,
            "width": src.width,
            "count": 3,
            "dtype": "uint8",
            "crs": src.crs,
            "transform": src.transform,
            "compress": "DEFLATE",
            "predictor": 2,
            "tiled": True,
            "blockxsize": 512,
            "blockysize": 512,
            "nodata": 0,
            "photometric": "RGB",
            "interleave": "pixel",
            "nodata": 0,
        }

        with rasterio.open(cr_tmp, "w", **profile) as dst:
            dst.write(rgb[0], 1)
            dst.write(rgb[1], 2)
            dst.write(rgb[2], 3)

    # Convert to COG
    rio_copy(
        str(cr_tmp),
        str(cr_cog),
        driver="COG",
        compress="DEFLATE",
        overview_resampling="NEAREST",
        blocksize=512,
    )

    try:
        cr_tmp.unlink(missing_ok=True)
    except Exception:
        pass

    cr_titiler_path = _map_arche_path_to_titiler_path(cr_cog)
    cr_service_url = reverse("titiler-iiif-proxy") + "?" + urlencode({"path": cr_titiler_path})

    result.setdefault("derived", {})
    result["derived"].setdefault("color_relief", {})

    result["derived"]["color_relief"]["download_url_cog"] = {
        "paths": {"cog": str(cr_cog)},
        "download_url_cog": f"/api/iiif/geotiff-file/{job_id}/cog",
        "download_url_meta": f"/api/iiif/geotiff-file/{job_id}/meta",        
        "titiler": {
            "file_path": cr_titiler_path,
            "iiif_service_url": cr_service_url,
        },
        "style": {
            "ramp": "blue-green-brown",
            "range": [float(lo), float(hi)],
            "percentiles": [2, 98],
        },
    }
    return result
