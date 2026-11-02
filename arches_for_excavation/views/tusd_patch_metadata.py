import json
import os

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.http import require_POST


UPLOAD_TYPES = frozenset({"maplayer", "model", "iiif"})


def _update_maplayer_metadata(metadata, new_metadata):
    metadata.update({
        "upload_type": "maplayer",
        "upload_token": str(new_metadata["upload_token"]),
        "basemap_name": str(new_metadata.get("basemap_name", "Untitled Basemap")),
        "basemap_sortorder": str(new_metadata.get("basemap_sortorder", "0")),
        "basemap_ispublic": str(new_metadata.get("basemap_ispublic", "true")).lower(),
        "basemap_isoverlay": str(new_metadata.get("basemap_isoverlay", "false")).lower(),
        "basemap_icon": str(new_metadata.get("basemap_icon", "fa fa-map")),
    })


def _update_model_metadata(metadata, new_metadata):
    model_id = new_metadata.get("model_id")
    parent_resource_id = new_metadata.get("parent_resource_id")
    if not model_id or not parent_resource_id:
        raise ValueError(
            "model_id and parent_resource_id are required for model uploads"
        )

    metadata.update({
        "upload_type": "model",
        "upload_token": str(new_metadata["upload_token"]),
        "model_id": str(model_id),
        "parent_resource_id": str(parent_resource_id),
        "model_name": str(new_metadata.get("model_name", "")),
    })


def _update_iiif_metadata(metadata, new_metadata):
    metadata.update({
        "upload_type": "iiif",
        "upload_token": str(new_metadata["upload_token"]),
    })


def _update_metadata_for_upload_type(metadata, new_metadata):
    upload_type = new_metadata.get("upload_type")
    if upload_type not in UPLOAD_TYPES:
        raise ValueError("Unsupported or missing upload_type")

    handlers = {
        "maplayer": _update_maplayer_metadata,
        "model": _update_model_metadata,
        "iiif": _update_iiif_metadata,
    }
    handlers[upload_type](metadata, new_metadata)


@require_POST
def patch_tusd_metadata(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Unauthorized"}, status=401)

    is_in_group = request.user.groups.filter(name="Plugin Access").exists()
    if not (is_in_group or request.user.is_superuser):
        return JsonResponse({"error": "Forbidden"}, status=403)

    try:
        body = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON body"}, status=400)

    tus_id = body.get("tus_id")
    if not tus_id:
        return JsonResponse({"error": "Missing tus_id parameter"}, status=400)

    new_metadata = body.get("metadata")
    if not isinstance(new_metadata, dict):
        return JsonResponse(
            {"error": "Missing or invalid metadata parameter"},
            status=400,
        )

    if not new_metadata.get("upload_token"):
        return JsonResponse({"error": "Missing upload_token"}, status=400)

    media_base = os.path.join(settings.MEDIA_ROOT, settings.UPLOADED_FILES_DIR)
    metadata_path = os.path.join(media_base, f"{tus_id}.info")

    try:
        with open(metadata_path, "r", encoding="utf-8") as metadata_file:
            stored_document = json.load(metadata_file)
    except FileNotFoundError:
        return JsonResponse(
            {"error": f"Metadata file for tus_id {tus_id} not found"},
            status=404,
        )
    except (OSError, json.JSONDecodeError) as error:
        return JsonResponse(
            {"error": f"Unable to read upload metadata: {error}"},
            status=500,
        )

    stored_metadata = stored_document.setdefault("MetaData", {})
    stored_upload_type = stored_metadata.get("upload_type")
    requested_upload_type = new_metadata.get("upload_type")

    if stored_upload_type and stored_upload_type != requested_upload_type:
        return JsonResponse(
            {"error": "Upload type cannot be changed"},
            status=400,
        )

    try:
        _update_metadata_for_upload_type(stored_metadata, new_metadata)
    except (KeyError, ValueError) as error:
        return JsonResponse({"error": str(error)}, status=400)

    try:
        with open(metadata_path, "w", encoding="utf-8") as metadata_file:
            json.dump(stored_document, metadata_file)
    except OSError as error:
        return JsonResponse(
            {"error": f"Unable to write upload metadata: {error}"},
            status=500,
        )

    return JsonResponse({
        "status": "success",
        "message": "Metadata updated successfully",
    })
