import os
import uuid
import json
import rasterio
from rasterio.windows import Window
import hashlib
import logging
from pathlib import Path
from celery import chain
import numpy as np
from django.conf import settings
from django.utils.text import get_valid_filename
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ..celery_tasks.iiif_tasks import process_geotiff_metadata_task, generate_hillshade_task, generate_color_relief_task
from ..celery_tasks.convert_task import convert_geotiff_to_cog, convert_dem_geotiff_to_cog
from .services.raster_metadata import _read_geotiff_metadata
from .services.iiif_image_service import make_image_id, register_image, relative_service_url
from PIL import Image

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


def _safe_image_ext(name: str) -> str:
    n = (name or "").lower()
    if n.endswith(".jpg") or n.endswith(".jpeg"):
        return ".jpg"
    if n.endswith(".png"):
        return ".png"
    if n.endswith(".tiff") or n.endswith(".tif"):
        return ".tif"        
    raise ValueError("Unsupported file extension (only .jpg/.jpeg/.png/.tif)")

def _map_arche_path_to_titiler_path(p: Path) -> str:
    s = str(p).replace("\\", "/")
    marker = "/uploadedfiles/"
    idx = s.find(marker)
    if idx == -1:
        raise ValueError(f"Path is not under /uploadedfiles/: {s}")
    rel = s[idx + len(marker):]
    mount = str(getattr(settings, "TITILER_DATA_MOUNT", "/data")).rstrip("/")
    return f"{mount}/{rel}"

class PhotoUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        up = request.FILES.get("file")
        if not up:
            return Response({"error": "Missing 'file' field"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            ext = _safe_image_ext(up.name)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)

        resource_name = get_valid_filename(request.data.get("resource_name") or "Photo") or "unnamed"
        resource_id = request.data.get("resource_id") or str(uuid.uuid4())
        job_id = str(uuid.uuid4())
        base_name = get_valid_filename(request.data.get("base_name") or os.path.splitext(up.name)[0]) or "photo"

        file_hash = _compute_file_hash(up)
        up.seek(0)

        data_root = _get_data_root()
        resource_folder_name = f"{resource_name}_{resource_id}"
        file_folder_name = f"{base_name}_{resource_id}_{file_hash}"
        resource_folder = data_root / resource_folder_name
        file_folder = resource_folder / file_folder_name
        products_folder = file_folder / "produkty"
        _ensure_dir(products_folder)

        original_filename = f"{base_name}_original{ext}"
        original_path = products_folder / original_filename
        _write_upload_to_disk(up, original_path)

        with Image.open(original_path) as im:
            width, height = im.size
            fmt = (im.format or "").upper()

        mime = "image/png" if ext == ".png" else "image/jpeg"
        titiler_path = _map_arche_path_to_titiler_path(original_path)
        image_id = make_image_id(job_id)
        register_image(
            image_id,
            titiler_path,
            resource_id=resource_id,
            job_id=job_id,
            kind="photo",
        )
        iiif_service_url = relative_service_url(image_id)

        _write_job_index(file_folder, job_id, {
            "job_id": job_id,
            "resource_id": resource_id,
            "resource_name": resource_name,
            "base_name": base_name,
            "file_hash": file_hash,
            "folder_name": file_folder_name,
            "paths": {"original": str(original_path)},
        })

        return Response({
            "job_id": job_id,
            "resource_id": resource_id,
            "resource_name": resource_name,
            "base_name": base_name,
            "file_hash": file_hash,
            "download_url_original": f"/api/iiif/geotiff-file/{job_id}/original",
            "format": mime,
            "metadata": {"width": width, "height": height, "format": fmt, "count": 3 if ext in (".jpg", ".jpeg") else 4},
            "titiler": {
                "file_path": titiler_path,
                "iiif_service_url": iiif_service_url,
                "image_id": image_id,
            },
            "role": "photo"
        }, status=status.HTTP_201_CREATED)
