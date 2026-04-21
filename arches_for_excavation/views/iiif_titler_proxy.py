from django.http import HttpResponse, StreamingHttpResponse, HttpResponseBadRequest, JsonResponse
from django.views.decorators.http import require_GET
from django.conf import settings
import requests
import re
from urllib.parse import quote

TITILER_INTERNAL_URL = "http://titiler:8000"

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

@require_GET
def titiler_iiif_proxy(request):
    file_path = (request.GET.get("path") or "").strip()
    if not file_path:
        return HttpResponseBadRequest("Missing 'path' query param")

    suffix = request.GET.get("suffix")
    match = re.search(r'(\.tiff?)/(.*)$', file_path, re.IGNORECASE)
    if match:
        suffix = match.group(2)
        file_path = file_path[:match.start(1) + len(match.group(1))]

    if not suffix:
        suffix = "info.json"

    # Forward /iiif{path}/... to TiTiler (minimum: info.json)
    suffix = suffix.lstrip("/")
    upstream_url = f"{TITILER_INTERNAL_URL}/iiif/{file_path.rstrip('/')}/{suffix}"

    try:
        upstream = requests.get(upstream_url, stream=True, timeout=10)

        if suffix.lower() == "info.json":
            data = upstream.json()
            base = _public_base(request, file_path)
            print(f"Proxying IIIF info.json for {file_path} with base {base}")
            data["id"] = base
            data.pop("@id", None)

            # ważne: Allmaps czasem używa tiles[].id
            if isinstance(data.get("tiles"), list):
                for t in data["tiles"]:
                    if isinstance(t, dict):
                        t["id"] = base
                        t.pop("@id", None)

            return JsonResponse(data, status=upstream.status_code, safe=True)

        return StreamingHttpResponse(
            upstream.iter_content(chunk_size=65536),
            status=upstream.status_code,
            content_type=upstream.headers.get("Content-Type", "application/json"),
        )
    except requests.RequestException:
        return HttpResponse(status=502)