from rest_framework import serializers
from decimal import Decimal
from .models import Review, Catagory, Book, BookImage, Rating, BuyBook, SwapBook
from core.models import User
from core.serializers import UserProfileSerializer

class CatagorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Catagory
        fields = ['id', 'name', 'books_count']

    books_count = serializers.IntegerField(read_only=True)


class BookImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookImage
        fields = ['id', 'image']

    def create(self, validated_data):
        book_id = self.context['book_id']
        return BookImage.objects.create(book_id=book_id, **validated_data) 
    

class BookSerializer(serializers.ModelSerializer):
    images = BookImageSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'user', 'title', 'author', 'publish_date', 'description','price','price_with_tax', 'catagory', 'images']
        
    price_with_tax = serializers.SerializerMethodField(method_name='calculated_tax')
    
    def calculated_tax(self, book):
        return book.price*Decimal(1.1)



class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'name', 'date', 'description']

    def create(self, validated_data):
        book_id = self.context['book_id']
        return Review.objects.create(book_id=book_id, **validated_data) 
    
    

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'book', 'user', 'rating']

    def create(self, validated_data):
        book_id = self.context['book_id']
        user_id = self.context['request'].user.id
        return Rating.objects.create(book_id=book_id, user_id=user_id, **validated_data)
    

class BuyBookSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True) 
    buyer = UserProfileSerializer(read_only=True) 
    owner = serializers.SerializerMethodField()
    book_id = serializers.PrimaryKeyRelatedField(
        queryset=Book.objects.all(), source='book', write_only=True
    )
    buyer_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='buyer', write_only=True
    )

    class Meta:
        model = BuyBook
        fields = ['id', 'book', 'buyer','owner', 'cancel', 'sold', 'date', 'book_id', 'buyer_id']
        read_only_fields = ['owner'] 

    def get_owner(self, obj):
        return UserProfileSerializer(obj.book.user).data

class SwapBookSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True) 
    buyer = UserProfileSerializer(read_only=True) 
    owner = serializers.SerializerMethodField()
    book_id = serializers.PrimaryKeyRelatedField(
        queryset=Book.objects.all(), source='book', write_only=True
    )
    buyer_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='buyer', write_only=True
    )

    class Meta:
        model = SwapBook
        fields = ['id', 'book', 'buyer','owner', 'cancel', 'sold', 'date', 'book_id', 'buyer_id']
        read_only_fields = ['owner'] 

    def get_owner(self, obj):
        return UserProfileSerializer(obj.book.user).data