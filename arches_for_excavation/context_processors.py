import os
from django.conf import settings

def custom_context(request):
    use_custom_media = os.environ.get("CUSTOM_LANDING_MEDIA", "False").lower() == "true"
    
    return {
        'excavation_name': os.environ.get("EXCAVATION_NAME", "Arches Excavation Project"),
        'project_logo_url': 'img/landing/custom/project_logo.png' if use_custom_media else 'img/landing/default/project_logo.png',
        'first_slide_image_url': 'img/landing/custom/landing_first.jpg' if use_custom_media else 'img/landing/default/landing_first.jpg',
        'first_slide_caption': settings.IMAGE_SLIDES_CAPTIONS[0] if hasattr(settings, 'IMAGE_SLIDES_CAPTIONS') else '',
        'second_slide_image_url': 'img/landing/custom/landing_second.jpg' if use_custom_media else 'img/landing/default/landing_second.jpg',
        'second_slide_caption': settings.IMAGE_SLIDES_CAPTIONS[1] if hasattr(settings, 'IMAGE_SLIDES_CAPTIONS') else '',
        'third_slide_image_url': 'img/landing/custom/landing_third.jpg' if use_custom_media else 'img/landing/default/landing_third.jpg',
        'third_slide_caption': settings.IMAGE_SLIDES_CAPTIONS[2] if hasattr(settings, 'IMAGE_SLIDES_CAPTIONS') else '',
    }