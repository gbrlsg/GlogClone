from typing import Any
from django.db.models.query import QuerySet
from django.views.generic import ListView
from django.contrib.auth.mixins import LoginRequiredMixin

from monreqs.models import MonitoringRequest

class DashboardView(LoginRequiredMixin, ListView):
    model = MonitoringRequest
    template_name = "dashboard.html"

    def get_queryset(self) -> QuerySet[Any]:
        self.queryset = self.request.user.monreqs.all()
        return super().get_queryset()
        