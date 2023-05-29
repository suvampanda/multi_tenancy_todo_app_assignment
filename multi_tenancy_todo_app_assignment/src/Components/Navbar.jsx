import {
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Button,
  Box,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout_FN } from "../HOF/AuthReducer/auth.action";
import Profile from "./Profile";
const Navbar = () => {
  const auth = useSelector((store) => store.authReducer);
  let role = localStorage.getItem("role");
  let user_email = localStorage.getItem("user_email");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    //   dispatch(logoutUser())
    dispatch(logout_FN());
    navigate("/login");
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      padding="20px"
      boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
      backgroundColor="#FFFFFF"
    >
      <Box gap="1.75rem" display={"flex"} justifyContent={"space-between"}>
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          fontFamily="Avenir"
          color="primary"
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/")}
        >
          ToDo App
        </Typography>
      </Box>

      <Box gap="2rem">
        <Button
          fontWeight="bold"
          fontSize="20px"
          color="primary"
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </Button>
        <FormControl variant="standard">
          <Select
            value={user_email}
            sx={{
              backgroundColor: "#ccf7fe",
              width: "auto",
              borderRadius: "0.25rem",
              p: "0.25rem 1rem",
              "& .MuiSvgIcon-root": {
                pr: "0.25rem",
                width: "3rem",
              },
              "& .MuiSelect-select:focus": {
                backgroundColor: "#ccf7fe",
              },
            }}
          >
            <MenuItem value={user_email}>
              <Typography>{user_email}</Typography>
            </MenuItem>
            <Profile />
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Navbar;
