from django.contrib import admin
from .models import Transcription, UploadedFile

@admin.register(Transcription)
class TranscriptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'audio_file', 'created_at', 'transcript')  # Include transcript if needed
    search_fields = ('transcript',)
    readonly_fields = ('created_at', 'id', 'audio_file', 'transcript')

@admin.register(UploadedFile)
class UploadedFileAdmin(admin.ModelAdmin):
    list_display = ('id', 'file', 'uploaded_at')
    readonly_fields = ('uploaded_at',)
