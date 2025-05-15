
# from django.db import models
# from django.core.validators import FileExtensionValidator
# from django.contrib.auth.models import User

# # api/models.py

# class Transcription(models.Model):
#     audio_file = models.FileField(upload_to='uploads/')
#     transcript = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)  # Add this field to your model


#     def __str__(self):
#         return f"Transcription for {self.audio_file.name}"

# from django.db import models
# from django.core.validators import FileExtensionValidator


# class Transcription(models.Model):
#     audio_file = models.FileField(
#         upload_to='uploads/',
#         validators=[FileExtensionValidator(allowed_extensions=['mp3', 'wav', 'ogg', 'flac', 'aac'])]
#     )
#     transcript = models.TextField(blank=True, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Transcription {self.id}"


# # OPTIONAL: If you’re already using `Transcription`, this is redundant
# class UploadedFile(models.Model):
#     file = models.FileField(
#         upload_to='uploads/',
#         validators=[FileExtensionValidator(allowed_extensions=['mp3', 'wav', 'ogg', 'flac', 'aac'])]
#     )
#     uploaded_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.file.name

from django.db import models
from django.core.validators import FileExtensionValidator
class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

class Transcription(models.Model):
    audio_file = models.FileField(
        upload_to='uploads/',
        validators=[FileExtensionValidator(allowed_extensions=['mp3', 'wav', 'ogg', 'flac', 'aac'])]
    )
    transcript = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    transcript_file = models.FileField(upload_to='transcripts/', blank=True, null=True)  # Store file in DB
    
    def __str__(self):
        return f"Transcription {self.id}"


# This model is already fine
class UploadedFile(models.Model):
    file = models.FileField(
        upload_to='uploads/',
        validators=[FileExtensionValidator(allowed_extensions=['mp3', 'wav', 'ogg', 'flac', 'aac'])]
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name
