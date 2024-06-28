from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'name', 'date_of_birth', 'gender', 'district', 'upazilla', 'phone', 'is_active', 'is_admin']
    list_filter = ['is_active', 'is_admin']
    search_fields = ['email', 'name', 'district', 'upazilla', 'phone']

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('name', 'date_of_birth', 'gender', 'district', 'upazilla', 'phone')}),
        ('Permissions', {'fields': ('is_active', 'is_admin')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'date_of_birth', 'name', 'gender', 'district', 'upazilla', 'phone', 'password1', 'password2'),
        }),
    )

    ordering = ['email']
    filter_horizontal = ()