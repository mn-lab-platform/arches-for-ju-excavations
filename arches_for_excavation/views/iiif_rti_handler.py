import json
import os
import shutil
import uuid
import zipfile
from pathlib import Path
from urllib.parse import urlencode

from django.conf import settings
from django.http import FileResponse, Http404, JsonResponse
from django.urls import reverse
from django.utils.text import get_valid_filename
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

import rasterio
from rasterio.shutil import copy as rasterio_copy
from rasterio.windows import Window


def _ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def _get_data_root() -> Path:
    return Path(getattr(settings, "RASTER_DATA_DIR"))


def _map_arches_path_to_titiler_path(path: Path) -> str:
    normalized = str(path).replace("\\", "/")
    marker = "/uploadedfiles/"

    index = normalized.find(marker)
    if index == -1:
        raise ValueError(f"Path is not under uploadedfiles: {normalized}")

    relative = normalized[index + len(marker):]
    mount = str(getattr(settings, "TITILER_DATA_MOUNT", "/data")).rstrip("/")
    return f"{mount}/{relative}"


def _map_titiler_path_to_arches_path(titiler_path: str) -> Path:
    mount = str(getattr(settings, "TITILER_DATA_MOUNT", "/data")).rstrip("/")
    normalized = str(titiler_path or "").replace("\\", "/")

    if not normalized.startswith(mount + "/"):
        raise ValueError(f"Path is not under titiler mount {mount}: {normalized}")

    relative = normalized[len(mount) + 1:]
    data_root = _get_data_root()
    uploaded_root = data_root.parent
    candidate = uploaded_root / relative

    if not candidate.exists():
        candidate = data_root / relative

    return candidate


def _safe_zip_member_name(member_name: str) -> str:
    name = Path(member_name).name
    return get_valid_filename(name)


def _is_jpeg_name(name: str) -> bool:
    lower = name.lower()
    return lower.endswith(".jpg") or lower.endswith(".jpeg")


