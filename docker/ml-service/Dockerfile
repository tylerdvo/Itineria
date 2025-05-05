FROM python:3.9-slim

WORKDIR /app

# Copy requirements.txt first for better layer caching
COPY requirements.txt ./

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose port 5001
EXPOSE 5001

# Start the application in development mode
CMD ["python", "app.py"]