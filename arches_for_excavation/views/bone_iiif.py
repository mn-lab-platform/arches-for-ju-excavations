"""Small, read-only IIIF Image API service for the bone inventory prototype."""

from functools import lru_cache
from io import BytesIO
from pathlib import Path

from django.http import Http404, HttpResponse, HttpResponseBadRequest, JsonResponse
from django.urls import reverse
from django.views.decorators.cache import cache_control
from django.views.decorators.http import require_http_methods
from PIL import Image

from .services.iiif_image_service import public_origin


IMAGE_ID = "multimedia"
IMAGE_WIDTH = 771
IMAGE_HEIGHT = 1374
MAX_OUTPUT_DIMENSION = 4096
SOURCE_PATH = (
    Path(__file__).resolve().parents[1]
    / "media"
    / "img"
    / "bone-inventory"
    / "Multimedia.jpg"
)


@lru_cache(maxsize=1)
def _source_bytes():
    if not SOURCE_PATH.is_file():
        raise FileNotFoundError(SOURCE_PATH)
    return SOURCE_PATH.read_bytes()


def _open_source():
    image = Image.open(BytesIO(_source_bytes()))
    image.load()
    return image


def _check_image_id(image_id):
    if image_id != IMAGE_ID:
        raise Http404("Unknown bone inventory image")


def _cors(response):
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, HEAD, OPTIONS"
    response["Access-Control-Allow-Headers"] = "Accept, Content-Type, Range"
    response["Access-Control-Expose-Headers"] = "Content-Length, Content-Type"
    return response


def _service_url(request, image_id):
    relative = reverse("bone-iiif-image-service", kwargs={"image_id": image_id})
    origin = public_origin(request)
    return f"{origin}{relative}".rstrip("/")


def _parse_region(value, source_width, source_height):
    if value == "full":
        return 0, 0, source_width, source_height
    if value == "square":
        side = min(source_width, source_height)
        return (source_width - side) // 2, (source_height - side) // 2, side, side

    percentage = value.startswith("pct:")
    raw = value[4:] if percentage else value
    parts = raw.split(",")
    if len(parts) != 4:
        raise ValueError("Invalid IIIF region")

    numbers = [float(part) for part in parts]
    if percentage:
        x = round(source_width * numbers[0] / 100)
        y = round(source_height * numbers[1] / 100)
        width = round(source_width * numbers[2] / 100)
        height = round(source_height * numbers[3] / 100)
    else:
        x, y, width, height = [round(number) for number in numbers]

    if (
        x < 0
        or y < 0
        or width <= 0
        or height <= 0
        or x + width > source_width
        or y + height > source_height
    ):
        raise ValueError("IIIF region is outside the source image")
    return x, y, width, height


def _parse_size(value, region_width, region_height):
    if value in {"full", "max"}:
        return region_width, region_height

    if value.startswith("pct:"):
        scale = float(value[4:]) / 100
        width = round(region_width * scale)
        height = round(region_height * scale)
    elif value.startswith("!"):
        box_width, box_height = [int(part) for part in value[1:].split(",", 1)]
        scale = min(box_width / region_width, box_height / region_height)
        width = round(region_width * scale)
        height = round(region_height * scale)
    else:
        width_text, height_text = value.split(",", 1)
        if width_text and height_text:
            width = int(width_text)
            height = int(height_text)
        elif width_text:
            width = int(width_text)
            height = round(region_height * width / region_width)
        elif height_text:
            height = int(height_text)
            width = round(region_width * height / region_height)
        else:
            raise ValueError("Invalid IIIF size")

    if (
        width <= 0
        or height <= 0
        or width > MAX_OUTPUT_DIMENSION
        or height > MAX_OUTPUT_DIMENSION
    ):
        raise ValueError("Invalid or excessive IIIF output size")
    return width, height


@require_http_methods(["GET", "HEAD", "OPTIONS"])
@cache_control(public=True, max_age=3600)
def bone_iiif_info(request, image_id):
    _check_image_id(image_id)
    if request.method == "OPTIONS":
        return _cors(HttpResponse(status=204))

    service_url = _service_url(request, image_id)
    sizes = [
        {"width": 193, "height": 344},
        {"width": 386, "height": 687},
        {"width": IMAGE_WIDTH, "height": IMAGE_HEIGHT},
    ]
    response = JsonResponse(
        {
            "@context": "http://iiif.io/api/image/2/context.json",
            "@id": service_url,
            "protocol": "http://iiif.io/api/image",
            "width": IMAGE_WIDTH,
            "height": IMAGE_HEIGHT,
            "profile": [
                "http://iiif.io/api/image/2/level1.json",
                {
                    "formats": ["jpg", "png"],
                    "qualities": ["default", "color", "gray"],
                    "supports": [
                        "regionByPx",
                        "regionByPct",
                        "sizeByW",
                        "sizeByH",
                        "sizeByWh",
                        "sizeByPct",
                    ],
                },
            ],
            "tiles": [{"width": 256, "scaleFactors": [1, 2, 4, 8]}],
            "sizes": sizes,
        }
    )
    return _cors(response)


@require_http_methods(["GET", "HEAD", "OPTIONS"])
@cache_control(public=True, max_age=3600)
def bone_iiif_image(request, image_id, region, size, rotation, quality, image_format):
    _check_image_id(image_id)
    if request.method == "OPTIONS":
        return _cors(HttpResponse(status=204))

    if rotation not in {"0", "90", "180", "270"}:
        return _cors(HttpResponseBadRequest("Unsupported IIIF rotation"))
    if quality not in {"default", "color", "gray"}:
        return _cors(HttpResponseBadRequest("Unsupported IIIF quality"))
    if image_format not in {"jpg", "jpeg", "png"}:
        return _cors(HttpResponseBadRequest("Unsupported IIIF format"))

    try:
        image = _open_source()
        x, y, width, height = _parse_region(region, image.width, image.height)
        output_width, output_height = _parse_size(size, width, height)
    except (FileNotFoundError, OSError):
        raise Http404("Bone inventory source image is unavailable")
    except (ValueError, TypeError):
        return _cors(HttpResponseBadRequest("Invalid IIIF image request"))

    image = image.crop((x, y, x + width, y + height))
    if image.size != (output_width, output_height):
        image = image.resize((output_width, output_height), Image.Resampling.LANCZOS)
    if rotation != "0":
        image = image.rotate(-int(rotation), expand=True)
    if quality == "gray":
        image = image.convert("L")
    elif image.mode not in {"RGB", "L"}:
        image = image.convert("RGB")

    output = BytesIO()
    if image_format == "png":
        image.save(output, format="PNG", optimize=True)
        content_type = "image/png"
    else:
        if image.mode != "RGB":
            image = image.convert("RGB")
        image.save(output, format="JPEG", quality=90, optimize=True)
        content_type = "image/jpeg"

    response = HttpResponse(output.getvalue(), content_type=content_type)
    response["Content-Length"] = str(len(response.content))
    return _cors(response)


@require_http_methods(["GET", "HEAD"])
def bone_inventory_example_csv(request):
    content = (
        "\ufeffid,bone_id,description\r\n"
        "1,cranium,Complete cranium\r\n"
        "2,mandible,Fragmented mandible\r\n"
        "3,femur_left,Left femur present\r\n"
    )
    response = HttpResponse(content, content_type="text/csv; charset=utf-8")
    response["Content-Disposition"] = (
        'attachment; filename="bone-inventory-example.csv"'
    )
    return response
