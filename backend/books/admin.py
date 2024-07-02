from django.contrib import admin
from django.utils.html import format_html
from .models import Catagory, Book, Rating, BookImage, Review, BuyBook, SwapBook

@admin.register(Catagory)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'author', 'publish_date', 'price', 'user', 'catagory']
    search_fields = ['title', 'author', 'description']
    list_filter = ['publish_date', 'catagory']
    raw_id_fields = ['user', 'catagory']

    class BookImageInline(admin.TabularInline):
        model = BookImage
        extra = 1
        readonly_fields = ('image_tag',)
        fields = ('image', 'image_tag')

        def image_tag(self, obj):
            if obj.image:
                return format_html('<img src="{}" width="50" height="50" />'.format(obj.image.url))
            return "No Image"
        image_tag.short_description = 'Image Preview'

    inlines = [BookImageInline]

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ['id', 'book', 'user', 'rating']
    list_filter = ['rating']
    search_fields = ['book__title', 'user__email']
    raw_id_fields = ['book', 'user']

@admin.register(BookImage)
class BookImageAdmin(admin.ModelAdmin):
    list_display = ['id', 'book', 'image_tag']
    search_fields = ['book__title']
    raw_id_fields = ['book']
    
    def image_tag(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" />'.format(obj.image.url))
        return "No Image"
    image_tag.short_description = 'Image Preview'

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['id', 'book', 'name', 'description', 'date']
    search_fields = ['book__title', 'name']
    list_filter = ['date']
    raw_id_fields = ['book']
@admin.register(BuyBook)
class BuyBookAdmin(admin.ModelAdmin):
    list_display = ('book', 'buyer', 'cancel', 'sold', 'date')
    search_fields = ('book__title', 'buyer__username')
    list_filter = ('cancel', 'sold', 'date')
    date_hierarchy = 'date'
@admin.register(SwapBook)
class SwapBookAdmin(admin.ModelAdmin):
    list_display = ('book', 'buyer', 'selected_book', 'cancel', 'sold', 'date')
    search_fields = ('book__title', 'buyer__username', 'selected_book__title')
    list_filter = ('cancel', 'sold', 'date')
    date_hierarchy = 'date'

