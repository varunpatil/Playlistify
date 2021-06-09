import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid, Button, Typography } from "@material-ui/core";

export default function LoginPage() {
  const [authUrl, setAuthUrl] = useState(null);

  useEffect(() => {
    getAuthurl();
  }, []);

  const getAuthurl = async () => {
    const res = await axios.post("/api/login", {});
    if (res.data.auth_url) {
      setAuthUrl(res.data.auth_url);
    } else if (res.data.message === "Success") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.reload();
    }
  };

  return (
    <Box>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh", maxWidth: "100vw" }}
        backgroundColor="black"
      >
        <Grid item>
          <Typography variant="h2" style={{ color: "#FFFFFF" }}>
            <strong>APP</strong>
          </Typography>
        </Grid>
        <br />
        <Grid item>
          <Button
            variant="contained"
            size="large"
            color="primary"
            style={{ borderRadius: 25 }}
            href={authUrl}
          >
            <Typography variant="subtitle1">
              <strong>Login with your Spotify Account</strong>
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
