<<<<<<< HEAD
=======

# Register your models here.
>>>>>>> 90e99aa7fb7bd33fa04a3c41ec3e1fceaa2bdf3e
from django.contrib import admin
from .models import Transcription, UploadedFile

@admin.register(Transcription)
class TranscriptionAdmin(admin.ModelAdmin):
<<<<<<< HEAD
    list_display = ('id', 'audio_file', 'created_at', 'transcript')  # Include transcript if needed
    search_fields = ('transcript',)
    readonly_fields = ('created_at', 'id', 'audio_file', 'transcript')
=======
    list_display = ('id', 'audio_file', 'created_at')
    search_fields = ('transcript',)
    readonly_fields = ('created_at',)
>>>>>>> 90e99aa7fb7bd33fa04a3c41ec3e1fceaa2bdf3e

@admin.register(UploadedFile)
class UploadedFileAdmin(admin.ModelAdmin):
    list_display = ('id', 'file', 'uploaded_at')
    readonly_fields = ('uploaded_at',)
