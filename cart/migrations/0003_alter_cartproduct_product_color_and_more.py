# Generated by Django 4.1.4 on 2023-03-23 16:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("catalog", "0017_alter_product_categories"),
        ("cart", "0002_alter_cartproduct_options_cartproduct_product_color_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="cartproduct",
            name="product_color",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="cart_products",
                to="catalog.productcolor",
                verbose_name="Колір",
            ),
        ),
        migrations.AlterField(
            model_name="cartproduct",
            name="product_size",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="cart_products",
                to="catalog.productsize",
                verbose_name="Розмір",
            ),
        ),
    ]