from django.urls import path
from . import views

urlpatterns = [
    path("product/<slug>/", views.product, name="product"),
]
