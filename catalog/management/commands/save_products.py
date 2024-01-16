from django.core.management.base import BaseCommand
from os import path

from ...models import Product


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        [p.save() for p in Product.objects.all()]
