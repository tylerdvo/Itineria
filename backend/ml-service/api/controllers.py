import json
from datetime import datetime, timedelta
import random
from core.nlp_processor import NLPProcessor
from core.recommendation_engine import RecommendationEngine
from models.preference_model import PreferenceModel
from models.activity_model import ActivityModel
from utils.data_processing import preprocess_user_data
from utils.text_analysis import extract_entities, analyze_sentiment
import logging

# Initialize logging
logger = logging.getLogger(__name__)

# Initialize core components
nlp_processor = NLPProcessor()
recommendation_engine = RecommendationEngine()
preference_model = PreferenceModel()
activity_model = ActivityModel()

def get_recommendation(user_id, destination, start_date, end_date, preferences=None):
    """
    Generate travel recommendations based on user preferences and destination.
    
    Args:
        user_id: User ID for personalization
        destination: Travel destination
        start_date: Trip start date
        end_date: Trip end date
        preferences: User preferences dict (optional)
        
    Returns:
        Dictionary with recommended itinerary
    """
    try:
        logger.info(f"Generating recommendations for user {user_id} to {destination}")
        
        # Convert string dates to datetime objects if needed
        if isinstance(start_date, str):
            start_date = datetime.fromisoformat(start_date.replace('Z', '+00:00'))
        if isinstance(end_date, str):
            end_date = datetime.fromisoformat(end_date.replace('Z', '+00:00'))
        
        # Calculate trip duration in days
        trip_duration = (end_date - start_date).days + 1
        
        # Preprocess user data
        user_data = preprocess_user_data(user_id, preferences)
        
        # Get user preferences from model if available
        user_preferences = preference_model.get_user_preferences(user_id)
        if user_preferences and not preferences:
            preferences = user_preferences
        
        # Get destination information and activities
        destination_info = recommendation_engine.get_destination_info(destination)
        
        # Generate personalized itinerary
        itinerary = recommendation_engine.generate_itinerary(
            user_id, 
            destination, 
            trip_duration, 
            preferences
        )
        
        # Add metadata
        result = {
            'destination': destination,
            'startDate': start_date.isoformat(),
            'endDate': end_date.isoformat(),
            'duration': trip_duration,
            'itinerary': itinerary,
            'destinationInfo': destination_info
        }
        
        return result
        
    except Exception as e:
        logger.error(f"Error generating recommendations: {str(e)}")
        raise

def analyze_text(text, analysis_type='all'):
    """
    Analyze text for sentiment, intent, and key entities.
    
    Args:
        text: Text to analyze
        analysis_type: Type of analysis (sentiment, entities, intent, or all)
        
    Returns:
        Analysis results
    """
    try:
        logger.info(f"Analyzing text with analysis type: {analysis_type}")
        
        result = {}
        
        if analysis_type in ['sentiment', 'all']:
            result['sentiment'] = analyze_sentiment(text)
            
        if analysis_type in ['entities', 'all']:
            result['entities'] = extract_entities(text)
            
        if analysis_type in ['intent', 'all']:
            result['intent'] = nlp_processor.extract_intent(text)
            
        return result
        
    except Exception as e:
        logger.error(f"Error analyzing text: {str(e)}")
        raise

def process_user_preferences(user_id, preferences):
    """
    Process and store user preferences for better recommendations.
    
    Args:
        user_id: User ID
        preferences: User preferences dict
        
    Returns:
        Processed preferences
    """
    try:
        logger.info(f"Processing preferences for user {user_id}")
        
        # Save preferences to model
        preference_model.update_preferences(user_id, preferences)
        
        # Generate preference embeddings
        embeddings = preference_model.generate_embeddings(preferences)
        
        # Get similar users based on preferences
        similar_users = preference_model.find_similar_users(user_id, embeddings)
        
        # Get recommended activities based on preferences
        recommended_activities = activity_model.get_recommended_activities(preferences)
        
        result = {
            'userId': user_id,
            'processedPreferences': preferences,
            'recommendedActivities': recommended_activities,
            'similarUserCount': len(similar_users)
        }
        
        return result
        
    except Exception as e:
        logger.error(f"Error processing preferences: {str(e)}")
        raise

def get_model_status():
    """
    Get status and information about the ML models.
    
    Returns:
        Model status information
    """
    try:
        logger.info("Getting model status")
        
        # Get model status
        nlp_status = nlp_processor.get_status()
        recommendation_status = recommendation_engine.get_status()
        preference_status = preference_model.get_status()
        activity_status = activity_model.get_status()
        
        result = {
            'nlpProcessor': nlp_status,
            'recommendationEngine': recommendation_status,
            'preferenceModel': preference_status,
            'activityModel': activity_status,
            'timestamp': datetime.now().isoformat()
        }
        
        return result
        
    except Exception as e:
        logger.error(f"Error getting model status: {str(e)}")
        raise