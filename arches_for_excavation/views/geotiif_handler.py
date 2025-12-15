import uuid
import json
import shutil
import logging
from pathlib import Path
from urllib.parse import splitport

import numpy as np

from django.http import JsonResponse, FileResponse
from django.views.decorators.http import require_POST, require_GET
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.test import RequestFactory
from django.urls import resolve
from django.core.files.uploadedfile import TemporaryUploadedFile

import rasterio
from rasterio.enums import Resampling
from rasterio.warp import transform_bounds
from rasterio.windows import Window
import pyvips
from affine import Affine
from rasterio.crs import CRS
from rasterio.warp import transform as warp_transform

# ---- Try to import IIIFManifest model (Arches variants) ----
try:
    from arches.app.models.models import IIIFManifest
    print("[GEOTIFF] IIIFManifest imported from arches.app.models.models")
except Exception:  # pragma: no cover
    try:
        from arches.app.models.iiif import IIIFManifest
        print("[GEOTIFF] IIIFManifest imported from arches.app.models.iiif")
    except Exception:
        IIIFManifest = None
        print("[GEOTIFF] Could not import IIIFManifest model!")


TMP_DIR = Path("/tmp/arches_iiif_diag").resolve()
TMP_DIR.mkdir(parents=True, exist_ok=True)
print("[GEOTIFF] TMP_DIR: %s", TMP_DIR)

# sidecar geo-metadata (configurable)
META_DIR = Path(getattr(settings, "IIIF_GEOTIFF_META_DIR", "/tmp/arches_iiif_meta")).resolve()
META_DIR.mkdir(parents=True, exist_ok=True)
print("[GEOTIFF] META_DIR: %s", META_DIR)

# raw DEM store (downloadable, configurable)
RAW_DEM_DIR = Path(getattr(settings, "IIIF_RAW_DEM_DIR", "/tmp/arches_iiif_dem_raw")).resolve()
RAW_DEM_DIR.mkdir(parents=True, exist_ok=True)
print("[GEOTIFF] RAW_DEM_DIR: %s", RAW_DEM_DIR)

MAX_BYTES = 4 * 1024 * 1024 * 1024  # 4 GB


# -------------------------
# Helpers
# -------------------------
def _safe_name(name: str) -> str:
    safe = Path(name).name.replace(" ", "_")
    print("[GEOTIFF] _safe_name: %s -> %s", name, safe)
    return safe


def _save_upload(django_file, path: Path):
    print("[GEOTIFF] Saving upload to: %s (size: %d bytes)", path, django_file.size)
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "wb") as out:
        for chunk in django_file.chunks():
            out.write(chunk)
    print("[GEOTIFF] Upload saved successfully: %s", path)


def _is_geotiff(path: Path) -> bool:
    try:
        with rasterio.open(path) as src:
            has_crs = bool(src.crs)
            has_transform = bool(src.transform) and src.transform != rasterio.Affine.identity()
            
            result = has_crs and has_transform
            print("[GEOTIFF] _is_geotiff(%s): %s (CRS: %s, has_transform: %s)", 
                  path.name, result, src.crs, has_transform)
            return result
    except Exception as e:
        print("[GEOTIFF] _is_geotiff(%s) failed: %s", path.name, e)
        return False


# -------------------------
# GeoTIFF -> reencode (rasterio)
# -------------------------
def _process_geotiff(src_path: Path, dst_path: Path, tile: int = 256):
    print("[GEOTIFF] Processing GeoTIFF: %s -> %s", src_path, dst_path)

    with rasterio.open(src_path) as src:
        print("[GEOTIFF] Source: width=%d, height=%d, count=%d, crs=%s, dtype=%s",
              src.width, src.height, src.count, src.crs, src.dtypes[0] if src.dtypes else None)

        profile = src.profile.copy()
        profile.update(
            driver="GTiff",
            compress="DEFLATE",
            tiled=True,
            blockxsize=tile,
            blockysize=tile,
            interleave="pixel",
            bigtiff="IF_NEEDED",
        )

        print("[GEOTIFF] Writing tiled GeoTIFF with blocksize=%d", tile)
        with rasterio.open(dst_path, "w", **profile) as dst:
            for _, window in src.block_windows(1):
                data = src.read(window=window)
                dst.write(data, window=window)

    # Overviews
    try:
        print("[GEOTIFF] Building overviews for: %s", dst_path)
        with rasterio.open(dst_path, "r+") as dst:
            levels = [2, 4, 8, 16]
            dst.build_overviews(levels, Resampling.average)
            dst.update_tags(ns="rio_overview", resampling="average")
        print("[GEOTIFF] Overviews built successfully")
    except Exception as e:
        logger.exception("[GEOTIFF] Overview build failed: %s", e)


