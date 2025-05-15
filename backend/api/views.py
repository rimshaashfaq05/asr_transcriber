from django.http import HttpResponse, FileResponse, Http404, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core.files.base import ContentFile
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status, serializers

from .models import Transcription, UploadedFile
from .serializers import UserSerializer, RegisterSerializer, TranscriptionSerializer, UploadedFileSerializer
import whisper
import time
import os
import csv
from io import BytesIO

# Load Whisper model once for reuse across requests
model = whisper.load_model("large")

def test_view(request):
    return JsonResponse({"message": "Response from server 8001"})

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

# User Registration View
class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

# Login API View - JWT
class LoginAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'username': user.username,
                }
            })
        return Response({'detail': 'Invalid credentials'}, status=401)

class FileUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        serializer = UploadedFileSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email,
        })

class UserFilesView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        qs = UploadedFile.objects.filter(user=request.user).order_by('-uploaded_at')
        serializer = UploadedFileSerializer(qs, many=True, context={'request': request})
        return Response(serializer.data)

class UserTranscriptionsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        qs = Transcription.objects.filter(user=request.user).order_by('-created_at')
        serializer = TranscriptionSerializer(qs, many=True, context={'request': request})
        return Response(serializer.data)

# Home view
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

@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        # Check if the user already exists
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new user
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        return Response({'username': user.username, 'email': user.email}, status=status.HTTP_201_CREATED)
@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate the user
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # User is authenticated successfully
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class TranscribeView(APIView):
    def post(self, request):
        start_time = time.time()
        audio_file = request.FILES.get('audio_file')

        if not audio_file:
            return Response({'error': 'No audio file provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            filename = audio_file.name
            file_path = f"media/uploads/{filename}"
            os.makedirs(os.path.dirname(file_path), exist_ok=True)

            with open(file_path, 'wb+') as f:
                for chunk in audio_file.chunks():
                    f.write(chunk)

            print("🔍 Transcribing locally with Whisper...")
            result = model.transcribe(file_path)

            transcript_text = result["text"]
            transcription = Transcription.objects.create(
                audio_file=ContentFile(audio_file.read(), name=filename),
                transcript=transcript_text
            )

            timestamped_txt = ""
            for segment in result.get("segments", []):
                timestamped_txt += f"[{segment['start']:.2f} - {segment['end']:.2f}] {segment['text']}\n"

            output_filename = f"transcription_{transcription.id}.txt"
            output_path = os.path.join("media/transcripts", output_filename)
            os.makedirs(os.path.dirname(output_path), exist_ok=True)

            with open(output_path, "w") as f:
                f.write(timestamped_txt)

            total_time = time.time() - start_time
            print(f"✅ Transcription done in {total_time:.2f}s")

            response = HttpResponse(content_type='text/plain')
            response['Content-Disposition'] = f'attachment; filename="{output_filename}"'
            response.write(timestamped_txt)

            return response

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def transcribe_audio(request):
    start_time = time.time()
    audio_file = request.FILES.get('audio_file')

    if not audio_file:
        return Response({'error': 'No audio file provided'}, status=400)

    filename = audio_file.name
    file_path = f"media/uploads/{filename}"
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    with open(file_path, 'wb+') as f:
        for chunk in audio_file.chunks():
            f.write(chunk)

    print("🔍 Transcribing locally with Whisper...")
    result = model.transcribe(file_path)

    transcript_text = result["text"]
    transcription = Transcription.objects.create(
        audio_file=ContentFile(audio_file.read(), name=filename),
        transcript=transcript_text
    )

    timestamped_txt = ""
    for segment in result.get("segments", []):
        timestamped_txt += f"[{segment['start']:.2f} - {segment['end']:.2f}] {segment['text']}\n"

    output_filename = f"transcription_{transcription.id}.txt"
    output_path = os.path.join("media/transcripts", output_filename)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, "w") as f:
        f.write(timestamped_txt)

    total_time = time.time() - start_time
    print(f"✅ Transcription done in {total_time:.2f}s")

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

class DownloadTranscriptionView(APIView):
    def get(self, request, *args, **kwargs):
        # logic to locate transcription file
        return FileResponse(open('path/to/transcription.txt', 'rb'), as_attachment=True)

class ExportTranscriptionsView(APIView):
    def get(self, request):
        # Example logic
        return Response({"message": "Exported transcriptions successfully."})