from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from .serializers import ProductSerializer, ProductCategorySerializer, ReviewSerializer
from ..models import Product, ProductCategory, Review

refuse_names = "Crytocoers"


class ProductView(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def get_queryset(self):
        data = self.request.GET
        slug = data.get("slug")
        queryset = super().get_queryset().filter(category__slug=slug)
        return queryset


class ProductCategoryView(generics.ListAPIView):
    serializer_class = ProductCategorySerializer
    queryset = ProductCategory.objects.all()


class ReviewView(APIView):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = ReviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )
