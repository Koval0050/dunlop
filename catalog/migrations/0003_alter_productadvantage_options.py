# Generated by Django 4.1.4 on 2023-02-26 12:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("catalog", "0002_product_logo_alter_product_image"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="productadvantage",
            options={
                "verbose_name": "Властивість товару",
                "verbose_name_plural": "Властивості товару",
            },
        ),
    ]