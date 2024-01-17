# Generated by Django 4.1.4 on 2023-02-26 11:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("catalog", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Contact",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=128, verbose_name="Ім'я")),
                ("phone", models.CharField(max_length=128, verbose_name="Телефон")),
                (
                    "comment",
                    models.TextField(blank=True, null=True, verbose_name="Коментар"),
                ),
                (
                    "count",
                    models.CharField(
                        blank=True, max_length=100, null=True, verbose_name="Кількість"
                    ),
                ),
                (
                    "item",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="catalog.product",
                        verbose_name="Товар",
                    ),
                ),
            ],
            options={
                "verbose_name": "Контакт",
                "verbose_name_plural": "Контакти",
            },
        ),
    ]