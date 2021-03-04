import random
from collections import defaultdict, OrderedDict


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
        'bpm_list': sorted([item['tempo'] for item in features]),

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
