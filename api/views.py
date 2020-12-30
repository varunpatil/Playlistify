import os
import json
import time

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from spotipy import SpotifyException

from . import utils, helpers


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

    return JsonResponse({"message": "Success"})


def logout(request):
    cache_path = utils.session_cache_path(request)
    os.remove(cache_path)
    request.session.flush()
    return JsonResponse({"message": "Success"})


def me(request):
    return JsonResponse(request.session['me'])


def top_tracks(request):
    time_range = request.GET.get('time_range', 'short_term')
    response = request.sp[0].current_user_top_tracks(
        time_range=time_range, limit=50)

    return JsonResponse(response['items'], safe=False)


def top_artists(request):
    time_range = request.GET.get('time_range', 'short_term')
    response = request.sp[0].current_user_top_artists(
        time_range=time_range, limit=50)

    return JsonResponse(response['items'], safe=False)


@require_http_methods('POST')
def playlist_create(request):
    body = json.loads(request.body)
    name = body['name']
    description = body.get('description', '') + ' - Created using APP :)'
    public = body.get('public', False)

    response = request.sp[0].user_playlist_create(
        user=request.session['me']['id'], name=name,
        public=public, description=description
    )

    return JsonResponse({"playlist_id": response['id']})


@require_http_methods('POST')
def playlist_add(request):
    body = json.loads(request.body)
    playlist_id = body['playlist_id']
    track_ids = body['track_ids']

    helpers.add_to_playlist(request, playlist_id, track_ids)
    return JsonResponse({"message": "success"})


@require_http_methods('POST')
def playlist_top_artists(request):
    body = json.loads(request.body)
    playlist_id = body['playlist_id']
    artist_ids = body['artist_ids'][:20]

    tracks = []

    for artist_id in artist_ids:
        response = request.sp[1].artist_top_tracks(
            artist_id, country=request.session['me']['country'])
        tracks.extend(response['tracks'][:5])

    track_ids = [track['id'] for track in tracks]
    helpers.add_to_playlist(request, playlist_id,
                            track_ids, limit=100, shuffle=True)
    return JsonResponse({"message": "success"})


@require_http_methods('POST')
def seed_recommendation(request):
    body = json.loads(request.body)
    playlist_id = body['playlist_id']
    input_track_ids = body.get('track_ids', [])[:20]
    input_artist_ids = body.get('artist_ids', [])[:20]
    assert (not input_artist_ids or not input_track_ids)

    track_ids = []

    for i in range(0, 20, 5):
        response = request.sp[1].recommendations(
            seed_tracks=input_track_ids[i:i + 5],
            seed_artists=input_artist_ids[i:i + 5],
            limit=10, country=request.session['me']['country']
        )
        track_ids.extend([track['id'] for track in response['tracks']])

    helpers.add_to_playlist(request, playlist_id, track_ids)
    return JsonResponse({"message": "success"})


@require_http_methods('POST')
def similar_artists(request):
    body = json.loads(request.body)
    playlist_id = body['playlist_id']
    artist_ids = body['artist_ids'][:20]
    artist_ids = helpers.remove_duplicates(artist_ids)

    similar_artist_ids = []

    for artist_id in artist_ids:
        response = request.sp[1].artist_related_artists(artist_id)
        if len(response['artists']):
            similar_artist_ids.append(response['artists'][0]['id'])

    similar_artist_ids = helpers.remove_duplicates(similar_artist_ids)
    tracks = []

    for artist_id in similar_artist_ids:
        response = request.sp[1].artist_top_tracks(
            artist_id, country=request.session['me']['country'])
        tracks.extend(response['tracks'][:5])

    tracks = sorted(tracks, key=lambda k: k['popularity'], reverse=True)
    track_ids = [track['id'] for track in tracks]

    helpers.add_to_playlist(request, playlist_id, track_ids,
                            limit=50, allow_saved_tracks=False)
    return JsonResponse({"message": "success"})
