from django.urls import path
from . import views


urlpatterns = [
    path('api/all-artists/', views.user_artist_list),
    path('api/ma-page-artiste/<str:pk>/', views.user_artist_detail),
    path('api/ma-page-artiste/<str:artist_id>/delete-album/<str:album_id>/', views.delete_artist_album),
    path('api/ma-page-artiste/<str:artist_id>/delete-flash/<str:flash_id>/', views.delete_artist_flash),
    path('api/search/', views.UserArtistAPIView.as_view()),
    path('api/register/', views.UserRegister.as_view()),
	path('api/login/', views.UserLogin.as_view()),
	path('api/logout/', views.UserLogout.as_view()),
    path('api/csrf_token/', views.csrf_token),
]