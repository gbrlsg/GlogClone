from rest_framework import serializers
from .models import MonitoringRequest


class MonReqSerializer(serializers.ModelSerializer):
    status = serializers.ChoiceField(choices=MonitoringRequest.Status)
    vehicle_type = serializers.ChoiceField(choices=MonitoringRequest.VehicleType)
    status_display = serializers.CharField(source="get_status_display", read_only=True)

    class Meta:
        model = MonitoringRequest
        fields = [
            "pk",
            "status",
            "status_display",
            "shipping_company",
            "origin",
            "destination",
            "vehicle_type",
            "cargo_description",
            "cargo_value",
        ]
