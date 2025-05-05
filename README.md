# Itinera - AI-Powered Travel Assistant

Itinera is an intelligent travel management platform that uses natural language processing to interpret user preferences and automatically generate personalized itineraries. The application features a clean, modern UI built with React and Material UI, and a microservices architecture backend.

## Project Overview

Itinera consists of three main components:

1. **Frontend**: React application with Material UI components
2. **Backend API**: Node.js with Express
3. **ML Service**: Python Flask API with NLP processing and recommendation engine

## Features

- User authentication and profile management
- Personalized travel itinerary generation based on preferences
- Interactive itinerary builder and editor
- AI-powered travel recommendations
- Responsive design for all devices

## Project Structure

```
itinera/
├── frontend/               # React frontend application
├── backend/                # Node.js and Python services
│   ├── api/                # Express API service
│   └── ml-service/         # Flask ML service
└── docker/                 # Docker configuration files
```

## Prerequisites

- Node.js (v16+)
- Python (v3.9+)
- Docker and Docker Compose (optional, for containerized deployment)
- MongoDB (v5+)

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/itinera.git
cd itinera
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

### 3. Backend API Setup

```bash
cd backend/api
npm install
```

### 4. ML Service Setup

```bash
cd backend/ml-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 5. Environment Configuration

Create `.env` files in both the frontend and backend directories with the appropriate configuration:

#### Frontend .env
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ML_URL=http://localhost:5001/api
```

#### Backend API .env
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/itinera
ML_SERVICE_URL=http://localhost:5001/api
```

#### ML Service .env
```
FLASK_ENV=development
FLASK_APP=app.py
PORT=5001
```

## Running the Application

### Development Mode (Individual Services)

#### 1. Start the Backend API
```bash
cd backend/api
npm run dev
```

#### 2. Start the ML Service
```bash
cd backend/ml-service
python app.py
```

#### 3. Start the Frontend
```bash
cd frontend
npm start
```

### Docker Deployment

To run the entire application using Docker Compose:

```bash
cd docker
docker-compose up
```

This will build and start all services:
- Frontend at http://localhost:3000
- Backend API at http://localhost:5000
- ML Service at http://localhost:5001
- MongoDB at mongodb://localhost:27017

## Demo Account

For testing purposes, you can use the following demo credentials:

- Email: demo@example.com
- Password: password123

## Development Notes

### Simplified Version for Demonstration

The current implementation includes:
- Mock backend data (no MongoDB connection required for demo)
- Placeholder ML service (no actual NLP processing)
- Simplified authentication (no Firebase integration)

### Production Deployment Considerations

For a production deployment, consider:
- Adding Firebase Authentication
- Implementing MongoDB connection
- Setting up a proper CI/CD pipeline
- Configuring HTTPS
- Adding proper error handling and logging
- Implementing unit and integration tests

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React, Material UI, Node.js, Express, and Flask
- Design inspired by modern travel applications