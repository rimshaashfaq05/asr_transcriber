# Stage 1: Build Frontend
FROM node:18-alpine as frontend-builder
WORKDIR /app/frontend
COPY asr-frontend/package.json asr-frontend/package-lock.json ./
RUN npm install
COPY asr-frontend/ .
RUN npm run build

# Stage 2: Build Backend
FROM python:3.9-slim as backend-builder
WORKDIR /app/backend
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .

# Stage 3: Final Image
FROM python:3.9-slim
WORKDIR /app

# Copy built frontend
COPY --from=frontend-builder /app/frontend/.next ./asr-frontend/.next

# Copy backend
COPY --from=backend-builder /app/backend /app/backend
COPY --from=backend-builder /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages

# Environment variables
ENV PYTHONPATH=/app/backend
ENV NEXT_PUBLIC_API_URL=http://localhost:8000

# Expose ports
EXPOSE 3000 8000

# Run both services
CMD sh -c "cd /app/backend && python manage.py migrate && gunicorn backend.wsgi:application --bind 0.0.0.0:8000 & cd /app/asr-frontend && npm start"