import uuid
import json
import shutil
import logging
from pathlib import Path
from urllib.parse import splitport

from django.http import JsonResponse
from django.views.decorators.http import require_POST, require_GET
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.test import RequestFactory
from django.urls import resolve
from django.core.files.uploadedfile import TemporaryUploadedFile

import rasterio
from rasterio.enums import Resampling
from rasterio.warp import transform_bounds

import pyvips

logger = logging.getLogger(__name__)

# ---- Try to import IIIFManifest model (Arches variants) ----
try:
    # most common in Arches installs
    from arches.app.models.models import IIIFManifest
    print("[GEOTIFF] IIIFManifest imported from arches.app.models.models")
except Exception:  # pragma: no cover
    try:
        # fallback some installs expose it elsewhere
        from arches.app.models.iiif import IIIFManifest
        print("[GEOTIFF] IIIFManifest imported from arches.app.models.iiif")
    except Exception:
        IIIFManifest = None
        logger.warning("[GEOTIFF] Could not import IIIFManifest model!")


TMP_DIR = Path("/tmp/arches_iiif_diag").resolve()
TMP_DIR.mkdir(parents=True, exist_ok=True)
print("[GEOTIFF] TMP_DIR: %s", TMP_DIR)

# where to keep sidecar geo-metadata (configurable)
META_DIR = Path(getattr(settings, "IIIF_GEOTIFF_META_DIR", "/tmp/arches_iiif_meta")).resolve()
META_DIR.mkdir(parents=True, exist_ok=True)
print("[GEOTIFF] META_DIR: %s", META_DIR)

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
            result = bool(src.crs and src.crs.is_valid)
            print("[GEOTIFF] _is_geotiff(%s): %s (CRS: %s)", path.name, result, src.crs)
            return result
    except Exception as e:
        logger.warning("[GEOTIFF] _is_geotiff(%s) failed: %s", path.name, e)
        return False


# -------------------------
# GeoTIFF -> reencode (rasterio)
# -------------------------
def _process_geotiff(src_path: Path, dst_path: Path, tile: int = 256):
    print("[GEOTIFF] Processing GeoTIFF: %s -> %s", src_path, dst_path)

    with rasterio.open(src_path) as src:
        print("[GEOTIFF] Source: width=%d, height=%d, count=%d, crs=%s", 
                    src.width, src.height, src.count, src.crs)
        
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
            for band_idx, window in src.block_windows(1):
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
# Copy to Cantaloupe shared volume
# -------------------------
def _copy_to_cantaloupe(src_path: Path, resource_id: str) -> Path:
    print("[GEOTIFF] Copying to Cantaloupe for resource_id: %s", resource_id)
    cantaloupe_dir_raw = getattr(settings, "CANTALOUPE_DIR", None)
    if not cantaloupe_dir_raw:
        logger.error("[GEOTIFF] CANTALOUPE_DIR not set in Django settings!")
        raise RuntimeError("CANTALOUPE_DIR is not set in Django settings")

    cantaloupe_dir = Path(cantaloupe_dir_raw)
    print("[GEOTIFF] CANTALOUPE_DIR: %s", cantaloupe_dir)

    resource_dir = cantaloupe_dir / resource_id
    resource_dir.mkdir(parents=True, exist_ok=True)

    dest_path = resource_dir / src_path.name
    print("[GEOTIFF] Copying: %s -> %s", src_path, dest_path)
    shutil.copy2(src_path, dest_path)
    print("[GEOTIFF] File copied to Cantaloupe: %s", dest_path)

    # relative path (as Cantaloupe sees it)
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

        print("[GEOTIFF] Basic meta: width=%d, height=%d, count=%d, crs=%s", 
                    src.width, src.height, src.count, src.crs)

        if src.crs and src.crs.is_valid:
            meta["is_geotiff"] = True
            meta["crs"] = src.crs.to_string()
            print("[GEOTIFF] Valid CRS detected: %s", meta["crs"])

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

            try:
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
            except Exception as e:
                logger.exception("[GEOTIFF] transform_bounds failed for %s: %s", tif_path, e)
        else:
            print("[GEOTIFF] No valid CRS - treating as regular image")

    print("[GEOTIFF] Metadata extraction complete")
    return meta


