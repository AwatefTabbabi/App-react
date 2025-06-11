from rest_framework import serializers
from .models import AbsenceRequest, DocumentRequest, UserInquiry
from .models import CatalogueFormation
from .models import HRAnnouncement  
from rest_framework import serializers
from .models import Inscription
from .models import Reclamation
class AbsenceRequestSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.login')  # <-- Ajouter le nom d'utilisateur

    class Meta:
        model = AbsenceRequest
        fields = '__all__'

class DocumentRequestSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.login')  # <-- Ajouter le nom d'utilisateur

    class Meta:
        model = DocumentRequest
        fields = '__all__'

class UserInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInquiry
        fields = '__all__'

class HRAnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = HRAnnouncement
        fields = '__all__'


class CatalogueSerializer(serializers.ModelSerializer):
    price = serializers.DecimalField(max_digits=8, decimal_places=2, coerce_to_string=False)
    
    class Meta:
        model = CatalogueFormation
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

class InscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inscription
        fields = ['id', 'formation', 'date_inscription']
        read_only_fields = ['id', 'date_inscription']

class ReclamationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reclamation
        fields = '__all__'