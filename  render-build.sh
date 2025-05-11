#!/bin/bash
# Build backend
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput

# Build frontend
cd ../asr-frontend
npm install
npm run build