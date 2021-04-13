import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Container,
  Button,
} from "@material-ui/core";

import Navigate from "./Navigate";
import CreatePlaylistButton from "./CreatePlaylistButton";
import Loader from "../../Loader";

export default function Page2(props) {
  const [artistIds, setArtistIds] = useState(new Set());
  const smallScreen = screen.width <= 600;
  const artistSelectionComplete = Boolean(artistIds.size === 5);

  return (
    <Container maxWidth={false}>
      <Paper style={{ padding: 20, marginBottom: 20 }}>
        <Typography variant="h4" component="h1" align="center">
          Choose 5 Artists To Match Your Mood
        </Typography>
      </Paper>

      {props.artists.length === 0 ? <Loader /> : null}

      <Grid
        container
        spacing={smallScreen ? 2 : 8}
        justify="center"
        alignItems="center"
      >
        {props.artists.map((artist) => (
          <Grid
            item
            key={artist.id}
            xs={6}
            sm="auto"
            md="auto"
            lg="auto"
            xl="auto"
          >
            <Box
              border={4}
              borderColor={
                artistIds.has(artist.id) ? "primary.main" : "#ffffff00" // 0 opacity
              }
            >
              <Avatar
                component={Button}
                alt={artist.name}
                src={artist.image_url}
                style={{
                  width: smallScreen ? "calc(50vw - 4em)" : "240px",
                  height: smallScreen ? "calc(50vw - 4em)" : "240px",
                  marginBottom: "10px",
                }}
                onClick={() => {
                  if (artistIds.has(artist.id)) {
                    artistIds.delete(artist.id);
                    setArtistIds(new Set([...artistIds]));
                  } else if (!artistSelectionComplete) {
                    setArtistIds(new Set([...artistIds, artist.id]));
                  }
                }}
              />
              <Typography component="h3" align="center">
                {artist.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {artistSelectionComplete ? (
        <CreatePlaylistButton
          mood={props.mood}
          params={props.params}
          artistIds={[...artistIds]}
          artistNames={props.artists
            .filter((artist) => artistIds.has(artist.id))
            .map((artist) => artist.name)}
        />
      ) : null}
      <Navigate title="Back" setPage={props.setPage} goto={1} left={true} />
    </Container>
  );
}
