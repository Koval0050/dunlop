class CartProductPriceProcessor:
    def __init__(self, cart_product) -> None:
        self.cart_product = cart_product

    def get_total_price(self):
        return self.cart_product.product.price * self.cart_product.quantity


class CartPriceProcessor:
    def __init__(self, cart) -> None:
        self.cart = cart

    def get_total_price(self):
        total = sum([cp.get_total_price() for cp in self.cart.cart_products.all()])
        return total
