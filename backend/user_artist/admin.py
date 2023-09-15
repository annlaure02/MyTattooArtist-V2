from django.contrib import admin
from .models import UserArtist, UserArtistAlbum, UserArtistFlash

# Register your models here.

admin.site.register(UserArtist)
admin.site.register(UserArtistAlbum)
admin.site.register(UserArtistFlash)