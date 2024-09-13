
from rest_framework import serializers
from django.contrib.auth.hashers import check_password
from .models import User, UserImage

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
        fields = ['id', 'date_of_birth', 'email', 'gender', 'district', 'upazilla', 'phone', 'name', 'is_admin']
        read_only_fields = ['id']

class UserChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(
        max_length=255,
        style={'input_type': 'password'},
        write_only=True
    )
    new_password = serializers.CharField(
        max_length=255,
        style={'input_type': 'password'},
        write_only=True
    )

    class Meta:
        model = User
        fields = ['old_password', 'new_password']

    def validate(self, data):
        old_password = data.get('old_password')
        new_password = data.get('new_password')
        user = self.context.get('user')

        if not check_password(old_password, user.password):
            raise serializers.ValidationError("Old password is incorrect.")
        if old_password == new_password:
            raise serializers.ValidationError("New password must be different from old password.")
        user.set_password(new_password)
        user.save()
        return data
    
class UserImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserImage
        fields = ['id', 'image']

    def create(self, validated_data):
        user_id = self.context['user_id']
        return UserImage.objects.create(user_id=user_id, **validated_data) 