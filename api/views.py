import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from spotipy import SpotifyException
from . import utils


def index(request):
    return JsonResponse({'message': 'Hello from api'})


@require_http_methods('POST')
def login(request):
    body = json.loads(request.body)
    auth_manager = utils.get_auth_manager(request)

    if body.get("code"):
        # Step 4. After getting redirected from Spotify auth page in Step 3
        try:
            auth_manager.get_access_token(body["code"])
            request.session['refresh_token'] = auth_manager.get_cached_token()[
                'refresh_token']
            return JsonResponse({"message": "Success"})
        except Exception as e:
            return JsonResponse({"Error": str(e)}, status=400)

    # Step 1. Check for Cached Token
    try:
        if not auth_manager.get_cached_token():
            # Step 2. Check for refresh token in session before auth link
            refresh_token = request.session['refresh_token']
            auth_manager.refresh_access_token(refresh_token)
            return JsonResponse({"message": "Success"})
    except (KeyError, SpotifyException):
        # This will be encountered if the user removes access from the
        # spotify apps page thus making the refresh token useless
        # Step 3. Display sign in link when no token
        auth_url = auth_manager.get_authorize_url()
        return JsonResponse({"auth_url": auth_url})

    return JsonResponse({"message": "Already Logged In"})


def get_me(request):
    me = request.sp[0].current_user()
    return JsonResponse(me)
