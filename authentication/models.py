from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from rest_framework import serializers
from django.db import models
from django.db import models
from .models import CatalogueFormation  
from django.contrib.auth import get_user_model
User = get_user_model()
# Define AccountManager before the User model
class AccountManager(BaseUserManager):
    def create_user(self, email, login, phone, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        user = self.model(email=email, login=login, phone=phone, **extra_fields)
        user.set_password(password)  # Hash the password
        user.save(using=self._db)
        return user

    def create_superuser(self, email, login, phone, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, login, phone, password, **extra_fields)

class User(AbstractBaseUser):
    USERNAME_FIELD = 'email'  # Assurez-vous que l'email est utilisé pour l'authentification
    REQUIRED_FIELDS = ['email']
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, unique=True)

    login = models.CharField(max_length=200)
    date_creation = models.DateTimeField("date creation", auto_now_add=True)
    identifier = models.CharField(max_length=200, blank=True, null=True)
    department = models.CharField(max_length=200, blank=True, null=True)
    contract_type = models.CharField(max_length=200, blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    fax = models.CharField(max_length=200, blank=True, null=True)
    position = models.CharField(max_length=200, blank=True, null=True)
    photo = models.ImageField(
        upload_to='users/photos/',
        blank=True,
        null=True,
        verbose_name="Photo de profil"
    )

    # Champs requis pour gérer les superutilisateurs
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['login', 'phone']

    objects = AccountManager()

    def __str__(self):
        return self.email

    # Méthodes requises pour gérer les permissions
    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser
    

    class Meta:  # Corriger l'indentation
        db_table = 'auth_user'
class AbsenceRequest(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    TYPE_CHOICES = [
        ('Congé payé', 'Congé payé'),
        ('Congé maladie', 'Congé maladie'), 
        ('Congé sans solde', 'Congé sans solde')
    ]
    
    STATUS_CHOICES = [
        ('pending', 'En attente'),
        ('approved', 'Approuvé'),
        ('rejected', 'Rejeté'),
        ('cancelled', 'Annulé')
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)  
    start_date = models.DateField()
    end_date = models.DateField()
    starts_afternoon = models.BooleanField(default=False)
    ends_afternoon = models.BooleanField(default=False)
    comment = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

class DocumentRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'En attente'),
        ('approved', 'Approuvée'),
        ('rejected', 'Rejetée'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    document_type = models.CharField(max_length=100)
    comment = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='En cours')
    created_at = models.DateTimeField(auto_now_add=True)

class HRAnnouncement(models.Model):
    file = models.FileField(
        upload_to='announcements/files/',
        blank=True,
        null=True,
        verbose_name="Fichier joint"
    )
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class TrainingCourse(models.Model):
    name = models.CharField(max_length=200)
    course_id = models.CharField(max_length=50)
    duration = models.FloatField()
    unit = models.CharField(max_length=50)
    e_learning = models.BooleanField(default=False)
    domain = models.CharField(max_length=100)
    theme = models.CharField(max_length=100)

@classmethod
def cancel_all_by_type(cls, absence_type, user):
    return cls.objects.filter(
        type=absence_type,
        user=user,
        status='pending'
    ).update(status='cancelled')

class UserInquiry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="inquiries")
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inquiry from {self.user.email} - {self.subject}"

class CatalogueFormation(models.Model):
    CATEGORY_CHOICES = [
        ('informatique', 'Informatique'),
        ('management', 'Management'),
        ('marketing', 'Marketing'),
    ]

    title = models.CharField("Titre", max_length=200)
    description = models.TextField("Description")
    category = models.CharField(
        "Catégorie", 
        max_length=50, 
        choices=CATEGORY_CHOICES
    )
    duration = models.PositiveIntegerField("Durée (heures)")
    start_date = models.DateField("Date de début")
    price = models.DecimalField("Prix", max_digits=8, decimal_places=2)
    trainer = models.CharField("Formateur", max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Formation catalogue"
        verbose_name_plural = "Formations catalogue"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.category})"


class Inscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    formation = models.ForeignKey(CatalogueFormation, on_delete=models.CASCADE)
    date_inscription = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'formation')
        verbose_name = "Inscription"
        verbose_name_plural = "Inscriptions"

    def __str__(self):
        return f"{self.user.email} inscrit à {self.formation.title}"



class Reclamation(models.Model):
    COMPLAINT_CHOICES = [
        ('retard', "Retard d'acceptation des demandes"),
        ('document', "Problème avec un document"),
        ('absence', "Absence non validée"),
        ('autre', "Autre"),
    ]

    name = models.CharField(max_length=100)  # Champ direct pour le nom
    email = models.EmailField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True) 
    phone = models.CharField(max_length=20)
    complaint_type = models.CharField(max_length=20, choices=COMPLAINT_CHOICES)
    details = models.TextField()
    file = models.FileField(upload_to='reclamations/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Réclamation de {self.name} ({self.complaint_type})"
    