from unidecode import unidecode

from pathlib import Path
from django.conf import settings
from django.template.defaultfilters import slugify
from django.db.models import Model


BLANK_IMAGE_PATH = "/static/source/img/common/download.png"


def hundred_symbols(string: str) -> str:
    return f"{string}"[:100]


def check_field_uniqueness(instance: Model, unique_field: str, value: str) -> bool:
    dictionary = {unique_field: value}
    instances = (
        instance._meta.model.objects.filter(**dictionary)
        .exclude(id=instance.id)
        .exists()
    )
    if instances:
        return False
    return True


def get_initial_unique_field_value(instance: Model, field: str, unique_field: str):
    field_value = getattr(instance, field)
    unique_field_value = getattr(instance, unique_field)
    if field_value and not unique_field_value:
        unique_field_value = unidecode(slugify(unidecode(field_value)))
    elif not field_value and not unique_field_value:
        unique_field_value = "-"
    return unique_field_value


def generate_unique_ascii(instance: Model, field: str, unique_field: str) -> str:
    origin_value = get_initial_unique_field_value(instance, field, unique_field)
    unique_field_value = getattr(instance, unique_field) or origin_value
    enum = 1
    while not check_field_uniqueness(instance, unique_field, unique_field_value):
        unique_field_value = f"{origin_value}-{enum}"
        enum += 1
    return unique_field_value


def get_image_url(instance: Model, field: str) -> str:
    image = getattr(instance, field)
    if image:
        if Path(image.path).is_file():
            return image.url
    return BLANK_IMAGE_PATH
