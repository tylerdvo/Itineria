from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import os

app = Flask(__name__)
CORS(app)

# Sample activities for different categories
activities = {
    "sightseeing": [
        "Visit the main square", "Tour the local cathedral", "Explore the historic district",
        "Check out the famous monument", "Visit the observation deck", "Tour the palace"
    ],
    "museums": [
        "Visit the art museum", "Explore the history museum", "Tour the science center",
        "Check out the local gallery", "Visit the cultural center"
    ],
    "food": [
        "Dinner at a local restaurant", "Food tour", "Visit the famous market",
        "Try street food vendors", "Cooking class with local chef"
    ],
    "nature": [
        "Hike in the nearby park", "Visit the botanical gardens", "Explore the nature reserve",
        "Day trip to the national park", "Bird watching tour", "Beach day"
    ],
    "culture": [
        "Attend a local festival", "Watch traditional dance", "Visit historical sites",
        "Guided cultural tour", "Traditional craft workshop"
    ],
    "entertainment": [
        "Concert at local venue", "Theater performance", "Comedy show",
        "Night tour of the city", "Local sports game"
    ]
}

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "message": "ML service is running"})

@app.route('/api/analyze-text', methods=['POST'])
def analyze_text():
    data = request.json
    text = data.get('text', '')
    
    # Simple keyword analysis
    preferences = []
    keywords = {
        "beaches": ["beach", "ocean", "sea", "sand", "swim"],
        "museums": ["museum", "art", "exhibit", "gallery", "history"],
        "food": ["food", "restaurant", "cuisine", "eat", "dining", "culinary"],
        "hiking": ["hike", "trail", "mountain", "outdoors", "trek"],
        "culture": ["culture", "local", "traditional", "heritage"],
        "shopping": ["shop", "mall", "market", "store", "boutique"],
        "sightseeing": ["sight", "monument", "landmark", "tour"],
        "nature": ["nature", "park", "garden", "wildlife", "landscape"],
    }
    
    for pref, words in keywords.items():
        for word in words:
            if word.lower() in text.lower():
                if pref not in preferences:
                    preferences.append(pref)
    
    return jsonify({
        "success": True,
        "data": {
            "analyzed_text": text,
            "detected_preferences": preferences
        }
    })

@app.route('/api/generate-itinerary', methods=['POST'])
def generate_itinerary():
    data = request.json
    destination = data.get('destination', 'Unknown')
    duration = int(data.get('duration', 3))
    preferences = data.get('preferences', ['sightseeing', 'food'])
    
    # Generate AI recommendation
    itinerary = {
        "title": f"{duration} days in {destination}",
        "destination": destination,
        "duration": duration,
        "activities": [],
        "budget": duration * random.randint(300, 500),
        "preferences": preferences
    }
    
    # Generate activities based on preferences and duration
    activity_id = 1
    for day in range(1, duration + 1):
        # Morning activity
        category = random.choice(preferences) if preferences else "sightseeing"
        if category in activities:
            activity = random.choice(activities[category])
            itinerary["activities"].append({
                "id": activity_id,
                "name": f"{activity} in {destination}",
                "day": day,
                "time": "10:00 AM",
                "duration": random.randint(1, 3),
                "type": category.capitalize()
            })
            activity_id += 1
        
        # Afternoon activity
        category = random.choice(preferences) if preferences else "museums"
        if category in activities:
            activity = random.choice(activities[category])
            itinerary["activities"].append({
                "id": activity_id,
                "name": f"{activity} in {destination}",
                "day": day,
                "time": "2:00 PM",
                "duration": random.randint(2, 4),
                "type": category.capitalize()
            })
            activity_id += 1
        
        # Evening activity (for some days)
        if random.choice([True, False]):
            category = random.choice(["food", "entertainment"])
            if category in activities:
                activity = random.choice(activities[category])
                itinerary["activities"].append({
                    "id": activity_id,
                    "name": f"{activity} in {destination}",
                    "day": day,
                    "time": "7:00 PM",
                    "duration": random.randint(2, 3),
                    "type": category.capitalize()
                })
                activity_id += 1
    
    return jsonify({
        "success": True,
        "data": itinerary
    })

@app.route('/api/recommend-activities', methods=['POST'])
def recommend_activities():
    data = request.json
    destination = data.get('destination', 'Unknown')
    preferences = data.get('preferences', ['sightseeing'])
    
    recommended = []
    for pref in preferences:
        if pref in activities:
            for activity in activities[pref]:
                recommended.append({
                    "name": f"{activity} in {destination}",
                    "type": pref.capitalize(),
                    "duration": random.randint(1, 4),
                    "rating": round(random.uniform(3.5, 5.0), 1)
                })
    
    # Shuffle and limit to 10 recommendations
    random.shuffle(recommended)
    recommended = recommended[:10]
    
    return jsonify({
        "success": True,
        "data": recommended
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)