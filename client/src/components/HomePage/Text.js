import React from "react";
import Loader from "../Loader";
import { Typography } from "@material-ui/core";

export default function Text(props) {
  if (!props.info) return <Loader />;

  const data = props.name === "Lyrics" ? props.info.lyrics : props.info.meaning;

  if (!data)
    return (
      <Typography variant="h6" align="center">
        {props.name} Not Found :(
      </Typography>
    );

  return (
    <div align="center" style={{ marginLeft: "6px", marginRight: "6px" }}>
      {data.map((line, key) => (
        <div key={key}>
          {line !== "" ? <Typography>{line}</Typography> : <br />}
        </div>
      ))}
    </div>
  );
}
