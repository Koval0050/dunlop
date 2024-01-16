from django.contrib import admin
from django.urls import path, include
from django.contrib.staticfiles.urls import static
from django.conf import settings
from django.contrib.sitemaps.views import sitemap
from .sitemaps import sitemaps
from project.views import robots


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("project.api.urls")),
    path("api/", include("catalog.api.urls")),
    path("api/", include("cart.api.urls")),
    path("api/", include("order.api.urls")),
    path("api/", include("nova_poshta.api.urls")),
    path("api/", include("payment.api.urls")),
    path("", include("project.urls"), name="project"),
    path("", include("catalog.urls"), name="catalog"),
    path("", include("order.urls"), name="catalog"),
    path("", include("payment.urls")),
    path("sitemap.xml", sitemap, {"sitemaps": sitemaps}),
    path("robots.txt", robots, name="robots"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
