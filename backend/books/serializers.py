from rest_framework import serializers
from decimal import Decimal
from .models import Review, Catagory, Book, BookImage, Rating

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