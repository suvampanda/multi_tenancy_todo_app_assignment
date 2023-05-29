import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import UserTable from "../Components/UserTable";
import Sidebar from "../Components/SideBar";
import UserAddModal from "../Components/UserAddModal";
import { Navigate, useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [state, setstate] = useState(1);
  const role = localStorage.getItem("role");

  if (role !== "client") {
    alert(" You are not authorised");
    return <Navigate to="/" />;
  }

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Sidebar state={state} setstate={setstate} />
        {state == 1 ? (
          <Box margin={"auto"}>
            <UserTable />
          </Box>
        ) : (
          <UserAddModal setstate={setstate} />
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