def save_geotiff_meta(globalid: str, meta: dict, overwrite: bool = True) -> Path:
    out = META_DIR / f"{globalid}.json"
    print("[GEOTIFF] Saving metadata for globalid=%s to: %s (overwrite=%s)", globalid, out, overwrite)
    
    if out.exists() and not overwrite:
        print("[GEOTIFF] Metadata file already exists, skipping (overwrite=False)")
        return out
    
    tmp = out.with_suffix(".json.tmp")
    print("[GEOTIFF] Writing to temp file: %s", tmp)
    tmp.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")
    tmp.replace(out)
    print("[GEOTIFF] Metadata saved successfully: %s", out)
    return out


def load_geotiff_meta(globalid: str):
    p = META_DIR / f"{globalid}.json"
    print("[GEOTIFF] Loading metadata for globalid=%s from: %s", globalid, p)
    
    if not p.exists():
        logger.warning("[GEOTIFF] Metadata file not found: %s", p)
        return None
    
    data = json.loads(p.read_text(encoding="utf-8"))
    print("[GEOTIFF] Metadata loaded successfully for globalid=%s", globalid)
    return data


@require_GET
def geotiff_meta(request, globalid: str):
    print("[GEOTIFF] GET /api/iiif/geotiff-meta/%s", globalid)
    data = load_geotiff_meta(str(globalid))
    if not data:
        logger.warning("[GEOTIFF] Metadata not found for globalid=%s", globalid)
        return JsonResponse({"ok": False, "error": "not found", "globalid": str(globalid)}, status=404)
    
    print("[GEOTIFF] Returning metadata for globalid=%s", globalid)
    return JsonResponse({"ok": True, "globalid": str(globalid), "meta": data})


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
        "files": upload,  # manifest manager expects "files"
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
        logger.error("[GEOTIFF] Manifest manager failed: %s", resp.content[:2000])
        raise Exception(f"Manifest manager returned {resp.status_code}: {resp.content[:2000]}")

    manifest_data = json.loads(resp.content)
    print("[GEOTIFF] Manifest created successfully: %s", manifest_data)
    return manifest_data


# -------------------------
# Patch manifest in DB: add seeAlso to v2 manifest JSON
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
    # weird type -> overwrite
    obj[key] = []
    return obj[key]


def add_seeAlso(manifest_json: dict, entry: dict):
    """
    IIIF Presentation 2: 'seeAlso' can be dict or list. We normalize to list.
    """
    arr = _ensure_list_field(manifest_json, "seeAlso")
    target_id = entry.get("@id")
    if target_id and any(isinstance(x, dict) and x.get("@id") == target_id for x in arr):
        print("[GEOTIFF] seeAlso entry already exists, skipping: %s", target_id)
        return
    arr.append(entry)
    print("[GEOTIFF] Added seeAlso entry: %s", target_id)


def add_seeAlso_to_first_canvas(manifest_json: dict, entry: dict):
    """
    Optional: attach seeAlso also to first Canvas, so clients that work per-canvas can find it.
    """
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
    """
    Load IIIFManifest from DB and patch its 'manifest' JSON with seeAlso.
    """
    print("[GEOTIFF] Patching manifest in DB for globalid=%s with seeAlso: %s", globalid, meta_abs_url)
    
    if IIIFManifest is None:
        logger.error("[GEOTIFF] IIIFManifest model is None - cannot patch manifest!")
        raise RuntimeError("IIIFManifest model import failed; fix import path for your Arches install")

    try:
        obj = IIIFManifest.objects.get(globalid=str(globalid))
        print("[GEOTIFF] Found IIIFManifest in DB: %s", obj)
    except IIIFManifest.DoesNotExist:
        logger.error("[GEOTIFF] IIIFManifest not found in DB for globalid=%s", globalid)
        raise

    manifest_json = obj.manifest  # this is the IIIF Presentation object (dict)
    print("[GEOTIFF] Current manifest structure keys: %s", list(manifest_json.keys()))

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


