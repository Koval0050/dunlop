from django.contrib import admin
from .models import (
    SettlementType,
    WarehouseType,
    Area,
    Warehouse,
    Settlement,
)


class WarehouseTypeAdmin(admin.ModelAdmin):
    pass


class SettlementTypeAdmin(admin.ModelAdmin):
    pass


class AreaAdmin(admin.ModelAdmin):
    list_display = [
        "title",
    ]


class WarehouseAdmin(admin.ModelAdmin):

    list_display = ["__str__"]
    search_fields = ["title", "short_address"]
    autocomplete_fields = ["settlement"]


class SettlementAdmin(admin.ModelAdmin):
    search_fields = ["title"]
    ordering = ["-title"]
