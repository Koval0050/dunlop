from .models import CartProduct
from .utils import get_cart


def context(request):
    cart = get_cart(request)
    cart_products = CartProduct.objects.filter(cart=cart)
    cart_total_count = len(cart_products)
    context = {
        "cart": cart,
        "cart_products": cart_products,
        "cart_total_count": cart_total_count,
    }
    return context
