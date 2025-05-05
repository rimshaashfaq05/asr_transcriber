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
from django.contrib.auth.models import User
from .models import Transcription, UploadedFile

class TranscriptionSerializer(serializers.ModelSerializer):
<<<<<<< HEAD
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
=======
    class Meta:
        model = Transcription
        fields = '__all__'  # includes audio_file, transcript, created_at

>>>>>>> 90e99aa7fb7bd33fa04a3c41ec3e1fceaa2bdf3e
class UploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = ['id', 'file', 'uploaded_at']
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
<<<<<<< HEAD
        return user
class UserSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
=======
        return user
>>>>>>> 90e99aa7fb7bd33fa04a3c41ec3e1fceaa2bdf3e
