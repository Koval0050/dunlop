from collections import deque
from django.core.management.base import BaseCommand
from sqlalchemy import create_engine
from sqlalchemy import text
from django.apps import apps

from django.contrib.sessions.models import Session
from django.contrib.auth.models import Permission, Group
from django.contrib.contenttypes.models import ContentType
from django.contrib.admin.models import LogEntry


class Command(BaseCommand):
    help = "python manage.py imp -path export -format csv"

    def handle(self, *args, **kwargs):
        exclude_models = [
            Session,
            Permission,
            Group,
            ContentType,
            LogEntry,
        ]
        engine = create_engine('postgresql://jurgeon:69018@localhost:5432/dunlop', echo=True)
        models = [m for m in apps.get_models() if m not in exclude_models]
        for model in models:
            name = model._meta.db_table
            with engine.connect() as conn:
                stmt = f"SELECT setval((SELECT pg_get_serial_sequence('{name}', 'id')), (SELECT MAX(id)+1 FROM {name}));"
                conn.execute(text(stmt))
                conn.commit()