from typing import Any

from django.db.models import Case, When, Value, CharField
from django.db.models.query import QuerySet
from django.views.generic import ListView
from django.contrib.auth.mixins import LoginRequiredMixin

from monreqs.models import MonitoringRequest

class DashboardView(LoginRequiredMixin, ListView):
    model = MonitoringRequest
    template_name = "dashboard.html"
    context_object_name = "monreqs"

    def get_queryset(self) -> QuerySet[Any]:
        #Explain what this does ..
        self.queryset = self.request.user.monreqs.all().annotate(
            status_display=Case(
                *[When(status=v,then=Value(str(l))) for v,l in MonitoringRequest.Status.choices],
                output_field=CharField(),
            )
        ).values(
            "pk","status_display","shipping_company","origin","destination"
        )
        return super().get_queryset()
        