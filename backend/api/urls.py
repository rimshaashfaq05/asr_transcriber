from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    home,
    RegisterView,
    FileUploadView,
    UserInfoView,
    UserFilesView,
    UserTranscriptionsView,
    TranscribeView,
    DownloadTranscriptionView,
    ExportTranscriptionsView,
    test_view,
    download_transcription,
    export_transcriptions,
)

urlpatterns = [
    # Home/Test
    path('', home, name='home'),
    path("api/test/", test_view, name='test'),

    # Authentication
    path('api/signup/', RegisterView.as_view(), name='signup'),
    path('api/login/', TokenObtainPairView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # File Upload & Transcription
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('transcribe/', TranscribeView.as_view(), name='transcribe-audio'),

    # User Data Views
    path('user-info/', UserInfoView.as_view(), name='user-info'),
    path('user-files/', UserFilesView.as_view(), name='user-files'),
    path('user-transcriptions/', UserTranscriptionsView.as_view(), name='user-transcriptions'),

    # Download / Export
    path('download/<int:transcription_id>/', download_transcription, name='download-transcription'),
    path('export/', export_transcriptions, name='export-transcriptions'),
]