# -------------------------
# DEM -> Hillshade 8-bit (safe display for IIIF)
# -------------------------
def _make_hillshade_8bit(src_dem_path: Path, dst_path: Path, azimuth: float = 315.0, altitude: float = 45.0):
    """
    Creates an 8-bit hillshade GeoTIFF from a single-band DEM.
    Keeps georeferencing (transform/crs) and writes tiled/deflate.
    """
    print("[GEOTIFF] Creating hillshade (8-bit) from DEM: %s -> %s", src_dem_path, dst_path)

    with rasterio.open(src_dem_path) as src:
        if src.count < 1:
            raise RuntimeError("DEM has no bands")

        dem = src.read(1).astype("float32")
        nodata = src.nodata
        transform = src.transform

        # pixel size (map units / pixel)
        dx = float(transform.a) if transform and transform.a else 1.0
        dy = abs(float(transform.e)) if transform and transform.e else 1.0

        # mask nodata
        mask = None
        if nodata is not None:
            mask = (dem == nodata)
            # set nodata to NaN to avoid gradient spikes
            dem = dem.copy()
            dem[mask] = np.nan

        # gradients: dz/dx and dz/dy
        # np.gradient expects spacing per axis: (dy, dx) for (rows, cols)
        gy, gx = np.gradient(dem, dy, dx)

        # slope/aspect
        slope = np.pi / 2.0 - np.arctan(np.sqrt(gx * gx + gy * gy))
        aspect = np.arctan2(-gx, gy)

        # convert angles
        az = np.deg2rad(azimuth)
        alt = np.deg2rad(altitude)

        shaded = (np.sin(alt) * np.sin(slope)) + (np.cos(alt) * np.cos(slope) * np.cos(az - aspect))
        shaded = np.clip(shaded, 0.0, 1.0)

        hs = (shaded * 255.0).astype("uint8")

        if mask is not None:
            hs[mask] = 0
        # also NaNs -> 0
        hs[np.isnan(dem)] = 0

        profile = src.profile.copy()
        profile.update(
            driver="GTiff",
            dtype="uint8",
            count=1,
            compress="DEFLATE",
            tiled=True,
            blockxsize=256,
            blockysize=256,
            bigtiff="IF_NEEDED",
            nodata=0,  # ✅ ADD THIS: set valid nodata for uint8
        )

        dst_path.parent.mkdir(parents=True, exist_ok=True)
        with rasterio.open(dst_path, "w", **profile) as dst:
            dst.write(hs, 1)

    # Overviews
    try:
        print("[GEOTIFF] Building overviews for hillshade: %s", dst_path)
        with rasterio.open(dst_path, "r+") as dst:
            levels = [2, 4, 8, 16]
            dst.build_overviews(levels, Resampling.average)
            dst.update_tags(ns="rio_overview", resampling="average")
        print("[GEOTIFF] Hillshade overviews built")
    except Exception as e:
        logger.exception("[GEOTIFF] Hillshade overview build failed: %s", e)


# -------------------------
# Normal image -> tiled/pyramidal TIFF (pyvips)
# -------------------------
def _process_image(src_path: Path, dst_path: Path):
    print("[GEOTIFF] Processing image (non-GeoTIFF): %s -> %s", src_path, dst_path)
    img = pyvips.Image.new_from_file(str(src_path), access="sequential")
    print("[GEOTIFF] Image loaded: width=%d, height=%d, interpretation=%s",
          img.width, img.height, img.interpretation)

    if img.interpretation == "cmyk":
        print("[GEOTIFF] Converting CMYK to sRGB")
        img = img.icc_transform("srgb")

    print("[GEOTIFF] Saving tiled pyramid TIFF")
    img.tiffsave(
        str(dst_path),
        compression="deflate",
        tile=True,
        tile_width=256,
        tile_height=256,
        pyramid=True,
        bigtiff=True,
    )
    print("[GEOTIFF] Image saved successfully: %s", dst_path)


# -------------------------
# Copy to Cantaloupe shared volume (optional / for your setup)
# -------------------------
def _copy_to_cantaloupe(src_path: Path, resource_id: str) -> Path:
    print("[GEOTIFF] Copying to Cantaloupe for resource_id: %s", resource_id)
    cantaloupe_dir_raw = getattr(settings, "CANTALOUPE_DIR", None)
    if not cantaloupe_dir_raw:
        print("[GEOTIFF] CANTALOUPE_DIR not set in Django settings!")
        raise RuntimeError("CANTALOUPE_DIR is not set in Django settings")

    cantaloupe_dir = Path(cantaloupe_dir_raw)
    print("[GEOTIFF] CANTALOUPE_DIR: %s", cantaloupe_dir)

    resource_dir = cantaloupe_dir / resource_id
    resource_dir.mkdir(parents=True, exist_ok=True)

    dest_path = resource_dir / src_path.name
    print("[GEOTIFF] Copying: %s -> %s", src_path, dest_path)
    shutil.copy2(src_path, dest_path)
    print("[GEOTIFF] File copied to Cantaloupe: %s", dest_path)

    relative = Path(resource_id) / src_path.name
    print("[GEOTIFF] Cantaloupe relative path: %s", relative)
    return relative


