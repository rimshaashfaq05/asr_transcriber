


# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .models import Transcription
# import time
# import requests
# import os
# from django.core.files.base import ContentFile
# from django.conf import settings
# from django.http import HttpResponse
# import csv
# from .models import Transcription
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.parsers import MultiPartParser, FormParser
# from .serializers import UploadedFileSerializer

# class FileUploadView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request, *args, **kwargs):
#         serializer = UploadedFileSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)


# def export_transcriptions(request):
#     transcriptions = Transcription.objects.all()

#     # Create a response with the CSV format
#     response = HttpResponse(content_type='text/csv')
#     response['Content-Disposition'] = 'attachment; filename="transcriptions.csv"'

#     writer = csv.writer(response)
#     writer.writerow(['ID', 'Audio File', 'Transcript'])

#     for transcription in transcriptions:
#         # Ensure that transcription.audio_file.url is accessible
#         audio_file_url = transcription.audio_file.url if transcription.audio_file else 'No file'
#         writer.writerow([transcription.id, audio_file_url, transcription.transcript])

#     return response

# @api_view(['POST'])
# def transcribe_audio(request):
#     start_time = time.time()

#     # Retrieve the uploaded audio file
#     audio_file = request.FILES.get('audio_file')

#     if not audio_file:
#         return Response({'error': 'No audio file provided'}, status=400)

#     # Read the audio file as binary data
#     audio_data = audio_file.read()

#     # Save the audio file and transcript in the database
#     transcription = Transcription.objects.create(audio_file=audio_data)

#     # Prepare file for sending to Colab
#     files = {'audio_file': (audio_file.name, audio_data, audio_file.content_type)}

#     COLAB_URL = "https://7214-34-106-121-214.ngrok-free.app/transcribe"  # Replace with your ngrok URL

#     try:
#         print("📤 Sending audio to Colab...")
#         colab_start = time.time()
#         response = requests.post(COLAB_URL, files=files)
#         colab_time = time.time() - colab_start
#         print(f"✅ Response received from Colab in {colab_time:.2f} seconds")
#         transcript = response.json().get('text', '')

#         # Save the transcript in the database
#         transcription.transcript = transcript
#         transcription.save()

#     except Exception as e:
#         return Response({'error': str(e)}, status=500)

#     total_time = time.time() - start_time
#     print(f"⏱️ Total time for full transcription API: {total_time:.2f} seconds")

#     return Response({'transcription': transcript})

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
