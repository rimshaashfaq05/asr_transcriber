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


urlpatterns = [
    path('', home),
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('transcribe/', transcribe_audio, name='transcribe-audio'),
    path('download/<int:transcription_id>/', download_transcription, name='download-transcription'),
    path('export/', export_transcriptions, name='export-transcriptions'),
    path('api/signup/', RegisterView.as_view(), name='signup'),
    path('api/login/', TokenObtainPairView.as_view(), name='login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
