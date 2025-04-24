import json
import re
from datetime import datetime
import logging

# Initialize logging
logger = logging.getLogger(__name__)

def preprocess_user_data(user_id, preferences=None):
    """
    Preprocess user data for recommendation.
    
    Args:
        user_id: User ID
        preferences: User preferences dict
        
    Returns:
        Preprocessed user data
    """
    logger.info(f"Preprocessing data for user {user_id}")
    
    # Create a base user data object
    user_data = {
        "userId": user_id,
        "timestamp": datetime.now().isoformat(),
        "preferences": preferences or {}
    }
    
    return user_data

def clean_text(text):
    """
    Clean and normalize text.
    
    Args:
        text: Text to clean
        
    Returns:
        Cleaned text
    """
    if not text:
        return ""
    
    # Convert to lowercase
    text = text.lower()
    
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    
    # Remove special characters
    text = re.sub(r'[^\w\s]', '', text)
    
    return text

def parse_date_range(start_date, end_date):
    """
    Parse and validate date range.
    
    Args:
        start_date: Start date string
        end_date: End date string
        
    Returns:
        Tuple of datetime objects (start_date, end_date)
    """
    try:
        # Parse dates
        if isinstance(start_date, str):
            start_dt = datetime.fromisoformat(start_date.replace('Z', '+00:00'))
        else:
            start_dt = start_date
            
        if isinstance(end_date, str):
            end_dt = datetime.fromisoformat(end_date.replace('Z', '+00:00'))
        else:
            end_dt = end_date
        
        # Validate date range
        if end_dt < start_dt:
            raise ValueError("End date must be after start date")
        
        return (start_dt, end_dt)
    except Exception as e:
        logger.error(f"Error parsing date range: {str(e)}")
        raise ValueError(f"Invalid date format: {str(e)}")

def format_duration(start_date, end_date):
    """
    Format a readable duration between dates.
    
    Args:
        start_date: Start date
        end_date: End date
        
    Returns:
        Formatted duration string
    """
    try:
        start_dt, end_dt = parse_date_range(start_date, end_date)
        
        # Calculate difference in days
        diff = (end_dt - start_dt).days
        
        if diff == 0:
            return "Same day"
        elif diff == 1:
            return "1 day"
        elif diff < 7:
            return f"{diff} days"
        elif diff < 14:
            return "1 week"
        elif diff < 30:
            return f"{diff // 7} weeks"
        elif diff < 60:
            return "1 month"
        else:
            return f"{diff // 30} months"
    except Exception as e:
        logger.error(f"Error formatting duration: {str(e)}")
        return "Unknown duration"

def category_to_emoji(category):
    """
    Convert activity category to emoji.
    
    Args:
        category: Activity category
        
    Returns:
        Emoji string
    """
    emoji_map = {
        "sightseeing": "🏛️",
        "food": "🍽️",
        "shopping": "🛍️",
        "entertainment": "🎭",
        "nature": "🌳",
        "culture": "🎨",
        "relaxation": "🧘",
        "adventure": "🧗",
        "transportation": "🚗"
    }
    
    return emoji_map.get(category.lower(), "📍")