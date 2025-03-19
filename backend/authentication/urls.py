from django.urls import path
from . import views  # Assurez-vous que cette ligne est correcte
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import document_request 
from rest_framework_simplejwt import views as jwt_views
from .views import update_contact 
from .views import cancel_absence
urlpatterns = [
    path('api/login/', views.login_view, name='login'),
    path('api/logout/', views.logout_view, name='logout'),
    path('api/signup/', views.signup, name='signup'),
    path('get_account_by_email/', views.get_account_by_email, name='get_account_by_email'),
     path('api/absences/', views.get_absences, name='get_absences'),  # GET : liste
    path('api/absences/create/', views.create_absence_request, name='create_absence'),
    path('api/absences/cancel/', cancel_absence, name='cancel_absence'),
    path('api/documents/', document_request, name='document-request'),
    path('api/announcements/', views.get_announcements, name='announcements'),
    path('api/trainings/', views.training_catalog, name='trainings'),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]