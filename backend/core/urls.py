from django.urls import path, include
from rest_framework_nested import routers
from .views import UserRegistrationView, UserLogInView, UserProfileView, UserViewSet, UserChangePasswordView, UserImageViewSet


router = routers.DefaultRouter()
router.register('users', UserViewSet, basename='users')
users_router =  routers.NestedDefaultRouter(router, 'users', lookup='user')
users_router.register('images', UserImageViewSet, basename='user-images')


urlpatterns = router.urls + users_router.urls + [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLogInView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('change-password/', UserChangePasswordView.as_view(), name='change-password'),
]