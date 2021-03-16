import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Paper, Typography, useTheme } from "@material-ui/core";

export default function Line({ data, type }) {
  if (!data) return null;
  const smallScreen = screen.width <= 600;
  const theme = useTheme();
  data = adjustData(data, type);

  return (
    <div>
      <Typography
        variant="title"
        component="h1"
        align="center"
        style={{ paddingTop: 25 }}
      >
        {titles[type]}
      </Typography>
      <div style={{ height: smallScreen ? "40vh" : "80vh" }}>
        <ResponsiveLine
          data={data}
          curve="linear"
          colors={theme.palette.primary.main}
          xScale={{
            type: type === 1 ? "linear" : "point",
            min: "auto",
            max: "auto",
          }}
          yScale={{
            type: "linear",
            min: 0,
            max: "auto",
          }}
          theme={{
            textColor: "#ffffff",
            fontSize: smallScreen ? 5 : 16,
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Count",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          axisBottom={
            type < 3 || data[0].data.length <= 10
              ? {
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }
              : null
          }
          margin={{ top: 40, right: 20, bottom: 40, left: 50 }}
          enablePointLabel={!smallScreen}
          pointLabel={(e) => e.y}
          pointLabelYOffset={-12}
          enableArea={true}
          areaOpacity={0.45}
          enableGridX={false}
          areaBaselineValue={0}
          useMesh={true}
          tooltip={(e) => {
            return (
              <Paper style={{ padding: 5 }}>
                {`${e.point.data.x} : ${e.point.data.y}`}
              </Paper>
            );
          }}
        />
      </div>
    </div>
  );
}

const adjustData = (data, type) => {
  // release years -> [{year:freq(year)}]
  if (type === 1) {
    return [
      {
        data: Object.keys(data).map((key) => {
          return { x: key, y: data[key] };
        }),
      },
    ];
  }

  // popularities into buckets (5 x 20)
  else if (type === 2) {
    // adding 1 to tracks with popularity 0 for better bucketing
    data = data.map((x) => (x === 0 ? 1 : x));
    const bucketSize = 10;
    let result = [{ data: [] }];

    for (let i = 0; i < 100; i += bucketSize) {
      const filteredArray = data.filter((x) => {
        return i < x && x <= i + bucketSize;
      });

      result[0].data.push({
        x: `[${i + 1} to ${i + bucketSize}]`,
        y: filteredArray.length,
      });
    }

    return result;
  }

  // duration into buckets of size 30 secs
  else if (type === 3) {
    const bucketSize = 30; // 30 secs
    let result = [{ data: [] }];
    const maxDuration = Math.max(...data);

    for (let i = 0; i <= maxDuration; i += bucketSize) {
      const filteredArray = data.filter((x) => {
        return i < x && x <= i + bucketSize;
      });

      result[0].data.push({
        x: `[${fun(i)} to ${fun(i + bucketSize)}]`,
        y: filteredArray.length,
      });
    }

    return result;
  }

  // BPM in buckets of 10 starting from lowerst to highest
  else if (type === 4) {
    const max = Math.max(...data);
    const bucketSize = 10;
    let flag = false;
    let result = [{ data: [] }];

    for (let i = 0; i < max; i += bucketSize) {
      const filteredArray = data.filter((x) => {
        return i < x && x <= i + bucketSize;
      });

      if (filteredArray.length > 0) {
        flag = true;
      }

      if (flag) {
        result[0].data.push({
          x: `[${i + 1} to ${i + bucketSize}]`,
          y: filteredArray.length,
        });
      }
    }

    return result;
  }
};

const titles = {
  1: "Track Release Years",
  2: "Track Popularities",
  3: "Track Durations",
  4: "Track BPMs",
};

const fun = (x) => {
  return `${Math.trunc(x / 60)}:${(x % 60).toString().padStart(2, "0")}`;
};
