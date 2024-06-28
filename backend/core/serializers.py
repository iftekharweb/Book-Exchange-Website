
from rest_framework import serializers
from .models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ 'email', 'date_of_birth','gender', 'district', 'upazilla', 'phone', 'name', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
class UseLogInSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    class Meta: 
        model = User
        fields = ['email', 'password']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'date_of_birth','gender', 'district', 'upazilla', 'phone', 'name', 'is_admin']
        read_only_fields = ['id']