import os
from django.conf import settings
from django.contrib.staticfiles import finders

def get_static_fallback(custom_path, default_path):
    if finders.find(custom_path):
        return custom_path
    return default_path

def custom_context(request):
    captions = getattr(settings, 'LANDING_IMAGE_SLIDES_CONFIG', [])
    captions = captions + [''] * max(0, 3 - len(captions))
    
    return {
        'excavation_name': os.environ.get("EXCAVATION_NAME", "Arches Excavation Project"),
        
        # --- LANDING PAGE IMAGES ---
        'project_logo_url': get_static_fallback(
            'img/landing/custom/project_logo.png', 
            'img/landing/default/project_logo.png'
        ),
        'first_slide_image_url': get_static_fallback(
            'img/landing/custom/landing_first.jpg', 
            'img/landing/default/landing_first.jpg'
        ),
        'second_slide_image_url': get_static_fallback(
            'img/landing/custom/landing_second.jpg', 
            'img/landing/default/landing_second.jpg'
        ),
        'third_slide_image_url': get_static_fallback(
            'img/landing/custom/landing_third.jpg', 
            'img/landing/default/landing_third.jpg'
        ),
        
        # --- LANDING PAGE CAPTIONS ---
        'first_slide_caption': captions[0].get('caption', ''),
        'second_slide_caption': captions[1].get('caption', ''),
        'third_slide_caption': captions[2].get('caption', ''),

        # --- LANDING PAGE ATTRIBUTIONS ---
        'first_slide_attribution': captions[0].get('image_attribution', ''),
        'second_slide_attribution': captions[1].get('image_attribution', ''),
        'third_slide_attribution': captions[2].get('image_attribution', '')
    }