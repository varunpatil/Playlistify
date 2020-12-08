import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LoginPage() {
  const [authUrl, setAuthUrl] = useState("/");

  useEffect(() => {
    getAuthurl();
  }, []);

  const getAuthurl = async () => {
    const res = await axios.post("/api/login", {});
    if (res.data.auth_url) {
      setAuthUrl(res.data.auth_url);
    } else if (res.data.message === "Success") {
      localStorage.setItem("isLoggedIn", true);
    }
  };

  return (
    <div>
      <h1>This is Login page.</h1>
      <button>
        <a href={authUrl}>Login</a>
      </button>
    </div>
  );
}
