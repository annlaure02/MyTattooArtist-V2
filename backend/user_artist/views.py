from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, status, generics, filters
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from django.middleware.csrf import get_token
from django.contrib.auth import login, logout
from rest_framework.decorators import api_view
from django_filters.rest_framework import DjangoFilterBackend
from .models import UserArtist
from .serializers import UserArtistSerializer, UserRegisterSerializer, UserLoginSerializer

@api_view(['GET'])
@ensure_csrf_cookie
def csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrftoken': csrf_token})


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(serializer.validated_data)
            if user:
                data = serializer.data
                data['artistId'] = user.id  
                return Response(data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    

class UserLogin(APIView):
    def post(self, request):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)

            response_data = serializer.data
            response_data['artistId'] = user.id
            response_data['csrftoken'] = get_token(request)

            return Response(response_data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()

	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)

#retrieve all artist  and create it in DB
@api_view(['GET', 'POST'])
@permission_classes((AllowAny,))
def user_artist_list(request):
    if request.method == 'GET':
        artists = UserArtist.objects.filter(is_superuser=False)
        serializer = UserArtistSerializer(artists, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = UserArtistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
#retrieve, create, update and delete for the artist personal page

@api_view(['GET', 'PUT', 'DELETE'])
def user_artist_detail(request, pk):
    try:
        artist = UserArtist.objects.get(pk=pk)
    except UserArtist.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserArtistSerializer(artist)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserArtistSerializer(artist, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    
    elif request.method == 'DELETE':
        artist.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class TattooStyleFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        style_param = request.query_params.get('style_name')
        if style_param:
            queryset = queryset.filter(tattoo_style__style_name=style_param)
        return queryset
    
class ArtistNameFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        style_param = request.query_params.get('artist_name')
        if style_param:
            queryset = queryset.filter(artist_name=style_param)
        return queryset
    
class StudioCityFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        style_param = request.query_params.get('studio_city')
        if style_param:
            queryset = queryset.filter(studio_city=style_param)
        return queryset
    
class StudioStateFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        style_param = request.query_params.get('studio_state')
        if style_param:
            queryset = queryset.filter(studio_state=style_param)
        return queryset


class UserArtistAPIView(generics.ListCreateAPIView):
    queryset = UserArtist.objects.filter(is_superuser=False)
    serializer_class = UserArtistSerializer
    filter_backends = [TattooStyleFilter, ArtistNameFilter, StudioStateFilter, StudioCityFilter, filters.SearchFilter]
    permission_classes = (AllowAny,)
        