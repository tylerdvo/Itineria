from flask import request, jsonify
from api import api_bp
from api.controllers import (
    get_recommendation,
    analyze_text,
    process_user_preferences,
    get_model_status
)

@api_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint for the API."""
    return jsonify({
        'status': 'success',
        'message': 'ML service is running'
    }), 200

@api_bp.route('/recommendations', methods=['POST'])
def recommendations():
    """Generate travel recommendations based on user preferences and destination."""
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['userId', 'destination', 'startDate', 'endDate']
    if not all(field in data for field in required_fields):
        return jsonify({
            'status': 'error',
            'message': f'Missing required fields: {", ".join(set(required_fields) - set(data.keys()))}'
        }), 400
    
    # Get recommendations
    result = get_recommendation(
        user_id=data.get('userId'),
        destination=data.get('destination'),
        start_date=data.get('startDate'),
        end_date=data.get('endDate'),
        preferences=data.get('preferences', {})
    )
    
    return jsonify({
        'status': 'success',
        'data': result
    }), 200

@api_bp.route('/analyze', methods=['POST'])
def analyze():
    """Analyze text for sentiment, intent, and key entities."""
    data = request.get_json()
    
    # Validate required fields
    if 'text' not in data:
        return jsonify({
            'status': 'error',
            'message': 'Text field is required'
        }), 400
    
    # Analyze text
    result = analyze_text(
        text=data.get('text'),
        analysis_type=data.get('analysisType', 'all')
    )
    
    return jsonify({
        'status': 'success',
        'data': result
    }), 200

@api_bp.route('/preferences', methods=['POST'])
def preferences():
    """Process user preferences for better recommendations."""
    data = request.get_json()
    
    # Validate required fields
    if 'userId' not in data:
        return jsonify({
            'status': 'error',
            'message': 'User ID is required'
        }), 400
    
    # Process preferences
    result = process_user_preferences(
        user_id=data.get('userId'),
        preferences=data.get('preferences', {})
    )
    
    return jsonify({
        'status': 'success',
        'data': result
    }), 200

@api_bp.route('/models/status', methods=['GET'])
def model_status():
    """Get status and information about the ML models."""
    result = get_model_status()
    
    return jsonify({
        'status': 'success',
        'data': result
    }), 200