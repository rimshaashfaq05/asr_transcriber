from django.urls import path
from .views import transcribe_audio,export_transcriptions  # Make sure the name matches the function in views.py

urlpatterns = [
    path('transcribe/', transcribe_audio, name='transcribe_audio'),
    path('export/', export_transcriptions, name='export_transcriptions'),  # Add export URL

    # Other URL patterns
]
