from django.db import models

from s_content.models import AbstractCreatedUpdated

class Order(AbstractCreatedUpdated):
    name = models.CharField(
        verbose_name="Ім'я",
        max_length=512,
        blank=False,
        null=False,
    )
    surname = models.CharField(
        verbose_name="Прізвище",
        max_length=512,
        blank=False,
        null=False,
    )
    email = models.CharField(
        verbose_name="Email",
        max_length=512,
        blank=False,
        null=False,
    )
    phone = models.CharField(
        verbose_name="Телефон",
        max_length=512,
        blank=True,
        null=True,
    )
    address = models.CharField(
        verbose_name="Адреса",
        max_length=512,
        blank=True,
        null=True,
    )
    settlement = models.ForeignKey(
        to="nova_poshta.Settlement",
        verbose_name="Місто",
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name="orders",
    )
    warehouse = models.ForeignKey(
        to="nova_poshta.Warehouse",
        verbose_name="Відділення",
        max_length=512,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name="orders",
    )
    message = models.CharField(
        verbose_name="Повідомлення",
        max_length=1024,
        blank=True,
        null=True,
    )
    total_price = models.FloatField(verbose_name="Total price", blank=True, null=True)
    payment_type = models.CharField(
        verbose_name="Спосіб оплати",
        max_length=128,
        blank=False,
        null=False,
    )

    class Meta:
        verbose_name = "Замовлення"
        verbose_name_plural = "Замовлення"


    def can_order(self) -> bool:
        for cart_product in self.cart.cart_products.all():
            if cart_product.product.quantity < cart_product.quantity:
                return False
        return True
