// calculated by mixing a bunch of mood playlists for
// a given mood and averaging and adjusting features of all tracks

export const MOOD_PARAMS = {
    dance: {
        acousticness: 0.10,
        danceability: 0.80,
        energy: 0.75,
        instrumentalness: 0.05,
        popularity: 60,
        speechiness: 0.10,
        tempo: 125,
        valence: 0.50,
    },
    energy: {
        acousticness: 0.10,
        danceability: 0.70,
        energy: 0.85,
        instrumentalness: 0.05,
        popularity: 60,
        speechiness: 0.10,
        tempo: 125,
        valence: 0.55,
    },
    happy: {
        acousticness: 0.25,
        danceability: 0.70,
        energy: 0.70,
        instrumentalness: 0.05,
        popularity: 65,
        speechiness: 0.05,
        tempo: 120,
        valence: 0.70,
    },
    relax: {
        acousticness: 0.55,
        danceability: 0.50,
        energy: 0.35,
        instrumentalness: 0.15,
        popularity: 50,
        speechiness: 0.05,
        tempo: 105,
        valence: 0.35,
    },
    sad: {
        acousticness: 0.55,
        danceability: 0.55,
        energy: 0.35,
        instrumentalness: 0.05,
        popularity: 60,
        speechiness: 0.1,
        tempo: 115,
        valence: 0.25,
    },
}
