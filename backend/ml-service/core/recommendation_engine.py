import json
import random
from datetime import datetime, timedelta
import logging
import os

# Initialize logging
logger = logging.getLogger(__name__)

class RecommendationEngine:
    """Recommendation engine for generating personalized travel itineraries."""
    
    def __init__(self):
        """Initialize recommendation engine."""
        self.initialized_date = datetime.now()
        
        # Load destination data (in a real system, this would come from a database)
        self.destinations = self._load_sample_destinations()
        
        # Activity categories
        self.activity_categories = [
            'sightseeing', 'food', 'shopping', 'entertainment', 
            'nature', 'culture', 'relaxation', 'other'
        ]
        
        logger.info("Recommendation Engine initialized")
    
    def _load_sample_destinations(self):
        """
        Load sample destination data.
        
        Returns:
            Dictionary of destination data
        """
        # In a real implementation, this would load from a database
        # This is a simplified version with sample data
        
        return {
            "new york": {
                "name": "New York City",
                "country": "United States",
                "description": "The Big Apple, known for its iconic skyline, diverse culture, and vibrant arts scene.",
                "popular_activities": [
                    {"name": "Visit Times Square", "category": "sightseeing"},
                    {"name": "Explore Central Park", "category": "nature"},
                    {"name": "Visit the Metropolitan Museum of Art", "category": "culture"},
                    {"name": "Walk across Brooklyn Bridge", "category": "sightseeing"},
                    {"name": "See a Broadway show", "category": "entertainment"}
                ]
            },
            "paris": {
                "name": "Paris",
                "country": "France",
                "description": "The City of Light, famous for its art, fashion, gastronomy, and culture.",
                "popular_activities": [
                    {"name": "Visit the Eiffel Tower", "category": "sightseeing"},
                    {"name": "Explore the Louvre Museum", "category": "culture"},
                    {"name": "Walk along the Seine River", "category": "sightseeing"},
                    {"name": "Visit Notre-Dame Cathedral", "category": "culture"},
                    {"name": "Enjoy French cuisine", "category": "food"}
                ]
            },
            "tokyo": {
                "name": "Tokyo",
                "country": "Japan",
                "description": "A dynamic blend of traditional culture and cutting-edge technology.",
                "popular_activities": [
                    {"name": "Visit Senso-ji Temple", "category": "culture"},
                    {"name": "Explore Shibuya Crossing", "category": "sightseeing"},
                    {"name": "Shop in Ginza", "category": "shopping"},
                    {"name": "Visit Tokyo Skytree", "category": "sightseeing"},
                    {"name": "Try authentic Japanese cuisine", "category": "food"}
                ]
            },
            "rome": {
                "name": "Rome",
                "country": "Italy",
                "description": "The Eternal City with thousands of years of history and culture.",
                "popular_activities": [
                    {"name": "Visit the Colosseum", "category": "sightseeing"},
                    {"name": "Explore the Vatican Museums", "category": "culture"},
                    {"name": "Throw a coin in the Trevi Fountain", "category": "sightseeing"},
                    {"name": "Try authentic Italian pizza and pasta", "category": "food"},
                    {"name": "Visit the Roman Forum", "category": "culture"}
                ]
            },
            "london": {
                "name": "London",
                "country": "United Kingdom",
                "description": "A diverse and historic city with iconic landmarks and cultural attractions.",
                "popular_activities": [
                    {"name": "Visit the Tower of London", "category": "culture"},
                    {"name": "Explore the British Museum", "category": "culture"},
                    {"name": "Watch the Changing of the Guard at Buckingham Palace", "category": "sightseeing"},
                    {"name": "Shop at Camden Market", "category": "shopping"},
                    {"name": "Ride the London Eye", "category": "sightseeing"}
                ]
            }
        }
    
    def get_destination_info(self, destination):
        """
        Get information about a destination.
        
        Args:
            destination: Destination name
            
        Returns:
            Destination information or None if not found
        """
        destination_key = destination.lower()
        
        # Check if destination exists in our data
        if destination_key in self.destinations:
            return self.destinations[destination_key]
        
        # If not found, return a generic response
        return {
            "name": destination.title(),
            "country": "Unknown",
            "description": f"Information about {destination} is currently limited.",
            "popular_activities": []
        }
    
    def generate_itinerary(self, user_id, destination, duration, preferences=None):
        """
        Generate a personalized itinerary.
        
        Args:
            user_id: User ID for personalization
            destination: Travel destination
            duration: Trip duration in days
            preferences: User preferences dict
            
        Returns:
            Generated itinerary
        """
        logger.info(f"Generating itinerary for user {user_id} to {destination} for {duration} days")
        
        # Get destination information
        destination_info = self.get_destination_info(destination)
        
        # Initialize itinerary
        itinerary = []
        
        # Process preferences
        if preferences:
            preferred_categories = preferences.get('interests', [])
            accommodation_type = preferences.get('accommodationType', 'mid-range')
            transportation_preference = preferences.get('transportationPreference', 'public')
            pace_preference = preferences.get('pacePreference', 'moderate')
        else:
            preferred_categories = []
            accommodation_type = 'mid-range'
            transportation_preference = 'public'
            pace_preference = 'moderate'
        
        # Determine activities per day based on pace
        if pace_preference == 'relaxed':
            activities_per_day = 2
        elif pace_preference == 'moderate':
            activities_per_day = 3
        else:  # intense
            activities_per_day = 4
        
        # Generate daily activities
        for day in range(1, duration + 1):
            daily_activities = []
            
            # Morning activity
            daily_activities.append(self._generate_activity(
                destination_info, "morning", preferred_categories
            ))
            
            # Lunch
            daily_activities.append({
                "title": "Lunch",
                "description": f"Enjoy local cuisine at a {accommodation_type} restaurant",
                "startTime": "12:30",
                "endTime": "14:00",
                "category": "food",
                "cost": self._generate_cost(accommodation_type)
            })
            
            # Afternoon activities
            for _ in range(activities_per_day - 2):  # -2 for morning and evening
                daily_activities.append(self._generate_activity(
                    destination_info, "afternoon", preferred_categories
                ))
            
            # Dinner
            daily_activities.append({
                "title": "Dinner",
                "description": f"Experience local dining at a {accommodation_type} establishment",
                "startTime": "19:00",
                "endTime": "20:30",
                "category": "food",
                "cost": self._generate_cost(accommodation_type)
            })
            
            # Add transportation if necessary
            if transportation_preference != 'walking':
                daily_activities.insert(1, {
                    "title": f"{transportation_preference.title()} Transportation",
                    "description": f"Travel by {transportation_preference} transportation to next activity",
                    "startTime": "11:30",
                    "endTime": "12:30",
                    "category": "transportation",
                    "cost": self._generate_transportation_cost(transportation_preference)
                })
            
            # Create the day entry
            day_entry = {
                "day": day,
                "activities": daily_activities
            }
            
            itinerary.append(day_entry)
        
        return itinerary
    
    def _generate_activity(self, destination_info, time_of_day, preferred_categories):
        """
        Generate an activity for the itinerary.
        
        Args:
            destination_info: Destination information
            time_of_day: Time of day (morning, afternoon, evening)
            preferred_categories: List of preferred activity categories
            
        Returns:
            Activity dictionary
        """
        # Get popular activities from destination
        popular_activities = destination_info.get("popular_activities", [])
        
        # If we have popular activities, use them
        if popular_activities:
            # Filter by preferred categories if any
            filtered_activities = popular_activities
            if preferred_categories:
                filtered_activities = [
                    activity for activity in popular_activities 
                    if activity.get("category", "") in preferred_categories
                ]
                
                # If no activities match preferences, fall back to all activities
                if not filtered_activities:
                    filtered_activities = popular_activities
            
            # Select a random activity
            activity = random.choice(filtered_activities)
            
            # Set time based on time of day
            if time_of_day == "morning":
                start_time = f"{random.randint(8, 10)}:00"
                end_time = f"{random.randint(11, 12)}:00"
            elif time_of_day == "afternoon":
                start_time = f"{random.randint(14, 16)}:00"
                end_time = f"{random.randint(17, 18)}:00"
            else:  # evening
                start_time = f"{random.randint(20, 21)}:00"
                end_time = f"{random.randint(22, 23)}:00"
            
            return {
                "title": activity.get("name", "Explore the area"),
                "description": f"Experience {activity.get('name', 'local attractions')} in {destination_info.get('name', '')}",
                "location": destination_info.get("name", ""),
                "category": activity.get("category", "sightseeing"),
                "startTime": start_time,
                "endTime": end_time,
                "cost": self._generate_cost("mid-range")
            }
        
        # If no popular activities, generate generic ones
        categories = self.activity_categories
        if preferred_categories:
            categories = [cat for cat in preferred_categories if cat in self.activity_categories]
            if not categories:
                categories = self.activity_categories
        
        category = random.choice(categories)
        
        # Generate activity based on category
        if category == "sightseeing":
            title = f"Explore {destination_info.get('name', 'the city')}"
            description = f"Discover the sights and sounds of {destination_info.get('name', 'the area')}"
        elif category == "food":
            title = "Local Cuisine Experience"
            description = f"Sample the local flavors of {destination_info.get('name', 'the region')}"
        elif category == "shopping":
            title = "Shopping Experience"
            description = f"Shop for souvenirs and local crafts in {destination_info.get('name', 'the area')}"
        elif category == "entertainment":
            title = "Entertainment"
            description = f"Enjoy local entertainment options in {destination_info.get('name', 'the city')}"
        elif category == "nature":
            title = "Nature Exploration"
            description = f"Connect with the natural beauty around {destination_info.get('name', 'the area')}"
        elif category == "culture":
            title = "Cultural Experience"
            description = f"Immerse yourself in the culture of {destination_info.get('name', 'the region')}"
        elif category == "relaxation":
            title = "Relaxation Time"
            description = f"Unwind and recharge in {destination_info.get('name', 'this beautiful place')}"
        else:
            title = "Free Time"
            description = f"Spend some time exploring {destination_info.get('name', 'the area')} at your own pace"
        
        # Set time based on time of day
        if time_of_day == "morning":
            start_time = f"{random.randint(8, 10)}:00"
            end_time = f"{random.randint(11, 12)}:00"
        elif time_of_day == "afternoon":
            start_time = f"{random.randint(14, 16)}:00"
            end_time = f"{random.randint(17, 18)}:00"
        else:  # evening
            start_time = f"{random.randint(20, 21)}:00"
            end_time = f"{random.randint(22, 23)}:00"
        
        return {
            "title": title,
            "description": description,
            "location": destination_info.get("name", ""),
            "category": category,
            "startTime": start_time,
            "endTime": end_time,
            "cost": self._generate_cost("mid-range")
        }
    
    def _generate_cost(self, budget_level):
        """
        Generate a cost estimate based on budget level.
        
        Args:
            budget_level: Budget level (budget, mid-range, luxury)
            
        Returns:
            Cost estimate
        """
        if budget_level == "budget":
            return random.randint(5, 25)
        elif budget_level == "mid-range":
            return random.randint(25, 75)
        else:  # luxury
            return random.randint(75, 200)
    
    def _generate_transportation_cost(self, transportation_type):
        """
        Generate a transportation cost estimate.
        
        Args:
            transportation_type: Type of transportation
            
        Returns:
            Cost estimate
        """
        if transportation_type == "public":
            return random.randint(2, 10)
        elif transportation_type == "rental":
            return random.randint(20, 50)
        else:  # tour or other
            return random.randint(10, 30)
    
    def get_status(self):
        """
        Get status information about the recommendation engine.
        
        Returns:
            Status information
        """
        return {
            'initialized': self.initialized_date.isoformat(),
            'uptime_seconds': (datetime.now() - self.initialized_date).total_seconds(),
            'destinations_available': len(self.destinations),
            'activity_categories': self.activity_categories
        }