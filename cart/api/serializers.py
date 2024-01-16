from rest_framework import serializers
from ..models import CartProduct
from catalog.models import Product
from ..models import Cart
from catalog.api.serializers import (
    ProductSerializer,
    ProductColorSerializer,
    ProductSizeSerializer,
)


class CartProductSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.filter(is_active=True)
    )
    cart = serializers.PrimaryKeyRelatedField(queryset=Cart.objects.all())

    class Meta:
        model = CartProduct
        fields = [
            "id",
            "cart",
            "product",
            "product_color",
            "product_size",
            "quantity",
        ]


class CartProductInfoSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    price = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()
    product_color = ProductColorSerializer()
    product_size = ProductSizeSerializer()

    class Meta:
        model = CartProduct
        fields = [
            "id",
            "product",
            "product_color",
            "product_size",
            "quantity",
            "price",
            "total_price",
        ]

    def get_price(self, obj):
        return f"{obj.get_price():.2f}"

    def get_total_price(self, obj):
        return f"{obj.get_total_price():.2f}"


class CartSerializer(serializers.ModelSerializer):
    cart_products = CartProductInfoSerializer(many=True)
    total_price = serializers.SerializerMethodField()
    total_quantity = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = [
            "ordered",
            "cart_products",
            "total_price",
            "total_quantity",
        ]

    def get_total_price(self, obj):
        return f"{obj.get_total_price():.2f}"

    def get_total_quantity(self, obj):
        return obj.get_cart_product_total_quantity()
