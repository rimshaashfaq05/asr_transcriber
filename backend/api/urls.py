# # api/urls.py
# from django.urls import path
# from .views import FileUploadView
# from .views import download_transcription


# urlpatterns = [
#     path('upload/', FileUploadView.as_view(), name='file-upload'),
#     path('download/<int:transcription_id>/', download_transcription, name='download_transcription'),

# ] 

from .views import home
from .views import FileUploadView, transcribe_audio, download_transcription, export_transcriptions
from django.urls import path
from .views import RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import TranscribeView  # or whatever your view is






urlpatterns = [
    path('', home),
    path('transcribe/', TranscribeView.as_view(), name='transcribe_audio'),
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('api/transcribe/', transcribe_audio, name='transcribe-audio'),
    path('download/<int:transcription_id>/', download_transcription, name='download-transcription'),
    path('export/', export_transcriptions, name='export-transcriptions'),
    path('api/signup/', RegisterView.as_view(), name='signup'),
    path('api/login/', TokenObtainPairView.as_view(), name='login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
