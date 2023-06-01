import React from "react";
import { ResponsiveWaffle } from "@nivo/waffle";
import { Box } from "@mui/material";

const WaffleChart = ({values}) => {
  // Sample data
  const data = [
    {
      id: "In-Progress",
      label: "In-Progress",
      value: values[2],
    },
    {
      id: "Pending",
      label: "Pending",
      value: values[0],
    },
    {
      id: "Completed",
      label: "Completed",
      value: values[1],
    },
    {
      id: "Late",
      label: "Late",
      value: values[3],
    },
    {
      id: "Custom",
      label: "Custom",
      value: values[4],
    },
  ];
  let total = 0;
  for (let i = 0; i < values.length; i++) {
    total += values[i];
  }

  let sq = Math.ceil(Math.sqrt(total));


  return (
    <Box sx={{ height: "400px", fontSize: "16px" }}>
      <ResponsiveWaffle
         data={data}
         total={sq*sq}
         rows={sq}
         columns={sq}
         padding={1}
         margin={{ top: 10, right: 10, bottom: 10, left: 120 }}
         colors={{ scheme: "category10" }}
         borderRadius={3}
         borderColor={{
           from: "color",
           modifiers: [["darker", 0.3]],
         }}
         animate={true}
         motionStiffness={90}
         motionDamping={11}
         motionStagger={2}
         legends={[
           {
             anchor: "top-left",
             direction: "column",
             justify: false,
             translateX: -100,
             translateY: 0,
             itemsSpacing: 4,
             itemWidth: 100,
             itemHeight: 20,
             itemDirection: "left-to-right",
             itemOpacity: 1,
             itemTextColor: "#777",
             symbolSize: 20,
             effects: [
               {
                 on: "hover",
                 style: {
                   itemTextColor: "#000",
                   itemBackground: "#f7fafb",
                 },
               },
             ],
           },
         ]}
      />
    </Box>
  );
};

export default WaffleChart;
