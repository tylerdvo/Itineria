import os
from datetime import timedelta
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    """Base config class."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev_key_for_development')
    MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/itinera')
    MODEL_PATH = os.environ.get('MODEL_PATH', 'models/trained_models')
    API_PREFIX = os.environ.get('API_PREFIX', '/api/v1')
    LOG_LEVEL = os.environ.get('LOG_LEVEL', 'INFO')


class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True
    TESTING = False


class TestingConfig(Config):
    """Testing configuration."""
    DEBUG = False
    TESTING = True
    MONGO_URI = os.environ.get('TEST_MONGO_URI', 'mongodb://localhost:27017/itinera_test')


class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False
    TESTING = False
    SECRET_KEY = os.environ.get('SECRET_KEY')  # This should be set in production


# Dictionary with different config environments
config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}

# Get config class based on environment
def get_config():
    env = os.environ.get('FLASK_ENV', 'default')
    return config.get(env)