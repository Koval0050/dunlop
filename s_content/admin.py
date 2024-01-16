from django.contrib import admin
from .models import Site, SitePhone
from django.contrib.admin.widgets import AdminFileWidget
from django.utils.html import mark_safe
from django.db import models


class SitePhoneInlineAdmin(admin.StackedInline):
    model = SitePhone
    extra = 0

class RestrictPermission(admin.ModelAdmin):
    inlines = [SitePhoneInlineAdmin]
    
    def has_add_permission(self, request):
        return False
    
    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(SitePhone)
class SitePhoneAdmin(admin.ModelAdmin):
    pass


class AdminImageWidget(AdminFileWidget):
  def render(self, name, value, attrs=None, renderer=None):
    output = []
    if value and getattr(value, "url", None):
      image_url = value.url
      file_name = str(value)
      output.append(
        f' <a href="{image_url}" target="_blank">'
        f'  <img src="{image_url}" alt="{file_name}" width="auto" height="150" '
        f'style="object-fit: cover;"/> </a>')
    output.append(super(AdminFileWidget, self).render(name, value, attrs, renderer))
    return mark_safe(''.join(output))


@admin.register(Site)
class SiteAdmin(RestrictPermission):
    formfield_overrides = {
        models.ImageField:{'widget': AdminImageWidget},
    }

