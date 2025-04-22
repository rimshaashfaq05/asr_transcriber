# # backend/api/views.py

# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# import requests
# import time

# @api_view(['POST'])
# def transcribe_audio(request):
#     start_time = time.time()

#     audio_file = request.FILES.get('audio_file')

#     if not audio_file:
#         return Response({'error': 'No audio file provided'}, status=400)

#     # Prepare file for sending to Colab
#     files = {'audio_file': (audio_file.name, audio_file.read(), audio_file.content_type)}

#     # 🔁 Colab Flask URL
#     COLAB_URL = "https://908e-34-91-67-193.ngrok-free.app/transcribe"  # <-- replace with your ngrok URL

#     try:
#         print("📤 Sending audio to Colab...")
#         colab_start = time.time()
#         response = requests.post(COLAB_URL, files=files)
#         colab_time = time.time() - colab_start
#         print(f"✅ Response received from Colab in {colab_time:.2f} seconds")
#     except Exception as e:
#         return Response({'error': str(e)}, status=500)

#     total_time = time.time() - start_time
#     print(f"⏱️ Total time for full transcription API: {total_time:.2f} seconds")

#     return Response(response.json())




from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Transcription
import time
import requests
import os
from django.core.files.base import ContentFile
from django.conf import settings
from django.http import HttpResponse
import csv
from .models import Transcription

def export_transcriptions(request):
    transcriptions = Transcription.objects.all()

    # Create a response with the CSV format
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="transcriptions.csv"'

    writer = csv.writer(response)
    writer.writerow(['ID', 'Audio File', 'Transcript'])

    for transcription in transcriptions:
        # Ensure that transcription.audio_file.url is accessible
        audio_file_url = transcription.audio_file.url if transcription.audio_file else 'No file'
        writer.writerow([transcription.id, audio_file_url, transcription.transcript])

    return response

@api_view(['POST'])
def transcribe_audio(request):
    start_time = time.time()

    # Retrieve the uploaded audio file
    audio_file = request.FILES.get('audio_file')

    if not audio_file:
        return Response({'error': 'No audio file provided'}, status=400)

    # Read the audio file as binary data
    audio_data = audio_file.read()

    # Save the audio file and transcript in the database
    transcription = Transcription.objects.create(audio_file=audio_data)

    # Prepare file for sending to Colab
    files = {'audio_file': (audio_file.name, audio_data, audio_file.content_type)}

    COLAB_URL = "https://908e-34-91-67-193.ngrok-free.app/transcribe"  # Replace with your ngrok URL

    try:
        print("📤 Sending audio to Colab...")
        colab_start = time.time()
        response = requests.post(COLAB_URL, files=files)
        colab_time = time.time() - colab_start
        print(f"✅ Response received from Colab in {colab_time:.2f} seconds")
        transcript = response.json().get('text', '')

        # Save the transcript in the database
        transcription.transcript = transcript
        transcription.save()

    except Exception as e:
        return Response({'error': str(e)}, status=500)

    total_time = time.time() - start_time
    print(f"⏱️ Total time for full transcription API: {total_time:.2f} seconds")

    return Response({'transcription': transcript})