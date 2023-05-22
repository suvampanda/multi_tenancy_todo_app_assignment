//import { Typography } from '@mui/material';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
  LinearProgress,
  CircularProgress,
  Alert,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Register_FN } from "../HOF/AuthReducer/auth.action";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const store = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const loading = store.loading;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Access form data as formData.firstname, formData.lastname, etc.

    dispatch(Register_FN(formData));
  };

  useEffect(() => {
    console.log(store.isUserAlreadyRegister && store.isUserAlreadyRegister);
    if (store.isUserAlreadyRegister && store.isUserAlreadyRegister) {
    } else if (store.userRegister && store.userRegister) {
      navigate("/login");
    }
  }, [store.isUserAlreadyRegister, store.userRegister]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validateForm = () =>
    formData.firstname.length > 0 &&
    formData.lastname.length > 0 &&
    formData.email.length > 0 &&
    formData.password.length > 0;

  return (
    <Box
      sx={{
        margin: "auto",
        marginTop: "140px",
        maxWidth: 400,
        margin: "auto",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        borderRadius: 8,
        padding: 4,
      }}
    >
      {loading ? <LinearProgress /> : ""}

      {!store.isUserAlreadyRegister ? (
        <Typography variant="h4" align="center" mb={4}>
          Signup
        </Typography>
      ) : (
        <Alert severity="warning">Account-Already present please sign up</Alert>
      )}

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            id="first-name"
            name="firstname"
            label="First Name"
            type="text"
            value={formData.firstname}
            onChange={handleInputChange}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            id="last-name"
            name="lastname"
            label="Last Name"
            type="text"
            value={formData.lastname}
            onChange={handleInputChange}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            id="password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!validateForm()}
        >
          {!loading ? "Sign Up" : <CircularProgress color="secondary" />}
        </Button>
      </form>
      <Box height="50px" p="3" margin="auto" marginTop="20px">
        Already have an account?&nbsp;
        <a
          href="/login"
          style={{
            textDecoration: "none",
            color: "#00d5fa",
            fontWeight: "700",
            padding: "2 3 4 5",
          }}
        >
          Log In Here
        </a>
      </Box>
    </Box>
  );
};

export default Signup;
