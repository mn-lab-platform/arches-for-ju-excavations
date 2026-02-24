# geotiff_handler.py
import os
import uuid
import json
import hashlib
import logging
from pathlib import Path
from celery import chain

from django.conf import settings
from django.utils.text import get_valid_filename
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from ..celery_tasks.iiif_tasks import process_geotiff_metadata_task, generate_hillshade_task, generate_color_relief_task
from ..celery_tasks.convert_task import convert_geotiff_to_cog, convert_dem_geotiff_to_cog
from .services.raster_metadata import _read_geotiff_metadata

logger = logging.getLogger(__name__)


def _safe_ext(name: str) -> str:
    name = (name or "").lower()
    if name.endswith(".tif") or name.endswith(".tiff"):
        return ".tif"
    raise ValueError("Unsupported file extension (only .tif/.tiff)")


def _ensure_dir(p: Path) -> None:
    p.mkdir(parents=True, exist_ok=True)


def _write_upload_to_disk(file_obj, dst_path: Path) -> None:
    _ensure_dir(dst_path.parent)
    with dst_path.open("wb") as f:
        for chunk in file_obj.chunks():
            f.write(chunk)


def _compute_file_hash(file_obj) -> str:
    """Compute SHA256 hash of uploaded file for uniqueness"""
    hasher = hashlib.sha256()
    file_obj.seek(0)
    for chunk in file_obj.chunks():
        hasher.update(chunk)
    return hasher.hexdigest()[:8]  # first 8 chars


def _write_job_index(folder_path: Path, job_id: str, data: dict) -> Path:
    p = folder_path / f"{job_id}_job.json"
    p.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    return p


def _get_data_root() -> Path:
    # MUST be inside the shared "uploads" volume, because TiTiler mounts uploads:/data
    return Path(getattr(settings, "RASTER_DATA_DIR"))


def _as_bool(v, default=False):
    if v is None:
        return default
    if isinstance(v, bool):
        return v
    return str(v).strip().lower() in {"1", "true", "yes", "on"}


def _is_singleband_float(meta: dict) -> bool:
    count = int(meta.get("count") or 0)
    dtype = str(meta.get("dtype") or "").lower()
    return count == 1 and dtype.startswith("float")


class RasterUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        up = request.FILES.get("file")
        if not up:
            return Response({"error": "Missing 'file' field"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            ext = _safe_ext(up.name)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)

        resource_name = request.data.get("resource_name") or "GeoTIFF"
        resource_name = get_valid_filename(resource_name) or "unnamed"

        resource_id = request.data.get("resource_id") or str(uuid.uuid4())
        job_id = str(uuid.uuid4())
        base_name = request.data.get("base_name") or os.path.splitext(up.name)[0]
        base_name = get_valid_filename(base_name) or "raster"

        file_hash = _compute_file_hash(up)

        data_root = _get_data_root()

        resource_folder_name = f"{resource_name}_{resource_id}"
        file_folder_name = f"{base_name}_{resource_id}_{file_hash}"

        resource_folder = data_root / resource_folder_name
        file_folder = resource_folder / file_folder_name
        products_folder = file_folder / "produkty"

        _ensure_dir(products_folder)

        original_filename = f"{base_name}_original{ext}"
        cog_filename = f"{base_name}_cog{ext}"
        meta_filename = f"{base_name}_meta.json"

        original_path = products_folder / original_filename
        cog_path = products_folder / cog_filename
        meta_path = products_folder / meta_filename

        _write_upload_to_disk(up, original_path)
        meta_original = _read_geotiff_metadata(str(original_path))

        role_req = (request.data.get("role") or "ortho").lower()
        force_dem = _as_bool(request.data.get("force_dem"), default=(role_req == "dem"))
        make_hillshade = _as_bool(request.data.get("make_hillshade"), default=force_dem)

        # strict validation when DEM requested
        if force_dem and not _is_singleband_float(meta_original):
            return Response(
                {
                    "error": "DEM requires single-band float raster (e.g. float32/float64).",
                    "metadata": meta_original,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        role = "dem" if force_dem else "ortho"
        make_hillshade = bool(make_hillshade and role == "dem")

        payload = {
            "job_id": job_id,
            "resource_id": resource_id,
            "resource_name": resource_name,
            "base_name": base_name,
            "file_hash": file_hash,
            "folder_name": file_folder_name,  
            "role": role,
            "options": {
                "force_dem": force_dem,
                "make_hillshade": make_hillshade,
            },
            "original_filename": up.name,
            "paths": {
                "original": str(original_path),
                "cog": str(cog_path),
                "meta": str(meta_path),
            },
            "metadata_original": meta_original,
        }

        job_index = {
            "job_id": job_id,
            "resource_id": resource_id,
            "resource_name": resource_name,
            "base_name": base_name,
            "file_hash": file_hash,
            "folder_name": file_folder_name,  
            "paths": {
                "original": str(original_path),
                "cog": str(cog_path),
                "meta": str(meta_path),
            }
        }
        job_index_path = _write_job_index(file_folder, job_id, job_index)
        if not make_hillshade:
            tasks = [
                convert_geotiff_to_cog.s(str(original_path), str(cog_path)),
                process_geotiff_metadata_task.si(payload),
            ]

        if make_hillshade:
            tasks = [
                convert_dem_geotiff_to_cog.s(str(original_path), str(cog_path)),
                process_geotiff_metadata_task.si(payload),
            ]            
            tasks.append(generate_hillshade_task.s())
            tasks.append(generate_color_relief_task.s())

        task_chain = chain(*tasks)
        async_result = task_chain.apply_async()

        resp = {
            "job_id": job_id,
            "resource_id": resource_id,
            "resource_name": resource_name,
            "base_name": base_name,
            "file_hash": file_hash,
            "task_id": async_result.id,
            "download_url_original": f"/api/iiif/geotiff-file/{job_id}/original",
            "download_url_cog": f"/api/iiif/geotiff-file/{job_id}/cog",
            "download_url_meta": f"/api/iiif/geotiff-file/{job_id}/meta",
            "paths": {
                "original": str(original_path),
                "cog": str(cog_path),
                "meta": str(meta_path),
            },
            "metadata": meta_original,
            "role": role,
            "options": {
                "force_dem": force_dem,
                "make_hillshade": make_hillshade,
            },
        }

        if make_hillshade:
            resp["download_url_hillshade"] = f"/api/iiif/geotiff-file/{job_id}/hillshade"
            resp["download_url_colorrelief"] = f"/api/iiif/geotiff-file/{job_id}/colorrelief"

        return Response(resp, status=status.HTTP_202_ACCEPTED)
