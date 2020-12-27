from collections import OrderedDict


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


def add_to_playlist(request, playlist_id, track_ids, limit=10000, shuffle=False, allow_duplicates=False):
    if not allow_duplicates:
        track_ids = remove_duplicates(track_ids)

    track_ids = track_ids[:limit]

    if shuffle:
        random.shuffle(track_ids)

    for i in range(0, len(track_ids), 100):
        request.sp[0].playlist_add_items(playlist_id, track_ids[i:i+100])
