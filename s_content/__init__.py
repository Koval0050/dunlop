from django.apps import AppConfig

default_app_config = 's_content.ContentSlimConfig'

class ContentSlimConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 's_content'
    verbose_name = 'Контент'
