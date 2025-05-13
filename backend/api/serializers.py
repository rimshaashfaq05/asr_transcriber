from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Transcription, UploadedFile

# 👤 Serializer for reading User info
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

# 🔐 Registration serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

# 📄 Serializer for uploaded audio files
class UploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = ['id', 'file', 'uploaded_at']

# 📝 Serializer for transcriptions
class TranscriptionSerializer(serializers.ModelSerializer):
    audio_url = serializers.SerializerMethodField()

    class Meta:
        model = Transcription
        fields = ['id', 'user', 'audio_file', 'audio_url', 'transcript_text', 'created_at']
        read_only_fields = ['user', 'transcript_text', 'created_at']

    def get_audio_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.audio_file.url)
        return obj.audio_file.url
