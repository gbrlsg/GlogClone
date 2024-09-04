from django.db import models
from django.utils.translation import gettext_lazy as _

class MonitoringRequest(models.Model):
    class Status(models.TextChoices):
        ONGOING = "O", _("Ongoing")
        PENDING = "P", _("Pending")
        CANCELLED = "C", _("Cancelled")
    status = models.CharField(max_length=1,choices=Status)
    shipping_company = models.CharField(max_length=255)
    vehicle  = models.CharField(max_length=64)
    cargo_description = models.CharField(max_length=255)
    cargo_value = models.PositiveIntegerField()

    def __str__(self) -> str:
        return self.pk
