import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid, Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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
      location.reload();
    }
  };

  return (
    <Box>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
        backgroundColor="black"
        spacing={6}
      >
        <Grid item>
          <WhiteTextTypography variant="h2">
            <strong>APP</strong>
          </WhiteTextTypography>
        </Grid>
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

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);
