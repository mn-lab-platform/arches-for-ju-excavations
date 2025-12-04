import json
import os
import traceback
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction

# Import modelu manifestu z Archesa
try:
    from arches.app.models.models import IIIFManifest
except ImportError:
    # Fallback dla starszych/innych struktur katalogów w Arches
    from arches.app.models import IIIFManifest

@csrf_exempt
def save_iiif_annotation_db(request):
    """
    Endpoint obsługujący zapis adnotacji IIIF (v2) zgodnie z Good Practice.
    1. Znajduje manifest powiązany z Digital Resource (zdjęciem).
    2. Tworzy/Aktualizuje plik statyczny (AnnotationList) na dysku.
    3. Aktualizuje manifest w bazie danych, dodając link 'otherContent'.
    """
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST method is allowed'}, status=405)
    
    try:
        data = json.loads(request.body)
        
        # Oczekiwane dane z Frontendu
        digital_resource_id = data.get('digital_resource_id')  # ID Zasobu Cyfrowego (Zdjęcia)
        annotation_payload = data.get('annotation')            # { label: "...", geometry: "x,y,w,h" }

        if not digital_resource_id or not annotation_payload:
            return JsonResponse({'error': 'Missing digital_resource_id or annotation data'}, status=400)

        print(f"[IIIF API] Processing annotation for Digital Resource: {digital_resource_id}")

        # ---------------------------------------------------------
        # KROK 1: Znajdź Manifest w Bazie Danych (po Resource Instance ID)
        # ---------------------------------------------------------
        try:
            # W Arches, IIIFManifest jest połączony z resourceinstance (Digital Resource)
            iiif_manifest_obj = IIIFManifest.objects.get(globalid=digital_resource_id)
            manifest_data = iiif_manifest_obj.manifest # To jest słownik (JSON)
            print(f"[IIIF API] Found Manifest UUID: {iiif_manifest_obj.globalid}")
        except IIIFManifest.DoesNotExist:
            return JsonResponse({'error': f'No IIIF Manifest found for resource {digital_resource_id}'}, status=404)

        # ---------------------------------------------------------
        # KROK 2: Konfiguracja ścieżek do pliku AnnotationList
        # ---------------------------------------------------------
        # Używamy UUID manifestu do nazwania pliku listy, aby uniknąć kolizji
        manifest_uuid = str(iiif_manifest_obj.globalid)
        list_filename = f'list_{manifest_uuid}.json'
        
        # Ścieżka fizyczna (gdzie zapisać plik)
        annotations_dir = os.path.join(settings.MEDIA_ROOT, 'annotations')
        os.makedirs(annotations_dir, exist_ok=True)
        list_path = os.path.join(annotations_dir, list_filename)
        
        # URL publiczny (dostępny dla przeglądarki/Viewera)
        # Zakładamy, że serwer stoi na porcie 8004 (z Twoich logów)
        # W produkcji warto użyć request.build_absolute_uri()
        media_url_base = settings.MEDIA_URL if settings.MEDIA_URL.startswith('/') else f"/{settings.MEDIA_URL}"
        list_public_url = f"http://localhost:8004{media_url_base}annotations/{list_filename}".replace('//annotations', '/annotations')

        # ---------------------------------------------------------
        # KROK 3: Wyciągnij Canvas ID z Manifestu
        # ---------------------------------------------------------
        # Musimy wiedzieć, na którym Canvasie (płótnie) rysujemy
        try:
            # Zakładamy standardową strukturę Archesa: 1 sekwencja -> 1 obraz
            sequence = manifest_data.get('sequences', [{}])[0]
            canvas = sequence.get('canvases', [{}])[0]
            canvas_id = canvas['@id']
        except (KeyError, IndexError):
            return JsonResponse({'error': 'Invalid manifest structure: cannot find Canvas ID'}, status=500)

        # ---------------------------------------------------------
        # KROK 4: Aktualizuj lub Stwórz plik AnnotationList
        # ---------------------------------------------------------
        annotation_list_content = {
            "@context": "http://iiif.io/api/presentation/2/context.json",
            "@id": list_public_url,
            "@type": "sc:AnnotationList",
            "resources": []
        }

        # Jeśli plik już istnieje, wczytaj go, aby dodać nową adnotację do istniejących
        if os.path.exists(list_path):
            try:
                with open(list_path, 'r', encoding='utf-8') as f:
                    loaded = json.load(f)
                    if 'resources' in loaded:
                        annotation_list_content = loaded
            except Exception as e:
                print(f"[IIIF API] Warning: Could not read existing list file: {e}")

        ## DANE Z FRONTENDU
        anno_selector = annotation_payload.get('selector', {})
        selector_type = anno_selector.get('type')
        selector_value = anno_selector.get('value')
        
        # Pobieramy Label i Description
        raw_label = annotation_payload.get('label', 'Annotation')
        raw_desc = annotation_payload.get('description', '')

        # Budujemy treść HTML dla Viewera
        # Mirador i inne viewery obsługują podstawowy HTML w polu chars
        if raw_desc:
            final_chars = f"<p><b>{raw_label}</b></p><p>{raw_desc}</p>"
        else:
            final_chars = raw_label

        # Baza obiektu adnotacji
        new_anno = {
            "@type": "oa:Annotation",
            "motivation": ["oa:commenting"],
            "resource": {
                "@type": "cnt:ContentAsText",
                "format": "text/html",  # Zmieniamy na HTML
                "chars": final_chars    # Tutaj ląduje połączony tekst
            }
        }

        # ROZGAŁĘZIENIE LOGIKI (SVG vs XYWH) - To zostaje bez zmian
        if selector_type == 'svg':
            new_anno["on"] = {
                "@type": "oa:SpecificResource",
                "full": canvas_id,
                "selector": {
                    "@type": "oa:SvgSelector",
                    "value": selector_value
                }
            }
        else:
            # Fallback lub XYWH
            val = selector_value if selector_value else annotation_payload.get('geometry', "0,0,100,100")
            # Upewniamy się, że nie wysyłamy GeoJSONa jako xywh przez pomyłkę
            if isinstance(val, dict): val = "0,0,100,100" 
            
            new_anno["on"] = f"{canvas_id}#xywh={val}"

        annotation_list_content['resources'].append(new_anno)

        with open(list_path, 'w', encoding='utf-8') as f:
            json.dump(annotation_list_content, f, indent=2)

        print(f"[IIIF API] Saved annotation list to {list_path}")

        # ---------------------------------------------------------
        # KROK 5: Linkowanie Listy w Manifeście (Baza Danych)
        # ---------------------------------------------------------
        
        # Sprawdzamy pole 'otherContent' w Canvasie
        if 'otherContent' not in canvas:
            canvas['otherContent'] = []
            
        # Sprawdzamy, czy link do naszej listy już tam jest (żeby nie dublować przy każdej adnotacji)
        has_link = False
        for link in canvas['otherContent']:
            if link.get('@id') == list_public_url:
                has_link = True
                break
        
        if not has_link:
            print("[IIIF API] Linking AnnotationList to Manifest in DB...")
            canvas['otherContent'].append({
                "@id": list_public_url,
                "@type": "sc:AnnotationList",
                "label": "Workflow Annotations"
            })
            
            # WAŻNE: Aktualizacja struktury w pamięci i zapis do bazy
            manifest_data['sequences'][0]['canvases'][0] = canvas
            iiif_manifest_obj.manifest = manifest_data
            iiif_manifest_obj.save()
            print("[IIIF API] Manifest updated successfully.")

        return JsonResponse({
            'status': 'success', 
            'list_url': list_public_url, 
            'manifest_uuid': str(iiif_manifest_obj.globalid)
        })

    except Exception as e:
        print("[IIIF API] CRITICAL ERROR:")
        traceback.print_exc()
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
def delete_iiif_annotation(request):
    """
    Delete an annotation from the IIIF manifest annotation list by INDEX.
    """
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST method is allowed'}, status=405)
    
    try:
        data = json.loads(request.body)
        digital_resource_id = data.get('digital_resource_id')
        annotation_index = data.get('annotation_index')  # ✅ Changed from annotation_id
        
        print(f"[IIIF API] Deleting annotation at index {annotation_index} for Digital Resource: {digital_resource_id}")    
        
        if not digital_resource_id or annotation_index is None:
            return JsonResponse({'error': 'Missing digital_resource_id or annotation_index'}, status=400)

        # Find manifest
        try:
            iiif_manifest_obj = IIIFManifest.objects.get(globalid=digital_resource_id)
            manifest_data = iiif_manifest_obj.manifest
        except IIIFManifest.DoesNotExist:
            return JsonResponse({'error': f'No IIIF Manifest found for resource {digital_resource_id}'}, status=404)

        # Get annotation list file path
        manifest_uuid = str(iiif_manifest_obj.globalid)
        list_filename = f'list_{manifest_uuid}.json'
        annotations_dir = os.path.join(settings.MEDIA_ROOT, 'annotations')
        list_path = os.path.join(annotations_dir, list_filename)

        if not os.path.exists(list_path):
            return JsonResponse({'error': 'Annotation list file not found'}, status=404)

        # Load annotations
        with open(list_path, 'r', encoding='utf-8') as f:
            annotation_list = json.load(f)

        original_count = len(annotation_list.get('resources', []))
        print(f"[IIIF API] Original annotation count: {original_count}")
        
        # ✅ Delete by index
        if annotation_index < 0 or annotation_index >= original_count:
            return JsonResponse({'error': f'Invalid annotation index: {annotation_index}'}, status=400)
        
        # Remove annotation at index
        del annotation_list['resources'][annotation_index]
        new_count = len(annotation_list['resources'])
        
        print(f"[IIIF API] Deleted annotation at index {annotation_index}, new count: {new_count}")

        # Save updated list
        with open(list_path, 'w', encoding='utf-8') as f:
            json.dump(annotation_list, f, indent=2)

        return JsonResponse({
            'status': 'success',
            'message': f'Annotation at index {annotation_index} deleted',
            'remaining_count': new_count
        })

    except Exception as e:
        print("[IIIF API] Delete annotation error:")
        traceback.print_exc()
        return JsonResponse({'error': str(e)}, status=500)