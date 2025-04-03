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
from rest_framework.authentication import TokenAuthentication
import json
import logging
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.contrib.auth.decorators import login_required
from .models import AbsenceRequest
# views.py
from .models import HRAnnouncement  
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
                    'role': 'admin' if user.is_staff else 'user' # Utilisez is_superuser
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
        try:
            # Access form data from request.POST and request.FILES
            email = request.POST.get('email')
            login = request.POST.get('login')  # Matches React's 'login' field
            phone = request.POST.get('phone')
            password = request.POST.get('password')
            identifier = request.POST.get('identifier')
            department = request.POST.get('department')
            contract_type = request.POST.get('contract_type')  # Matches React's 'contract_type'
            start_date = request.POST.get('start_date')
            salary = request.POST.get('salary')
            address = request.POST.get('address')
            fax = request.POST.get('fax')
            position = request.POST.get('position')
            photo = request.FILES.get('photo')  # Uploaded file

            # Check required fields
            required_fields = ['email', 'login', 'phone', 'password']
            for field in required_fields:
                if not request.POST.get(field):
                    return JsonResponse({'error': f'Missing required field: {field}'}, status=400)

            # Create user with the provided data
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
                address=address,
                fax=fax,
                position=position,
                photo=photo  # Assign the uploaded photo
            )

            return JsonResponse({'message': 'User created successfully'}, status=201)
        except IntegrityError:
            return JsonResponse({'error': 'Email already exists'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Method not allowed'}, status=405)


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

            # Tu récupères l'utilisateur connecté (session Django)
            user = request.user

            # Pour les tests sans authentification, tu peux mettre un user en dur
            if user.is_anonymous:
                from django.contrib.auth import get_user_model
                User = get_user_model()
                user = User.objects.get(email="admin@example.com")  # Remplace par un email valide dans ta base

            # Extraire les données envoyées par le frontend
            absence_type = data.get('type')
            comment = data.get('comment', '') 

            # Vérification de base (optionnelle mais conseillée)
            if not absence_type:
                return JsonResponse({'error': 'Type d\'absence requis'}, status=400)

            logger.info(f"Utilisateur: {user.email}, Type d'absence: {absence_type}, Commentaire: {comment}")

            # Filtrer les absences en attente pour cet utilisateur et le type spécifié
            absences = AbsenceRequest.objects.filter(
                user=user,
                type=absence_type,
                status='pending'
            )

            if not absences.exists():
                return JsonResponse({'error': 'Aucune demande trouvée'}, status=404)

            # Mise à jour des absences pour changer leur statut à 'cancelled'
            updated_count = absences.update(status='cancelled', comment=comment)

            return JsonResponse({
                'status': 'success',
                'message': f'{updated_count} demande(s) annulée(s)',
                'type': absence_type
            })

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Format JSON invalide'}, status=400)
        except Exception as e:
            logger.error(f"Erreur lors de l'annulation : {str(e)}")
            return JsonResponse({'error': 'Erreur serveur'}, status=500)

        return JsonResponse({'error': 'Méthode non autorisée'}, status=405)
@csrf_exempt
def document_request(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            # Récupération de l'utilisateur connecté
            user = request.user

            # Pour tester sans authentification, assigner un utilisateur en dur
            if user.is_anonymous:
                User = get_user_model()
                user = User.objects.get(email="admin@example.com")  # Remplace par un email valide

            # Extraction des données envoyées par le frontend
            document_type = data.get('document_type')
            comment = data.get('comment', '')

            # Vérification des champs requis
            if not document_type:
                return JsonResponse({'error': 'Le type de document est requis'}, status=400)

            # Création de la demande de document
            document_request = DocumentRequest.objects.create(
                user=user,
                document_type=document_type,
                comment=comment,
                status='pending'
            )

            return JsonResponse({
                'status': 'success',
                'message': 'Demande de document créée avec succès',
                'document_id': document_request.id
            }, status=201)

        except Exception as e:
            print(f"Erreur : {e}")
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)
@api_view(['GET'])
def get_announcements(request):
    try:
        announcements = HRAnnouncement.objects.all().order_by('-date')
        serializer = HRAnnouncementSerializer(announcements, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['POST'])
def create_announcement(request):
    try:
        data = request.data.copy()
        data['author'] = request.user.id
        
        serializer = HRAnnouncementSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

def training_catalog(request):
    try:
        courses = TrainingCourse.objects.all().values(
            'name', 
            'course_id', 
            'duration', 
            'unit', 
            'e_learning', 
            'domain', 
            'theme'
        )
        return JsonResponse(list(courses), safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
def get_absences(request):
    absences = AbsenceRequest.objects.filter(user=request.user).values(
        'id', 'type', 'start_date', 'end_date', 'status'
    )
    return JsonResponse(list(absences), safe=False)
# Ajoutez ceci dans views.py
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_account_by_email(request):
    try:
        # Vérification de l'utilisateur
        user = request.user
        print(f"Utilisateur authentifié: {user}")  # Ajouter un log pour vérifier l'utilisateur
        if not user:
            return JsonResponse({"error": "User not found"}, status=404)

        return JsonResponse({
            "user_id": user.id,
            "email": user.email,
            "phone": user.phone,
            "identifier": user.identifier,
            "department": user.department,
            "contract_type": user.contract_type,
            "start_date": str(user.start_date),
            "salary": str(user.salary) if user.salary else None,
            "address": user.address,
            'photo': user.photo.url if user.photo else None,
        })

    except TokenError as e:
        print(f"Token error: {str(e)}")  # Log des erreurs de token
        return JsonResponse({"error": f"Token Error: {str(e)}"}, status=401)
    except InvalidToken as e:
        print(f"Invalid token: {str(e)}")  # Log du token invalide
        return JsonResponse({"error": f"Invalid Token: {str(e)}"}, status=401)
    except Exception as e:
        print(f"Erreur inconnue: {str(e)}")  # Log pour toute autre erreur
        return JsonResponse({"error": f"Erreur inconnue: {str(e)}"}, status=500)

# views.py
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_contact(request):
    user = request.user
    try:
        data = json.loads(request.body)
        # Mise à jour des champs de contact
        user.phone = data.get('telephone', user.phone)
        user.fax = data.get('fax', user.fax)
        
        user.save()
        return JsonResponse({'status': 'success'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
    
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from .models import AbsenceRequest, DocumentRequest, UserInquiry
from .serializers import AbsenceRequestSerializer, DocumentRequestSerializer, UserInquirySerializer

from rest_framework.response import Response  # <-- Ajouter
from .models import AbsenceRequest, DocumentRequest  # <-- Vérifier l'import
from .serializers import AbsenceRequestSerializer, DocumentRequestSerializer  # <-- Ajouter

# views.py (get_demandes)
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAdminUser])
def get_demandes(request):
    print(f"[DEBUG] User: {request.user.email}, is_staff: {request.user.is_staff}")
    try:
        print(f"Utilisateur authentifié : {request.user}")  # Vérifiez dans la console Django
        absences = AbsenceRequest.objects.all()
        documents = DocumentRequest.objects.all()
        data = {
            "absences": AbsenceRequestSerializer(absences, many=True).data,
            "documents": DocumentRequestSerializer(documents, many=True).data
        }
        return Response(data)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_inquiry(request):
    user = request.user
    subject = request.data.get('subject')
    message = request.data.get('message')

    if not subject or not message:
        return Response({"error": "Subject and message are required"}, status=400)

    inquiry = UserInquiry.objects.create(user=user, subject=subject, message=message)
    return Response({"message": "Inquiry submitted successfully"}, status=201)
# views.py
@api_view(['PATCH'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAdminUser])
def update_absence_status(request, id):
    try:
        absence = AbsenceRequest.objects.get(id=id)
        new_status = request.data.get('status')
        
        if new_status not in [choice[0] for choice in AbsenceRequest.STATUS_CHOICES]:
            return Response({"error": "Statut invalide"}, status=400)
            
        absence.status = new_status
        absence.save()
        
        return Response({"message": "Statut mis à jour"}, status=200)
    
    except AbsenceRequest.DoesNotExist:
        return Response({"error": "Demande introuvable"}, status=404)

@api_view(['PATCH'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAdminUser])
def update_document_status(request, id):
    try:
        document = DocumentRequest.objects.get(id=id)
        new_status = request.data.get('status')
        
        if new_status not in [choice[0] for choice in DocumentRequest.STATUS_CHOICES]:
            return Response({"error": "Statut invalide"}, status=400)
            
        document.status = new_status
        document.save()
        
        return Response({"message": "Statut mis à jour"}, status=200)
    
    except DocumentRequest.DoesNotExist:
        return Response({"error": "Demande introuvable"}, status=404)
    
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
import json
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from .models import CatalogueFormation

@csrf_exempt
def catalogue_api(request):
    # Authentification JWT
    auth_header = request.headers.get('Authorization', '').split()
    
    if not auth_header or auth_header[0].lower() != 'bearer' or len(auth_header) != 2:
        return JsonResponse({'error': 'Authentification requise'}, status=401)
    
    try:
        token = auth_header[1]
        decoded_token = UntypedToken(token)
        user_id = decoded_token.payload.get('user_id')
        User = get_user_model()
        user = User.objects.get(id=user_id)
    except (InvalidToken, TokenError, User.DoesNotExist):
        return JsonResponse({'error': 'Token invalide'}, status=401)

    # Gestion des méthodes
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Validation des données
            required_fields = ['title', 'description', 'category', 
                             'duration', 'start_date', 'price', 'trainer']
            for field in required_fields:
                if field not in data:
                    return JsonResponse({'error': f'Champ manquant: {field}'}, status=400)

            # Création de la formation
            formation = CatalogueFormation.objects.create(
                title=data['title'],
                description=data['description'],
                category=data['category'],
                duration=data['duration'],
                start_date=data['start_date'],
                price=data['price'],
                trainer=data['trainer']
            )
            
            return JsonResponse({
                'id': formation.id,
                'message': 'Formation créée avec succès'
            }, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    elif request.method == 'GET':
        # Récupération de toutes les formations
        formations = CatalogueFormation.objects.all()
        data = [{
            'id': f.id,
            'title': f.title,
            'duration': f.duration,
            'category': f.category
        } for f in formations]
        
        return JsonResponse(data, safe=False)

    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)



# views.py (fonction catalogue_drf)
@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def catalogue_drf(request):
    if request.method == 'POST':
        print("Données reçues:", request.data)  # Log des données
        serializer = CatalogueSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("Erreurs de validation:", serializer.errors)  # Log des erreurs
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

