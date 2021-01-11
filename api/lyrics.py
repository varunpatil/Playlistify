import json
from lyricsgenius import Genius
from musixmatch import Musixmatch
from project.config import GENIUS_TOKEN, MUSIXMATCH_TOKEN
from textdistance import ratcliff_obershelp


def get_song(track_name, artist_name):
    song = get_song_genius(sanitize(track_name), artist_name)
    if song:
        return song

    song = get_song_genius(track_name, artist_name)
    if song:
        return song

    song = get_song_musixmatch(track_name, artist_name)
    if song:
        return song

    return {}


def get_song_genius(track_name, artist_name):
    genius = Genius(GENIUS_TOKEN, verbose=False)
    song = genius.search_song(track_name, artist_name)

    if not song:
        return None

    song = json.loads(song.to_json())

    if not valid_song(track_name, song['title'], artist_name, song['primary_artist']['name']):
        return None

    lyrics = add_line_breaks(song['lyrics'].split('\n'))
    if not valid_lyrics(lyrics):
        return None

    try:
        meaning = song['description']['plain'].split('\n')
        assert (meaning != ["?"])
    except:
        meaning = None

    response = {
        'lyrics': lyrics,
        'meaning': meaning,
        'source': 'Genius',
        'source_url': song['url'],
    }

    for item in song['media']:
        if item['provider'] == 'youtube':
            response['youtube_embed_url'] = 'https://www.youtube.com/embed/' + \
                item['url'].split('=')[1]
            break

    return response


def get_song_musixmatch(track_name, artist_name):
    musixmatch = Musixmatch(MUSIXMATCH_TOKEN)
    response = musixmatch.matcher_lyrics_get(track_name, artist_name)

    if response['message']['header']['status_code'] != 200:
        return None

    lyrics = add_line_breaks(
        response['message']['body']['lyrics']['lyrics_body'].split('\n'))

    if lyrics == [""]:
        lyrics = None

    return {
        'lyrics': lyrics,
        'source': 'Musixmatch',
    }


# <----------------------------->


def sanitize(name):
    for x in [" - ", "("]:
        if x in name:
            name = name.split(x)[0]
    return name.strip()


def valid_song(*input):
    names = [x.lower().strip() for x in input]
    minimum_score = (0.5, 0.5)  # Track, Artist

    score1 = ratcliff_obershelp(names[0], names[1])
    score2 = ratcliff_obershelp(names[2], names[3])
    
    # print(names[0], "and", names[1], " got a score of ", score1)
    # print(names[2], "and", names[3], " got a score of ", score2)

    return score1 >= minimum_score[0] and score2 >= minimum_score[1]


def valid_lyrics(lyrics):
    word_count = sum(len(line.split()) for line in lyrics)
    return (word_count < 2500)


def add_line_breaks(my_list):
    if not len(my_list):
        return my_list

    out = [my_list[0]]

    for line in my_list[1:]:
        if out[-1] != "" and len(line) and line[0] == '[' and line[-1] == ']':
            out.append("")
        out.append(line)

    return out
