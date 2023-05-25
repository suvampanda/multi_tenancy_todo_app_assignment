import React, { useEffect } from "react";
import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { Login_FN } from "../HOF/AuthReducer/auth.action";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const store = useSelector((store) => store.authReducer);
  const loading = store.loading;

  console.log(store.wrongPass, "wrongpsassfds");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    return (
      formData.email.length > 0 &&
      formData.password.length > 0 
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // login logic here

    dispatch(Login_FN(formData));
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (store.userLogin) {
      localStorage.setItem("login_token", store.loginToken);
      localStorage.setItem("user_email", formData.email);
      navigate("/");
    }
  }, [store.userLogin, store.AccNotFound]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Box
      sx={{
        margin: "auto",
        maxWidth: 400,
        marginTop: isSmallScreen ? "40px" : "140px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        borderRadius: 8,
        padding: 4,
      }}
    >
      {loading ? <LinearProgress /> : ""}
      {store.wrongPass ? (
        <Alert severity={"error"}>{"Wrong Password Please try again"}</Alert>
      ) : (
        ""
      )}
      {!store.AccNotFound ? (
        <Typography variant="h4" align="center" mb={4}>
          Login
        </Typography>
      ) : (
        <Alert severity={"error"}>{"No acc Found please Sign-Up"}</Alert>
      )}
      {store.userLogin ? (
        <Alert severity={"success"}>{"Login-Success"}</Alert>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
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
            onChange={handleChange}
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
        {!store.loading ? (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!validateForm()}
          >
            Login
          </Button>
        ) : (
          <CircularProgress color="secondary" />
        )}
      </form>
      <Box height="50px" p="3" margin="auto" marginTop="20px">
        Don't have an account?&nbsp;
        <a
          href="/signup"
          style={{
            textDecoration: "none",
            color: "#00d5fa",
            fontWeight: "700",
            padding: "2 3 4 5",
          }}
        >
          Sign Up Here
        </a>
      </Box>
    </Box>
  );
};

export default Login;
