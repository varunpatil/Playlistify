from lyricsgenius import Genius
from musixmatch import Musixmatch
from project.config import GENIUS_TOKEN, MUSIXMATCH_TOKEN


def sanitize(name):
    for x in [" - ", "("]:
        if x in name:
            name = name.split(x)[0]
    return name.strip()


def get_song(track_name, artist_name):
    song = get_song_genius(track_name, artist_name)
    if song:
        return song

    song = get_song_musixmatch(track_name, artist_name)
    if song:
        return song

    return None


def get_song_genius(track_name, artist_name):
    genius = Genius(GENIUS_TOKEN, verbose=False)
    song = genius.search_song(sanitize(track_name), artist_name)

    if not song:
        song = genius.search_song(track_name, artist_name)
        if not song:
            return None

    lyrics = song.lyrics.split('\n')
    word_count = 0
    for line in lyrics:
        word_count += len(line.split())
    if word_count > 2500:  # filter out incorrect lyrics
        return None

    response = {
        'found': True,
        'track_name': track_name,
        'artist_name': artist_name,
        'lyrics': lyrics,
        'source': 'Genius',
        'source_url': song.url,
    }

    for item in song.media:
        if item['provider'] == 'youtube':
            response['youtube_url'] = item['url']
            response['youtube_embed_url'] = 'https://www.youtube.com/embed/' + \
                item['url'].split('=')[1]
            break

    return response


def get_song_musixmatch(track_name, artist_name):
    musixmatch = Musixmatch(MUSIXMATCH_TOKEN)
    response = musixmatch.matcher_lyrics_get(track_name, artist_name)

    if response['message']['header']['status_code'] != 200:
        return None

    return {
        'found': True,
        'track_name': track_name,
        'artist_name': artist_name,
        'lyrics': response['message']['body']['lyrics']['lyrics_body'].split('\n'),
        'source': 'Musixmatch',
    }
