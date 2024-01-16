from django.db import models
from django.urls import reverse
from django.db.models import Avg

from ckeditor.fields import RichTextField
from colorfield.fields import ColorField

from s_utils.models import AbstractTitleSlug, AbstractCreatedUpdated, AbstractMetaTags
from s_utils.model_fields import (
    get_image_url,
)
from typing import Union


class Product(AbstractTitleSlug, AbstractMetaTags, AbstractCreatedUpdated):
    title = models.CharField(verbose_name="Загловок", max_length=128, blank=False)
    image = models.ImageField(
        verbose_name="Зображення", blank=True, upload_to="item", max_length=512
    )
    article = models.SlugField(
        verbose_name="Артикль", max_length=512, blank=True, null=True
    )
    logo = models.ImageField(
        verbose_name="Лого", blank=True, upload_to="item", max_length=512
    )
    categories = models.ManyToManyField(
        verbose_name="Категорія",
        blank=True,
        to="catalog.ProductCategory",
        related_name='products'
    )
    advantages = models.ManyToManyField(
        verbose_name="Властивості",
        blank=True,
        to="catalog.ProductAdvantage",
        related_name="products",
    )
    colors = models.ManyToManyField(
        verbose_name="Кольори", to="catalog.ProductColor", blank=True
    )
    sizes = models.ManyToManyField(
        verbose_name="Розміри", to="catalog.ProductSize", blank=True
    )
    sizes_image = models.ImageField(
        verbose_name="Зображення сітки розмірів",
        blank=True,
        upload_to="item",
        max_length=512,
    )
    short_description = models.TextField(
        verbose_name="Короткий опис", blank=True, null=True
    )
    video_url = models.CharField(
        verbose_name="Посилання на відео", max_length=512, blank=True, null=True
    )
    price = models.IntegerField(verbose_name="Ціна", blank=True, null=True)
    is_active = models.BooleanField(verbose_name="Активність", default=True)
    ordering = models.PositiveSmallIntegerField(
        verbose_name="Сортування", default=0, blank=False, null=False
    )
    similars = models.ManyToManyField(verbose_name='Подібні', to="catalog.Product", blank=True)
    quantity = models.PositiveSmallIntegerField(verbose_name="Кількість")

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товари"
        ordering = ["ordering"]

    def __str__(self):
        return f"{self.title}"

    def get_absolute_url(self):
        return reverse("product", kwargs={"slug": self.slug})

    def image_url(self):
        return get_image_url(self, "image")

    def sizes_image_url(self):
        return get_image_url(self, "sizes_image")

    def logo_url(self):
        return get_image_url(self, "logo")

    def get_product_features_first_table(self):
        features = self.product_features.all()[:4]
        return features

    def get_product_features_second_table(self):
        features = self.product_features.all()[4:]
        return features

    def get_absolute_image_url(self):
        image_url = self.image_url()
        if image_url:
            url = "https://mydunlop.com.ua" + image_url
            return url
        return None

    def get_rating(self):
        rating = Review.objects.filter(product=self, is_active=True).aggregate(Avg("rating"))[
            "rating__avg"
        ]
        if not rating:
            return 0
        return int(rating)

    def get_embeded_link(self):
        return self.video_url.replace('https://youtu.be/', 'https://www.youtube.com/embed/')


class ProductCategory(AbstractTitleSlug):
    image = models.ImageField(
        verbose_name="Зображення", blank=False, upload_to="item", max_length=512
    )
    ordering = models.PositiveSmallIntegerField(
        verbose_name="Сортування", default=0, blank=False, null=False
    )
    is_active = models.BooleanField(verbose_name="Активність", default=True)

    class Meta:
        verbose_name = "Категорія"
        verbose_name_plural = "Категорії"
        ordering = ["ordering"]

    def __str__(self):
        return f"{self.title}"

    def get_first_word(self):
        splitted = self.title.strip().split(" ")
        return splitted.pop(0)

    def get_words(self):
        splitted = self.title.strip().split(" ")
        splitted.pop(0)
        return splitted

    def image_url(self):
        return get_image_url(self, "image")

    def get_active_products(self):
        return self.products.filter(is_active=True)


