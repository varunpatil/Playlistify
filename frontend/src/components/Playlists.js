import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";

import Loader from "./Loader";
import PlaylistItem from "./PlaylistItem";

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(async () => {
    const res = await axios.get("/api/playlists/");
    setPlaylists(res.data);
  }, []);

  return (
    <div>
      {playlists.length ? (
        <Grid container spacing={4} justify="center" alignItems="center">
          {playlists.map((p, key) => (
            <Grid item key={key} xs={12} md={6} lg={4} xl={3} spaceing={2}>
              <PlaylistItem key={key} playlist={p} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Loader />
      )}
    </div>
  );
}
