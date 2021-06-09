import React, { useState, useEffect } from "react";
import axios from "axios";

import Page1 from "./Mood/Page1";
import Page2 from "./Mood/Page2";

export default function Mood() {
  const [page, setPage] = useState(1);
  const [mood, setMood] = useState(null);
  const [params, setParams] = useState(null);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const getAllTopArtists = async () => {
      const res = await axios.get("/api/recommendation/all-top-artists");
      setArtists(res.data);
    };

    getAllTopArtists();
  }, []);

  return (
    <div>
      {page === 1 ? (
        <Page1
          setPage={setPage}
          mood={mood}
          setMood={setMood}
          params={params}
          setParams={setParams}
        />
      ) : (
        <Page2
          setPage={setPage}
          mood={mood}
          params={params}
          artists={artists}
        />
      )}
    </div>
  );
}
