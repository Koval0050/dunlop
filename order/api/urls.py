from django.urls import path
from . import views


urlpatterns = [
    path(
        "make_order/",
        views.OrderCreateView.as_view(),
        name="make_order",
    )
]
