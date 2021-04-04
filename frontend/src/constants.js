// calculated by mixing a bunch of mood playlists for
// a given mood and averaging and adjusting features of all tracks

export const MOOD_PARAMS = {
  Dance: {
    acousticness: 10,
    danceability: 80,
    energy: 75,
    popularity: 60,
    tempo: 125,
    valence: 50,
  },
  Energy: {
    acousticness: 10,
    danceability: 70,
    energy: 85,
    popularity: 60,
    tempo: 125,
    valence: 55,
  },
  Happy: {
    acousticness: 25,
    danceability: 70,
    energy: 70,
    popularity: 65,
    tempo: 120,
    valence: 70,
  },
  Relax: {
    acousticness: 55,
    danceability: 50,
    energy: 35,
    popularity: 50,
    tempo: 105,
    valence: 35,
  },
  Sad: {
    acousticness: 55,
    danceability: 55,
    energy: 35,
    popularity: 60,
    tempo: 115,
    valence: 25,
  },
};
