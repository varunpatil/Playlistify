import React from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { Paper, Typography } from "@material-ui/core";
import green from "@material-ui/core/colors/green";

export default function Calendar({ data }) {
  if (!data) return null;
  const sortedDates = Object.keys(data).sort();
  const from = sortedDates[0];
  const to = sortedDates[sortedDates.length - 1];
  const years = 1 + parseInt(to.slice(0, 4)) - parseInt(from.slice(0, 4));
  const smallScreen = screen.width <= 600;
  const height = years * (smallScreen ? 10 : 25);

  return (
    <div>
      <Typography
        variant="h5"
        component="h1"
        align="center"
        style={{ paddingTop: 20 }}
      >
        Dates when tracks were added
      </Typography>
      <div style={{ height: height + "vh" }}>
        <ResponsiveCalendar
          data={adjustData(data)}
          from={from}
          to={to}
          theme={{
            textColor: "#ffffff",
            fontSize: smallScreen ? 7 : 11,
          }}
          emptyColor="#eeeeee"
          colors={[green[200], green[300], green[500], green[700], green[900]]}
          margin={{ top: 30, right: 5, bottom: 0, left: 5 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: "bottom-right",
              direction: "row",
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left",
            },
          ]}
          tooltip={(e) => {
            return (
              <Paper style={{ padding: 5 }}>
                {`${e.date.toDateString()} : ${
                  e.value !== undefined ? e.value : 0
                }`}
              </Paper>
            );
          }}
        />
      </div>
    </div>
  );
}

const adjustData = (data) => {
  return Object.keys(data).map((key) => {
    return { day: key, value: data[key] };
  });
};
