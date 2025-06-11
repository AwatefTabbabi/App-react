from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.db import IntegrityError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.utils import timezone
from django.db.models import Count
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.authentication import TokenAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken, UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError, AuthenticationFailed
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
import json, logging, requests
from django.conf import settings

from .models import (
    AbsenceRequest, DocumentRequest, HRAnnouncement, TrainingCourse, 
    CatalogueFormation, Inscription, UserInquiry, Reclamation
)
from .serializers import (
    AbsenceRequestSerializer, DocumentRequestSerializer, 
    HRAnnouncementSerializer, InscriptionSerializer, 
    CatalogueSerializer, ReclamationSerializer, UserInquirySerializer
)

logger = logging.getLogger(__name__)
User = get_user_model()
# Vue de connexion utilisateur avec génération de JWT
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

                # Générer les tokens d'accès et de rafraîchissement
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)

                return JsonResponse({
                    'message': 'Logged in successfully',
                    'role': 'admin' if user.is_staff else 'user', # Utilisez is_superuser
                    'access':access_token,
                    'refresh':refresh_token
                })
            else:
                return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=400)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

# Vue de déconnexion utilisateur
@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({'status': 'success', 'message': 'Logged out successfully'})
# Vue de création d'un nouveau compte utilisateur
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
# Vue d'envoi d'un email de réinitialisation de mot de passe
@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def forgot_password(request):
    email = request.data.get('email').strip().lower()

    if not email:
        return Response({"error": "Email requis."}, status=400)

    try:
        user = User.objects.get(email=email)

        token = PasswordResetTokenGenerator().make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        reset_link = request.build_absolute_uri(
            reverse('reset-password', kwargs={'uidb64': uid, 'token': token})
        )
        send_mail(
            'Reset Your Password',
            f'Click the link to reset your password: {reset_link}',
            'tabbabiawatef27@gmail.com',
            [email],
        )
        return Response({'message': 'Reset email sent.'}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
# Vue de réinitialisation du mot de passe via lien email
@permission_classes([AllowAny])
class ResetPasswordView(APIView):
    def post(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Invalid token'}, status=400)

            new_password = request.data.get('password')
            user.set_password(new_password)
            user.save()
            return Response({'message': 'Password reset successfully'}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=400)

# Vue pour créer une demande d'absence (côté utilisateur)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_absence_request(request):
    try:
        user = request.user
        data = request.data

        absence_type = data.get('type')
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        starts_afternoon = data.get('starts_afternoon', False)
        ends_afternoon = data.get('ends_afternoon', False)
        comment = data.get('comment', '')

        if not absence_type or not start_date or not end_date:
            return JsonResponse({'error': 'Champs manquants'}, status=400)

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
        logger.error(f"Erreur create_absence_request : {e}")
        return JsonResponse({'error': str(e)}, status=400)
# Vue pour annuler une demande d'absence
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_absence(request):
    try:
        user = request.user
        data = request.data

        absence_type = data.get('type')
        comment = data.get('comment', '')

        if not absence_type:
            return JsonResponse({'error': 'Type d\'absence requis'}, status=400)

        absences = AbsenceRequest.objects.filter(user=user, type=absence_type, status='pending')

        if not absences.exists():
            return JsonResponse({'error': 'Aucune demande trouvée'}, status=404)

        updated_count = absences.update(status='cancelled', comment=comment)

        return JsonResponse({
            'status': 'success',
            'message': f'{updated_count} demande(s) annulée(s)',
            'type': absence_type
        })

    except Exception as e:
        logger.error(f"Erreur cancel_absence : {e}")
        return JsonResponse({'error': 'Erreur serveur'}, status=500)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def document_request(request):
    try:
        user = request.user
        data = request.data

        document_type = data.get('document_type')
        comment = data.get('comment', '')

        if not document_type:
            return JsonResponse({'error': 'Le type de document est requis'}, status=400)

        doc_request = DocumentRequest.objects.create(
            user=user,
            document_type=document_type,
            comment=comment,
            status='pending'
        )

        return JsonResponse({
            'status': 'success',
            'message': 'Demande de document créée avec succès',
            'document_id': doc_request.id
        }, status=201)

    except Exception as e:
        logger.error(f"Erreur document_request : {e}")
        return JsonResponse({'error': str(e)}, status=400)
# Vue pour consulter les annonces RH
@api_view(['GET'])
def get_announcements(request):
    try:
        announcements = HRAnnouncement.objects.all().order_by('-date')
        serializer = HRAnnouncementSerializer(announcements, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
# Vue pour publier une nouvelle annonce RH
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
# Vue pour consulter le catalogue de formations simple (sans DRF)
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
# Vue pour récupérer les absences d'un utilisateur connecté
@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def get_absences(request):
    print("User connecté:", request.user, request.user.id)
    absences = AbsenceRequest.objects.filter(user_id=request.user.id).values(
    'id', 'type', 'start_date', 'end_date', 'status', 
    'starts_afternoon', 'ends_afternoon',
)
    return JsonResponse(list(absences), safe=False)

# Vue pour récupérer les infos du compte connecté via JWT
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
# Vue pour mettre à jour les contacts (téléphone, fax)
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
    
# Vue pour que l'admin récupère toutes les demandes RH (absences et documents)
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
# Vue pour créer une réclamation ou une question utilisateur
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
# Vue pour que l'admin change le statut d'une demande d'absence
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
        serializer = AbsenceRequestSerializer(absence)  # <-- Ajoutez ceci
        return Response(serializer.data, status=200)
    
    except AbsenceRequest.DoesNotExist:
        return Response({"error": "Demande introuvable"}, status=404)
# Vue pour que l'admin change le statut d'une demande de document
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
    
# Vue API manuelle avec JWT pour le catalogue des formations
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

    # Dans views.py (catalogue_api)
    elif request.method == 'GET':
        formations = CatalogueFormation.objects.annotate(
        num_inscrits=Count('inscription')
    )
    data = [{
        'id': f.id,
        'title': f.title,
        'description': f.description,
        'category': f.category,
        'duration': f.duration,
        'start_date': f.start_date.isoformat() if f.start_date else None,
        'price': str(f.price),
        'trainer': f.trainer,
        'num_inscrits': f.num_inscrits
    } for f in formations]
        
    return JsonResponse(data, safe=False)

    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)
# Vue DRF pour consultation / création de formation avec JWT
@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def catalogue_drf(request):
    if request.method == 'GET':
        formations = CatalogueFormation.objects.all()
        serializer = CatalogueSerializer(formations, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CatalogueSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vue DRF pour l'inscription à une formation (CreateAPIView)
class InscriptionCreateAPIView(generics.CreateAPIView):
    serializer_class = InscriptionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        formation_id = request.data.get('formation_id')
        if not formation_id:
            return Response({"error": "formation_id requis"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            formation = CatalogueFormation.objects.get(id=formation_id)
        except CatalogueFormation.DoesNotExist:
            return Response({"error": "Formation non trouvée"}, status=status.HTTP_404_NOT_FOUND)

        inscription, created = Inscription.objects.get_or_create(
            user=request.user,
            formation=formation
        )

        if not created:
            return Response({"message": "Déjà inscrit à cette formation."}, status=status.HTTP_200_OK)

        serializer = self.get_serializer(inscription)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
# Vue simple pour retourner les formations avec nombre d’inscrits
def get_catalogue(request):
    formations = CatalogueFormation.objects.annotate(
        num_inscrits=Count('inscription')  # Compte le nombre d'inscriptions
    )
    response = [
        {
            'id': formation.id,
            'title': formation.title,
            'category': formation.category,
            'duration': formation.duration,
            'trainer': formation.trainer,
            'price': formation.price,
            'num_inscrits': formation.num_inscrits  # Ajoutez ce champ
        }
        for formation in formations
    ]
    return JsonResponse(response, safe=False)
# Vue DRF pour créer une réclamation (accès public)
class ReclamationCreateView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]  # Autoriser l'accès sans authentification
    serializer_class = ReclamationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    from rest_framework import generics
# Vue DRF pour lister toutes les réclamations (admin uniquement)
class ReclamationListView(generics.ListAPIView):
    queryset = Reclamation.objects.all().order_by('-created_at')
    serializer_class = ReclamationSerializer
    permission_classes = [IsAdminUser]  # Limité à l’admin
# Vue intégrée avec OpenRouter API pour ChatGPT00
class ChatGPTAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_message = request.data.get('message', '')
        if not user_message:
            return Response({"error": "Message is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            headers = {
                "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            }
            data = {
                "model": "openai/gpt-3.5-turbo",  # ou try yiyaneko/yi-34b ou mistralai/mistral-7b-instruct
                "messages": [
                    {"role": "system", "content": "Tu es un assistant RH de l'ATB."},
                    {"role": "user", "content": user_message}
                ]
            }
            response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data)
            response.raise_for_status()
            reply = response.json()["choices"][0]["message"]["content"]
            return Response({"response": reply})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