# -------------------------
# GeoTIFF meta extraction + sidecar save/load
# -------------------------
def extract_geotiff_meta(tif_path: Path) -> dict:
    print("[GEOTIFF] Extracting metadata from: %s", tif_path)
    meta = {
        "is_geotiff": False,
        "crs": None,
        "bounds_native": None,
        "bounds_wgs84": None,
        "footprint_wgs84": None,
        "transform": None,
        "width": None,
        "height": None,
        "res": None,
        "count": None,
        "dtype": None,
        "nodata": None,
    }

    with rasterio.open(tif_path) as src:
        meta["width"] = src.width
        meta["height"] = src.height
        meta["res"] = list(src.res) if src.res else None
        meta["count"] = src.count
        meta["dtype"] = src.dtypes[0] if src.dtypes else None
        meta["nodata"] = src.nodata

        print("[GEOTIFF] Basic meta: width=%d, height=%d, count=%d, crs=%s, dtype=%s",
              src.width, src.height, src.count, src.crs, meta["dtype"])

        # ✅ POPRAWKA: Sprawdź czy ma CRS (nie wymagaj is_valid)
        if src.crs and src.transform != rasterio.Affine.identity():
            meta["is_geotiff"] = True
            meta["crs"] = src.crs.to_string()
            print("[GEOTIFF] CRS detected: %s", meta["crs"])

            b = src.bounds
            meta["bounds_native"] = {
                "left": float(b.left),
                "bottom": float(b.bottom),
                "right": float(b.right),
                "top": float(b.top),
            }
            print("[GEOTIFF] Native bounds: %s", meta["bounds_native"])

            t = src.transform
            meta["transform"] = {
                "a": float(t.a), "b": float(t.b), "c": float(t.c),
                "d": float(t.d), "e": float(t.e), "f": float(t.f),
            }

            # ✅ ZMIENIONE: Tylko próbuj transformować do WGS84 jeśli CRS nie jest LOCAL
            try:
                if "LOCAL_CS" not in str(src.crs):
                    print("[GEOTIFF] Transforming bounds to WGS84...")
                    left, bottom, right, top = transform_bounds(
                        src.crs, "EPSG:4326",
                        b.left, b.bottom, b.right, b.top,
                        densify_pts=21
                    )
                    meta["bounds_wgs84"] = {
                        "left": float(left),
                        "bottom": float(bottom),
                        "right": float(right),
                        "top": float(top),
                    }
                    meta["footprint_wgs84"] = {
                        "type": "Feature",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [[
                                [float(left),  float(bottom)],
                                [float(right), float(bottom)],
                                [float(right), float(top)],
                                [float(left),  float(top)],
                                [float(left),  float(bottom)],
                            ]]
                        },
                        "properties": {}
                    }
                    print("[GEOTIFF] WGS84 bounds: %s", meta["bounds_wgs84"])
                else:
                    print("[GEOTIFF] LOCAL_CS detected, skipping WGS84 transform")
            except Exception as e:
                print("[GEOTIFF] Failed to transform bounds to WGS84: %s", e)
        else:
            print("[GEOTIFF] No valid CRS or identity transform - treating as regular image")

    print("[GEOTIFF] Metadata extraction complete")
    return meta

def save_geotiff_meta(globalid: str, meta: dict, overwrite: bool = True) -> Path:
    out = META_DIR / f"{globalid}.json"
    print("[GEOTIFF] Saving metadata for globalid=%s to: %s (overwrite=%s)", out, globalid, overwrite)

    if out.exists() and not overwrite:
        print("[GEOTIFF] Metadata file already exists, skipping (overwrite=False)")
        return out

    tmp = out.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")
    tmp.replace(out)
    print("[GEOTIFF] Metadata saved successfully: %s", out)
    return out


def load_geotiff_meta(globalid: str):
    p = META_DIR / f"{globalid}.json"
    print("[GEOTIFF] Loading metadata for globalid=%s from: %s", globalid, p)

    if not p.exists():
        print("[GEOTIFF] Metadata file not found: %s", p)
        return None

    data = json.loads(p.read_text(encoding="utf-8"))
    print("[GEOTIFF] Metadata loaded successfully for globalid=%s", globalid)
    return data


