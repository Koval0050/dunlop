from django.urls import path
from .views import payment_view
from payment.api.views import pay_callback


urlpatterns = [
    path('payment/', payment_view, name="payment"),
]
