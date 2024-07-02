from django.db import models
from core.models import User

class Catagory(models.Model):
    name = models.CharField(max_length=255)

class Book(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    catagory = models.ForeignKey(Catagory, on_delete=models.CASCADE, related_name='books')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    author = models.CharField(max_length=255)
    publish_date = models.DateField()


class Rating(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()

class BookImage(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='book/images')

class Review(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reviews')
    name = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField(auto_now_add=True)


class BuyBook(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    buyer = models.ForeignKey(User, on_delete=models.CASCADE)

    cancel = models.BooleanField(default=False, null=True, blank=True)
    sold = models.BooleanField(default=False, null=True, blank=True)

    date = models.DateTimeField(auto_now_add=True)

class SwapBook(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='swap_book_primary') 
    buyer = models.ForeignKey(User, on_delete=models.CASCADE)
    selected_book = models.ForeignKey(Book, on_delete=models.CASCADE, null=True, blank=True, related_name='swap_book_selected')
    cancel = models.BooleanField(default=False, null=True, blank=True)
    sold = models.BooleanField(default=False, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)