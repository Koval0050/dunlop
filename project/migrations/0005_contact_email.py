# Generated by Django 4.1.4 on 2023-03-20 19:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("project", "0004_contact_product_color_contact_product_size"),
    ]

    operations = [
        migrations.AddField(
            model_name="contact",
            name="email",
            field=models.CharField(
                blank=True, max_length=512, null=True, verbose_name="Email"
            ),
        ),
    ]
