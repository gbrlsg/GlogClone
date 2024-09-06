from django.db import models
from django.utils.translation import gettext_lazy as _

class MonitoringRequest(models.Model):
    class Status(models.TextChoices):
        ONGOING = "O", _("Em andamento")
        PENDING = "P", _("Pendente")
        CANCELLED = "C", _("Cancelada")
    class VehicleType(models.TextChoices):
        BOX_TRUCK = "BXT", _("Caminhão baú")
        LIGHT_COM_VE = "LCV", _("VUC")
        TRACTOR = "TCR", _("Caminhão reboque")

    status = models.CharField(max_length=1,choices=Status)
    shipping_company = models.CharField(max_length=255)
    vehicle  = models.CharField(max_length=3,choices=VehicleType)
    cargo_description = models.CharField(max_length=255)
    cargo_value = models.PositiveIntegerField()

    def __str__(self) -> str:
        return self.pk
