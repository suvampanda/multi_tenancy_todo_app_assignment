import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box } from "@mui/system";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ labels, values }) {
  const data = {
    labels: ["Pending", "Completed"],
    datasets: [
      {
        label: "Todo",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true, // Enable responsiveness
    maintainAspectRatio: false, // Disable maintaining aspect ratio
    plugins: {
      legend: {
        position: "right", // Set legend position to the right
      },
    },
  };

  return (
    <Box border={"2px solid"} paddingX={"10px"} margin={"auto"} marginTop={"20px"} height={"200px"} width={"300px"} bg={"white"} borderRadius="20px">
      <Pie data={data} options={options} />
    </Box>
  );
}