@require_GET
def geotiff_meta(request, globalid: str):
    print("[GEOTIFF] GET /api/iiif/geotiff-meta/%s", globalid)
    data = load_geotiff_meta(str(globalid))
    if not data:
        print("[GEOTIFF] Metadata not found for globalid=%s", globalid)
        return JsonResponse({"ok": False, "error": "not found", "globalid": str(globalid)}, status=404)

    return JsonResponse({"ok": True, "globalid": str(globalid), "meta": data})


# -------------------------
# Download raw DEM
# -------------------------
@require_GET
def dem_file(request, globalid: str):
    """
    GET /files/dem/<globalid>.tif
    """
    p = RAW_DEM_DIR / f"{globalid}.tif"
    if not p.exists():
        return JsonResponse({"ok": False, "error": "not found", "globalid": str(globalid)}, status=404)
    return FileResponse(open(p, "rb"), content_type="image/tiff")


# -------------------------
# Internal call to /image-service-manager (no CSRF, no testserver)
# -------------------------
def _uploaded_from_path(path: Path, content_type="image/tiff", chunk: int = 8 * 1024 * 1024):
    """
    Disk-backed upload object. Do NOT read a 2GB file into RAM.
    """
    print("[GEOTIFF] Creating TemporaryUploadedFile from: %s (size: %d)", path, path.stat().st_size)
    tmp = TemporaryUploadedFile(
        name=path.name,
        content_type=content_type,
        size=path.stat().st_size,
        charset=None,
    )
    with open(path, "rb") as src:
        for part in iter(lambda: src.read(chunk), b""):
            tmp.write(part)
    tmp.seek(0)
    print("[GEOTIFF] TemporaryUploadedFile created")
    return tmp


def _create_manifest_internal(orig_request, processed_path: Path, title: str, description: str, transaction_id: str):
    print("[GEOTIFF] Creating manifest: title='%s', transaction_id=%s", title, transaction_id)
    rf = RequestFactory()

    host = orig_request.META.get("HTTP_X_FORWARDED_HOST") or orig_request.get_host()
    xfp = orig_request.META.get("HTTP_X_FORWARDED_PROTO")
    secure = (xfp.split(",")[0].strip() == "https") if xfp else orig_request.is_secure()

    server_name, server_port = splitport(host)
    if not server_port:
        server_port = "443" if secure else "80"

    print("[GEOTIFF] Request info: host=%s, secure=%s, server_name=%s, server_port=%s",
          host, secure, server_name, server_port)

    upload = _uploaded_from_path(processed_path, content_type="image/tiff")

    data = {
        "operation": "create",
        "transaction_id": transaction_id,
        "manifest_title": title,
        "manifest_description": description,
        "files": upload,
    }

    print("[GEOTIFF] Calling /image-service-manager with operation=create")
    req = rf.post(
        "/image-service-manager",
        data=data,
        HTTP_HOST=host,
        secure=secure,
    )

    req.META["SERVER_NAME"] = server_name
    req.META["SERVER_PORT"] = server_port
    req.META["wsgi.url_scheme"] = "https" if secure else "http"
    if xfp:
        req.META["HTTP_X_FORWARDED_PROTO"] = xfp
    if orig_request.META.get("HTTP_X_FORWARDED_HOST"):
        req.META["HTTP_X_FORWARDED_HOST"] = orig_request.META["HTTP_X_FORWARDED_HOST"]

    req.user = getattr(orig_request, "user", None)
    req.session = getattr(orig_request, "session", None)
    req._dont_enforce_csrf_checks = True

    match = resolve("/image-service-manager")
    resp = match.func(req, *match.args, **match.kwargs)

    print("[GEOTIFF] Manifest manager response: status=%d", resp.status_code)
    if resp.status_code != 200:
        print("[GEOTIFF] Manifest manager failed: %s", resp.content[:2000])
        raise Exception(f"Manifest manager returned {resp.status_code}: {resp.content[:2000]}")

    manifest_data = json.loads(resp.content)
    print("[GEOTIFF] Manifest created successfully: %s", manifest_data)
    return manifest_data


# -------------------------
# Patch helpers for manifest JSON (v2)
# -------------------------
def _ensure_list_field(obj: dict, key: str):
    v = obj.get(key)
    if v is None:
        obj[key] = []
        return obj[key]
    if isinstance(v, list):
        return v
    if isinstance(v, dict):
        obj[key] = [v]
        return obj[key]
    obj[key] = []
    return obj[key]


def add_seeAlso(manifest_json: dict, entry: dict):
    arr = _ensure_list_field(manifest_json, "seeAlso")
    target_id = entry.get("@id")
    if target_id and any(isinstance(x, dict) and x.get("@id") == target_id for x in arr):
        print("[GEOTIFF] seeAlso entry already exists, skipping: %s", target_id)
        return
    arr.append(entry)
    print("[GEOTIFF] Added seeAlso entry: %s", target_id)


