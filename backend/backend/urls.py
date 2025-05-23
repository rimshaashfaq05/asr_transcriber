from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', include('api.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # API app ko include kar rahe hain
]

# Media files serve karne ke liye (development mode only)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
