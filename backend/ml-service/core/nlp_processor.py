import re
import string
from datetime import datetime
import logging
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('corpora/stopwords')
    nltk.data.find('corpora/wordnet')
except LookupError:
    nltk.download('punkt')
    nltk.download('stopwords')
    nltk.download('wordnet')

# Initialize logging
logger = logging.getLogger(__name__)

class NLPProcessor:
    """Natural Language Processing for text analysis and understanding."""
    
    def __init__(self):
        """Initialize NLP processor."""
        self.stop_words = set(stopwords.words('english'))
        self.lemmatizer = WordNetLemmatizer()
        self.initialized_date = datetime.now()
        
        # Travel-related intents
        self.travel_intents = {
            'find_places': ['find', 'discover', 'recommend', 'suggestion', 'places', 'attractions'],
            'plan_itinerary': ['plan', 'itinerary', 'schedule', 'agenda', 'trip'],
            'food_dining': ['food', 'restaurant', 'eat', 'dining', 'cuisine', 'meal'],
            'accommodation': ['hotel', 'stay', 'accommodation', 'lodge', 'sleep', 'room'],
            'transportation': ['transport', 'travel', 'bus', 'train', 'taxi', 'car', 'flight'],
            'activity': ['activity', 'tour', 'sightseeing', 'adventure', 'experience'],
            'budget': ['cost', 'price', 'expense', 'budget', 'cheap', 'expensive'],
            'weather': ['weather', 'climate', 'temperature', 'rain', 'sunny']
        }
        
        logger.info("NLP Processor initialized")
    
    def preprocess_text(self, text):
        """
        Preprocess text for analysis.
        
        Args:
            text: Text to preprocess
            
        Returns:
            Preprocessed tokens
        """
        # Convert to lowercase
        text = text.lower()
        
        # Remove punctuation
        text = re.sub(f'[{string.punctuation}]', ' ', text)
        
        # Tokenize
        tokens = word_tokenize(text)
        
        # Remove stopwords and lemmatize
        tokens = [self.lemmatizer.lemmatize(token) for token in tokens if token not in self.stop_words]
        
        return tokens
    
    def extract_intent(self, text):
        """
        Extract user intent from text.
        
        Args:
            text: User text
            
        Returns:
            Dictionary with detected intents and confidence scores
        """
        tokens = self.preprocess_text(text)
        
        # Calculate intent scores
        intent_scores = {}
        for intent, keywords in self.travel_intents.items():
            matches = sum(1 for token in tokens if token in keywords)
            if matches > 0:
                intent_scores[intent] = min(1.0, matches / len(keywords))
        
        # Sort by confidence score
        sorted_intents = sorted(intent_scores.items(), key=lambda x: x[1], reverse=True)
        
        # Format results
        result = {
            'primary': sorted_intents[0][0] if sorted_intents else 'unknown',
            'confidence': sorted_intents[0][1] if sorted_intents else 0.0,
            'all_intents': dict(sorted_intents)
        }
        
        return result
    
    def extract_locations(self, text):
        """
        Extract location mentions from text.
        
        Args:
            text: Text to analyze
            
        Returns:
            List of detected locations
        """
        # This is a placeholder for more advanced NER
        # In a real implementation, use spaCy or another NER system
        
        tokens = self.preprocess_text(text)
        
        # Simple pattern matching for demonstration
        locations = []
        location_indicators = ['in', 'to', 'from', 'at', 'visit']
        
        for i, token in enumerate(tokens):
            if token in location_indicators and i < len(tokens) - 1:
                locations.append(tokens[i + 1])
        
        return locations
    
    def extract_dates(self, text):
        """
        Extract date mentions from text.
        
        Args:
            text: Text to analyze
            
        Returns:
            Dictionary with start and end dates if found
        """
        # This is a placeholder for more advanced date extraction
        # In a real implementation, use libraries like dateparser
        
        # Simple regex pattern for dates (MM/DD/YYYY or similar)
        date_pattern = r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b'
        dates = re.findall(date_pattern, text)
        
        result = {}
        if len(dates) >= 1:
            result['start_date'] = dates[0]
        if len(dates) >= 2:
            result['end_date'] = dates[1]
            
        return result
    
    def get_status(self):
        """
        Get status information about the NLP processor.
        
        Returns:
            Status information
        """
        return {
            'initialized': self.initialized_date.isoformat(),
            'uptime_seconds': (datetime.now() - self.initialized_date).total_seconds(),
            'models_loaded': ['basic_nltk'],
            'intents_available': list(self.travel_intents.keys())
        }