# backend/Dockerfile

FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y git

# Install Whisper
RUN pip install --upgrade pip && \
    pip install git+https://github.com/openai/whisper.git

# Setup working directory
WORKDIR /app

# Copy backend files
COPY . .

# Install backend dependencies
RUN pip install -r requirements.txt

# Expose backend port
EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
