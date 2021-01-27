# Steps to run on your machine

```
git clone https://github.com/varunpatil/sp-project.git && cd sp-project
```

### Terminal 1 (frontend)
```
cd frontend/
npm install
npm run dev
```

### Terminal 2 (api)
- Go to https://developer.spotify.com/dashboard/applications and create an app
- set the Redirect URI in the app settings on spotify dashboard to http://127.0.0.1:8000/login
- Set the environment variables
```
export SPOTIFY_CLIENT_ID='<your client id>'
export SPOTIFY_CLIENT_SECRET='<your client secret>'
export SPOTIFY_REDIRECT_URI='http://127.0.0.1:8000/login'
export DJANGO_SECRET_KEY='any-random-string'
```

#### If you want lyrics (optional)
- create an app on https://genius.com/api-clients and enter the client access token below
```
export GENIUS_CLIENT_ACCESS_TOKEN = '<your genius token>'
```
- get api key from https://developer.musixmatch.com/signup
```
export MUSIXMATCH_API_KEY = '<your musixmatch api key>'
```

- Create virtualenv and activate it
```
python3 -m venv env
source env/bin/activate
```
- install requirements and start the django server
```
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
#### Open http://127.0.0.1:8000/ in your browser
