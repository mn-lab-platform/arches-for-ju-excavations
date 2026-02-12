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
    }
    
    # When task succeeds, result contains the return value
    # When task fails, result contains exception info
    # When task is pending/running, info may contain progress updates
    if task.state == 'SUCCESS':
        response['result'] = task.result
    elif task.state == 'FAILURE':
        response['result'] = {
            'exc_type': type(task.result).__name__ if task.result else None,
            'exc_message': str(task.result) if task.result else None
        }
        response['error'] = str(task.result)
    else:
        response['info'] = task.info
    
    return JsonResponse(response)