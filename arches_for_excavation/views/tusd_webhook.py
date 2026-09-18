import json
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.http import JsonResponse 

@csrf_exempt
@require_POST
def tus_webhook(request):
    try:
        print("Received TUS webhook request with body:", request.body, flush=True)
        body = json.loads(request.body)
        print("Received TUS webhook:", body, flush=True)
        print()
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    return JsonResponse({'status': 'success', 'message': 'Webhook received successfully'})