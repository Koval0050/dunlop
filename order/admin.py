from django.contrib import admin
import nested_admin

from .models import Order
from cart.admin import CartInline


class OrderAmdin(nested_admin.NestedModelAdmin):
    inlines = [CartInline]
    list_display = ['id', 'email', 'name', 'surname', 'updated']
    list_display_links = ['id', 'email', 'name', 'surname', 'updated']
    readonly_fields = ['settlement', 'warehouse', 'cart', 'created', 'updated']


admin.site.register(Order, OrderAmdin)
