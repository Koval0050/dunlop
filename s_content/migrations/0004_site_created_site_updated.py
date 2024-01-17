# Generated by Django 4.1.4 on 2023-03-23 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("s_content", "0003_page"),
    ]

    operations = [
        migrations.AddField(
            model_name="site",
            name="created",
            field=models.DateTimeField(
                auto_now_add=True, null=True, verbose_name="Created"
            ),
        ),
        migrations.AddField(
            model_name="site",
            name="updated",
            field=models.DateTimeField(
                auto_now=True, null=True, verbose_name="Updated"
            ),
        ),
    ]