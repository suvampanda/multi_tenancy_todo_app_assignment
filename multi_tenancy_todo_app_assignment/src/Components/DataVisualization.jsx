import { Box, IconButton, Button } from "@mui/material";
import React, { useState } from "react";
import GridOnIcon from "@mui/icons-material/GridOn";
import PieChartIcon from "@mui/icons-material/PieChart";
import WaffleChart from "./WaffleChart";
import PieChart from "./PieChart";

const DataVisualization = ({ values }) => {
  const [chart, setChart] = useState("pie");
  const handleChange = () => {
    if (chart === "pie") setChart("waffle");
    else setChart("pie");
  };
  return (
    <Box
      sx={{
        marginTop: "50px",
      }}
      fontFamily={"sans-serif"}
      fontSize={"25px"}
    >
      {chart === "pie" ? "PIE CHART" : "WAFFLE CHART"}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Box sx={{ width: "550px" }}>
          {chart === "pie" ? (
            <PieChart values={values} />
          ) : (
            <WaffleChart values={values} />
          )}
        </Box>
        <Button
          onClick={handleChange}
          style={{ marginTop: "20px" }}
          variant="contained"
          startIcon={chart === "pie" ? <GridOnIcon /> : <PieChartIcon />}
        >
          {chart === "pie" ? " See Waffle Chart" : "See Pie Chart"}
        </Button>
      </Box>
    </Box>
  );
};

export default DataVisualization;
