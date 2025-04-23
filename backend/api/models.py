from django.db import models
from django.core.validators import FileExtensionValidator


class Transcription(models.Model):
    audio_file = models.FileField(
        upload_to='uploads/',
        validators=[FileExtensionValidator(allowed_extensions=['mp3', 'wav', 'ogg', 'flac', 'aac'])]
    )
    transcript = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Transcription {self.id}"


# OPTIONAL: If you’re already using `Transcription`, this is redundant
class UploadedFile(models.Model):
    file = models.FileField(
        upload_to='uploads/',
        validators=[FileExtensionValidator(allowed_extensions=['mp3', 'wav', 'ogg', 'flac', 'aac'])]
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name
