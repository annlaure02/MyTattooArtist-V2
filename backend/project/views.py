from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import TattooStyle, Studio
from .serializers import TattooStyleSerializer, StudioSerializer

# Create your views here.
@api_view(['GET', 'POST'])
@permission_classes((AllowAny,))
def tattoo_style_list(request):
    if request.method == 'GET':
        tattoo = TattooStyle.objects.all()
        serializer = TattooStyleSerializer(tattoo, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = TattooStyleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes((AllowAny,))
def studio_list(request):
    if request.method == 'GET':
        studio = Studio.objects.all()
        serializer = StudioSerializer(studio, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = StudioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
