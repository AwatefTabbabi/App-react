from django.urls import path
from . import views
from .views import catalogue_api
from .views import InscriptionCreateAPIView
from .views import ReclamationCreateView, ReclamationListView
from django.urls import path
from authentication.views import ChatGPTAPIView

from .views import forgot_password, ResetPasswordView

urlpatterns = [
    # Authentification
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('signup/', views.signup, name='signup'),
   
    path('forgot-password/', forgot_password, name='forgot-password'),
    path('reset-password/<uidb64>/<token>/', ResetPasswordView.as_view(), name='reset-password'),


    
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
    path('absences/<int:id>/update/', views.update_absence_status, name='update_absence_status'),
    path('documents/<int:id>/update/', views.update_document_status, name='update_document_status'),
    path('catalogue/', views.catalogue_api, name='catalogue_api'),
    path('reclamations/create/', ReclamationCreateView.as_view(), name='reclamation-create'),
    path('reclamations/', ReclamationListView.as_view(), name='reclamation-list'),

    path('announcements/', views.get_announcements, name='announcements'),
    path('announcements/', views.create_announcement, name='create_announcement'),
    path('trainings/', views.training_catalog, name='trainings'),
    path('api/inquiries/',views. create_inquiry, name='create_inquiry'),
    path('inscriptions/', InscriptionCreateAPIView.as_view(), name='inscription-create'),
   

    path('hf-chat/', ChatGPTAPIView.as_view(), name='hf-chat'),
]