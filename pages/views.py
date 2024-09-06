from django.views.generic import ListView
from django.contrib.auth.mixins import LoginRequiredMixin

from monreqs.models import MonitoringRequest

class HomeView(LoginRequiredMixin, ListView):
    model = MonitoringRequest
    template_name = "home.html"