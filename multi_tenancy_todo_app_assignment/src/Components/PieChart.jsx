import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box } from "@mui/material";

const PieChart = ({ values }) => {
  const data = [
    {
      id: "In-Progress",
      label: "In-Progress",
      value: values[2],
      color: "hsl(269, 70%, 50%)",
    },
    {
      id: "Pending",
      label: "Pending",
      value: values[0],
      color: "hsl(291, 70%, 50%)",
    },
    {
      id: "Completed",
      label: "Completed",
      value: values[1],
      color: "hsl(344, 70%, 50%)",
    },
    {
      id: "Late",
      label: "Late",
      value: values[3],
      color: "hsl(162, 70%, 50%)",
    },
  ];
  return (
    <Box sx={{ height: "400px", fontSize: "16px" }}>
      <ResponsivePie
        data={data}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: "#141414",
              },
            },
            legend: {
              text: {
                fill: "#141414",
              },
            },
            ticks: {
              line: {
                stroke: "#141414",
                strokeWidth: 1,
              },
              text: {
                fill: "#141414",
              },
            },
          },
          legends: {
            text: {
              fill: "#141414",
            },
          },
        }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.4}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "category10" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={"#141414"}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        enableArcLabels={false}
        arcLabelsRadiusOffset={0.4}
        arcLabelsSkipAngle={7}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        enableRadialLabels={false}
        enableSliceLabels={true}
        radialLabel={(d) => `${d.id}: ${d.value}`}
        sliceLabel={(d) => `${d.value}`}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: "color" }}
        sliceLabelsTextColor="#333333"
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
};

export default PieChart;
