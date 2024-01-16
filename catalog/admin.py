from django.contrib import admin
from django.db import models
from django.utils.html import mark_safe
from adminsortable2.admin import SortableAdminMixin

from s_content.admin import AdminImageWidget
from .models import (
    Product,
    ProductCategory,
    ProductImage,
    ProductFeature,
    Feature,
    FeatureValue,
    ProductAdvantage,
    ProductColor,
    ProductSize,
    Review,
)


class ProductImageInline(admin.StackedInline):
    model = ProductImage
    extra = 0
    classes = ["collapse", "wide", "extrapretty"]
    formfield_overrides = {
        models.ImageField: {"widget": AdminImageWidget},
    }


class ProductFeatureInline(admin.StackedInline):
    model = ProductFeature
    extra = 0
    classes = ["collapse", "wide", "extrapretty"]
    autocomplete_fields = ["feature", "feature_value"]


class ProductFeatureAdmin(admin.ModelAdmin):
    pass


class FeatureAdmin(admin.ModelAdmin):
    search_fields = ["title"]


class FeatureValueAdmin(admin.ModelAdmin):
    search_fields = ["title"]


class ProductAdvantageAdmin(admin.ModelAdmin):
    def show_image(self, obj):
        url = obj.image.url if obj.image else None
        return mark_safe(f'<img src="{url}" style="max-width:150px; height:100px"/>')

    show_image.short_description = "Картинка"
    formfield_overrides = {
        models.ImageField: {"widget": AdminImageWidget},
    }
    fields = ["title", "image"]
    list_display = ["title", "show_image"]


class ProductImageAdmin(admin.ModelAdmin):
    def show_image(self, obj):
        url = obj.image.url if obj.image else None
        return mark_safe(f'<img src="{url}" style="max-width:150px; height:100px"/>')

    show_image.short_description = "Картинка"
    formfield_overrides = {
        models.ImageField: {"widget": AdminImageWidget},
    }
    fields = ["image", "image_alt"]
    list_display = ["show_image", "image_alt"]
    list_editable = ["image_alt"]


class ProductAdmin(SortableAdminMixin, admin.ModelAdmin):
    def show_image(self, obj):
        url = obj.image.url if obj.image else None
        return mark_safe(f'<img src="{url}" style="max-width:150px; height:100px"/>')

    show_image.short_description = "Картинка"

    formfield_overrides = {
        models.ImageField: {"widget": AdminImageWidget},
    }
    fields = [
        "title",
        "price",
        'article',
        "video_url",
        "image",
        "short_description",
        "categories",
        "colors",
        "sizes",
        "sizes_image",
        "advantages",
        'similars',
        "quantity",
        "is_active",
    ]
    filter_horizontal = ["advantages", 'colors', 'sizes', 'similars', 'categories']
    list_display = ["title", "show_image"]
    list_filter = ["categories"]
    inlines = [ProductImageInline, ProductFeatureInline]


class ProductCategoryAdmin(SortableAdminMixin, admin.ModelAdmin):
    def show_image(self, obj):
        url = obj.image.url if obj.image else None
        return mark_safe(f'<img src="{url}" style="max-width:150px; height:100px"/>')

    show_image.short_description = "Картинка"

    formfield_overrides = {
        models.ImageField: {"widget": AdminImageWidget},
    }
    fields = ["title", "slug", "image", "is_active"]
    list_display = ["title", "show_image"]


class ProductColorAdmin(admin.ModelAdmin):
    def show_color(self, obj):
        return mark_safe(
            f'<div style="background-color: {obj.color}; width:50px; height:50px""></div>'
        )

    show_color.short_description = "Color"

    fields = ["title", "color"]
    list_display = [
        "title",
        "show_color",
    ]


class ReviewAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "full_name",
        "email",
        "phone",
        "product",
        "rating",
        "is_active",
    ]
    list_display_links = ["full_name", "rating", "product"]
    list_editable = ["is_active"]


admin.site.register(ProductAdvantage, ProductAdvantageAdmin)
admin.site.register(ProductFeature, ProductFeatureAdmin)
admin.site.register(Feature, FeatureAdmin)
admin.site.register(FeatureValue, FeatureValueAdmin)
admin.site.register(ProductImage, ProductImageAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductCategory, ProductCategoryAdmin)
admin.site.register(ProductColor, ProductColorAdmin)
admin.site.register(ProductSize)
admin.site.register(Review, ReviewAdmin)
