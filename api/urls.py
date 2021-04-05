from django.urls import path
from . import views

urlpatterns = [
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),

    path('me', views.me),
    path('now_playing', views.now_playing),
    path('lyrics', views.get_lyrics),

    path('top/tracks', views.top_tracks),
    path('top/artists', views.top_artists),

    path('playlists/', views.playlists),

    path('playlist/create/', views.playlist_create),
    path('playlist/add/', views.playlist_add),
    path('playlist/top/artists/', views.playlist_top_artists),
    path('playlist/analyze/<playlist_id>', views.playlist_analysis),

    path('recommendation/seed/', views.seed_recommendation),
    path('recommendation/friend/', views.friend_recommendation),
    path('recommendation/mood/', views.mood_recommendation),
    path('recommendation/all-top-artists', views.all_top_artists),
    path('similar_artists/', views.similar_artists),
]
