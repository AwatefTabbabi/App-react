from django.contrib import admin
from django.urls import path, include
from . import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView 
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("authentication.urls")),  
    path('', include('authentication.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # <-- ADD
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)