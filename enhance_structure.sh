#!/bin/bash

# Base directory for the project
PROJECT_DIR=~/Desktop/Projects/Itinera
cd $PROJECT_DIR

echo "Creating missing files for Itinera project..."

# Backend API additional files
echo "Adding backend API files..."
touch backend/api/.env
touch backend/api/README.md
touch backend/api/api-docs.js

# ML Service additional files
echo "Adding ML service files..."
touch backend/ml-service/.env
touch backend/ml-service/tests/test_api.py
touch backend/ml-service/README.md

# Frontend - Core files
echo "Adding frontend environment..."
touch frontend/.env

# Frontend - Components
echo "Adding frontend components..."
# Auth components
mkdir -p frontend/src/components/auth
touch frontend/src/components/auth/Login.jsx
touch frontend/src/components/auth/Register.jsx
touch frontend/src/components/auth/ProtectedRoute.jsx

# Common components
mkdir -p frontend/src/components/common
touch frontend/src/components/common/Navbar.jsx
touch frontend/src/components/common/Footer.jsx
touch frontend/src/components/common/Loading.jsx

# Itinerary components
mkdir -p frontend/src/components/itinerary
touch frontend/src/components/itinerary/ItineraryBuilder.jsx
touch frontend/src/components/itinerary/ItineraryView.jsx
touch frontend/src/components/itinerary/ActivityCard.jsx

# Preference components
mkdir -p frontend/src/components/preferences
touch frontend/src/components/preferences/PreferenceForm.jsx
touch frontend/src/components/preferences/InterestSelector.jsx

# Contexts
mkdir -p frontend/src/contexts
touch frontend/src/contexts/AuthContext.jsx
touch frontend/src/contexts/ItineraryContext.jsx

# Hooks
mkdir -p frontend/src/hooks
touch frontend/src/hooks/useAuth.jsx
touch frontend/src/hooks/useItinerary.jsx

# Pages
mkdir -p frontend/src/pages
touch frontend/src/pages/Home.jsx
touch frontend/src/pages/Dashboard.jsx
touch frontend/src/pages/Profile.jsx
touch frontend/src/pages/ItineraryPlanner.jsx

# Redux
mkdir -p frontend/src/redux/actions frontend/src/redux/reducers
touch frontend/src/redux/store.js
touch frontend/src/redux/actions/index.js
touch frontend/src/redux/reducers/index.js
touch frontend/src/redux/actions/authActions.js
touch frontend/src/redux/actions/userActions.js
touch frontend/src/redux/actions/itineraryActions.js
touch frontend/src/redux/actions/preferenceActions.js
touch frontend/src/redux/reducers/authReducer.js
touch frontend/src/redux/reducers/userReducer.js
touch frontend/src/redux/reducers/itineraryReducer.js
touch frontend/src/redux/reducers/preferenceReducer.js
touch frontend/src/redux/types.js

# Services
mkdir -p frontend/src/services
touch frontend/src/services/api.js
touch frontend/src/services/authService.js
touch frontend/src/services/itineraryService.js

# Utils
mkdir -p frontend/src/utils
touch frontend/src/utils/helpers.js
touch frontend/src/utils/validators.js

# Frontend tests
mkdir -p frontend/src/tests/components frontend/src/tests/redux
touch frontend/src/tests/components/auth.test.js
touch frontend/src/tests/components/itinerary.test.js
touch frontend/src/tests/redux/actions.test.js
touch frontend/src/tests/redux/reducers.test.js

# Frontend documentation
touch frontend/README.md

# Docker configuration
mkdir -p docker/frontend docker/backend docker/ml-service
touch docker/docker-compose.yml
touch docker/frontend/Dockerfile
touch docker/backend/Dockerfile
touch docker/ml-service/Dockerfile

echo "File creation completed!"
echo "New files created: $(find $PROJECT_DIR -type f -newer $(dirname $0) | wc -l)"
echo "New directories created: $(find $PROJECT_DIR -type d -newer $(dirname $0) | wc -l)"