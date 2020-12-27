import os
import uuid
import spotipy
from django.conf import settings

# <---------------------------Cache and Session-----------------------------------------> #

scope = settings.SCOPE
caches_folder = './.caches/'

if not os.path.exists(caches_folder):
    os.makedirs(caches_folder)


def session_cache_path(request):
    if not request.session.get('uuid'):
        request.session['uuid'] = str(uuid.uuid4())
    return caches_folder + request.session['uuid']


# <---------------------------TOKENS-----------------------------------------------------> #

def get_auth_manager(request):
    auth_manager = spotipy.oauth2.SpotifyOAuth(
        scope=scope,
        cache_path=session_cache_path(request),
        show_dialog=True,
    )
    return auth_manager


def get_spotify_api_clients(request):
    """
    return Spotify API Client object

    sp0 ==> access to user private data
    sp1 ==> access to public spotify data
    sp0 >= sp1 in terms of access

    sp1 is be used to counter rate limiting when user data is not required
    """

    sp0 = spotipy.Spotify(auth_manager=get_auth_manager(request))
    sp1 = spotipy.Spotify(
        auth_manager=spotipy.oauth2.SpotifyClientCredentials())

    sp = (sp0, sp1)

    return sp
