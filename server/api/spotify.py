import spotipy
from spotipy.cache_handler import CacheHandler
from project.settings import SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI

scope = ' '.join([
    'playlist-read-collaborative',
    'playlist-modify-private',
    'playlist-modify-public',
    'playlist-read-private',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-top-read',
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-read-private',
    'user-library-read',
    'user-modify-playback-state',
])


class DjangoSessionCacheHandler(CacheHandler):
    def __init__(self, request):
        self.request = request

    def get_cached_token(self):
        token_info = None
        try:
            token_info = self.request.session['token_info']
        except KeyError:
            pass
        return token_info

    def save_token_to_cache(self, token_info):
        try:
            self.request.session['token_info'] = token_info
        except Exception as e:
            print("Error saving token to cache: " + str(e))


def get_auth_manager(request):
    auth_manager = spotipy.oauth2.SpotifyOAuth(
        client_id=SPOTIFY_CLIENT_ID,
        client_secret=SPOTIFY_CLIENT_SECRET,
        redirect_uri=SPOTIFY_REDIRECT_URI,
        scope=scope,
        cache_handler=DjangoSessionCacheHandler(request),
        show_dialog=False,
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
        auth_manager=spotipy.oauth2.SpotifyClientCredentials(
            client_id=SPOTIFY_CLIENT_ID,
            client_secret=SPOTIFY_CLIENT_SECRET
        )
    )

    sp = (sp0, sp1)

    return sp
