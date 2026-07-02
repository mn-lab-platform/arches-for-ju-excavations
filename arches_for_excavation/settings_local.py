from datetime import datetime, timedelta
import os
from django.core.exceptions import ImproperlyConfigured
import ast
from django.utils.safestring import mark_safe


def get_env_variable(var_name):
    msg = "Set the %s environment variable"
    try:
        return os.environ[var_name]
    except KeyError:
        error_msg = msg % var_name
        raise ImproperlyConfigured(error_msg)


def get_optional_env_variable(var_name):
    try:
        return os.environ[var_name]
    except KeyError:
        return None


# options are either "PROD" or "DEV"
# (installing with Dev mode set gets you extra dependencies)
MODE = get_env_variable("DJANGO_MODE")

DEBUG = ast.literal_eval(get_env_variable("DJANGO_DEBUG"))

DOMAIN_NAMES = get_env_variable("DOMAIN_NAMES").split()
is_localhost = any(host in ['localhost', '127.0.0.1', '0.0.0.0'] for host in DOMAIN_NAMES)

if not DEBUG:
    DEPLOY_HOST = get_env_variable("DEPLOY_HOST")
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    
    if not is_localhost:
        SESSION_COOKIE_SECURE = True
        CSRF_COOKIE_SECURE = True
    
    CSRF_TRUSTED_ORIGINS = [
        f"https://{DEPLOY_HOST}",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://localhost",
        "http://127.0.0.1",
    ]

# Set the APP_NAME here too, it may be useful for making the URLs
# work correctly when running gunicorn.
APP_NAME = get_env_variable("ARCHES_PROJECT")

DEFAULT_FROM_EMAIL = get_optional_env_variable("DEFAULT_FROM_EMAIL") or "xxxx@xxx.com"
EMAIL_USE_TLS = get_optional_env_variable("EMAIL_USE_TLS") or "false"
EMAIL_USE_TLS = EMAIL_USE_TLS.lower() in ['true', '1', 't']
EMAIL_USE_SSL = get_optional_env_variable("EMAIL_USE_SSL") or "false"
EMAIL_USE_SSL = EMAIL_USE_SSL.lower() in ['true', '1', 't']
EMAIL_HOST = get_optional_env_variable("EMAIL_HOST") or 'smtp.gmail.com'
EMAIL_HOST_USER = get_optional_env_variable("EMAIL_HOST_USER") or "xxxx@xxx.com"
EMAIL_HOST_PASSWORD = get_optional_env_variable("EMAIL_PASSWORD") or "xxxx"
EMAIL_PORT = int(get_optional_env_variable("EMAIL_PORT") or "587")

_DEPLOY_HOST = get_env_variable('DEPLOY_HOST')
_DOMAIN_URL = f"https://{_DEPLOY_HOST}"

APP_TITLE = get_optional_env_variable("APP_TITLE") or "Arches for Excavation"

IMAGE_SLIDES_CAPTIONS = [
    "To edit this caption, please check the manual.",
    "To edit this caption, please check the manual.",
    "To edit this caption, please check the manual."
]

EXTRA_EMAIL_CONTEXT = {
    "salutation": "Hi", 
    "expiration": '24 hours', 
    
    "arches_project_name": APP_TITLE,
    "greeting": mark_safe("""
        Thanks for signing up to the <strong><a href="https://www.archesproject.org/" style="color:#0070d2; text-decoration:underline;">Arches</a></strong> instance created as part of the 
        <strong><a href="https://mare.id.uj.edu.pl/pl" style="color:#0070d2; text-decoration:underline;">Mare Nostrum Lab</a></strong>, a project of the 
        <strong>Institute of Archaeology at Jagiellonian University</strong>. 
        All you need to do is confirm your email address by clicking the button below and we are good to go. 🏛️
    """),
    "button_text": "Confirm",
    "domain_url": _DOMAIN_URL,
    "footer_strong_text": mark_safe("Institute of Archaeology &bull; Jagiellonian University"),
    "footer_additional_text": mark_safe("Gołębia 11 &middot; 31-007 Kraków &middot; Poland")
}

DATABASES = {
    "default": {
        "ENGINE": "django.contrib.gis.db.backends.postgis",
        "NAME": get_env_variable("PGDBNAME"),
        "USER": get_env_variable("PGUSERNAME"),
        "PASSWORD": get_env_variable("PGPASSWORD"),
        "HOST": get_env_variable("PGHOST"),
        "PORT": get_env_variable("PGPORT"),
        "POSTGIS_TEMPLATE": "template_postgis",
    }
}

ARCHES_NAMESPACE_FOR_DATA_EXPORT = get_env_variable("ARCHES_NAMESPACE")

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.redis.RedisCache",
        "LOCATION": "redis://arches_redis:6379/1",
    },
    "user_permission": {
        "BACKEND": "django.core.cache.backends.db.DatabaseCache",
        "LOCATION": "user_permission_cache",
    },
}
SECURE_SSL_REDIRECT = False 


"""
Since we're using Docker, we can use Redis (even on a Windows OS). So, we
will comment out the RabbitMQ connection in favor of a Redis connection.

CELERY_BROKER_URL = "amqp://{}:{}@arches_rabbitmq:5672".format(
    get_env_variable("RABBITMQ_USER"), get_env_variable("RABBITMQ_PASS")
)
"""

CELERY_BROKER_URL = "redis://@arches_redis:6379/0"

# NOTE: If you want to disable celery and workers, leave a blank string fo
# the CELERY_BROKER_URL as follows:
#
# CELERY_BROKER_URL = ""

ELASTICSEARCH_HTTP_PORT = get_env_variable("ESPORT")
ELASTICSEARCH_HOSTS = [
    {
        "scheme": "http", 
        "host": get_env_variable("ESHOST"), 
        "port": int(ELASTICSEARCH_HTTP_PORT),
    }
]

USER_ELASTICSEARCH_PREFIX = get_optional_env_variable("ELASTICSEARCH_PREFIX")
if USER_ELASTICSEARCH_PREFIX:
    ELASTICSEARCH_PREFIX = USER_ELASTICSEARCH_PREFIX

ALLOWED_HOSTS = get_env_variable("DOMAIN_NAMES").split()

USER_SECRET_KEY = get_optional_env_variable("DJANGO_SECRET_KEY")
if USER_SECRET_KEY:
    # Make this unique, and don't share it with anybody.
    SECRET_KEY = USER_SECRET_KEY

STATIC_ROOT = "/static_root"

LANGUAGE_CODE = 'en'
# Added for v7 internationalization demo
# Change these to match the languages you want to support
LANGUAGES = [
    ('en', ('English')),
    ('ar', ('Arabic')),
    ('he', ('Hebrew')),
]
# This does not work when using gunicorn
# SHOW_LANGUAGE_SWITCH = len(LANGUAGES) > 1
SHOW_LANGUAGE_SWITCH = False
X_FRAME_OPTIONS = 'SAMEORIGIN'
SAVED_SEARCHES = []
