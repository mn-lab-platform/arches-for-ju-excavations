from django.http import JsonResponse
from django.views import View

from arches_slocal.utils.cidoc_periodic_table import build_periodic_table_data


class CidocPeriodicTableDataView(View):
    def get(self, request):
        data = build_periodic_table_data()

        return JsonResponse(
            data,
            json_dumps_params={
                "ensure_ascii": False,
            },
        )