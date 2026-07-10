import hashlib
import json
import re
from pathlib import Path
from urllib.parse import parse_qs, quote, unquote, urlparse

from django.conf import settings
from django.urls import reverse


LEGACY_IMAGE_ID_PREFIX = "img-"
PUBLIC_ID_RE = re.compile(r"^[A-Za-z0-9._~-]+$")


def validate_image_id(image_id: str) -> str:
    image_id = str(image_id or "").strip()
    if not image_id or not PUBLIC_ID_RE.match(image_id):
        raise ValueError("Invalid IIIF image id")
    return image_id


def make_image_id(job_id: str, kind: str | None = None) -> str:
    image_id = validate_image_id(job_id)
    if not kind:
        return image_id
    kind = str(kind).strip().lower().replace("_", "-")
    return validate_image_id(f"{image_id}-{kind}")


def make_legacy_image_id(titiler_path: str) -> str:
    digest = hashlib.sha256(str(titiler_path or "").encode("utf-8")).hexdigest()[:24]
    return f"{LEGACY_IMAGE_ID_PREFIX}{digest}"


def relative_service_url(image_id: str) -> str:
    return reverse("iiif-image-service", kwargs={"image_id": validate_image_id(image_id)})


def _configured_public_origin() -> str:
    return (
        getattr(settings, "IIIF_PUBLIC_BASE_URL", "")
        or getattr(settings, "PUBLIC_BASE_URL", "")
        or ""
    ).rstrip("/")


def _is_local_host(host: str) -> bool:
    host = (host or "").split(":", 1)[0].lower()
    return host in {"localhost", "127.0.0.1", "0.0.0.0", "::1"} or host.endswith(".localhost")


def public_origin(request=None) -> str:
    configured = _configured_public_origin()
    if configured:
        return configured
    if request is None:
        return ""

    host = (request.headers.get("X-Forwarded-Host") or request.get_host() or "").split(",")[0].strip()
    forwarded_proto = (request.headers.get("X-Forwarded-Proto") or "").split(",")[0].strip().lower()
    if not _is_local_host(host):
        proto = "https"
    elif forwarded_proto in {"http", "https"}:
        proto = forwarded_proto
    elif getattr(request, "scheme", "") == "https" or request.is_secure():
        proto = "https"
    else:
        proto = getattr(request, "scheme", None) or "http"
    return f"{proto}://{host}"


def public_service_url(request, image_id: str) -> str:
    path = relative_service_url(image_id)
    origin = public_origin(request)
    return f"{origin}{path}" if origin else path


def _image_index_dir() -> Path:
    return Path(getattr(settings, "RASTER_DATA_DIR")) / ".iiif_image_index"


def _image_index_path(image_id: str) -> Path:
    return _image_index_dir() / f"{validate_image_id(image_id)}.json"


def _titiler_mount() -> str:
    return str(getattr(settings, "TITILER_DATA_MOUNT", "/data")).rstrip("/")


def _uploadedfiles_root() -> Path:
    return Path(settings.MEDIA_ROOT, settings.UPLOADED_FILES_DIR).resolve()


def _is_within(child: Path, parent: Path) -> bool:
    try:
        child.relative_to(parent)
        return True
    except Exception:
        return False


def local_path_to_titiler_path(path: str | Path) -> str:
    local_path = Path(path).resolve()
    uploads_root = _uploadedfiles_root()
    if not _is_within(local_path, uploads_root):
        raise ValueError(f"Path is not under uploadedfiles root: {local_path}")
    rel = local_path.relative_to(uploads_root).as_posix()
    return f"{_titiler_mount()}/{rel}"


def titiler_path_to_local_path(path: str) -> Path:
    raw = str(path or "").strip()
    if not raw:
        raise ValueError("Missing TiTiler path")

    resolved = Path(raw).resolve()
    titiler_root = Path(_titiler_mount()).resolve()
    uploads_root = _uploadedfiles_root()

    if _is_within(resolved, titiler_root):
        mapped = (uploads_root / resolved.relative_to(titiler_root)).resolve()
        if not _is_within(mapped, uploads_root):
            raise ValueError("TiTiler path escapes uploadedfiles root")
        return mapped

    if _is_within(resolved, uploads_root):
        return resolved

    raise ValueError("IIIF path must be inside TiTiler mount or uploadedfiles root")


def register_image(
    image_id: str,
    titiler_path: str,
    *,
    resource_id: str | None = None,
    job_id: str | None = None,
    kind: str = "image",
) -> dict:
    image_id = validate_image_id(image_id)
    titiler_path = str(titiler_path or "").strip()
    if not titiler_path:
        raise ValueError("Missing TiTiler path")

    entry = {
        "image_id": image_id,
        "titiler_path": titiler_path,
        "resource_id": resource_id,
        "job_id": job_id,
        "kind": kind,
    }
    try:
        entry["local_path"] = str(titiler_path_to_local_path(titiler_path))
    except Exception:
        pass

    _image_index_dir().mkdir(parents=True, exist_ok=True)
    tmp = _image_index_path(image_id).with_suffix(".json.tmp")
    tmp.write_text(json.dumps(entry, ensure_ascii=False, indent=2), encoding="utf-8")
    tmp.replace(_image_index_path(image_id))
    return entry


def _read_registered_image(image_id: str) -> dict | None:
    path = _image_index_path(image_id)
    if not path.exists():
        return None
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return None


