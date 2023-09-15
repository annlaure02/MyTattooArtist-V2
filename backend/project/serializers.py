from rest_framework import serializers
from .models import TattooStyle, Studio

class TattooStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = TattooStyle
        fields = '__all__'

class StudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Studio
        fields = '__all__'