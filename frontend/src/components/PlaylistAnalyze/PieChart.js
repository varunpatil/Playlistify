import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Paper, Typography } from "@material-ui/core";

export default function PieChart({ data, type, colorScheme }) {
  const smallScreen = screen.width <= 600;
  return (
    <div style={{ height: smallScreen ? "40vh" : "70vh" }}>
      <Typography
        variant="title"
        component="h1"
        align="center"
        style={{ paddingTop: 20 }}
      >
        {type} Distribution
      </Typography>
      <ResponsivePie
        data={adjustData(data)}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        sortByValue={true}
        colors={{ scheme: colorScheme }}
        enableRadialLabels={true}
        radialLabelsSkipAngle={smallScreen ? 18 : 10}
        radialLabelsTextColor="#fff"
        radialLabelsLinkColor={{ from: "color" }}
        radialLabelsLinkDiagonalLength={smallScreen ? 8 : 20}
        radialLabelsLinkHorizontalLength={smallScreen ? 6 : 36}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#000"
        tooltip={(e) => {
          return (
            <Paper style={{ padding: 5 }}>
              {`${e.datum.id} : ${e.datum.value}`}
            </Paper>
          );
        }}
      />
    </div>
  );
}

const adjustData = (data) => {
  return Object.keys(data).map((key) => {
    return { id: key, label: key, value: data[key] };
  });
};
