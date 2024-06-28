from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from .import views
from django.urls import path

router = routers.DefaultRouter()
router.register('books', views.BookViewSet, basename='books')
router.register('categories', views.CatagoryViewSet, basename='categories')

books_router =  routers.NestedDefaultRouter(router, 'books', lookup='book')
books_router.register('reviews', views.ReviewViewSet, basename='book-reviews')
books_router.register('images', views.BookImageViewSet, basename='book-images')
books_router.register('ratings', views.RatingViewSet, basename='book-ratings')


urlpatterns = router.urls + books_router.urls + [
    path('user-books/', views.UserBooksListView.as_view(), name='user-books-list'),
]