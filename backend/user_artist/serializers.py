from rest_framework import serializers
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from .models import UserArtist, UserArtistAlbum, UserArtistFlash
from project.serializers import TattooStyleSerializer, StudioSerializer
from project.models import TattooStyle, Studio


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserArtist
        fields = ['email', 'password', 'first_name', 'last_name', 'phone']

    def create(self, clean_data):
        user_obj = UserArtist.objects.create_user(
             email=clean_data['email'],
             password=clean_data['password'],
             first_name=clean_data['first_name'],
             last_name=clean_data['last_name'],
             phone=clean_data['phone'])
        user_obj.save()
        return user_obj


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self, clean_data):
        user = authenticate(email=clean_data['email'],
                            password=clean_data['password'])
        if not user:
            raise ValidationError('user not found')
        return user


class UserArtistAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserArtistAlbum
        fields = '__all__'


class UserArtistFlashSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserArtistFlash
        fields = '__all__'


class UserArtistSerializer(serializers.ModelSerializer):
    tattoo_style = TattooStyleSerializer(many=True, required=False)
    studio = StudioSerializer(many=True, required=False)
    album = UserArtistAlbumSerializer(many=True, required=False,
                                      read_only=True,
                                      source='userartistalbum_set')
    uploaded_images_album = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True, required=False)
    flash = UserArtistFlashSerializer(many=True, required=False,
                                      read_only=True,
                                      source='userartistflash_set')
    uploaded_images_flash = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True, required=False)

    class Meta:
        model = UserArtist
        fields = '__all__'

    def create(self, validated_data):
        tattoo_data = validated_data.pop('tattoo_style', [])
        studio_all_data = validated_data.pop('studio', [])
        uploaded_images_album = validated_data.pop("uploaded_images_album", [])
        uploaded_images_flash = validated_data.pop("uploaded_images_flash", [])

        user_artist = UserArtist.objects.create(**validated_data)

        tattoo_obj = []
        for tattoo_style_data in tattoo_data:
            tattoo, created = TattooStyle.objects.get_or_create(
                **tattoo_style_data)
            tattoo_obj.append(tattoo)
        user_artist.tattoo_style.set(tattoo_obj)

        studio_obj = []
        for studio_data in studio_all_data:
            studio, created = Studio.objects.get_or_create(
                **studio_data)
            studio_obj.append(studio)
        user_artist.studio.set(studio_obj)

        for image in uploaded_images_album:
            UserArtistAlbum.objects.create(user_artist=user_artist,
                                           image=image)

        for image in uploaded_images_flash:
            UserArtistFlash.objects.create(user_artist=user_artist,
                                           image=image)

        return user_artist

    def update(self, instance, validated_data):
        tattoo_data = validated_data.pop('tattoo_style', [])
        studio_all_data = validated_data.pop('studio', [])
        uploaded_images_album = validated_data.pop('uploaded_images_album', [])
        uploaded_images_flash = validated_data.pop('uploaded_images_flash', [])

        instance = super().update(instance, validated_data)

        if tattoo_data:
            tattoo_obj = []
            for tattoo_style_data in tattoo_data:
                tattoo, created = TattooStyle.objects.get_or_create(
                    **tattoo_style_data)
                tattoo_obj.append(tattoo)
            instance.tattoo_style.set(tattoo_obj)

        if studio_all_data:
            studio_obj = []
            for studio_data in studio_all_data:
                studio, created = Studio.objects.get_or_create(**studio_data)
                studio_obj.append(studio)
            instance.studio.set(studio_obj)

        for image in uploaded_images_album:
            UserArtistAlbum.objects.get_or_create(user_artist=instance,
                                                  image=image)

        for image in uploaded_images_flash:
            UserArtistFlash.objects.get_or_create(user_artist=instance,
                                                  image=image)

        return instance