def add_seeAlso_to_first_canvas(manifest_json: dict, entry: dict):
    try:
        seq0 = (manifest_json.get("sequences") or [])[0]
        canv0 = (seq0.get("canvases") or [])[0]
    except Exception as e:
        print("[GEOTIFF] Could not access first canvas: %s", e)
        return
    if isinstance(canv0, dict):
        add_seeAlso(canv0, entry)
        print("[GEOTIFF] Added seeAlso to first canvas")


def patch_manifest_db_add_geotiff_seeAlso(globalid: str, request, meta_abs_url: str, label: str = "GeoTIFF metadata"):
    print("[GEOTIFF] Patching manifest in DB for globalid=%s with seeAlso: %s", globalid, meta_abs_url)

    if IIIFManifest is None:
        print("[GEOTIFF] IIIFManifest model is None - cannot patch manifest!")
        raise RuntimeError("IIIFManifest model import failed; fix import path for your Arches install")

    obj = IIIFManifest.objects.get(globalid=str(globalid))
    manifest_json = obj.manifest

    entry = {
        "@id": meta_abs_url,
        "label": label,
        "format": "application/json",
    }

    add_seeAlso(manifest_json, entry)
    add_seeAlso_to_first_canvas(manifest_json, entry)

    obj.manifest = manifest_json
    obj.save()
    print("[GEOTIFF] Manifest saved to DB with seeAlso entries")


def patch_manifest_db_add_rendering_and_related(globalid: str, request, raw_dem_abs_url: str, related_ortho_globalid: str):
    """
    For DEM manifests only:
      - add "rendering" pointing to raw DEM
      - add "related" pointing to orthophoto manifest
    """
    print("[GEOTIFF] Patching DEM manifest in DB: globalid=%s", globalid)

    if IIIFManifest is None:
        raise RuntimeError("IIIFManifest model import failed")

    obj = IIIFManifest.objects.get(globalid=str(globalid))
    manifest_json = obj.manifest

    # rendering
    rendering = _ensure_list_field(manifest_json, "rendering")
    if raw_dem_abs_url and not any(isinstance(x, dict) and x.get("@id") == raw_dem_abs_url for x in rendering):
        rendering.append({
            "@id": raw_dem_abs_url,
            "format": "image/tiff",
            "label": "Download raw DEM (COG)",
        })
        print("[GEOTIFF] Added rendering: %s", raw_dem_abs_url)

    # related (DEM -> Ortho)
    if related_ortho_globalid:
        related_abs = request.build_absolute_uri(f"/manifest/{related_ortho_globalid}")
        related = _ensure_list_field(manifest_json, "related")
        if not any(isinstance(x, dict) and x.get("@id") == related_abs for x in related):
            related.append({
                "@id": related_abs,
                "@type": "sc:Manifest",
                "label": "Related orthophoto",
            })
            print("[GEOTIFF] Added related -> %s", related_abs)

    obj.manifest = manifest_json
    obj.save()
    print("[GEOTIFF] DEM manifest saved with rendering/related")


