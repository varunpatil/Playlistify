import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Paper, Typography } from "@material-ui/core";

export default function Bar({ data }) {
  if (!data) return null;
  const smallScreen = window.screen.width <= 600;

  return (
    <div style={{ height: smallScreen ? "40vh" : "70vh" }}>
      <Typography
        variant="h5"
        component="h1"
        align="center"
        style={{ paddingTop: 20 }}
      >
        Average Audio Features
      </Typography>
      <ResponsiveBar
        data={adjustData(data)}
        indexBy="feature"
        margin={{ top: 20, right: 10, bottom: 90, left: smallScreen ? 30 : 50 }}
        padding={0.3}
        maxValue={100}
        colors={{ scheme: "set1" }}
        colorBy="index"
        theme={{
          textColor: "#ffffff",
          fontSize: smallScreen ? 5 : 16,
          tooltip: { container: null },
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 5,
        }}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", "3"]] }}
        tooltip={(e) => {
          return (
            <Paper style={{ padding: 5 }}>
              {`${e.data.feature} : ${e.value} / 100`}
              <br />
              <br />
              {e.data.message.map((line) => (
                <div>
                  {line}
                  <br />
                </div>
              ))}
            </Paper>
          );
        }}
      />
    </div>
  );
}

const adjustData = (data) => {
  return [
    {
      feature: "Energy",
      value: data.energy,
      message: [
        "Energy is a measure of",
        "intensity and activity.",
        "Typically, energetic tracks",
        "feel fast, loud, and noisy.",
      ],
    },
    {
      feature: "Valence",
      value: data.valence,
      message: [
        "Valence describes the musical",
        "positiveness conveyed by a track.",
        "Tracks with high valence sound very",
        "positive (happy, cheerful, euphoric),",
        "while tracks with low valence sound",
        "negative (sad, depressed, angry).",
      ],
    },
    {
      feature: "Liveness",
      value: data.liveness,
      message: [
        "Detects the presence of an audience",
        "in a track. Higher liveness values",
        "represent an increased probability",
        "that the track was performed live.",
      ],
    },
    {
      feature: "Speechiness",
      value: data.speechiness,
      message: [
        "Speechiness detects the presence of",
        "spoken words in a track. The more",
        "exclusively speech-like the track,",
        "the closer to 100 it's speechiness is.",
      ],
    },
    {
      feature: "Acousticness",
      value: data.acousticness,
      message: [
        "Acousticness measure whether the",
        "track is acoustic. 100 represents",
        "high confidence that the track",
        "is acoustic",
      ],
    },
    {
      feature: "Danceability",
      value: data.danceability,
      message: [
        "Danceability describes how",
        "suitable a track is for",
        "dancing based on a combination",
        "of musical elements including",
        "tempo, rhythm stability beat",
        "strength, and overall regularity.",
      ],
    },
    {
      feature: "Instrumentalness",
      value: data.instrumentalness,
      message: [
        "Instrumentalness measures",
        "whether a track contains",
        "no vocals.",
      ],
    },
  ];
};
