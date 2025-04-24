

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse, FileResponse, Http404
from .models import Transcription
import time
import csv
from io import BytesIO
import os
import whisper
from django.core.files.base import ContentFile
from rest_framework.views import APIView
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
def signup(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=email).exists():
        return Response({"error": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=email, email=email, password=password)
    return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=email, password=password)
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh),
        })
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)


def home(request):
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>ASR Transcriber</title>
        <style>
            body {
                background-color: #f0f8ff;
                font-family: Arial, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
            }
            h1 {
                color: #333;
                font-size: 36px;
            }
            p {
                font-size: 18px;
                color: #555;
            }
            .box {
                padding: 30px;
                border: 2px solid #ddd;
                border-radius: 12px;
                background-color: #ffffff;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="box">
            <h1>Welcome to ASR Transcriber 🎤</h1>
            <p>Upload your audio and get instant transcription.</p>
            <p><a href="/api/">Go to API</a></p>
        </div>
    </body>
    </html>
    """
    return HttpResponse(html)


# Load Whisper model once (large model can take time)
model = whisper.load_model("large")

class FileUploadView(APIView):
    def post(self, request, *args, **kwargs):
        return Response({'message': 'File uploaded successfully'})

@api_view(['POST'])
def transcribe_audio(request):
    start_time = time.time()
    audio_file = request.FILES.get('audio_file')

    if not audio_file:
        return Response({'error': 'No audio file provided'}, status=400)

    # Save audio file to disk
    filename = audio_file.name
    file_path = f"media/uploads/{filename}"
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    with open(file_path, 'wb+') as f:
        for chunk in audio_file.chunks():
            f.write(chunk)

    # Transcribe locally using Whisper
    print("🔍 Transcribing locally with Whisper...")
    result = model.transcribe(file_path)

    # Save transcription to DB
    transcript_text = result["text"]
    transcription = Transcription.objects.create(
        audio_file=ContentFile(audio_file.read(), name=filename),
        transcript=transcript_text
    )

    # Generate timestamped transcript file
    timestamped_txt = ""
    for segment in result.get("segments", []):
        timestamped_txt += f"[{segment['start']:.2f} - {segment['end']:.2f}] {segment['text']}\n"

    # Save the file to be downloadable
    output_filename = f"transcription_{transcription.id}.txt"
    output_path = os.path.join("media/transcripts", output_filename)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, "w") as f:
        f.write(timestamped_txt)

    total_time = time.time() - start_time
    print(f"✅ Transcription done in {total_time:.2f}s")

    # Return transcript as file response
    response = HttpResponse(content_type='text/plain')
    response['Content-Disposition'] = f'attachment; filename="{output_filename}"'
    response.write(timestamped_txt)
    return response

def download_transcription(request, transcription_id):
    try:
        transcription = Transcription.objects.get(id=transcription_id)
    except Transcription.DoesNotExist:
        raise Http404("Transcription not found.")

    if not transcription.transcript:
        raise Http404("Transcript is empty.")

    transcript_file = BytesIO()
    transcript_file.write(transcription.transcript.encode('utf-8'))
    transcript_file.seek(0)

    return FileResponse(
        transcript_file,
        as_attachment=True,
        filename=f"transcription_{transcription_id}.txt",
        content_type='text/plain'
    )

def export_transcriptions(request):
    transcriptions = Transcription.objects.all()
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="transcriptions.csv"'

    writer = csv.writer(response)
    writer.writerow(['ID', 'Audio File', 'Transcript'])

    for transcription in transcriptions:
        audio_file_url = transcription.audio_file.url if transcription.audio_file else 'No file'
        writer.writerow([transcription.id, audio_file_url, transcription.transcript])

    return response




# from rest_framework.decorators import api_view
# from django.core.files.base import ContentFile
# from django.http import HttpResponse, FileResponse
# from rest_framework.response import Response
# import time
# import os
# import whisper
# from .models import Transcription

# # Load Whisper model once
# model = whisper.load_model("large")

# @api_view(['POST'])
# def transcribe_audio(request):
#     start_time = time.time()
#     audio_file = request.FILES.get('audio_file')

#     if not audio_file:
#         return Response({'error': 'No audio file provided'}, status=400)

#     # Save audio file to disk
#     filename = audio_file.name
#     file_path = f"media/uploads/{filename}"
#     os.makedirs(os.path.dirname(file_path), exist_ok=True)

#     with open(file_path, 'wb+') as f:
#         for chunk in audio_file.chunks():
#             f.write(chunk)

#     # Transcribe locally using Whisper
#     print("🔍 Transcribing locally with Whisper...")
#     result = model.transcribe(file_path)

#     # Save transcription to DB
#     transcript_text = result["text"]
#     transcription = Transcription.objects.create(
#         audio_file=ContentFile(audio_file.read(), name=filename),
#         transcript=transcript_text
#     )

#     # Generate timestamped transcript file
#     timestamped_txt = ""
#     for segment in result.get("segments", []):
#         timestamped_txt += f"[{segment['start']:.2f} - {segment['end']:.2f}] {segment['text']}\n"

#     # Save the file to be both local and in DB
#     output_filename = f"transcription_{transcription.id}.txt"
#     output_path = os.path.join("media/transcripts", output_filename)
#     os.makedirs(os.path.dirname(output_path), exist_ok=True)

#     # Save transcription file locally
#     with open(output_path, "w") as f:
#         f.write(timestamped_txt)

#     # Save transcription file in DB
#     with open(output_path, 'rb') as f:
#         transcription.transcript_file.save(output_filename, ContentFile(f.read()), save=True)

#     total_time = time.time() - start_time
#     print(f"✅ Transcription done in {total_time:.2f}s")

#     # Return transcript as file response
#     response = HttpResponse(content_type='text/plain')
#     response['Content-Disposition'] = f'attachment; filename="{output_filename}"'
#     response.write(timestamped_txt)
#     return response
