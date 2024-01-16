from django.urls import path
from . import views


urlpatterns = [
    path(
        "cart_product/",
        views.CartProductListView.as_view(),
        name="cart_product",
    ),
    path(
        "cart_product/<id>/",
        views.CartProductDetailView.as_view(),
        name="cart_product",
    ),
]
