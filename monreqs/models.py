from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

USER = get_user_model()

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
    origin = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    vehicle_type  = models.CharField(max_length=3,choices=VehicleType)
    cargo_description = models.CharField(max_length=255)
    cargo_value = models.PositiveIntegerField()
    logins = models.ManyToManyField(USER,related_name="monreqs")

    def __str__(self) -> str:
        return self.pk
