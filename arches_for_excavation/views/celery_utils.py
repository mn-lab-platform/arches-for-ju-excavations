from django.http import JsonResponse
from django.views.decorators.http import require_GET
from celery.result import AsyncResult

@require_GET
def get_celery_task_status(request, task_id):
    """
    View to get the status of a Celery task by its ID.
    """
    task = AsyncResult(task_id)
    response = {
        'task_id': task_id,
        'state': task.state,
        'info': task.info if task.info else None
    }
    return JsonResponse(response)