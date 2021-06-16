import time

from django.http import JsonResponse
from django.urls import reverse
from project.settings import TIMER
from spotipy import SpotifyException

from . import spotify


class LoginRequiredMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith('/api') and request.path not in [reverse('login'), reverse('logout')]:
            auth_manager = spotify.get_auth_manager(request)
            token_info = auth_manager.cache_handler.get_cached_token()

            try:
                valid_token_info = auth_manager.validate_token(token_info)
                # SpotifyException if the user removes access from the
                # spotify apps page thus making the refresh token useless
                # and attempting to refresh will result in a SpotifyException
                assert (valid_token_info is not None)
            except (SpotifyException, AssertionError):
                return JsonResponse({"Error": "Not Logged In"}, status=403)

        response = self.get_response(request)
        return response


class InitRequestMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith('/api') and request.path not in [reverse('login'), reverse('logout')]:
            request.sp = spotify.get_spotify_api_clients(request)

            if not request.session.get('me'):
                request.session['me'] = request.sp[0].me()

        response = self.get_response(request)
        return response


class TimerMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start = time.time()
        response = self.get_response(request)
        end = time.time()
        if TIMER:
            print("\n\nTook " + str(end - start) + " secs")
        return response
