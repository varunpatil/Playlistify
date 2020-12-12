from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login, name='login'),
    path('me', views.get_me, name='me'),
    path('top/tracks', views.top_tracks, name='top_tracks'),
    path('top/artists', views.top_artists, name='top_artists'),
]
