import os

DJANGO_SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')
GENIUS_TOKEN = os.environ.get('GENIUS_CLIENT_ACCESS_TOKEN')
MUSIXMATCH_TOKEN = os.environ.get('MUSIXMATCH_API_KEY')

min = 60
hr = 60*min
day = 24*hr
