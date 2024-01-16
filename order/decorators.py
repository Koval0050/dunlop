from django.urls import reverse
from django.shortcuts import redirect
from functools import wraps

from cart.utils import get_cart


def order_has_products(function):
    @wraps(function)
    def wrap(request, *args, **kwargs):
        if not get_cart(request).cart_products.all().exists():
            return redirect(reverse("index"))
        return function(request, *args, **kwargs)

    return wrap
