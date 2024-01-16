from django.core.management import BaseCommand
from project.models import ItemItemFeature

class Command(BaseCommand):
    def handle(self, *args, **options):
        items = ItemItemFeature._meta.get_fields()
        print(items)
       