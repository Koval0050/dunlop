from rest_framework import serializers
from ..models import Contact


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ["id", "name", "comment", "phone", "email", "product", "product_color", "product_size"]
