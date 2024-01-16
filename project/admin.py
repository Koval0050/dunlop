from django.contrib import admin
from django.contrib.auth.models import User, Group
from django.contrib.auth.models import User, Group
from django.utils.html import mark_safe

from .models import (
    Contact,
)

admin.site.unregister(Group)
admin.site.unregister(User)

class ContactAdmin(admin.ModelAdmin):
    def show_email(self, obj):
        return mark_safe(f'<a href="mailto:{obj.email}">{obj.email or ""}</a>')
    show_email.short_description = "Email"

    def show_phone(self, obj):
        return mark_safe(f'<a href="tel:{obj.phone}">{obj.phone or ""}</a>')
    show_phone.short_description = "Телефон"

    readonly_fields = ['created', 'updated']
    list_display = ['id', 'show_email', 'show_phone', 'created']
    list_display_links = ['id', 'created']

admin.site.register(Contact, ContactAdmin)
