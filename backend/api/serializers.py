# from rest_framework import serializers
# from .models import Transcription

# class TranscriptionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Transcription
#         fields = '__all__'
# from rest_framework import serializers
# from .models import UploadedFile

# class UploadedFileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UploadedFile
#         fields = ['id', 'file', 'uploaded_at']
from rest_framework import serializers
from .models import Transcription, UploadedFile

class TranscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transcription
        fields = '__all__'  # includes audio_file, transcript, created_at

class UploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = ['id', 'file', 'uploaded_at']
