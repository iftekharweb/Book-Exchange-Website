from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.decorators import api_view
from django.db.models.aggregates import Count

from .models import Review, Book, Catagory, BookImage, Rating, BuyBook, SwapBook
from.serializers import ReviewSerializer, BookSerializer, CatagorySerializer, BookImageSerializer, RatingSerializer, BuyBookSerializer, SwapBookSerializer


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
    

class BuyBookViewSet(ModelViewSet):
    queryset = BuyBook.objects.all()
    serializer_class = BuyBookSerializer

    def create(self, request, *args, **kwargs):
        user_id = request.data.get('buyer_id')
        book_id = request.data.get('book_id')
        
        if BuyBook.objects.filter(book_id=book_id, buyer_id=user_id).exists():
            return Response({"error": "Duplicate buy request. The user has already requested to buy this book."}, status=status.HTTP_400_BAD_REQUEST)
        
        return super().create(request, *args, **kwargs)

@api_view(['GET'])
def buy_requests_by_user(request):
    user_id = request.query_params.get('user', None)
    if user_id is not None:
        buy_requests = BuyBook.objects.filter(book__user_id=user_id)
        serializer = BuyBookSerializer(buy_requests, many=True)
        return Response(serializer.data)
    else:
        return Response({"error": "User ID not provided"}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def buy_orders_by_user(request):
    user_id = request.query_params.get('user', None)
    if user_id is not None:
        buy_orders = BuyBook.objects.filter(buyer_id=user_id)
        serializer = BuyBookSerializer(buy_orders, many=True)
        return Response(serializer.data)
    else:
        return Response({"error": "User ID not provided"}, status=status.HTTP_400_BAD_REQUEST)
    
class SwapBookViewSet(ModelViewSet):
    queryset = SwapBook.objects.all()
    serializer_class = SwapBookSerializer

    def create(self, request, *args, **kwargs):
        user_id = request.data.get('buyer_id')
        book_id = request.data.get('book_id')
        
        if SwapBook.objects.filter(book_id=book_id, buyer_id=user_id).exists():
            return Response({"error": "Duplicate swap request. The user has already requested to swap this book."}, status=status.HTTP_400_BAD_REQUEST)
        
        return super().create(request, *args, **kwargs)
    
@api_view(['GET'])
def swap_requests_by_user(request):
    user_id = request.query_params.get('user', None)
    if user_id is not None:
        swap_requests = SwapBook.objects.filter(book__user_id=user_id)
        serializer = SwapBookSerializer(swap_requests, many=True)
        return Response(serializer.data)
    else:
        return Response({"error": "User ID not provided"}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def swap_orders_by_user(request):
    user_id = request.query_params.get('user', None)
    if user_id is not None:
        swap_orders = SwapBook.objects.filter(buyer_id=user_id)
        serializer = SwapBookSerializer(swap_orders, many=True)
        return Response(serializer.data)
    else:
        return Response({"error": "User ID not provided"}, status=status.HTTP_400_BAD_REQUEST)