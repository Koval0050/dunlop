from django.urls import path, include
from django.conf import settings
from django.contrib.staticfiles.urls import static

from . import views

urlpatterns = [
    path("categories/", views.ProductCategoryView.as_view(), name="categories"),
    path("items/", views.ProductView.as_view(), name="items"),
    path("review/", views.ReviewView.as_view(), name="review"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
