import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Me() {
  const [content, setContent] = useState('');

  useEffect(() => {
    getContent();
  }, []);

  const getContent = async () => {
    const res = await axios.get("/api/me");
    console.log(res.data);
    setContent(res.data);
  };

  return <div>{JSON.stringify(content)}</div>;
}
