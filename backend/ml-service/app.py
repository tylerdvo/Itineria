from flask import Flask, jsonify
import logging
import os
from dotenv import load_dotenv
from config import get_config
from api import api_bp

# Load environment variables
load_dotenv()

def create_app(config_name=None):
    """
    Create Flask application.
    
    Args:
        config_name: Configuration environment name
        
    Returns:
        Configured Flask app
    """
    # Create and configure app
    app = Flask(__name__)
    
    # Load configuration
    config = get_config()
    app.config.from_object(config)
    
    # Configure logging
    logging.basicConfig(
        level=app.config['LOG_LEVEL'],
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # Register blueprints
    app.register_blueprint(api_bp, url_prefix=app.config['API_PREFIX'])
    
    # Add health check route
    @app.route('/health')
    def health():
        return jsonify({
            'status': 'success',
            'message': 'ML service is running',
            'timestamp': datetime.now().isoformat()
        })
    
    return app

if __name__ == '__main__':
    from datetime import datetime
    
    # Get port from environment or use default
    port = int(os.environ.get('PORT', 5001))
    
    # Create and run app
    app = create_app()
    app.run(host='0.0.0.0', port=port)