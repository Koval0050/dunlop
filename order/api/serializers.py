from rest_framework import serializers
from ..models import Order
from cart.api.serializers import CartSerializer


class OrderSerializer(serializers.ModelSerializer):
    cart = CartSerializer(read_only=True)
    class Meta:
        model = Order
        fields = [
            "id",
            "name",
            "surname",
            "phone",
            "email",
            "settlement",
            "warehouse",
            "address",
            "message",
            "payment_type",
            "total_price",
            'cart'
        ]
