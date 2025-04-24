import json
import random
from datetime import datetime
import logging
import numpy as np

# Initialize logging
logger = logging.getLogger(__name__)

class PreferenceModel:
    """Model for handling user preferences and generating embeddings."""
    
    def __init__(self):
        """Initialize preference model."""
        self.initialized_date = datetime.now()
        self.preferences_db = {}  # In-memory store for user preferences
        
        # Categories for preferences embedding
        self.interest_categories = [
            'sightseeing', 'food', 'shopping', 'entertainment', 
            'nature', 'culture', 'relaxation', 'adventure',
            'history', 'art', 'music', 'sports', 'nightlife',
            'family', 'romantic', 'solo', 'budget', 'luxury'
        ]
        
        # Accommodation types for embedding
        self.accommodation_types = ['budget', 'mid-range', 'luxury']
        
        # Transportation preferences for embedding
        self.transportation_preferences = ['public', 'rental', 'walking', 'tour']
        
        logger.info("Preference Model initialized")
    
    def update_preferences(self, user_id, preferences):
        """
        Update a user's preferences in the database.
        
        Args:
            user_id: User ID
            preferences: User preferences dict
            
        Returns:
            Updated preferences
        """
        # Store preferences
        self.preferences_db[user_id] = preferences
        
        return preferences
    
    def get_user_preferences(self, user_id):
        """
        Get a user's stored preferences.
        
        Args:
            user_id: User ID
            
        Returns:
            User preferences or None if not found
        """
        return self.preferences_db.get(user_id)
    
    def generate_embeddings(self, preferences):
        """
        Generate embeddings for user preferences.
        
        Args:
            preferences: User preferences dict
            
        Returns:
            Embedding vector for preferences
        """
        # This is a simplified embedding representation
        # In a real system, this would use proper embeddings from a model
        
        # Initialize embedding vector
        embedding = np.zeros(len(self.interest_categories) + 
                             len(self.accommodation_types) + 
                             len(self.transportation_preferences))
        
        # Set values for interests
        interests = preferences.get('interests', [])
        for interest in interests:
            if interest in self.interest_categories:
                idx = self.interest_categories.index(interest)
                embedding[idx] = 1.0
        
        # Set value for accommodation type
        accommodation = preferences.get('accommodationType', 'mid-range')
        if accommodation in self.accommodation_types:
            idx = len(self.interest_categories) + self.accommodation_types.index(accommodation)
            embedding[idx] = 1.0
        
        # Set value for transportation preference
        transportation = preferences.get('transportationPreference', 'public')
        if transportation in self.transportation_preferences:
            idx = (len(self.interest_categories) + 
                  len(self.accommodation_types) + 
                  self.transportation_preferences.index(transportation))
            embedding[idx] = 1.0
        
        return embedding.tolist()
    
    def find_similar_users(self, user_id, embedding, limit=5):
        """
        Find users with similar preferences.
        
        Args:
            user_id: User ID to exclude
            embedding: Embedding vector to compare
            limit: Maximum number of similar users to return
            
        Returns:
            List of similar user IDs
        """
        # Convert embedding to numpy array
        embedding = np.array(embedding)
        
        # Calculate similarity scores with all users
        similarities = []
        for uid, prefs in self.preferences_db.items():
            if uid != user_id:
                other_embedding = np.array(self.generate_embeddings(prefs))
                # Cosine similarity (simplified)
                similarity = np.dot(embedding, other_embedding) / (
                    np.linalg.norm(embedding) * np.linalg.norm(other_embedding)
                )
                similarities.append((uid, similarity))
        
        # Sort by similarity and return top matches
        similar_users = sorted(similarities, key=lambda x: x[1], reverse=True)[:limit]
        
        return [uid for uid, _ in similar_users]
    
    def get_status(self):
        """
        Get status information about the preference model.
        
        Returns:
            Status information
        """
        return {
            'initialized': self.initialized_date.isoformat(),
            'uptime_seconds': (datetime.now() - self.initialized_date).total_seconds(),
            'users_with_preferences': len(self.preferences_db),
            'interest_categories': self.interest_categories
        }