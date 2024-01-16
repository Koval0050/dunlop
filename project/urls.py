from django.urls import path, include
from .views import *

urlpatterns = [
    path("", index, name="index"),
    path("delivery/", delivery, name="delivery"),
    path("robots.txt", robots, name="robots"),
    path('google_xml/', google_feed, name='google-feed'),
]
