from django.contrib.admin.widgets import AdminFileWidget
from django.utils.safestring import mark_safe

class AdminImageWidget(AdminFileWidget):
  def render(self, name, value, attrs=None, renderer=None):
    output = []
    if value and getattr(value, "url", None):
      output.append(
        f' <a href="{value.url}" target="_blank">'
        f'  <img src="{value.url}" width="auto" height="200" '
        f'style="object-fit: cover;"/> </a>')
    output.append(super(AdminFileWidget, self).render(name, value, attrs, renderer))
    return mark_safe(''.join(output))
