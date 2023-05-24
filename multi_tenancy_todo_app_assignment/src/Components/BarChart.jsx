import { ResponsiveBar } from "@nivo/bar";
import { mockBarData } from "../data/mockBarData";

const BarChart = ({values}) => {
  // const data = [
  //   { label: 'Category 1', value: 10 },
  //   { label: 'Category 2', value: 20 },
  //   { label: 'Category 3', value: 15 },
  // ];

  const data = [
    {
      id: "In-Progress",
      label: "In-Progress",
      value: 5,
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
      value: 5,
      color: "hsl(162, 70%, 50%)",
    },
  ];

  let total = 0;
  for(let i = 0; i<values.length; i++)
  {
    total += values[i];
  }

  let sq = Math.ceil(Math.sqrt(17));
  return (
    <div style={{ height: '400px' , width: '70vw'}}>
    {total}
    {sq}
    <ResponsiveBar
      data={data}
      theme={{
        // added
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
      keys={['value']} // Assuming your data has a 'value' property
      indexBy="label" // Assuming your data has a 'label' property
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "food",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  </div>
  )
}

export default BarChart
