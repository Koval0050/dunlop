# Generated by Django 4.1.4 on 2023-03-20 17:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("catalog", "0011_product_similars"),
    ]

    operations = [
        migrations.AlterField(
            model_name="featurevalue",
            name="title",
            field=models.CharField(
                blank=True, max_length=1024, null=True, verbose_name="Значення"
            ),
        ),
    ]
