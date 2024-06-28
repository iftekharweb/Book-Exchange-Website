from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status, generics
from django.db.models.aggregates import Count

from .models import Review, Book, Catagory, BookImage, Rating
from.serializers import ReviewSerializer, BookSerializer, CatagorySerializer, BookImageSerializer, RatingSerializer


class BookViewSet(ModelViewSet):
    def get_queryset(self):
        return Book.objects.prefetch_related('images').all()
    
    def get_serializer_class(self):
        return BookSerializer
    
    def get_serializer_context(self):
        return {'request': self.request}
    

class CatagoryViewSet(ModelViewSet):
    def get_queryset(self):
        return Catagory.objects.annotate(books_count=Count('books')).all()
    
    def get_serializer_class(self):
        return CatagorySerializer
    
    def get_serializer_context(self):
        return {'request': self.request}
    
    def destroy(self, request, *args, **kwargs):
        if Catagory.objects.filter(catagory_id=kwargs['pk']).count() > 0:
            return Response({'error': 'Catagory cannot be deleted'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        return super().destroy(request, *args, **kwargs)



class ReviewViewSet(ModelViewSet):
    def get_queryset(self):
        return Review.objects.filter(book_id=self.kwargs['book_pk']).all()
    
    def get_serializer_class(self):
        return ReviewSerializer
    
    def get_serializer_context(self):
        return {'book_id': self.kwargs['book_pk']}
    

class BookImageViewSet(ModelViewSet):
    def get_queryset(self):
        return BookImage.objects.filter(book_id=self.kwargs['book_pk']).all()
    
    def get_serializer_class(self):
        return BookImageSerializer
    
    def get_serializer_context(self):
        return {'book_id': self.kwargs['book_pk']}
    

class RatingViewSet(ModelViewSet):
    serializer_class = RatingSerializer

    def get_queryset(self):
        return Rating.objects.filter(book_id=self.kwargs['book_pk']).all()

    def get_serializer_context(self):
        return {'book_id': self.kwargs['book_pk'], 'request': self.request}
    

class UserBooksListView(generics.ListAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user')
        if user_id is not None:
            return Book.objects.filter(user=user_id)
        else:
            return Book.objects.none()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response({"detail": "No books found for the given user."}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)