# -------------------------
# Main endpoint: upload -> process -> manifest -> meta sidecar + seeAlso patch
# -------------------------
@csrf_exempt
@require_POST
def geotiff_reencode_test(request):
    print("[GEOTIFF] ==================== NEW REQUEST ====================")
    print("[GEOTIFF] POST /api/iiif/geotiff-reencode-test")
    
    files = request.FILES.getlist("files")
    if not files:
        logger.warning("[GEOTIFF] No files in request")
        return JsonResponse({"ok": False, "error": "No files"}, status=400)

    f = files[0]
    print("[GEOTIFF] File received: name=%s, size=%d bytes", f.name, f.size)
    
    if f.size > MAX_BYTES:
        logger.warning("[GEOTIFF] File too large: %d > %d", f.size, MAX_BYTES)
        return JsonResponse({"ok": False, "error": "File too large"}, status=413)

    title = request.POST.get("manifest_title", f"Upload {f.name}")
    description = request.POST.get("manifest_description", "Processed via geotiff reencode")
    transaction_id = request.POST.get("transaction_id", "geotiff-workflow")
    resource_id = request.POST.get("resource_id") or str(uuid.uuid4())

    print("[GEOTIFF] Parameters: title='%s', transaction_id=%s, resource_id=%s", 
                title, transaction_id, resource_id)

    batch_id = uuid.uuid4().hex
    out_dir = TMP_DIR / batch_id
    out_dir.mkdir(parents=True, exist_ok=True)
    print("[GEOTIFF] Created batch dir: %s (batch_id=%s)", out_dir, batch_id)

    in_path = out_dir / _safe_name(f.name)
    out_path = out_dir / (Path(f.name).stem + "_processed.tif")
    print("[GEOTIFF] Paths: in=%s, out=%s", in_path, out_path)

    try:
        _save_upload(f, in_path)

        if _is_geotiff(in_path):
            print("[GEOTIFF] File is GeoTIFF - processing with rasterio")
            _process_geotiff(in_path, out_path)
            file_type = "geotiff"
        else:
            print("[GEOTIFF] File is regular image - processing with pyvips")
            _process_image(in_path, out_path)
            file_type = "image"

        cantaloupe_relative_path = _copy_to_cantaloupe(out_path, resource_id)
        
        manifest_data = _create_manifest_internal(request, out_path, title, description, transaction_id)
        globalid = manifest_data.get("globalid")
        print("[GEOTIFF] Manifest created with globalid=%s", globalid)

        meta_url = None
        meta_abs = None

        if globalid:
            print("[GEOTIFF] Extracting and saving metadata for globalid=%s", globalid)
            
            # 1) save sidecar
            meta = extract_geotiff_meta(out_path)
            meta.update({
                "resource_id": resource_id,
                "processed_filename": out_path.name,
                "cantaloupe_relative_path": str(cantaloupe_relative_path),
                "transaction_id": transaction_id,
                "manifest_url": manifest_data.get("url"),
            })
            saved_meta_path = save_geotiff_meta(str(globalid), meta, overwrite=True)
            print("[GEOTIFF] Metadata saved to: %s", saved_meta_path)

            # 2) build meta URL (serve from Django)
            meta_url = f"/api/iiif/geotiff-meta/{globalid}"
            meta_abs = request.build_absolute_uri(meta_url)
            print("[GEOTIFF] Metadata URL: %s", meta_abs)

            # 3) patch IIIF manifest in DB: add seeAlso to meta
            patch_manifest_db_add_geotiff_seeAlso(globalid=str(globalid), request=request, meta_abs_url=meta_abs)
        else:
            logger.warning("[GEOTIFF] No globalid returned from manifest creation!")

        response_data = {
            "ok": True,
            "batch_id": batch_id,
            "resource_id": resource_id,
            "file_type": file_type,
            "manifest_url": manifest_data.get("url"),
            "globalid": globalid,
            "meta_url": meta_url,
            "meta_abs_url": meta_abs,
            "processed_filename": out_path.name,
        }
        print("[GEOTIFF] Success! Response: %s", response_data)
        return JsonResponse(response_data)

    except Exception as e:
        logger.exception("[GEOTIFF] Processing failed with exception")
        return JsonResponse({"ok": False, "error": str(e)}, status=500)
