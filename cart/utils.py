from django.shortcuts import get_object_or_404

from .models import Cart


def get_cart(request) -> Cart:
    try:
        cart_id = request.session.get("cart_id")
        cart = Cart.objects.get(id=cart_id, ordered=False)
    except:
        cart = Cart.objects.create()
        request.session["cart_id"] = cart.id
    return cart
