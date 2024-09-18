from django.urls import path
from django.views.generic import TemplateView

from .views import DashboardView


urlpatterns = [
    path("dashboard/", DashboardView.as_view(), name="dashboard"),
    path(
        "webpack/", TemplateView.as_view(template_name="webpack.html"), name="webpack"
    ),
]
