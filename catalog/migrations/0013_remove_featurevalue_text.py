# Generated by Django 4.1.4 on 2023-03-20 17:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("catalog", "0012_alter_featurevalue_title"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="featurevalue",
            name="text",
        ),
    ]