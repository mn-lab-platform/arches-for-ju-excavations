import os
from django.core.exceptions import ImproperlyConfigured
import ast


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

EMAIL_USE_TLS = False
EMAIL_USE_SSL = True
EMAIL_HOST = 'pw-mx1.cenagis.edu.pl'
EMAIL_HOST_USER = "archesnoreply@cenagis.edu.pl"
EMAIL_HOST_PASSWORD = get_env_variable("EMAIL_PASSWORD")
EMAIL_PORT = 465

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

# ✅ FIX: Use correct protocol based on deployment mode
CANTALOUPE_PROTOCOL = "https" if not is_localhost else "http"
CANTALOUPE_HTTP_ENDPOINT = "{}://{}:{}".format(
    CANTALOUPE_PROTOCOL,
    get_env_variable("CANTALOUPE_HOST"), 
    get_env_variable("CANTALOUPE_PORT")
)

# ✅ FIXED: Path from Arches container's perspective (not Cantaloupe's)
# This is the shared volume that both containers can access
CANTALOUPE_DIR = os.path.join(
    get_env_variable("APP_COMP_FOLDER"),  # /arches_app/arches_slocal/arches_slocal
    'uploadedfiles',
    'imageroot'
)

# ✅ Ensure the directory exists at startup
os.makedirs(CANTALOUPE_DIR, exist_ok=True)

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


CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True