from celery import shared_task
import uuid
import json
import shutil
from pathlib import Path
import logging

import rasterio
import pyvips

from django.conf import settings
from django.test import RequestFactory
from django.urls import resolve
from django.core.files.uploadedfile import TemporaryUploadedFile

# ✅ Configure logger to write to stdout
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# Add console handler if not already present
if not logger.handlers:
    handler = logging.StreamHandler()
    handler.setLevel(logging.DEBUG)
    formatter = logging.Formatter('[%(asctime)s] [CELERY] %(levelname)s: %(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)

@shared_task(bind=True, name='arches_slocal.tasks.process_geotiff')
def process_geotiff_task(self, file_path, title, description, transaction_id, resource_id, asset_type, related_manifest_id, request_meta):
    logger.info("=" * 80)
    logger.info("TASK STARTED: process_geotiff_task")
    logger.info(f"Task ID: {self.request.id}")
    logger.info(f"File path: {file_path}")
    logger.info(f"Title: {title}")
    logger.info(f"Resource ID: {resource_id}")
    logger.info(f"Asset type: {asset_type}")
    logger.info("=" * 80)
    
    # ✅ Import inside the function to avoid circular importa
    try:
        logger.info("Importing functions from geotiif_handler...")
        from arches_slocal.views.geotiif_handler import (
            _is_geotiff,
            _process_geotiff,
            _make_hillshade_8bit,
            _process_image,
            extract_geotiff_meta,
            save_geotiff_meta,
            patch_manifest_db_add_geotiff_seeAlso,
            patch_manifest_db_add_rendering_and_related,
            TMP_DIR,
            RAW_DEM_DIR,
        )
        logger.info("✅ Imports successful")
    except Exception as e:
        logger.exception(f"❌ FAILED TO IMPORT: {e}")
        raise
    
    try:
        logger.info("Updating state to PROCESSING...")
        self.update_state(state='PROCESSING', meta={'status': 'Starting processing...'})
        logger.info("State updated")
        
        in_path = Path(file_path)
        batch_id = in_path.parent.name
        
        logger.info(f"Input file: {in_path}")
        logger.info(f"File exists: {in_path.exists()}")
        logger.info(f"File size: {in_path.stat().st_size if in_path.exists() else 'N/A'}")
        
        # ✅ Get shared Cantaloupe directory
        logger.info("Getting CANTALOUPE_DIR from settings...")
        cantaloupe_dir_raw = getattr(settings, "CANTALOUPE_DIR", None)
        logger.info(f"CANTALOUPE_DIR: {cantaloupe_dir_raw}")
        
        if not cantaloupe_dir_raw:
            logger.error("❌ CANTALOUPE_DIR is not set!")
            raise RuntimeError("CANTALOUPE_DIR is not set")
        
        cantaloupe_dir = Path(cantaloupe_dir_raw)
        
        # ✅ Ensure directory exists
        cantaloupe_dir.mkdir(parents=True, exist_ok=True)
        logger.info(f"Cantaloupe directory exists: {cantaloupe_dir.exists()}")
        
        # ✅ Use simple filename (flat structure for Cantaloupe)
        simple_filename = f"{resource_id}_{in_path.stem}_processed.tif"
        out_path = cantaloupe_dir / simple_filename
        
        logger.info(f"Output path: {out_path}")
        logger.info(f"Output path parent exists: {out_path.parent.exists()}")
        
        file_type = "image"
        display_path = None
        
        # Step 1: Determine file type and process DIRECTLY to final location
        logger.info("Checking if file is GeoTIFF...")
        self.update_state(state='PROCESSING', meta={'status': 'Analyzing file...'})
        
        is_geo = _is_geotiff(in_path)
        logger.info(f"Is GeoTIFF: {is_geo}")
        
        if is_geo:
            logger.info(f"Processing as GeoTIFF: {in_path}")
            self.update_state(state='PROCESSING', meta={'status': 'Processing GeoTIFF...'})
            
            logger.info("Calling _process_geotiff...")
            _process_geotiff(in_path, out_path)
            logger.info("✅ GeoTIFF processed")
            
            file_type = "geotiff"
            
            if asset_type == "dem":
                logger.info("Asset type is DEM - checking if needs hillshade...")
                with rasterio.open(out_path) as src:
                    dtype = (src.dtypes[0] if src.dtypes else "") or ""
                    is_float = "float" in dtype.lower()
                    single_band = (src.count == 1)
                    
                logger.info(f"DEM dtype: {dtype}, is_float: {is_float}, single_band: {single_band}")
                
                if is_float and single_band:
                    logger.info("Generating hillshade...")
                    self.update_state(state='PROCESSING', meta={'status': 'Generating hillshade...'})
                    # ✅ Hillshade also in flat structure
                    hs_filename = f"{resource_id}_{in_path.stem}_hillshade_8bit.tif"
                    hs_path = cantaloupe_dir / hs_filename
                    _make_hillshade_8bit(out_path, hs_path)
                    display_path = hs_path
                    logger.info(f"✅ Hillshade created: {hs_path}")
                else:
                    display_path = out_path
                    logger.info("Using processed DEM without hillshade")
            else:
                display_path = out_path
                logger.info(f"Using processed GeoTIFF: {out_path}")
        else:
            logger.info(f"Processing as regular image: {in_path}")
            self.update_state(state='PROCESSING', meta={'status': 'Processing image...'})
            
            _process_image(in_path, out_path)
            logger.info("✅ Image processed")
            
            file_type = "image"
            display_path = out_path
        
        # ✅ Cantaloupe path is just the filename (flat structure)
        cantaloupe_relative_path = display_path.name
        logger.info(f"Cantaloupe relative path: {cantaloupe_relative_path}")
        
        # Step 3: Create IIIF manifest
        logger.info("Creating IIIF manifest...")
        self.update_state(state='PROCESSING', meta={'status': 'Creating IIIF manifest...'})
        
        manifest_data = _create_manifest_internal_from_meta(
            display_path, title, description, transaction_id, request_meta
        )
        logger.info(f"Manifest data: {manifest_data}")
        
        globalid = manifest_data.get("globalid")
        logger.info(f"Manifest globalid: {globalid}")
        
        if not globalid:
            logger.error("❌ No globalid returned from manifest creation!")
            raise Exception("No globalid returned from manifest creation")
        
        # Step 4: Extract and save metadata
        logger.info("Extracting GeoTIFF metadata...")
        self.update_state(state='PROCESSING', meta={'status': 'Extracting metadata...'})
        
        meta = extract_geotiff_meta(display_path)
        logger.info(f"Metadata extracted: {list(meta.keys())}")
        
        meta.update({
            "resource_id": resource_id,
            "processed_filename": display_path.name,
            "cantaloupe_relative_path": str(cantaloupe_relative_path),
            "transaction_id": transaction_id,
            "asset_type": asset_type,
            "manifest_url": manifest_data.get("url"),
            "related_ortho_globalid": related_manifest_id or None,
        })
        
        meta_url = f"/api/iiif/geotiff-meta/{globalid}"
        meta_abs = _build_absolute_uri(meta_url, request_meta)
        meta["meta_abs_url"] = meta_abs
        
        logger.info("Saving metadata...")
        save_geotiff_meta(str(globalid), meta, overwrite=True)
        logger.info("✅ Metadata saved")
        
        # Step 5: Patch manifest
        logger.info("Patching manifest in database...")
        self.update_state(state='PROCESSING', meta={'status': 'Updating manifest...'})
        
        patch_manifest_db_add_geotiff_seeAlso(
            globalid=str(globalid),
            request=_create_mock_request(request_meta),
            meta_abs_url=meta_abs
        )
        logger.info("✅ Manifest patched")
        
        # Step 6: Handle DEM-specific tasks (save raw copy)
        if asset_type == "dem":
            logger.info("Handling DEM-specific tasks...")
            self.update_state(state='PROCESSING', meta={'status': 'Saving raw DEM...'})
            raw_path = RAW_DEM_DIR / f"{globalid}.tif"
            
            logger.info(f"Copying raw DEM to: {raw_path}")
            shutil.copy2(in_path, raw_path)
            logger.info("✅ Raw DEM saved")
            
            raw_url = f"/files/dem/{globalid}.tif"
            raw_abs = _build_absolute_uri(raw_url, request_meta)
            
            logger.info("Patching manifest with rendering/related...")
            patch_manifest_db_add_rendering_and_related(
                globalid=str(globalid),
                request=_create_mock_request(request_meta),
                raw_dem_abs_url=raw_abs,
                related_ortho_globalid=related_manifest_id,
            )
            
            meta["raw_dem_url"] = raw_abs
            save_geotiff_meta(str(globalid), meta, overwrite=True)
            logger.info("✅ DEM manifest patched")
        
        # ✅ Cleanup temp upload file
        logger.info("Cleaning up temporary files...")
        try:
            in_path.unlink()
            logger.info(f"✅ Deleted: {in_path}")
            in_path.parent.rmdir()  # Remove batch dir if empty
            logger.info(f"✅ Deleted directory: {in_path.parent}")
        except Exception as e:
            logger.warning(f"⚠️ Cleanup failed: {e}")
        
        result = {
            "ok": True,
            "batch_id": batch_id,
            "resource_id": resource_id,
            "file_type": file_type,
            "manifest_url": manifest_data.get("url"),
            "globalid": globalid,
            "meta_url": meta_url,
            "meta_abs_url": meta_abs,
            "processed_filename": display_path.name,
            "asset_type": asset_type,
            "related_manifest_id": related_manifest_id or None,
        }
        
        logger.info("=" * 80)
        logger.info("✅ TASK COMPLETED SUCCESSFULLY")
        logger.info(f"Result: {result}")
        logger.info("=" * 80)
        
        return result
        
    except Exception as e:
        logger.error("=" * 80)
        logger.error("❌ TASK FAILED")
        logger.exception(f"Error: {e}")
        logger.error("=" * 80)
        self.update_state(state='FAILURE', meta={'error': str(e)})
        raise


def _build_absolute_uri(path, request_meta):
    """Build absolute URI from path and request metadata"""
    scheme = 'https' if request_meta.get('secure') else 'http'
    host = request_meta.get('host', 'localhost')
    return f"{scheme}://{host}{path}"


def _create_mock_request(request_meta):
    """Create a mock request object with necessary metadata"""
    class MockRequest:
        def __init__(self, meta):
            self.META = {}
            self.META['HTTP_HOST'] = meta.get('host', 'localhost')
            self.META['HTTP_X_FORWARDED_HOST'] = meta.get('forwarded_host')
            self.META['HTTP_X_FORWARDED_PROTO'] = meta.get('forwarded_proto')
            self._secure = meta.get('secure', False)
        
        def is_secure(self):
            return self._secure
        
        def get_host(self):
            return self.META['HTTP_HOST']
        
        def build_absolute_uri(self, path=''):
            scheme = 'https' if self._secure else 'http'
            return f"{scheme}://{self.get_host()}{path}"
    
    return MockRequest(request_meta)


def _uploaded_from_path(path: Path, content_type="image/tiff", chunk: int = 8 * 1024 * 1024):
    """Create TemporaryUploadedFile from path"""
    logger.info(f"Creating TemporaryUploadedFile from: {path}")
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
    logger.info(f"✅ TemporaryUploadedFile created: {tmp.name}, size: {tmp.size}")
    return tmp


def _create_manifest_internal_from_meta(processed_path: Path, title: str, description: str, transaction_id: str, request_meta: dict):
    """Create manifest using saved request metadata"""
    logger.info(f"Creating manifest: title='{title}', transaction_id={transaction_id}")
    
    rf = RequestFactory()
    
    host = request_meta.get('host', 'localhost')
    secure = request_meta.get('secure', False)
    server_name = request_meta.get('server_name', host.split(':')[0])
    server_port = request_meta.get('server_port', '443' if secure else '80')
    
    logger.info(f"Request metadata: host={host}, secure={secure}, server_name={server_name}, server_port={server_port}")
    
    upload = _uploaded_from_path(processed_path, content_type="image/tiff")
    
    data = {
        "operation": "create",
        "transaction_id": transaction_id,
        "manifest_title": title,
        "manifest_description": description,
        "files": upload,
    }
    
    logger.info("Creating POST request to /image-service-manager...")
    req = rf.post(
        "/image-service-manager",
        data=data,
        HTTP_HOST=host,
        secure=secure,
    )
    
    req.META["SERVER_NAME"] = server_name
    req.META["SERVER_PORT"] = server_port
    req.META["wsgi.url_scheme"] = "https" if secure else "http"
    
    if request_meta.get('forwarded_proto'):
        req.META["HTTP_X_FORWARDED_PROTO"] = request_meta['forwarded_proto']
    if request_meta.get('forwarded_host'):
        req.META["HTTP_X_FORWARDED_HOST"] = request_meta['forwarded_host']
    
    req._dont_enforce_csrf_checks = True
    
    logger.info("Resolving URL and calling view function...")
    match = resolve("/image-service-manager")
    resp = match.func(req, *match.args, **match.kwargs)
    
    logger.info(f"Manifest manager response: status={resp.status_code}")
    
    if resp.status_code != 200:
        logger.error(f"❌ Manifest manager failed: {resp.content[:2000]}")
        raise Exception(f"Manifest manager returned {resp.status_code}")
    
    result = json.loads(resp.content)
    logger.info(f"✅ Manifest created: {result}")
    return result

logger.info("========== CELERY TASK MODULE INITIALIZATION COMPLETE ==========")