# Generated by Django 4.1.4 on 2023-02-26 11:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("catalog", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="logo",
            field=models.ImageField(
                blank=True, max_length=512, upload_to="item", verbose_name="Лого"
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="image",
            field=models.ImageField(
                blank=True, max_length=512, upload_to="item", verbose_name="Зображення"
            ),
        ),
    ]