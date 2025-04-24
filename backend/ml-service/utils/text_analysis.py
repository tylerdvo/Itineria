import re
import string
from datetime import datetime
import logging

# Initialize logging
logger = logging.getLogger(__name__)

def extract_entities(text):
    """
    Extract entities from text.
    
    Args:
        text: Text to analyze
        
    Returns:
        Dictionary of extracted entities
    """
    logger.info("Extracting entities from text")
    
    # This is a simple placeholder for more advanced NER
    # In a real implementation, use spaCy or another NER system
    
    entities = {
        'locations': [],
        'dates': [],
        'organizations': [],
        'people': []
    }
    
    # Simple patterns for demonstration
    # Extract locations (simple heuristic)
    location_pattern = r'in ([A-Z][a-z]+)'
    location_matches = re.findall(location_pattern, text)
    entities['locations'] = list(set(location_matches))
    
    # Extract dates (simple regex)
    date_pattern = r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b'
    date_matches = re.findall(date_pattern, text)
    entities['dates'] = date_matches
    
    return entities

def analyze_sentiment(text):
    """
    Analyze sentiment of text.
    
    Args:
        text: Text to analyze
        
    Returns:
        Sentiment analysis results
    """
    logger.info("Analyzing sentiment of text")
    
    # This is a simple placeholder for more advanced sentiment analysis
    # In a real implementation, use a trained model
    
    # List of positive and negative words
    positive_words = [
        'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
        'enjoy', 'like', 'love', 'happy', 'excited', 'beautiful', 'best'
    ]
    
    negative_words = [
        'bad', 'terrible', 'awful', 'horrible', 'poor', 'disappointing',
        'dislike', 'hate', 'unhappy', 'sad', 'worst', 'annoying'
    ]
    
    # Normalize text
    text = text.lower()
    words = re.findall(r'\b\w+\b', text)
    
    # Count positive and negative words
    positive_count = sum(1 for word in words if word in positive_words)
    negative_count = sum(1 for word in words if word in negative_words)
    
    # Calculate sentiment score (-1 to 1)
    total = positive_count + negative_count
    if total == 0:
        score = 0
    else:
        score = (positive_count - negative_count) / total
    
    # Determine sentiment label
    if score > 0.25:
        label = 'positive'
    elif score < -0.25:
        label = 'negative'
    else:
        label = 'neutral'
    
    return {
        'score': round(score, 2),
        'label': label,
        'positive_words': positive_count,
        'negative_words': negative_count
    }

def classify_text(text, categories):
    """
    Classify text into categories.
    
    Args:
        text: Text to classify
        categories: Dictionary mapping category names to keywords
        
    Returns:
        List of matching categories with scores
    """
    logger.info("Classifying text")
    
    # This is a simple placeholder for more advanced classification
    # In a real implementation, use a trained model
    
    # Normalize text
    text = text.lower()
    words = set(re.findall(r'\b\w+\b', text))
    
    # Calculate matches for each category
    matches = []
    for category, keywords in categories.items():
        matches_count = sum(1 for keyword in keywords if keyword in text)
        if matches_count > 0:
            score = min(1.0, matches_count / len(keywords))
            matches.append({
                'category': category,
                'score': round(score, 2)
            })
    
    # Sort by score
    matches.sort(key=lambda x: x['score'], reverse=True)
    
    return matches