def _expected_rti_plane_names(info: dict) -> list[str]:
    if not isinstance(info, dict):
        return []

    try:
        if info.get("colorspace") == "mycc":
            yccplanes = info.get("yccplanes") or []
            nplanes = sum(int(value) for value in yccplanes)
        else:
            nplanes = int(info.get("nplanes") or 0)
    except (TypeError, ValueError):
        nplanes = 0

    if nplanes <= 0:
        return []

    return [f"plane_{index}" for index in range((nplanes + 2) // 3)]


def _write_uploaded_file(uploaded_file, destination: Path) -> None:
    _ensure_dir(destination.parent)
    with destination.open("wb") as output:
        for chunk in uploaded_file.chunks():
            output.write(chunk)


def _extract_rti_zip(zip_path: Path, originals_dir: Path) -> tuple[Path, list[Path]]:
    info_json_path = None
    jpeg_paths = []

    with zipfile.ZipFile(zip_path, "r") as archive:
        info_member = next(
            (
                member for member in archive.infolist()
                if not member.is_dir() and _safe_zip_member_name(member.filename).lower() == "info.json"
            ),
            None,
        )

        if info_member is None:
            raise ValueError("ZIP must contain info.json")

        info_json_path = originals_dir / "info.json"
        _ensure_dir(info_json_path.parent)

        with archive.open(info_member, "r") as source:
            with info_json_path.open("wb") as target:
                shutil.copyfileobj(source, target)

        info = json.loads(info_json_path.read_text(encoding="utf-8"))
        expected_plane_names = _expected_rti_plane_names(info)
        expected_plane_set = set(expected_plane_names)
        plane_path_by_name = {}

        for member in archive.infolist():
            if member.is_dir():
                continue

            safe_name = _safe_zip_member_name(member.filename)
            if not safe_name:
                continue

            lower_name = safe_name.lower()

            if lower_name == "info.json":
                continue

            if not _is_jpeg_name(lower_name):
                continue

            plane_name = get_valid_filename(Path(safe_name).stem)
            if expected_plane_set and plane_name not in expected_plane_set:
                continue

            destination = originals_dir / safe_name
            _ensure_dir(destination.parent)

            with archive.open(member, "r") as source:
                with destination.open("wb") as target:
                    shutil.copyfileobj(source, target)

            if expected_plane_set:
                plane_path_by_name[plane_name] = destination
            else:
                jpeg_paths.append(destination)

        if expected_plane_set:
            missing = [name for name in expected_plane_names if name not in plane_path_by_name]
            if missing:
                raise ValueError(
                    "ZIP is missing RTI coefficient image(s): "
                    + ", ".join(missing)
                    + ". DeepZoom tile JPGs are ignored; include the original plane_*.jpg files."
                )
            jpeg_paths = [plane_path_by_name[name] for name in expected_plane_names]

    if not jpeg_paths:
        raise ValueError("ZIP must contain RTI plane JPG/JPEG files")

    return info_json_path, jpeg_paths


def _convert_jpeg_to_cog(source_path: Path, cog_path: Path) -> None:
    _ensure_dir(cog_path.parent)

    rasterio_copy(
        str(source_path),
        str(cog_path),
        driver="COG",
        compress="DEFLATE",
        overview_resampling="NEAREST",
        blocksize=256,
        bigtiff="YES",
    )


def _crop_cog(source_path: Path, cog_path: Path, crop: dict) -> None:
    _ensure_dir(cog_path.parent)

    x = int(crop["x"])
    y = int(crop["y"])
    width = int(crop["width"])
    height = int(crop["height"])

    tmp_path = cog_path.with_suffix(".tmp.tif")

    with rasterio.open(source_path) as src:
        if x < 0 or y < 0 or width < 1 or height < 1:
            raise ValueError("crop must have positive dimensions and non-negative x/y")

        if x >= src.width or y >= src.height:
            raise ValueError(f"crop starts outside raster bounds {src.width}x{src.height}")

        width = min(width, src.width - x)
        height = min(height, src.height - y)

        if width < 1 or height < 1:
            raise ValueError("crop has no overlap with raster")

        window = Window(x, y, width, height)
        profile = src.profile.copy()
        profile.update(
            driver="GTiff",
            width=width,
            height=height,
            transform=src.window_transform(window),
        )

        data = src.read(window=window)

        with rasterio.open(tmp_path, "w", **profile) as dst:
            dst.write(data)

    try:
        rasterio_copy(
            str(tmp_path),
            str(cog_path),
            driver="COG",
            compress="DEFLATE",
            overview_resampling="NEAREST",
            blocksize=256,
            bigtiff="YES",
        )
    finally:
        if tmp_path.exists():
            tmp_path.unlink()


def _write_job_index(job_dir: Path, job_id: str, payload: dict) -> None:
    index_path = job_dir / f"{job_id}_rti_job.json"
    index_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")


def _find_rti_job(job_id: str) -> dict:
    matches = list(_get_data_root().glob(f"**/{job_id}_rti_job.json"))
    if not matches:
        raise FileNotFoundError

    return json.loads(matches[0].read_text(encoding="utf-8"))


def _iiif_lang(value) -> dict:
    return {"en": [str(value)]}


def _manifest_url(resource_id: str) -> str:
    return f"/api/iiif/rti-manifest/{resource_id}"


def _manifest_path(resource_name: str, resource_id: str) -> Path:
    safe_name = get_valid_filename(resource_name or "RTI") or "RTI"
    path = _get_data_root() / f"{safe_name}_{resource_id}" / "manifest" / f"{resource_id}.json"
    _ensure_dir(path.parent)
    return path


def _find_manifest_path(resource_id: str) -> Path:
    matches = list(_get_data_root().glob(f"*_{resource_id}/manifest/{resource_id}.json"))
    if not matches:
        raise FileNotFoundError
    return matches[0]


def _build_rti_manifest(resource_id: str, resource_name: str, job_id: str, metadata_url: str, planes: list[dict]) -> dict:
    manifest_id = _manifest_url(resource_id)
    first_plane = planes[0] if planes else {}
    first_service = (first_plane.get("iiif_service_url") or "").rstrip("/")

    canvas = {
        "id": f"{manifest_id}/canvas/1",
        "type": "Canvas",
        "label": _iiif_lang(resource_name or "RTI"),
        "items": []
    }

    if first_service:
        canvas["items"] = [{
            "id": f"{manifest_id}/canvas/1/page/1",
            "type": "AnnotationPage",
            "items": [{
                "id": f"{manifest_id}/canvas/1/page/1/annotation/1",
                "type": "Annotation",
                "motivation": "painting",
                "target": f"{manifest_id}/canvas/1",
                "body": {
                    "id": first_service + "/full/max/0/default.png",
                    "type": "Image",
                    "format": "image/png",
                    "service": [{
                        "id": first_service,
                        "type": "ImageService3",
                        "profile": "level2"
                    }]
                }
            }]
        }]

    return {
        "@context": "http://iiif.io/api/presentation/3/context.json",
        "id": manifest_id,
        "type": "Manifest",
        "label": _iiif_lang(resource_name or "RTI manifest"),
        "behavior": ["individuals"],
        "metadata": [{
            "label": _iiif_lang("RTI metadata URL"),
            "value": _iiif_lang(metadata_url)
        }],
        "rti": {
            "type": "RTI",
            "job_id": job_id,
            "metadata_url": metadata_url,
            "planes": planes,
            "settings": {
                "rotation": 0,
                "crop": None
            }
        },
        "items": [canvas]
    }


def _write_rti_manifest(resource_id: str, resource_name: str, job_id: str, metadata_url: str, planes: list[dict]) -> str:
    manifest = _build_rti_manifest(resource_id, resource_name, job_id, metadata_url, planes)
    path = _manifest_path(resource_name, resource_id)
    path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    return manifest["id"]


class RTIUploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        uploaded_zip = request.FILES.get("file")
        if not uploaded_zip:
            return Response({"error": "Missing file field"}, status=status.HTTP_400_BAD_REQUEST)

        if not uploaded_zip.name.lower().endswith(".zip"):
            return Response({"error": "Only ZIP files are supported"}, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)

        resource_id = request.data.get("resource_id") or str(uuid.uuid4())
        resource_name = get_valid_filename(request.data.get("resource_name") or "RTI") or "RTI"
        job_id = str(uuid.uuid4())

        data_root = _get_data_root()
        resource_dir = data_root / f"{resource_name}_{resource_id}"
        job_dir = resource_dir / f"rti_{job_id}"
        originals_dir = job_dir / "originals"
        products_dir = job_dir / "produkty"

        _ensure_dir(originals_dir)
        _ensure_dir(products_dir)

        zip_path = originals_dir / "rti_package.zip"
        _write_uploaded_file(uploaded_zip, zip_path)

        try:
            info_json_path, jpeg_paths = _extract_rti_zip(zip_path, originals_dir)
        except zipfile.BadZipFile:
            return Response({"error": "Invalid ZIP file"}, status=status.HTTP_400_BAD_REQUEST)
        except ValueError as exc:
            return Response({"error": str(exc)}, status=status.HTTP_400_BAD_REQUEST)

        planes = []

        for index, jpeg_path in enumerate(jpeg_paths):
            plane_name = get_valid_filename(jpeg_path.stem) or f"plane_{index}"
            cog_path = products_dir / f"{plane_name}.tif"

            try:
                _convert_jpeg_to_cog(jpeg_path, cog_path)
            except Exception as exc:
                return Response(
                    {"error": f"Failed to convert {jpeg_path.name} to COG: {exc}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

            titiler_path = _map_arches_path_to_titiler_path(cog_path)
            iiif_service_url = reverse("titiler-iiif-proxy") + "?" + urlencode({"path": titiler_path})

            planes.append({
                "name": plane_name,
                "source_jpeg": jpeg_path.name,
                "cog_filename": cog_path.name,
                "titiler_path": titiler_path,
                "iiif_service_url": iiif_service_url,
            })

        info_url = f"/api/iiif/rti-info/{job_id}/info.json"
        manifest_url = _write_rti_manifest(resource_id, resource_name, job_id, info_url, planes)

        job_index = {
            "job_id": job_id,
            "resource_id": resource_id,
            "resource_name": resource_name,
            "paths": {
                "zip": str(zip_path),
                "info_json": str(info_json_path),
                "originals_dir": str(originals_dir),
                "products_dir": str(products_dir),
            },
            "planes": planes,
            "manifest_url": manifest_url,
        }

        _write_job_index(job_dir, job_id, job_index)

        return Response({
            "job_id": job_id,
            "resource_id": resource_id,
            "resource_name": resource_name,
            "metadata_url": info_url,
            "info_url": info_url,
            "manifest_url": manifest_url,
            "planes": planes,
            "plane_count": len(planes),
        }, status=status.HTTP_201_CREATED)


class RTIInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, job_id: str):
        try:
            job = _find_rti_job(job_id)
            info_path = Path(job["paths"]["info_json"])
        except Exception:
            raise Http404("RTI job not found")

        if not info_path.exists():
            raise Http404("info.json not found")

        return FileResponse(info_path.open("rb"), content_type="application/json")


class RTIManifestView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, resource_id: str):
        try:
            path = _find_manifest_path(str(resource_id))
        except FileNotFoundError:
            raise Http404("RTI manifest not found")

        data = json.loads(path.read_text(encoding="utf-8"))
        return JsonResponse(data, safe=False)


class RTIManifestSettingsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, resource_id: str):
        try:
            path = _find_manifest_path(str(resource_id))
        except FileNotFoundError:
            raise Http404("RTI manifest not found")

        manifest = json.loads(path.read_text(encoding="utf-8"))
        rti = manifest.setdefault("rti", {})

        rotation = request.data.get("rotation", 0)
        existing_settings = rti.get("settings") or {}
        crop = request.data.get("crop") if "crop" in request.data else existing_settings.get("crop")

        print("[RTI SETTINGS] incoming", {
            "resource_id": str(resource_id),
            "path": str(path),
            "rotation": rotation,
            "crop": crop,
        })

        try:
            rotation = float(rotation or 0)
        except (TypeError, ValueError):
            return Response({"error": "rotation must be numeric"}, status=status.HTTP_400_BAD_REQUEST)

        if crop is not None and not isinstance(crop, dict):
            return Response({"error": "crop must be an object or null"}, status=status.HTTP_400_BAD_REQUEST)

        rti["settings"] = dict(existing_settings)
        rti["settings"]["rotation"] = rotation
        rti["settings"]["crop"] = crop

        path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

        print("[RTI SETTINGS] saved", {
            "resource_id": str(resource_id),
            "settings": rti["settings"],
        })

        return Response({
            "ok": True,
            "manifest_url": manifest.get("id") or _manifest_url(str(resource_id)),
            "settings": rti["settings"],
        }, status=status.HTTP_200_OK)


class RTIManifestCropView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, resource_id: str):
        try:
            path = _find_manifest_path(str(resource_id))
        except FileNotFoundError:
            raise Http404("RTI manifest not found")

        manifest = json.loads(path.read_text(encoding="utf-8"))
        rti = manifest.setdefault("rti", {})
        planes = rti.get("planes") or []
        crop = request.data.get("crop")

        print("[RTI CROP] incoming", {
            "resource_id": str(resource_id),
            "path": str(path),
            "crop": crop,
            "plane_count": len(planes),
        })

        if not planes:
            return Response({"error": "RTI manifest has no planes"}, status=status.HTTP_400_BAD_REQUEST)

        if not isinstance(crop, dict):
            return Response({"error": "crop must be an object"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            clean_crop = {
                "x": int(round(float(crop.get("x")))),
                "y": int(round(float(crop.get("y")))),
                "width": int(round(float(crop.get("width")))),
                "height": int(round(float(crop.get("height")))),
            }
        except (TypeError, ValueError):
            return Response({"error": "crop x/y/width/height must be numeric"}, status=status.HTTP_400_BAD_REQUEST)

        crop_id = str(uuid.uuid4())
        resource_dir = path.parent.parent
        crop_dir = resource_dir / f"crop_{crop_id}" / "produkty"
        _ensure_dir(crop_dir)

        new_planes = []

        try:
            for plane in planes:
                source_path = _map_titiler_path_to_arches_path(plane.get("titiler_path"))
                if not source_path.exists():
                    raise FileNotFoundError(f"Plane file not found: {source_path}")

                plane_name = get_valid_filename(plane.get("name") or source_path.stem) or source_path.stem
                cog_path = crop_dir / f"{plane_name}.tif"

                _crop_cog(source_path, cog_path, clean_crop)

                titiler_path = _map_arches_path_to_titiler_path(cog_path)
                iiif_service_url = reverse("titiler-iiif-proxy") + "?" + urlencode({"path": titiler_path})

                updated_plane = dict(plane)
                updated_plane.update({
                    "name": plane_name,
                    "cog_filename": cog_path.name,
                    "titiler_path": titiler_path,
                    "iiif_service_url": iiif_service_url,
                    "source_titiler_path": plane.get("titiler_path"),
                    "crop_id": crop_id,
                })
                new_planes.append(updated_plane)
        except Exception as exc:
            print("[RTI CROP] failed", {
                "resource_id": str(resource_id),
                "error": str(exc),
            })
            shutil.rmtree(crop_dir.parent, ignore_errors=True)
            return Response({"error": str(exc)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        versions = rti.setdefault("versions", [])
        if not versions:
            versions.append({
                "type": "original",
                "planes": planes,
            })

        versions.append({
            "type": "crop",
            "crop_id": crop_id,
            "crop": clean_crop,
            "planes": new_planes,
        })

        settings_data = rti.setdefault("settings", {})
        settings_data["crop"] = clean_crop
        rti["planes"] = new_planes

        path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

        print("[RTI CROP] saved", {
            "resource_id": str(resource_id),
            "crop_id": crop_id,
            "crop": clean_crop,
            "plane_count": len(new_planes),
        })

        return Response({
            "ok": True,
            "manifest_url": manifest.get("id") or _manifest_url(str(resource_id)),
            "crop_id": crop_id,
            "crop": clean_crop,
            "planes": new_planes,
            "settings": settings_data,
        }, status=status.HTTP_200_OK)


class RTIManifestCropRevertView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, resource_id: str):
        try:
            path = _find_manifest_path(str(resource_id))
        except FileNotFoundError:
            raise Http404("RTI manifest not found")

        manifest = json.loads(path.read_text(encoding="utf-8"))
        rti = manifest.setdefault("rti", {})
        versions = rti.get("versions") or []
        original = next((version for version in versions if version.get("type") == "original"), None)

        if not original or not original.get("planes"):
            return Response({"error": "No original RTI planes are stored in manifest versions"}, status=status.HTTP_400_BAD_REQUEST)

        rti["planes"] = original["planes"]
        settings_data = rti.setdefault("settings", {})
        settings_data["crop"] = None

        versions.append({
            "type": "revert-crop",
            "crop": None,
            "planes": original["planes"],
        })

        path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

        print("[RTI CROP REVERT] saved", {
            "resource_id": str(resource_id),
            "plane_count": len(original["planes"]),
        })

        return Response({
            "ok": True,
            "manifest_url": manifest.get("id") or _manifest_url(str(resource_id)),
            "crop": None,
            "planes": original["planes"],
            "settings": settings_data,
        }, status=status.HTTP_200_OK)
