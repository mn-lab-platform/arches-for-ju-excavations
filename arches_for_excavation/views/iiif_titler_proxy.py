from django.http import Http404, HttpResponse, StreamingHttpResponse, HttpResponseBadRequest, JsonResponse
from django.views.decorators.http import require_http_methods
import requests
import re

from .services.iiif_image_service import (
    make_legacy_image_id,
    public_service_url,
    quote_titiler_path,
    register_image,
    resolve_titiler_path,
)

TITILER_INTERNAL_URL = "http://titiler:8000"

def _force_png_iiif_suffix(suffix: str) -> str:
    return re.sub(
        r"(^|/)(default|native)\.jpe?g$",
        lambda match: f"{match.group(1)}{match.group(2)}.png",
        suffix,
        flags=re.IGNORECASE,
    )


def _with_cors(response, request=None):
    origin = request.headers.get("Origin") if request is not None else None
    requested_headers = request.headers.get("Access-Control-Request-Headers") if request is not None else None

    response["Access-Control-Allow-Origin"] = origin or "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Allow-Headers"] = requested_headers or "Content-Type, Accept, Range"
    response["Access-Control-Allow-Private-Network"] = "true"
    response["Access-Control-Expose-Headers"] = "Content-Length, Content-Type, Content-Range, Accept-Ranges"
    response["Access-Control-Max-Age"] = "86400"
    response["Vary"] = "Origin, Access-Control-Request-Headers, Access-Control-Request-Private-Network"
    return response


def _preflight_response(request):
    return _with_cors(HttpResponse(status=204), request)


def _patch_info_json(data: dict, request, image_id: str) -> dict:
    base = public_service_url(request, image_id)
    data["@context"] = "http://iiif.io/api/image/3/context.json"
    data["id"] = base
    data["type"] = "ImageService3"
    data["protocol"] = "http://iiif.io/api/image"
    data["profile"] = "level2"
    data.setdefault("preferredFormats", ["png", "jpeg", "webp"])
    data.pop("@id", None)

    if isinstance(data.get("tiles"), list):
        for tile in data["tiles"]:
            if isinstance(tile, dict):
                tile["id"] = base
                tile.pop("@id", None)

    return data
def _public_base(request, file_path: str) -> str:
    host = (request.headers.get("X-Forwarded-Host") or request.get_host() or "").split(",")[0].strip()

    xf_proto = (request.headers.get("X-Forwarded-Proto") or "").split(",")[0].strip().lower()
    if settings.DEBUG:
        proto = "http"
    elif xf_proto in ("http", "https"):
        proto = xf_proto
    else:
        proto = (request.scheme or "http")

    p = quote(file_path.rstrip("/"), safe="/")
    return f"{proto}://{host}{request.path}?path={p}"


def _proxy_titiler_iiif(request, titiler_path: str, suffix: str, image_id: str):
    suffix = suffix.lstrip("/")
    suffix = _force_png_iiif_suffix(suffix)
    upstream_url = f"{TITILER_INTERNAL_URL}/iiif/{quote_titiler_path(titiler_path)}/{suffix}"

    try:
        upstream = requests.get(upstream_url, stream=True, timeout=10)
    except requests.RequestException:
        return _with_cors(HttpResponse(status=502), request)

    if suffix.lower() == "info.json":
        try:
            data = upstream.json()
            # base = _public_base(request, file_path)
            # print(f"Proxying IIIF info.json for {file_path} with base {base}")
            # data["id"] = base
            # data.pop("@id", None)
        except ValueError:
            return _with_cors(HttpResponse(upstream.content, status=upstream.status_code), request)
        return _with_cors(JsonResponse(_patch_info_json(data, request, image_id), status=upstream.status_code, safe=True), request)

    response = StreamingHttpResponse(
        upstream.iter_content(chunk_size=65536),
        status=upstream.status_code,
        content_type=upstream.headers.get("Content-Type", "application/octet-stream"),
    )
    return _with_cors(response, request)


@require_http_methods(["GET", "OPTIONS"])
def iiif_image_info(request, image_id: str):
    if request.method == "OPTIONS":
        return _preflight_response(request)

    try:
        titiler_path = resolve_titiler_path(image_id)
    except (FileNotFoundError, ValueError) as exc:
        raise Http404(str(exc))
    return _proxy_titiler_iiif(request, titiler_path, "info.json", image_id)


@require_http_methods(["GET", "OPTIONS"])
def iiif_image_service(request, image_id: str, iiif_request: str | None = None):
    if request.method == "OPTIONS":
        return _preflight_response(request)

    try:
        titiler_path = resolve_titiler_path(image_id)
    except (FileNotFoundError, ValueError) as exc:
        raise Http404(str(exc))
    return _proxy_titiler_iiif(request, titiler_path, iiif_request or "info.json", image_id)


@require_http_methods(["GET", "OPTIONS"])
def titiler_iiif_proxy(request):
    if request.method == "OPTIONS":
        return _preflight_response(request)

    file_path = (request.GET.get("path") or "").strip()
    if not file_path:
        return _with_cors(HttpResponseBadRequest("Missing 'path' query param"), request)

    suffix = request.GET.get("suffix")
    match = re.search(r'(\.tiff?)/(.*)$', file_path, re.IGNORECASE)
    if match:
        suffix = match.group(2)
        file_path = file_path[:match.start(1) + len(match.group(1))]

    if not suffix:
        suffix = "info.json"

    # Forward /iiif{path}/... to TiTiler (minimum: info.json)
    suffix = suffix.lstrip("/")
    suffix = _force_png_iiif_suffix(suffix)
    image_id = make_legacy_image_id(file_path)
    register_image(image_id, file_path, kind="legacy")
    return _proxy_titiler_iiif(request, file_path, suffix, image_id)

