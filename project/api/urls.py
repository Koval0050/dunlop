from django.urls import path
from django.conf import settings
from django.contrib.staticfiles.urls import static
from .views import ContactView


urlpatterns = [
    path("contact/", ContactView.as_view(), name="contact"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
