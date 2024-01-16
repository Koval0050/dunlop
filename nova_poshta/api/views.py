from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from django.db.models import Value


from ..models import Warehouse, Settlement
from .serializers import (
    WarehouseSerializer,
    SettlementSerializer,
)


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = "page_size"
    max_page_size = 1000


class WarehousesList(generics.ListAPIView):
    serializer_class = WarehouseSerializer
    queryset = Warehouse.objects.none()

    def get_queryset(self):
        queryset = super().get_queryset()
        query = self.request.query_params.get("q")
        if query:
            return Warehouse.objects.filter(settlement=query)
        return queryset


class SettlementsList(generics.ListAPIView):
    serializer_class = SettlementSerializer
    queryset = Settlement.objects.none()
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        query = self.request.query_params.get("q")
        if query:
            q1 = Settlement.objects.filter(title__iexact=query)
            q2 = Settlement.objects.filter(title__istartswith=query)
            q3 = Settlement.objects.filter(title__icontains=query)
            return q1 or q2 or q3
        return queryset
