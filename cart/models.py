from __future__ import annotations

from django.db import models
from django.db.models import Sum

from s_content.models import AbstractCreatedUpdated
from .price import CartPriceProcessor, CartProductPriceProcessor


class Cart(AbstractCreatedUpdated):
    ordered = models.BooleanField(verbose_name="Ordered", default=False)
    order = models.OneToOneField(
        verbose_name="Order",
        to="order.Order",
        on_delete=models.SET_NULL,
        related_name="cart",
        blank=False,
        null=True,
    )

    class Meta:
        verbose_name = "Cart"
        verbose_name_plural = "Cart"

    def get_total_price(self):
        return CartPriceProcessor(self).get_total_price()

    def get_cart_product_total_quantity(self):
        return self.cart_products.all().aggregate(q=models.Sum("quantity"))["q"] or 0


class CartProduct(AbstractCreatedUpdated):
    cart = models.ForeignKey(
        verbose_name="Кошик",
        to="cart.Cart",
        on_delete=models.CASCADE,
        related_name="cart_products",
    )
    product = models.ForeignKey(
        verbose_name="Продукт",
        to="catalog.Product",
        on_delete=models.CASCADE,
        related_name="cart_products",
    )
    product_color = models.ForeignKey(
        verbose_name="Колір",
        to="catalog.ProductColor",
        null=True,
        on_delete=models.SET_NULL,
        related_name="cart_products",
    )
    product_size = models.ForeignKey(
        verbose_name="Розмір",
        to="catalog.ProductSize",
        null=True,
        on_delete=models.SET_NULL,
        related_name="cart_products",
    )
    quantity = models.PositiveSmallIntegerField(verbose_name="Кількість")

    class Meta:
        verbose_name = "Товар у кошику"
        verbose_name_plural = "Товари в кошиках"

    def get_price(self):
        return self.product.price

    def get_total_price(self):
        return CartProductPriceProcessor(self).get_total_price()

    def able_add_to_cart(self, quantity: int) -> bool:
        return quantity <= self.product.quantity
