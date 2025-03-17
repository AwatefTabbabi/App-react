from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from .models import User
from django.db import IntegrityError
from django.contrib.auth import get_user_model
from .models import AbsenceRequest, DocumentRequest, HRAnnouncement, TrainingCourse
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed
import json
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
import json
import logging
from rest_framework.decorators import api_view, permission_classes, authentication_classes
logger = logging.getLogger(__name__)
@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            # Récupérer les données JSON de la requête
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            # Authentifier l'utilisateur
            user = authenticate(request, username=email, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({
                    'status': 'success',
                    'message': 'Logged in successfully',
                    'role': 'admin' if user.is_superuser else 'user'  # Utilisez is_superuser
                })
            else:
                return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=400)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)


@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({'status': 'success', 'message': 'Logged out successfully'})



User = get_user_model()

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        login = data.get('username')
        phone = data.get('phone')
        password = data.get('password')
        identifier = data.get('identifier')
        department = data.get('department')
        contract_type = data.get('contractType')
        start_date = data.get('startDate')
        salary = data.get('salary')
        address = data.get('address')

        if not email or not login or not phone or not password:
            return JsonResponse({'error': 'Tous les champs obligatoires doivent être remplis'}, status=400)

        try:
            user = User.objects.create_user(
                email=email,
                login=login,
                phone=phone,
                password=password,
                identifier=identifier,
                department=department,
                contract_type=contract_type,
                start_date=start_date,
                salary=salary,
                address=address
            )
            return JsonResponse({'message': 'Utilisateur créé avec succès'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)


@csrf_exempt
def create_absence_request(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            # Tu récupères l'utilisateur connecté (session Django)
            user = request.user

            # Pour les tests sans authentification, tu peux mettre un user en dur
            if user.is_anonymous:
                from django.contrib.auth import get_user_model
                User = get_user_model()
                user = User.objects.get(email="admin@example.com")  # Remplace par un email valide dans ta base

            # Extraire les données envoyées par le frontend
            absence_type = data.get('type')
            start_date = data.get('start_date')
            end_date = data.get('end_date')
            starts_afternoon = data.get('starts_afternoon', False)
            ends_afternoon = data.get('ends_afternoon', False)
            comment = data.get('comment', '')

            # Vérification de base (optionnelle mais conseillée)
            if not absence_type or not start_date or not end_date:
                return JsonResponse({'error': 'Champs manquants'}, status=400)

            # Création de l'absence dans la base de données
            absence = AbsenceRequest.objects.create(
                user=user,
                type=absence_type,
                start_date=start_date,
                end_date=end_date,
                starts_afternoon=starts_afternoon,
                ends_afternoon=ends_afternoon,
                comment=comment,
                status='pending'
            )

            return JsonResponse({
                'status': 'success',
                'message': 'Demande d\'absence créée avec succès',
                'absence_id': absence.id
            }, status=201)

        except Exception as e:
            print(f"Erreur : {e}")
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)



logger = logging.getLogger(__name__)

@csrf_exempt
def cancel_absence(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            absence_type = data.get('type')
            comment = data.get('comment', '')  # Récupération du commentaire

            if not absence_type:
                return JsonResponse({'error': 'Type d\'absence requis'}, status=400)

        # Recherche des demandes en attente du même type
            # Dans cancel_absence (views.py)
            logger.info(
                     f"Recherche des demandes - "
                    f"Utilisateur: {request.user}, "
                    f"Type: {absence_type}, "
                    f"Status: pending"
            )
            absences = AbsenceRequest.objects.filter(
                    user=request.user,
                    type=absence_type,
                    status='pending'
            )
            logger.info(f"Résultats trouvés : {absences.count()}")

            if not absences.exists():
                return JsonResponse({'error': 'Aucune demande trouvée'}, status=404)

        # Mise à jour avec le commentaire
            updated_count = absences.update(
                status='cancelled',
                comment=comment  # Sauvegarde du commentaire
            )
        
            return JsonResponse({
                'status': 'success',
                'message': f'{updated_count} demande(s) annulée(s)',
                'type': absence_type
            })

        except json.JSONDecodeError:
            return JsonResponse({'error': 'JSON invalide'}, status=400)
        except Exception as e:
            logger.error(f"Erreur: {str(e)}")
            return JsonResponse({'error': 'Erreur serveur'}, status=500)
@csrf_exempt
def document_request(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            DocumentRequest.objects.create(
                user=request.user,
                document_type=data['document_type'],
                comment=data.get('comment', ''),
            )
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

def get_announcements(request):
    announcements = HRAnnouncement.objects.all().values()
    return JsonResponse(list(announcements), safe=False)

def training_catalog(request):
    courses = TrainingCourse.objects.all().values()
    return JsonResponse(list(courses), safe=False)
def get_absences(request):
    absences = AbsenceRequest.objects.filter(user=request.user).values(
        'id', 'type', 'start_date', 'end_date', 'status'
    )
    return JsonResponse(list(absences), safe=False)
# Ajoutez ceci dans views.py
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_user_data(request):
    user = request.user
    data = {
        'email': user.email,
        'phone': user.phone,
        'fax': user.fax,
        'department': user.department,
        'contract_type': user.contract_type,
        'start_date': user.start_date,
        'salary': str(user.salary) if user.salary else None,
        'address': user.address,
        'photo': user.photo.url if user.photo else None,
    }
    return JsonResponse(data)
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_contact(request):
    user = request.user
    user.phone = request.data.get('telephone')
    user.fax = request.data.get('fax')
    user.save()
    return JsonResponse({'status': 'success'})