# 🗣️ ASR Transcriber – Audio-to-Text Converter

This is a full-stack web application that allows users to upload audio files and get accurate transcriptions using OpenAI's Whisper model. The transcribed text can be downloaded, stored per user, and managed through a user-friendly interface.

## 🚀 Features

- 🔐 User Authentication (Signup, Login)
- 🎙 Upload audio files (WAV, MP3, M4A, etc.)
- 🤖 Automatic Speech Recognition using Whisper (Large)
- 📄 Transcription stored per user in database
- 📥 Download transcription as `.txt` file
- 🖥️ Clean UI built with Next.js
- ⚙️ Backend API built with Django + PostgreSQL

---

## 🛠️ Tech Stack

| Layer         | Technology        |
|---------------|-------------------|
| Frontend      | Next.js, Tailwind CSS |
| Backend       | Django, Django REST Framework |
| Database      | PostgreSQL |
| ASR Model     | OpenAI Whisper (Large) |
| Deployment    | AWS (coming soon) |

---

## 🔧 Setup Instructions (Local)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/asr_transcriber.git
cd asr_transcriber
cd backend
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
cd ../frontend
npm install
npm run dev
