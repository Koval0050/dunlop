from django.apps import AppConfig

default_app_config = 'project.ProjectConfig'

class ProjectConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'project'
    verbose_name = 'Проєкт'
