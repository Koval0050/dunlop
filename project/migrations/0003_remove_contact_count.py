# Generated by Django 4.1.4 on 2023-02-26 12:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("project", "0002_rename_item_contact_product"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="contact",
            name="count",
        ),
    ]
