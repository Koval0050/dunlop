from django.db import models
from .model_fields import generate_unique_ascii
# Create your models here.

class AbstractMetaTags(models.Model):
    meta_title = models.TextField(
        verbose_name="Мета-загловок", blank=True, null=True
        )
    meta_description = models.TextField(
        verbose_name="Мета-опис", blank=True, null=True
        )
    meta_keys = models.TextField(
        verbose_name="Мета-ключі", blank=True, null=True
        )
    
    class Meta:
        abstract = True


class AbstractCreatedUpdated(models.Model):
    created = models.DateTimeField(
        verbose_name="Створено", auto_now_add=True, blank=True, null=True
        )
    updated = models.DateTimeField(
        verbose_name="Оновлено", auto_now=True, blank=True, null=True
        )
    
    class Meta:
        abstract = True


class AbstractTitleSlug(models.Model):
    title = models.CharField(
        verbose_name="Найменування", max_length=512, blank=True, null=True
    )
    slug = models.SlugField(
        verbose_name="Унікальний запис", max_length=512, blank=True, null=True
    )
    
    class Meta:
        abstract = True
    
    def save(self, *args, **kwargs):
        self.slug = generate_unique_ascii(self, 'title', 'slug')
        return super().save()

