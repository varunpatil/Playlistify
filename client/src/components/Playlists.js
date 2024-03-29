import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { Container, Grid } from "@material-ui/core";

import Loader from "./Loader";
import PlaylistItem from "./Playlists/PlaylistItem";

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const getPlaylists = async () => {
      const res = await axios.get("/playlists/");
      setPlaylists(res.data);
    };

    getPlaylists();
  }, []);

  return (
    <Container maxWidth={false}>
      {playlists.length === 0 ? <Loader /> : null}

      <Grid container spacing={8} justify="center" alignItems="center">
        {playlists.map((playlist) => (
          <Grid
            item
            key={playlist.id}
            xs={12}
            sm="auto"
            md="auto"
            lg="auto"
            xl="auto"
          >
            <PlaylistItem playlist={playlist} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
