# Generated by Django 3.2.13 on 2023-03-24 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('s_content', '0005_site_public_privacy'),
    ]

    operations = [
        migrations.AlterField(
            model_name='site',
            name='price',
            field=models.FileField(blank=True, max_length=512, null=True, upload_to='site/', verbose_name='Прайс'),
        ),
        migrations.AlterField(
            model_name='site',
            name='public_privacy',
            field=models.FileField(blank=True, max_length=512, null=True, upload_to='site/', verbose_name='Договір публічної оферти'),
        ),
    ]