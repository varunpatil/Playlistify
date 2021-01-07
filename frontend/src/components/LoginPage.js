import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";

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
    <div>
      <h1>This is Login page.</h1>
      <Button variant="contained" color="primary" href={authUrl}>
        Login
      </Button>
    </div>
  );
}
