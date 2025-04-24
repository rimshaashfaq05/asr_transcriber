# # api/urls.py
# from django.urls import path
# from .views import FileUploadView
# from .views import download_transcription


# urlpatterns = [
#     path('upload/', FileUploadView.as_view(), name='file-upload'),
#     path('download/<int:transcription_id>/', download_transcription, name='download_transcription'),

# ] 

from django.urls import path
from .views import home
from .views import FileUploadView, transcribe_audio, download_transcription, export_transcriptions

urlpatterns = [
    path('', home),
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('transcribe/', transcribe_audio, name='transcribe-audio'),
    path('download/<int:transcription_id>/', download_transcription, name='download-transcription'),
    path('export/', export_transcriptions, name='export-transcriptions'),
]