# -------------------------
# Main endpoint: upload -> process -> manifest -> meta sidecar + manifest patch
# -------------------------
@csrf_exempt
@require_POST
def geotiff_reencode_test(request):
    print("[GEOTIFF] ==================== NEW REQUEST ====================")
    print("[GEOTIFF] POST /api/iiif/geotiff-reencode-test")

    files = request.FILES.getlist("files")
    if not files:
        print("[GEOTIFF] No files in request")
        return JsonResponse({"ok": False, "error": "No files"}, status=400)

    f = files[0]
    print("[GEOTIFF] File received: name=%s, size=%d bytes", f.name, f.size)

    if f.size > MAX_BYTES:
        print("[GEOTIFF] File too large: %d > %d", f.size, MAX_BYTES)
        return JsonResponse({"ok": False, "error": "File too large"}, status=413)

    title = request.POST.get("manifest_title", f"Upload {f.name}")
    description = request.POST.get("manifest_description", "Processed via geotiff reencode")
    transaction_id = request.POST.get("transaction_id", "geotiff-workflow")
    resource_id = request.POST.get("resource_id") or str(uuid.uuid4())
    asset_type = (request.POST.get("asset_type") or request.POST.get("assetType") or "iiif").strip().lower()

    # DEM -> Ortho globalid (optional)
    related_manifest_id = (request.POST.get("related_manifest_id") or "").strip()

    print("[GEOTIFF] Parameters: title='%s', transaction_id=%s, resource_id=%s, asset_type=%s, related_manifest_id=%s",
          title, transaction_id, resource_id, asset_type, related_manifest_id)

    batch_id = uuid.uuid4().hex
    out_dir = TMP_DIR / batch_id
    out_dir.mkdir(parents=True, exist_ok=True)
    print("[GEOTIFF] Created batch dir: %s (batch_id=%s)", out_dir, batch_id)

    in_path = out_dir / _safe_name(f.name)
    out_path = out_dir / (Path(f.name).stem + "_processed.tif")
    hs_path = out_dir / (Path(f.name).stem + "_hillshade_8bit.tif")

    try:
        _save_upload(f, in_path)

        file_type = "image"
        display_path = None

        if _is_geotiff(in_path):
            print("[GEOTIFF] File is GeoTIFF - processing with rasterio")
            _process_geotiff(in_path, out_path)
            file_type = "geotiff"

            # If DEM + float dtype -> generate hillshade display for IIIF
            if asset_type == "dem":
                with rasterio.open(out_path) as src:
                    dtype = (src.dtypes[0] if src.dtypes else "") or ""
                    is_float = "float" in dtype.lower()
                    single_band = (src.count == 1)

                if is_float and single_band:
                    print("[GEOTIFF] DEM appears float single-band -> generating hillshade display for IIIF")
                    _make_hillshade_8bit(out_path, hs_path)
                    display_path = hs_path
                else:
                    # if user uploaded already hillshade/relief (byte/int), use processed as display
                    display_path = out_path
            else:
                display_path = out_path
        else:
            print("[GEOTIFF] File is regular image - processing with pyvips")
            _process_image(in_path, out_path)
            file_type = "image"
            display_path = out_path

        # (optional) copy whatever is used as display to cantaloupe shared vol
        cantaloupe_relative_path = _copy_to_cantaloupe(display_path, resource_id)

        # create IIIF manifest for display file
        manifest_data = _create_manifest_internal(request, display_path, title, description, transaction_id)
        globalid = manifest_data.get("globalid")
        print("[GEOTIFF] Manifest created with globalid=%s", globalid)

        meta_url = None
        meta_abs = None

        if globalid:
            print("[GEOTIFF] Extracting and saving metadata for globalid=%s", globalid)

            meta = extract_geotiff_meta(display_path)
            meta.update({
                "resource_id": resource_id,
                "processed_filename": display_path.name,
                "cantaloupe_relative_path": str(cantaloupe_relative_path),
                "transaction_id": transaction_id,
                "asset_type": asset_type,
                "manifest_url": manifest_data.get("url"),
                "related_ortho_globalid": related_manifest_id or None,
            })

            # build meta URL (serve from Django)
            meta_url = f"/api/iiif/geotiff-meta/{globalid}"
            meta_abs = request.build_absolute_uri(meta_url)
            meta["meta_abs_url"] = meta_abs

            # save sidecar meta
            save_geotiff_meta(str(globalid), meta, overwrite=True)

            # patch IIIF manifest in DB: add seeAlso to meta
            patch_manifest_db_add_geotiff_seeAlso(globalid=str(globalid), request=request, meta_abs_url=meta_abs)

            # For DEM: store raw + patch rendering/related
            if asset_type == "dem":
                raw_path = RAW_DEM_DIR / f"{globalid}.tif"
                # store the original uploaded file as "raw" (you can change to out_path if you want reencoded raw)
                shutil.copy2(in_path, raw_path)
                raw_url = f"/files/dem/{globalid}.tif"
                raw_abs = request.build_absolute_uri(raw_url)

                # patch DEM manifest: rendering + related
                patch_manifest_db_add_rendering_and_related(
                    globalid=str(globalid),
                    request=request,
                    raw_dem_abs_url=raw_abs,
                    related_ortho_globalid=related_manifest_id,
                )

                # also record raw link in meta (useful outside IIIF)
                meta["raw_dem_url"] = raw_abs
                save_geotiff_meta(str(globalid), meta, overwrite=True)
        else:
            print("[GEOTIFF] No globalid returned from manifest creation!")

        response_data = {
            "ok": True,
            "batch_id": batch_id,
            "resource_id": resource_id,
            "file_type": file_type,
            "manifest_url": manifest_data.get("url"),
            "globalid": globalid,
            "meta_url": meta_url,
            "meta_abs_url": meta_abs,
            "processed_filename": (display_path.name if display_path else None),
            "asset_type": asset_type,
            "related_manifest_id": related_manifest_id or None,
        }
        print("[GEOTIFF] Success! Response: %s", response_data)
        return JsonResponse(response_data)

    except Exception as e:
        logger.exception("[GEOTIFF] Processing failed with exception")
        return JsonResponse({"ok": False, "error": str(e)}, status=500)
    

import time
def _affine_from_meta(meta):
    t = (meta or {}).get("transform") or {}
    keys = ["a","b","c","d","e","f"]
    if not all(k in t and t[k] is not None for k in keys):
        return None
    return Affine(float(t["a"]), float(t["b"]), float(t["c"]),
                  float(t["d"]), float(t["e"]), float(t["f"]))

