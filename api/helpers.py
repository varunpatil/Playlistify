import random
from collections import Counter, defaultdict, OrderedDict
from spotipy import SpotifyException


def remove_duplicates(my_list):
    return list(OrderedDict.fromkeys(my_list))


def filter_saved_tracks(request, track_ids):
    # filter out tracks already in user's library
    mask = []
    for i in range(0, len(track_ids), 50):
        response = request.sp[0].current_user_saved_tracks_contains(
            track_ids[i:i+50])
        mask.extend(response)

    return [item for item, is_saved in zip(track_ids, mask) if not is_saved]


def add_to_playlist(request, playlist_id, track_ids, limit=10000, shuffle=False, allow_duplicates=False, allow_saved_tracks=True):
    if not allow_duplicates:
        track_ids = remove_duplicates(track_ids)

    if not allow_saved_tracks:
        track_ids = filter_saved_tracks(request, track_ids)

    track_ids = track_ids[:limit]

    if shuffle:
        random.shuffle(track_ids)

    for i in range(0, len(track_ids), 100):
        request.sp[0].playlist_add_items(playlist_id, track_ids[i:i+100])


def get_audio_features(request, track_ids):
    features = []
    size = len(track_ids)

    for i in range(0, len(track_ids), 50):
        response = request.sp[1].audio_features(track_ids[i:i + 50])
        features.extend(response)

    return {
        'bpms': [item['tempo']//1 for item in features],

        # Average across all tracks (score out of 100)
        'energy': (100 * sum(item['energy'] for item in features) / size) // 1,
        'valence': (100 * sum(item['valence'] for item in features) / size) // 1,
        'liveness': (100 * sum(item['liveness'] for item in features) / size) // 1,
        'speechiness': (100 * sum(item['speechiness'] for item in features) / size) // 1,
        'acousticness': (100 * sum(item['acousticness'] for item in features) / size) // 1,
        'danceability': (100 * sum(item['danceability'] for item in features) / size) // 1,
        'instrumentalness': (100 * sum(item['instrumentalness'] for item in features) / size) // 1,
    }


def get_artist_genre_frequency(request, artist_ids):
    artist_freq = defaultdict(lambda: {'name': None, 'count': 0})
    genre_freq = defaultdict(lambda: 0)

    for a_id in artist_ids:
        artist_freq[a_id]['count'] += 1

    unique_artist_ids = remove_duplicates(artist_ids)

    for i in range(0, len(unique_artist_ids), 50):
        response = request.sp[1].artists(unique_artist_ids[i:i + 50])
        for artist in response['artists']:
            artist_freq[artist['id']]['name'] = artist['name']

            # Calculating genre weightage
            n = len(artist['genres'])
            if n > 0:
                artist_weight = artist_freq[artist['id']]['count'] / (2**n - 1)
                for i, genre in enumerate(artist['genres'], start=1):
                    genre_freq[genre] += artist_weight * (2 ** (n-i))

    # filtering and rounding off
    genre_freq = {k: round(v) for k, v in genre_freq.items() if round(v) >= 1}

    # flatten out artist_freq into a dictionary
    artist_freq = {val['name']: val['count'] for val in artist_freq.values()}

    # sort according to frequency
    artist_freq = {k: v for k, v in sorted(
        artist_freq.items(), key=lambda x: x[1], reverse=True)}
    genre_freq = {k: v for k, v in sorted(
        genre_freq.items(), key=lambda x: x[1], reverse=True)}

    return artist_freq, genre_freq


def get_user(request, user_id):
    if user_id.startswith('spotify:user:'):
        user_id = user_id.split(':')[2]
    elif user_id.startswith('https://open.spotify.com/user/'):
        user_id = user_id.split('?')[0]
        user_id = user_id[len('https://open.spotify.com/user/'):]

    try:
        user = request.sp[1].user(user_id)
        return {
            'id': user['id'],
            'name': user['display_name']
        }
    except SpotifyException:
        return {'is_invalid': True}


def is_user_playlist(item, user_id):
    return (
        item['owner']['id'] == user_id or
        item['name'].startswith('Your Top Songs') or
        item['name'] == 'On Repeat' or
        item['name'] == 'Repeat Rewind'
    )


def get_recommendation_track_ids(request, items):
    # filtering out local tracks and podcast episodes from items
    # creating list of tuples (id,pop)
    tracks = [
        (item['track']['id'], item['track']['popularity']) for item in items
        if (bool(item['track']) and not item['track']['is_local'] and item['track']['type'] == 'track')
    ]

    counts = dict(Counter(tracks))
    tracks.clear()

    for (id, popularity), count in counts.items():
        try:
            boosted_popularity = popularity * (1.15 ** (count-1))
        except OverflowError:
            boosted_popularity = float('inf')
        tracks.append({
            'id': id,
            'popularity': boosted_popularity
        })

    track_ids = [track['id'] for track in sorted(tracks, key=lambda x: x['popularity'], reverse=True)]

    # filter saved tracks only until we get 100 tracks
    filtered_track_ids = []
    idx = 0

    while len(filtered_track_ids) < 100 and idx < len(track_ids):
        mask = request.sp[0].current_user_saved_tracks_contains(track_ids[idx:idx+50])
        filtered_track_ids.extend(
            [item for item, is_saved in zip(track_ids[idx:idx+50], mask) if not is_saved]
        )
        idx += 50

    return filtered_track_ids
