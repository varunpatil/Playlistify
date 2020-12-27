from django.urls import path
from . import views

urlpatterns = [
    path('login', views.login, name='login'),
    path('top/tracks', views.top_tracks, name='top_tracks'),
    path('top/artists', views.top_artists, name='top_artists'),

    path('playlist/create/', views.playlist_create, name='playlist_create'),
    path('playlist/add/', views.playlist_add, name='playlist_add'),
    path('playlist/top/artists/', views.playlist_top_artists, name='playlist_top_artists'),
    
    path('recommendation/seed/', views.seed_recommendation, name='seed_recommendation'),
    path('similar_artists/', views.similar_artists, name='similar_artists'),
]