def _crs_from_meta(meta):
    crs = (meta or {}).get("crs")
    return CRS.from_string(crs) if crs else None
@require_GET
def dem_elevation(request, globalid: str):
    """
    GET /api/iiif/dem-elevation/<globalid>?px=..&py=..
    
    globalid może być DEM lub ortofoto.
    Jeśli ortofoto -> znajdź powiązany DEM i transformuj współrzędne
    """
    t_start = time.perf_counter()
    print("[DEM ELEVATION] ===== START ===== input_gid=%s", globalid)

    try:
        px = float(request.GET.get("px"))
        py = float(request.GET.get("py"))
        print("[DEM ELEVATION] Query params: px=%.4f, py=%.4f", px, py)
    except (TypeError, ValueError):
        print("[DEM ELEVATION] Invalid px/py parameters")
        return JsonResponse({"ok": False, "error": "Missing or invalid px/py"}, status=400)

    # ✅ STEP 1: Load metadata for input globalid
    t_meta_start = time.perf_counter()
    input_meta = load_geotiff_meta(str(globalid))
    t_meta_end = time.perf_counter()
    print("[DEM ELEVATION] Input metadata load took %.3f ms for gid=%s", (t_meta_end - t_meta_start) * 1000, globalid)
    
    if not input_meta:
        print("[DEM ELEVATION] No metadata found for input globalid=%s", globalid)
        return JsonResponse({"ok": False, "error": "No meta for input globalid"}, status=404)

    # ✅ STEP 2: Check if input is DEM or find related DEM
    dem_gid = None
    src_gid = None
    
    input_asset_type = input_meta.get("asset_type", "").lower()
    dem_path = RAW_DEM_DIR / f"{globalid}.tif"
    
    if input_asset_type == "dem" and dem_path.exists():
        # Input is DEM - use directly
        dem_gid = str(globalid)
        print("[DEM ELEVATION] Input is DEM: using directly")
    else:
        # Input is ortofoto - find related DEM
        print("[DEM ELEVATION] Input is ortofoto (asset_type=%s), searching for related DEM", input_asset_type)
        src_gid = str(globalid)  # ortofoto as source
        
        # ✅ Look for DEM with related_ortho_globalid pointing to this ortofoto
        related_ortho_gid = input_meta.get("related_ortho_globalid")
        if related_ortho_gid:
            # This ortofoto points to another ortofoto? Weird, but check if that's a DEM
            dem_candidate_path = RAW_DEM_DIR / f"{related_ortho_gid}.tif"
            if dem_candidate_path.exists():
                dem_gid = related_ortho_gid
                print("[DEM ELEVATION] Found DEM via related_ortho_globalid: %s", dem_gid)
        
        if not dem_gid:
            # ✅ Search all DEM metadata files for one that references this ortofoto
            print("[DEM ELEVATION] Searching all DEM files for related_ortho_globalid=%s", globalid)
            for meta_file in META_DIR.glob("*.json"):
                try:
                    candidate_meta = json.loads(meta_file.read_text(encoding="utf-8"))
                    if (candidate_meta.get("asset_type", "").lower() == "dem" and 
                        candidate_meta.get("related_ortho_globalid") == globalid):
                        candidate_gid = meta_file.stem
                        candidate_dem_path = RAW_DEM_DIR / f"{candidate_gid}.tif"
                        if candidate_dem_path.exists():
                            dem_gid = candidate_gid
                            print("[DEM ELEVATION] Found related DEM: %s -> %s", globalid, dem_gid)
                            break
                except Exception as e:
                    print("[DEM ELEVATION] Error checking metadata file %s: %s", meta_file, e)
        
        if not dem_gid:
            print("[DEM ELEVATION] No related DEM found for ortofoto=%s", globalid)
            return JsonResponse({"ok": False, "error": "No related DEM found for ortofoto"}, status=404)

    # ✅ STEP 3: Load DEM metadata and setup transform
    dem_meta = load_geotiff_meta(dem_gid)
    if not dem_meta:
        print("[DEM ELEVATION] No metadata found for DEM globalid=%s", dem_gid)
        return JsonResponse({"ok": False, "error": "No meta for DEM"}, status=404)

    dem_aff = _affine_from_meta(dem_meta)
    dem_crs = _crs_from_meta(dem_meta)
    if dem_aff is None:
        return JsonResponse({"ok": False, "error": "DEM meta missing affine transform"}, status=400)

    dem_path = RAW_DEM_DIR / f"{dem_gid}.tif"
    if not dem_path.exists():
        print("[DEM ELEVATION] DEM file not found: %s", dem_path)
        return JsonResponse({"ok": False, "error": "DEM file not found"}, status=404)

    print("[DEM ELEVATION] Using DEM: %s (size: %.2f MB)", dem_path, dem_path.stat().st_size / (1024**2))

    # ✅ STEP 4: Transform coordinates if needed
    if src_gid and src_gid != dem_gid:
        print("[DEM ELEVATION] ORTOFOTO->DEM transform: src_gid=%s -> dem_gid=%s", src_gid, dem_gid)
        
        # Get source (ortofoto) affine and CRS
        src_aff = _affine_from_meta(input_meta)
        src_crs = _crs_from_meta(input_meta)
        
        if src_aff is None:
            return JsonResponse({"ok": False, "error": "Source meta missing affine transform"}, status=400)
        
        print("[DEM ELEVATION] SRC meta CRS=%s | DEM meta CRS=%s", src_crs, dem_crs)
        print("[DEM ELEVATION] SRC px/py = (%.3f, %.3f)", px, py)

        # 1) ortofoto pixel -> world coordinates
        X, Y = (src_aff * (px, py))
        print("[DEM ELEVATION] SRC world coords (X,Y) = (%.6f, %.6f)", X, Y)

        # 2) reproject if needed
        Xd, Yd = X, Y
        if src_crs and dem_crs and src_crs != dem_crs:
            try:
                Xd_list, Yd_list = warp_transform(src_crs, dem_crs, [X], [Y])
                Xd, Yd = Xd_list[0], Yd_list[0]
                print("[DEM ELEVATION] Reprojected to DEM CRS -> (Xd,Yd) = (%.6f, %.6f)", Xd, Yd)
            except Exception as e:
                print("[DEM ELEVATION] Coordinate reprojection failed: %s", e)
                return JsonResponse({"ok": False, "error": "Coordinate reprojection failed"}, status=400)
        else:
            print("[DEM ELEVATION] CRS identical; skip reprojection")

        # 3) world -> DEM pixel
        col_f, row_f = (~dem_aff) * (Xd, Yd)
        col = int(round(col_f))
        row = int(round(row_f))
        print("[DEM ELEVATION] DEM pixel (float) = (%.3f, %.3f) -> rounded (col,row) = (%d, %d)", col_f, row_f, col, row)
        
        extra = {
            "src_type": "ortofoto",
            "src_gid": src_gid,
            "src_px": px, "src_py": py,
            "world": {"x": float(Xd), "y": float(Yd), "crs": str(dem_meta.get("crs") or "")},
            "dem_gid": dem_gid,
            "dem_px": float(col_f), "dem_py": float(row_f),
            "dem_col": col, "dem_row": row,
        }
    else:
        col = int(round(px))
        row = int(round(py))
        print("[DEM ELEVATION] Using DEM pixels directly: (col,row) = (%d, %d)", col, row)
        extra = {"src_type": "dem_direct", "dem_gid": dem_gid}

    # ✅ STEP 5: Read elevation from DEM
    t_raster_start = time.perf_counter()
    with rasterio.open(dem_path) as src:
        t_open = time.perf_counter()
        print("[DEM ELEVATION] rasterio.open() took %.3f ms", (t_open - t_raster_start) * 1000)

        print("[DEM ELEVATION] Final DEM pixel coords: row=%d, col=%d (DEM size: %dx%d)",
              row, col, src.width, src.height)

        if row < 0 or row >= src.height or col < 0 or col >= src.width:
            print("[DEM ELEVATION] Pixel out of bounds: (%d, %d)", col, row)
            return JsonResponse({
                "ok": False,
                "error": "Outside DEM bounds",
                "input_gid": globalid,
                "dem_gid": dem_gid,
                **extra
            }, status=400)

        t_read_start = time.perf_counter()
        window = Window(col, row, 1, 1)
        val = src.read(1, window=window)[0, 0]
        t_read_end = time.perf_counter()
        print("[DEM ELEVATION] windowed read took %.3f ms", (t_read_end - t_read_start) * 1000)
        
        nodata = src.nodata
        print("[DEM ELEVATION] Value at pixel: %.3f (nodata=%s)", val, nodata)

        if nodata is not None and val == nodata:
            t_total = time.perf_counter() - t_start
            print("[DEM ELEVATION] ===== END (nodata) ===== Total: %.3f ms", t_total * 1000)
            return JsonResponse({
                "ok": True,
                "elevation": None,
                "nodata": True,
                "input_gid": globalid,
                "dem_gid": dem_gid,
                **extra
            })

    t_total = time.perf_counter() - t_start
    print("[DEM ELEVATION] ===== END (success) ===== Total: %.3f ms", t_total * 1000)
    
    return JsonResponse({
        "ok": True,
        "elevation": float(val),
        "nodata": False,
        "input_gid": globalid,
        "dem_gid": dem_gid,
        "crs": dem_meta.get("crs"),
        "units": "m",
        **extra
    })