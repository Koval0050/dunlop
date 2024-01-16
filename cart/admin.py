from django.contrib import admin
import nested_admin

# Register your models here.
from .models import CartProduct, Cart


class CartProductInline(nested_admin.NestedStackedInline):
    model = CartProduct
    extra = 0


class CartInline(nested_admin.NestedStackedInline):
    model = Cart
    extra = 0
    max_num = 1
    inlines = [CartProductInline]
