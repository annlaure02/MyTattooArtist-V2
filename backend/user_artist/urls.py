from django.urls import path
from . import views


urlpatterns = [
    path('api/ma-page-artiste/', views.user_artist_list),
    path('api/ma-page-artiste/<str:pk>/', views.user_artist_detail),
    path('api/search/', views.UserArtistAPIView.as_view()),
    path('api/register/', views.UserRegister.as_view()),
	path('api/login/', views.UserLogin.as_view()),
	path('api/logout/', views.UserLogout.as_view()),
    path('api/csrf_token/', views.csrf_token),
]