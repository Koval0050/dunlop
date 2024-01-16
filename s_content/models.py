from django.db import models
from s_utils.model_fields import get_image_url, generate_unique_ascii


class AbstractCreatedUpdated(models.Model):
    created = models.DateTimeField(
        verbose_name="Created", auto_now_add=True, blank=True, null=True
    )
    updated = models.DateTimeField(
        verbose_name="Updated", auto_now=True, blank=True, null=True
    )

    class Meta:
        abstract = True


class AbstractMetaTags(models.Model):
    meta_title = models.TextField(verbose_name="Meta-title", blank=True, null=True)
    meta_description = models.TextField(
        verbose_name="Meta-description", blank=True, null=True
    )
    meta_keys = models.TextField(verbose_name="Meta-keys", blank=True, null=True)

    class Meta:
        abstract = True


class AbstractTitleSlug(models.Model):
    title = models.CharField(
        verbose_name="Title", max_length=512, blank=True, null=True
    )
    slug = models.SlugField(
        verbose_name="Unique label",
        max_length=512,
        blank=True,
        null=True,
        help_text="Creating automatically",
    )

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.slug = generate_unique_ascii(self, "title", "slug")
        return super().save()


class Site(AbstractMetaTags, AbstractCreatedUpdated):
    favico = models.ImageField(
        verbose_name="Favico", max_length=512, blank=True, null=True, upload_to="site/"
    )
    facebook = models.CharField(
        verbose_name="Facebook", blank=True, null=True, max_length=512
    )
    instagram = models.CharField(
        verbose_name="Instagram", blank=True, null=True, max_length=512
    )
    mail = models.CharField(verbose_name="Mail", blank=True, null=True, max_length=512)
    youtube = models.CharField(
        verbose_name="Youtube", blank=True, null=True, max_length=512
    )
    youtube_video = models.CharField(
        verbose_name="Youtube Video", blank=True, null=True, max_length=512
    )
    phone = models.CharField(
        verbose_name="Phone", blank=True, null=True, max_length=512
    )
    price = models.FileField(
        verbose_name="Прайс",
        blank=True,
        null=True,
        max_length=512,
        upload_to="site/",
    )
    public_privacy = models.FileField(
        verbose_name="Договір публічної оферти",
        blank=True,
        null=True,
        max_length=512,
        upload_to="site/",
    )

    def __str__(self):
        return f"{self.meta_title}"

    class Meta:
        verbose_name = "Site configuration"
        verbose_name_plural = "Site configuration"

    def image_url(self):
        return get_image_url(self, "favico")

    def file(self):
        return get_image_url(self, "price")

    def public_privacy_url(self):
        return get_image_url(self, "public_privacy")


class SitePhone(models.Model):
    site = models.ForeignKey(
        "s_content.Site",
        default=1,
        related_name="phones",
        verbose_name="Телефон",
        on_delete=models.CASCADE,
    )
    phone = models.CharField(
        verbose_name="Phone", blank=True, null=True, max_length=512
    )

    def __str__(self):
        return f"{self.phone}"

    class Meta:
        verbose_name = "Телефони"
        verbose_name_plural = "Телефони"


class Page(AbstractMetaTags):
    slug = models.SlugField(
        verbose_name="Унікальний запис",
        max_length=512,
        blank=True,
        null=True,
        help_text="Добавляється автоматично після створення об'єкту",
    )

    def __str__(self):
        return f"{{self.meta_title}}"

    class Meta:
        verbose_name = "Мета дані"
        verbose_name_plural = "Мета дані"

    def save(self, *args, **kwargs):
        self.slug = generate_unique_ascii(self, "meta_title", "slug")
        return super().save()
