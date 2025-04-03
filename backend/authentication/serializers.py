from rest_framework import serializers
from .models import AbsenceRequest, DocumentRequest, UserInquiry

from .models import HRAnnouncement  # Chemin relatif correct
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
    author_name = serializers.CharField(source='author.login', read_only=True)
    
    class Meta:
        model = HRAnnouncement
        fields = '__all__'
        read_only_fields = ('author', 'created_at')

from .models import CatalogueFormation
# serializers.py
class CatalogueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogueFormation
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')