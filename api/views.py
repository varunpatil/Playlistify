import json
import os
import time

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_POST
from django.views.decorators.cache import cache_control, never_cache
from spotipy import SpotifyException

from . import helpers, lyrics, spotify

# Saving api json response for speed
from extras.response import resp


@require_POST
def login(request):
    body = json.loads(request.body)
    auth_manager = spotify.get_auth_manager(request)

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


@require_POST
def logout(request):
    cache_path = spotify.session_cache_path(request)
    os.remove(cache_path)
    request.session.flush()
    return JsonResponse({"message": "Success"})


@cache_control(max_age=3600)
def me(request):
    return JsonResponse(request.session['me'])


@never_cache
def now_playing(request):
    response = request.sp[0].current_user_playing_track()
    if (
        response is None or
        response['currently_playing_type'] != 'track' or
        response['item']['is_local']
    ):
        return JsonResponse({'message': 'No track currently playing'})
    # Returning only required info because this endpoint is hit every 3 seconds with no cache
    # 12x less network usage
    result = {
        'track_id': response['item']['id'],
        'track_name': response['item']['name'],
        'artist_name': response['item']['artists'][0]['name'],
        'album_name': response['item']['album']['name'],
        'progress_ms': response['progress_ms'],
        'duration_ms': response['item']['duration_ms'],
        'image_url': response['item']['album']['images'][1]['url'],
    }
    return JsonResponse(result)


@cache_control(max_age=365*24*3600)
def get_lyrics(request):
    track_name = request.GET['track_name']
    artist_name = request.GET['artist_name']
    song = lyrics.get_song(track_name, artist_name)
    return JsonResponse(song)


@cache_control(max_age=3600)
def top_tracks(request):
    time_range = request.GET.get('time_range', 'short_term')
    response = request.sp[0].current_user_top_tracks(
        time_range=time_range, limit=50)

    return JsonResponse(response['items'], safe=False)


@cache_control(max_age=3600)
def top_artists(request):
    time_range = request.GET.get('time_range', 'short_term')
    response = request.sp[0].current_user_top_artists(
        time_range=time_range, limit=50)

    return JsonResponse(response['items'], safe=False)


@cache_control(max_age=3600)
def playlists(request):
    response = request.sp[0].current_user_playlists()
    playlists = response['items']

    while response['next']:
        response = request.sp[0].next(response)
        playlists.extend(response['items'])

    result = [{
        'name': item['name'],
        'id': item['id'],
        'total_tracks': item['tracks']['total'],
        'owner': item['owner']['id'] == request.session['me']['id'],
        'public': item['public'],
        'image_url': item['images'][1]['url'] if (len(item['images']) > 1) else item['images'][0]['url'],
    } for item in playlists]

    return JsonResponse(result, safe=False)


@require_POST
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


@require_POST
def playlist_add(request):
    body = json.loads(request.body)
    playlist_id = body['playlist_id']
    track_ids = body['track_ids']

    helpers.add_to_playlist(request, playlist_id, track_ids)
    return JsonResponse({"message": "success"})


@require_POST
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


@cache_control(max_age=2*60)
def playlist_analysis(request, playlist_id):
    # fetching basic playlist details
    response = request.sp[1].playlist(
        playlist_id=playlist_id,
        market=request.session['me']['country'],
        fields='name,description,followers.total,external_urls.spotify,images,tracks.total'
    )

    result = {
        'header': {
            'name': response['name'],
            'description': response['description'],
            'followers': response['followers']['total'],
            'url': response['external_urls']['spotify'],
            'image_url': response['images'][0]['url'],
            'no_of_tracks': response['tracks']['total'],
        }
    }

    # fetching playlist tracks and their basic details
    response = request.sp[1].playlist_items(
        playlist_id=playlist_id,
        fields="next,items(added_at,track(album.release_date,artists(id),duration_ms,id,is_local,popularity,type))",
        market=request.session['me']['country'],
        additional_types=("track",)
    )

    items = response['items']

    while response['next']:
        response = request.sp[1].next(response)
        items.extend(response['items'])

    # filtering out local tracks and podcast episodes from items
    items = [
        item for item in items
        if (not item['track']['is_local'] and item['track']['type'] == 'track')
    ]

    added_at_dates = sorted([item['added_at'][:10] for item in items])
    duration_mss = sorted([item['track']['duration_ms'] for item in items])
    popularities = sorted([item['track']['popularity'] for item in items])
    release_years = sorted([item['track']['album']['release_date'][:4]
                            for item in items])

    track_ids = [item['track']['id'] for item in items]
    artist_ids = [item['track']['artists'][0]['id'] for item in items]

    audio_features = helpers.get_audio_features(request, track_ids)
    artist_freq, genre_freq = helpers.get_artist_genre_frequency(
        request, artist_ids)

    result.update({
        'added_at_dates': added_at_dates,
        'release_years': release_years,
        'duration_mss': duration_mss,
        'popularities': popularities,
        'audio_feaures': audio_features,
        'artist_frequency': artist_freq,
        'genre_frequency': genre_freq,
    })

    return JsonResponse(result)


@require_POST
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


@require_POST
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
