from django.urls import path
from . import views
from rest_framework_simplejwt import views as jwt_views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import catalogue_api
from .views import InscriptionCreateAPIView
from .views import ReclamationCreateView, ReclamationListView
urlpatterns = [
    # Authentification
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('signup/', views.signup, name='signup'),
    
    # Gestion utilisateur
   path('account/', views.get_account_by_email, name='get_account_by_email'),
    path('update-contact/', views.update_contact, name='update_contact'),
    path('get_account_by_email/', views.get_account_by_email, name='get_account_by_email'),
    path('ajouter/', ReclamationCreateView.as_view(), name='ajouter-reclamation'),
    # Demandes
  path('absences/', views.get_absences, name='get_absences'),
    path('absences/create/', views.create_absence_request, name='create-absence'),
    path('absences/cancel/', views.cancel_absence, name='cancel-absence'),
    path('documents/', views.document_request, name='document-request'),
    path('demandes/', views.get_demandes, name='get_demandes'),
     path('api/absences/<int:id>/update/', views.update_absence_status, name='update_absence_status'),
    path('api/documents/<int:id>/update/', views.update_document_status, name='update_document_status'),
    path('catalogue/', views.catalogue_api, name='catalogue_api'),
    path('reclamations/create/', ReclamationCreateView.as_view(), name='reclamation-create'),
    path('reclamations/', ReclamationListView.as_view(), name='reclamation-list'),
    # Contenu
    path('announcements/', views.get_announcements, name='announcements'),
    path('api/announcements/', views.create_announcement, name='create_announcement'), 
    path('trainings/', views.training_catalog, name='trainings'),
    path('api/inquiries/',views. create_inquiry, name='create_inquiry'),
    path('inscriptions/', InscriptionCreateAPIView.as_view(), name='inscription-create'),
    # JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]