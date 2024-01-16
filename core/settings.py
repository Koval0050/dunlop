from pathlib import Path
import os
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent


SECRET_KEY = "django-insecure--5)y)oa1i@74u39+lk7*otnp*+kbe^*$hqaozqsnt%w15%-j7f"

DEBUG = config("DEBUG", True, cast=bool)

ALLOWED_HOSTS = ["*"]


INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sitemaps",
    "project",
    "catalog",
    "cart",
    "order",
    "s_content",
    "payment",
    "nova_poshta",
    "s_utils",
    "nested_admin",
    "import_export",
    "colorfield",
    "rest_framework",
    "ckeditor",
    "adminsortable2",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    'django.middleware.csrf.CsrfViewMiddleware',
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "s_content.context_proccesors.context",
                "cart.context_proccesors.context",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"



DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
if config('DB', None) == 'pg':
    DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'dunlop',
        'USER': 'jurgeon',
        'PASSWORD': '69018',
        'HOST': '127.0.0.1',
        'PORT': 5432,
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


LANGUAGE_CODE = "uk-ua"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


STATIC_URL = "static/"
MEDIA_URL = "media/"
STATIC_ROOT = "static_root/"
MEDIA_ROOT = "media/"
STATICFILES_DIRS = (os.path.join(BASE_DIR, "static"),)

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
EMAIL_PORT = 587
EMAIL_HOST = "smtp.gmail.com"
SERVER_EMAIL = "starway.notifier@gmail.com"
EMAIL_HOST_USER = "starway.notifier@gmail.com"
EMAIL_HOST_PASSWORD = "ipbqvhxkublskmkp"
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
DEFAULT_RECIPIENT_LIST = [
    # 'progamerr99@gmail.com'
    "admin@expostar.com.ua",
    # "kleikoks.py@gmail.com"
]
# X_FRAME_OPTIONS = 'ALLOWALL'
XS_SHARING_ALLOWED_METHODS = ["POST", "GET", "OPTIONS", "PUT", "DELETE"]
X_FRAME_OPTIONS = "SAMEORIGIN"
CKEDITOR_UPLOAD_PATH = "uploads/"

CKEDITOR_CONFIGS = {
    "default": {
        "toolbar": "Custom",
        "toolbar_Custom": [
            ["Bold", "Italic", "Underline"],
            [
                "NumberedList",
                "BulletedList",
                "-",
                "Outdent",
                "Indent",
                "-",
                "JustifyLeft",
                "JustifyCenter",
                "JustifyRight",
                "JustifyBlock",
            ],
            ["Link", "Unlink"],
            ["RemoveFormat", "Source"],
        ],
    }
}


SESSION_COOKIE_AGE = 60 * 60 * 24 * 7 # a weak

LIQPAY_PUBLIC_KEY = "sandbox_i501929665"
LIQPAY_PRIVATE_KEY = "sandbox_wetwRfwhIHMC8tGBoSVPlYDY70ycpk7zu3CwnuF8"
