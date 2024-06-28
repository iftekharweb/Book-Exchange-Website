from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserRegistrationView, UserLogInView, UserProfileView, UserViewSet
#UserView

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLogInView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
]