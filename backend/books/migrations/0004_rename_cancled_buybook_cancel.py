# Generated by Django 5.0.6 on 2024-06-29 20:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0003_alter_book_catagory_alter_bookimage_book_buybook'),
    ]

    operations = [
        migrations.RenameField(
            model_name='buybook',
            old_name='cancled',
            new_name='cancel',
        ),
    ]
