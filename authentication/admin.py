# authentication/admin.py
from django.contrib import admin
from .models import User  # <-- Remplacer 'user' par 'User'

class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'login', 'phone', 'date_creation')
    search_fields = ('email', 'login')
    list_filter = ('date_creation',)

admin.site.register(User, UserAdmin)