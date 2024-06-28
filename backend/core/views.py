
from . import serializers
from . import models
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate

# M A N U A L L Y   G E N E R A T E   T O K E N
from rest_framework_simplejwt.tokens import RefreshToken

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserRegistrationView(APIView):
    def post(self, request, format=None):
        serializer = serializers.UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)
        return Response(
            {
                'token':token,
                'msg':'Registration Successful !',
                'user_id': user.id,
            }, 
            status=status.HTTP_201_CREATED
        ) 
    
class UserLogInView(APIView):
    def post(self, request, format=None):
        serializer = serializers.UseLogInSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')

            user = authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response(
                    {
                        'token': token,
                        'msg':'LogIn Successful !',
                        'user_id': user.id,
                        'user_name': user.name,
                        'user_email': user.email,
                    }, 
                    status=status.HTTP_200_OK
                )
            else :
                return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)
    
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        serializer = serializers.UserProfileSerializer(request.user) 
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserProfileSerializer
    queryset = models.User.objects.all()