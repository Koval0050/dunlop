from rest_framework import serializers
from ..models import (
    Product,
    ProductCategory,
    ProductImage,
    ProductFeature,
    ProductColor,
    ProductSize,
    Feature,
    FeatureValue,
    Review,
)


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ["title"]


class FeatureValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeatureValue
        fields = ["title"]


class ProductFeatureSerializer(serializers.ModelSerializer):
    feature = FeatureSerializer()
    feature_value = FeatureValueSerializer()

    class Meta:
        model = ProductFeature
        fields = ["feature", "feature_value"]


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ["id", "title", "slug"]


class ProductImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    # pdf_url = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ["image_url"]

    def get_image_url(self, obj):
        return obj.image_url()

    # def get_pdf_url(self, obj):
    #     return obj.pdf_url()


class ProductAdvatagesSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ["image_url"]

    def get_image_url(self, obj):
        return obj.image_url()


class ProductSerializer(serializers.ModelSerializer):
    product_features = ProductFeatureSerializer(many=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "title",
            "image",
            "price",
            "quantity",
            "product_features",
            "short_description",
        ]


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            "id",
            "full_name",
            "text",
            "email",
            "phone",
            "product",
            "rating",
        ]


class ProductColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductColor
        fields = [
            "title",
            "color",
        ]


class ProductSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSize
        fields = [
            "title",
        ]
