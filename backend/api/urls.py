from .views import home
from .views import FileUploadView, transcribe_audio, download_transcription, export_transcriptions
from django.urls import path
from .views import RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import TranscribeView

urlpatterns = [
    path('', home),  # Home endpoint (if needed)

    path('transcribe/', TranscribeView.as_view(), name='transcribe_audio'),
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    
    path('download/<int:transcription_id>/', download_transcription, name='download-transcription'),
    path('export/', export_transcriptions, name='export-transcriptions'),
    
    path('api/signup/', RegisterView.as_view(), name='signup'),  # Registration endpoint
    path('api/login/', TokenObtainPairView.as_view(), name='login'),  # Login endpoint
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Token obtain
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