def _find_job_index(job_id: str) -> dict | None:
    root = Path(getattr(settings, "RASTER_DATA_DIR"))
    matches = list(root.glob(f"*/*/{job_id}_job.json"))
    if not matches:
        return None
    try:
        data = json.loads(matches[0].read_text(encoding="utf-8"))
        data["_job_dir"] = str(matches[0].parent)
        return data
    except Exception:
        return None


def _split_derived_image_id(image_id: str) -> tuple[str, str | None]:
    for suffix, kind in {
        "-hillshade": "hillshade",
        "-color-relief": "color_relief",
        "-colorrelief": "color_relief",
    }.items():
        if image_id.endswith(suffix):
            return image_id[: -len(suffix)], kind
    return image_id, None


def _path_from_job_index(job_index: dict, kind: str | None) -> Path | None:
    paths = job_index.get("paths") or {}
    job_dir = Path(job_index.get("_job_dir") or "")
    products_dir = job_dir / "produkty"
    job_id = job_index.get("job_id") or ""

    if kind == "hillshade":
        matches = list(products_dir.glob(f"*hillshade*{job_id}.tif")) + list(products_dir.glob(f"*hillshade*{job_id}.tiff"))
        return matches[0] if matches else None

    if kind == "color_relief":
        matches = list(products_dir.glob(f"*colorrelief*{job_id}.tif")) + list(products_dir.glob(f"*color_relief*{job_id}.tif"))
        matches += list(products_dir.glob(f"*colorrelief*{job_id}.tiff")) + list(products_dir.glob(f"*color_relief*{job_id}.tiff"))
        return matches[0] if matches else None

    for raw_path in (paths.get("cog"), paths.get("original")):
        if raw_path and Path(raw_path).exists():
            return Path(raw_path)
    return None


def _fallback_path_for_resource_id(resource_id: str) -> Path | None:
    root = Path(getattr(settings, "RASTER_DATA_DIR"))
    matches = list(root.glob(f"*_{resource_id}/*/produkty/*_cog.tif"))
    matches += list(root.glob(f"*_{resource_id}/*/produkty/*_original.tif"))
    matches += list(root.glob(f"*_{resource_id}/*/produkty/*_original.tiff"))
    matches += list(root.glob(f"*_{resource_id}/*/produkty/*_original.jpg"))
    matches += list(root.glob(f"*_{resource_id}/*/produkty/*_original.png"))
    return matches[0] if matches else None


def resolve_titiler_path(image_id: str) -> str:
    image_id = validate_image_id(image_id)
    registered = _read_registered_image(image_id)
    if registered and registered.get("titiler_path"):
        return registered["titiler_path"]

    base_id, kind = _split_derived_image_id(image_id)
    job_index = _find_job_index(base_id)
    if job_index:
        local_path = _path_from_job_index(job_index, kind)
        if local_path:
            titiler_path = local_path_to_titiler_path(local_path)
            register_image(
                image_id,
                titiler_path,
                resource_id=job_index.get("resource_id"),
                job_id=job_index.get("job_id"),
                kind=kind or "image",
            )
            return titiler_path

    local_path = _fallback_path_for_resource_id(image_id)
    if local_path:
        titiler_path = local_path_to_titiler_path(local_path)
        register_image(image_id, titiler_path, resource_id=image_id)
        return titiler_path

    raise FileNotFoundError(f"IIIF image id not found: {image_id}")


def legacy_titiler_path_from_service_url(service_url: str) -> str | None:
    raw = str(service_url or "").strip()
    if "titiler-proxy" not in raw:
        return None
    parsed = urlparse(raw)
    path = parse_qs(parsed.query).get("path", [None])[0]
    return unquote(path) if path else None


def image_id_from_service_url(service_url: str) -> str | None:
    parsed = urlparse(str(service_url or ""))
    marker = "/iiif/image/"
    if marker not in parsed.path:
        return None
    image_id = parsed.path.split(marker, 1)[1].split("/", 1)[0]
    try:
        return validate_image_id(image_id)
    except ValueError:
        return None


def public_service_url_from_any(request, service_url: str) -> str:
    service_url = str(service_url or "").strip().rstrip("/")
    if not service_url:
        return ""

    legacy_path = legacy_titiler_path_from_service_url(service_url)
    if legacy_path:
        image_id = make_legacy_image_id(legacy_path)
        register_image(image_id, legacy_path, kind="legacy")
        return public_service_url(request, image_id)

    image_id = image_id_from_service_url(service_url)
    if image_id:
        return public_service_url(request, image_id)

    if service_url.startswith("/"):
        origin = public_origin(request)
        return f"{origin}{service_url}" if origin else service_url

    return service_url


def rewrite_manifest_image_services(manifest: dict, request) -> dict:
    if not isinstance(manifest, dict):
        return manifest

    for canvas in manifest.get("items") or []:
        for page in (canvas or {}).get("items") or []:
            for annotation in (page or {}).get("items") or []:
                body = (annotation or {}).get("body")
                if not isinstance(body, dict):
                    continue
                services = body.get("service") or []
                if isinstance(services, dict):
                    services = [services]
                    body["service"] = services
                for service in services:
                    if not isinstance(service, dict):
                        continue
                    service_id = service.get("id") or service.get("@id")
                    public_id = public_service_url_from_any(request, service_id)
                    if not public_id:
                        continue
                    service["id"] = public_id
                    service["type"] = "ImageService3"
                    service.setdefault("profile", "level2")
                    service.pop("@id", None)
                    body["id"] = f"{public_id}/full/max/0/default.jpg"
                    body.setdefault("type", "Image")
                    body.setdefault("format", "image/jpeg")
    return manifest


def quote_titiler_path(path: str) -> str:
    return quote(str(path or "").rstrip("/"), safe="/:")
