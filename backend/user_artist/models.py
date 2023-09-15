import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from project.models import TattooStyle, Studio
from .utils import user_album_directory_path, user_flash_directory_path

# Create your models here.
class UserArtistManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)

#create table user artist in DB
class UserArtist(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    artist_name = models.CharField(max_length=50, blank=True)
    phone = models.CharField(max_length=10, blank=True)
    email = models.EmailField(unique=True)
    profile_picture = models.ImageField(upload_to='profile_picture/', blank=True, null=True)
    biography = models.TextField(max_length=1000, blank=True)
    facebook = models.CharField(max_length=255, blank=True)
    instagram = models.CharField(max_length=255, blank=True)
    x = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=75, blank=True)
    actif = models.BooleanField(default=False)
    tattoo_style = models.ManyToManyField(TattooStyle, blank=True)
    studio = models.ManyToManyField(Studio, blank=True)
    username = None


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserArtistManager()

    def __str__(self):
        return self.email

#create table user artist album in DB
class UserArtistAlbum(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_artist = models.ForeignKey(UserArtist, on_delete=models.CASCADE,)
    image = models.ImageField(upload_to=user_album_directory_path, blank=True, null=True)

    def __str__(self):
        return self.user_artist.artist_name

#create table user artist flash in DB    
class UserArtistFlash(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_artist = models.ForeignKey(UserArtist, on_delete=models.CASCADE,)
    image = models.ImageField(upload_to=user_flash_directory_path, blank=True, null=True)

    def __str__(self):
        return self.user_artist.artist_name