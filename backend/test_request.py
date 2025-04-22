# test_request.py

import requests

# Django local API URL
url = "http://127.0.0.1:8000/api/transcribe/"

# Audio file path (update if needed)
file_path = "../audio/test.mp3"  # ← make sure this file exists at this path

# Open and send file
with open(file_path, 'rb') as f:
    files = {'audio_file': ('test.mp3', f, 'audio/mpeg')}
    response = requests.post(url, files=files)

# Print response
print("🔊 Transcription Result:")
print(response.json())