class ProductImage(models.Model):
    product = models.ForeignKey(
        verbose_name="Товар",
        blank=False,
        related_name="images",
        to="catalog.Product",
        on_delete=models.CASCADE,
    )
    image = models.ImageField(
        verbose_name="Зображення", blank=True, upload_to="product", max_length=512
    )
    image_alt = models.CharField(
        verbose_name="Альт картинки", blank=True, max_length=255
    )

    class Meta:
        verbose_name = "Зображення товару"
        verbose_name_plural = "Зображення товару"

    def __str__(self):
        return f"{self.product.title} {self.image_alt}"

    def image_url(self):
        return get_image_url(self, "image")

    def get_absolute_image_url(self) -> Union[str, None]:
        image_url = self.image_url()
        if image_url:
            url = "https://mydunlop.com.ua" + image_url
            return url
        return None

class Feature(models.Model):
    title = models.CharField(
        verbose_name="Найменування", max_length=512, blank=True, null=True
    )

    class Meta:
        verbose_name = "Найменування характеристики"
        verbose_name_plural = "Найменування характеристик"

    def __str__(self):
        return f"{self.title}"


class FeatureValue(models.Model):
    title = models.CharField(
        verbose_name="Значення", max_length=1024, blank=True, null=True
    )

    class Meta:
        verbose_name = "Значення характеристик"
        verbose_name_plural = "Значення характеристик"

    def __str__(self):
        return f"{self.title}"


class ProductFeature(models.Model):
    product = models.ForeignKey(
        verbose_name="Товар",
        to="catalog.Product",
        on_delete=models.CASCADE,
        related_name="product_features",
        blank=True,
        null=True,
    )
    feature = models.ForeignKey(
        verbose_name="Назва характеристики",
        to="catalog.Feature",
        on_delete=models.SET_NULL,
        related_name="product_features",
        blank=True,
        null=True,
    )
    feature_value = models.ForeignKey(
        verbose_name="Значення характеристики",
        to="catalog.FeatureValue",
        on_delete=models.SET_NULL,
        related_name="product_features",
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = "Характеристика товару"
        verbose_name_plural = "Характеристики товару"
        ordering = ('id',)

    def __str__(self):
        return f"{self.feature} {self.feature_value}"

    


class ProductAdvantage(models.Model):
    title = models.CharField(
        verbose_name="Найменування", max_length=512, blank=True, null=True
    )
    image = models.ImageField(
        verbose_name="Зображення", blank=True, upload_to="advantages/", max_length=512
    )

    class Meta:
        verbose_name = "Властивість товару"
        verbose_name_plural = "Властивості товару"

    def __str__(self):
        return f"{self.title}"

    def image_url(self):
        return get_image_url(self, "image")


class ProductColor(AbstractTitleSlug):
    color = ColorField(blank=False, unique=True)

    def __str__(self):
        return f"{self.title}"

    class Meta:
        verbose_name = "Колір продукту"
        verbose_name_plural = "Кольори продуктів"


class ProductSize(AbstractTitleSlug):
    def __str__(self):
        return f"{self.title}"

    class Meta:
        verbose_name = "Розмір продуктів"
        verbose_name_plural = "Розміри продуктів"
        ordering = ['title',]


class Review(AbstractCreatedUpdated):
    full_name = models.CharField(
        verbose_name="Ім'я", max_length=256, blank=False, null=False
    )
    email = models.CharField(
        verbose_name="Email", max_length=256, blank=True, null=True
    )
    phone = models.CharField(
        verbose_name="телефон", max_length=256, blank=True, null=True
    )
    text = models.CharField(
        verbose_name="Текст", max_length=1024, blank=False, null=False
    )
    product = models.ForeignKey(
        to="catalog.Product",
        verbose_name="Продукт",
        related_name="reviews",
        on_delete=models.CASCADE,
    )
    rating = models.PositiveSmallIntegerField(verbose_name="Оцінка")
    is_active = models.BooleanField(verbose_name="Активність", default=False)

    class Meta:
        verbose_name = "Відгук"
        verbose_name_plural = "Відгуки"

    def __str__(self):
        return f"{self.full_name, self.rating, self.product.title}"

    def image_url(self):
        return get_image_url(self, "image")
