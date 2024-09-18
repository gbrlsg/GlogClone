from django.db.models import Case, When, Value, CharField

from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets

from .models import MonitoringRequest
from .serializers import MonReqSerializer


class MonReqViewSet(viewsets.ModelViewSet):

    serializer_class = MonReqSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.monreqs.all()
