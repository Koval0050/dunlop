from django.db import models
from s_content.models import AbstractCreatedUpdated


class Contact(AbstractCreatedUpdated):
    name = models.CharField(verbose_name="Ім'я", max_length=128, blank=False)
    phone = models.CharField(verbose_name="Телефон", max_length=128, blank=False)
    email = models.CharField(verbose_name="Email", max_length=512, blank=True, null=True)
    comment = models.TextField(verbose_name="Коментар", blank=True, null=True)
    product = models.ForeignKey(
        verbose_name="Товар",
        blank=True,
        null=True,
        to="catalog.Product",
        on_delete=models.CASCADE,
    )
    product_color = models.ForeignKey(
        verbose_name="Колір",
        to="catalog.ProductColor",
        on_delete=models.SET_NULL,
        related_name="contacts",
        blank=True,
        null=True
    )
    product_size = models.ForeignKey(
        verbose_name="Розмір",
        to="catalog.ProductSize",
        on_delete=models.SET_NULL,
        related_name="contacts",
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = "Контакт"
        verbose_name_plural = "Контакти"

    def __str__(self):
        return f"{self.name} {self.phone}"
