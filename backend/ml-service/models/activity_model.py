# backend/ml-service/models/activity_model.py
import json
import random
from datetime import datetime
import logging

# Initialize logging
logger = logging.getLogger(__name__)

class ActivityModel:
    """Model for activity recommendations based on preferences."""
    
    def __init__(self):
        """Initialize activity model."""
        self.initialized_date = datetime.now()
        
        # Load activity data (would come from database in real system)
        self.activities = self._load_sample_activities()
        
        logger.info("Activity Model initialized")
    
    def _load_sample_activities(self):
        """
        Load sample activity data.
        
        Returns:
            Dictionary of activities by category
        """
        # In a real implementation, this would load from a database
        # This is a simplified version with sample data
        
        return {
            "sightseeing": [
                {"name": "City Walking Tour", "description": "Guided tour of city highlights", "duration": 3, "cost": 25},
                {"name": "Double Decker Bus Tour", "description": "Hop-on hop-off bus tour", "duration": 2, "cost": 35},
                {"name": "Historic District Exploration", "description": "Self-guided tour of historic areas", "duration": 4, "cost": 0}
            ],
            "food": [
                {"name": "Food Market Tour", "description": "Tour of local food markets with tastings", "duration": 3, "cost": 45},
                {"name": "Cooking Class", "description": "Learn to cook local cuisine", "duration": 4, "cost": 80},
                {"name": "Food Truck Crawl", "description": "Sample various street foods", "duration": 2, "cost": 30}
            ],
            "shopping": [
                {"name": "Local Crafts Market", "description": "Shopping for handmade items", "duration": 2, "cost": 0},
                {"name": "Boutique Shopping Tour", "description": "Visit to unique local shops", "duration": 3, "cost": 0},
                {"name": "Souvenir Hunt", "description": "Finding the perfect mementos", "duration": 2, "cost": 0}
            ],
            "entertainment": [
                {"name": "Live Music Show", "description": "Performance by local musicians", "duration": 3, "cost": 50},
                {"name": "Theater Performance", "description": "Local theater production", "duration": 2, "cost": 65},
                {"name": "Comedy Club", "description": "Evening of stand-up comedy", "duration": 2, "cost": 40}
            ],
            "nature": [
                {"name": "Park Picnic", "description": "Relaxing meal outdoors", "duration": 2, "cost": 15},
                {"name": "Botanical Garden Visit", "description": "Exploring local plant life", "duration": 3, "cost": 20},
                {"name": "Scenic Hike", "description": "Hiking with beautiful views", "duration": 4, "cost": 0}
            ],
            "culture": [
                {"name": "Museum Visit", "description": "Exploring local history and art", "duration": 3, "cost": 25},
                {"name": "Historical Site Tour", "description": "Guided tour of historic location", "duration": 2, "cost": 30},
                {"name": "Cultural Workshop", "description": "Learn a traditional craft or art", "duration": 4, "cost": 45}
            ],
            "relaxation": [
                {"name": "Spa Day", "description": "Massages and wellness treatments", "duration": 4, "cost": 120},
                {"name": "Beach Day", "description": "Relaxation by the water", "duration": 5, "cost": 0},
                {"name": "Meditation Session", "description": "Guided relaxation experience", "duration": 1, "cost": 25}
            ],
            "adventure": [
                {"name": "Zip Lining", "description": "Thrilling aerial experience", "duration": 3, "cost": 85},
                {"name": "Kayaking", "description": "Water adventure on local rivers or lakes", "duration": 4, "cost": 65},
                {"name": "Rock Climbing", "description": "Guided climbing experience", "duration": 4, "cost": 75}
            ]
        }
    
    def get_recommended_activities(self, preferences, limit=10):
        """
        Get activity recommendations based on preferences.
        
        Args:
            preferences: User preferences dict
            limit: Maximum number of recommendations to return
            
        Returns:
            List of recommended activities
        """
        recommendations = []
        
        # Check for interests in preferences
        interests = preferences.get('interests', [])
        budget_type = preferences.get('accommodationType', 'mid-range')
        
        # If no interests specified, use all categories
        if not interests:
            interests = list(self.activities.keys())
        
        # Filter interests to those we have data for
        valid_interests = [i for i in interests if i in self.activities]
        
        # If no valid interests, use all categories
        if not valid_interests:
            valid_interests = list(self.activities.keys())
        
        # Set budget limit based on accommodation type
        if budget_type == 'budget':
            budget_limit = 50
        elif budget_type == 'mid-range':
            budget_limit = 100
        else:  # luxury
            budget_limit = 200
        
        # Generate recommendations
        for interest in valid_interests:
            activities = self.activities.get(interest, [])
            # Filter by budget if needed
            if budget_type != 'luxury':
                activities = [a for a in activities if a.get('cost', 0) <= budget_limit]
            
            # Add random activities from this category
            if activities:
                # Determine how many to add from this category
                num_to_add = min(2, len(activities), limit - len(recommendations))
                
                # Add random samples
                category_recommendations = random.sample(activities, num_to_add)
                for activity in category_recommendations:
                    recommendations.append({
                        **activity,
                        "category": interest
                    })
            
            # Check if we've reached the limit
            if len(recommendations) >= limit:
                break
        
        return recommendations
    
    def get_status(self):
        """
        Get status information about the activity model.
        
        Returns:
            Status information
        """
        # Count total activities
        total_activities = sum(len(activities) for activities in self.activities.values())
        
        return {
            'initialized': self.initialized_date.isoformat(),
            'uptime_seconds': (datetime.now() - self.initialized_date).total_seconds(),
            'total_activities': total_activities,
            'activity_categories': list(self.activities.keys())
        }