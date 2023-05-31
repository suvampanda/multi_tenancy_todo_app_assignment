import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  FormControl,
  Grid,
  Icon,
  IconButton,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";

import AddPhotoAlternateTwoToneIcon from "@mui/icons-material/AddPhotoAlternateTwoTone";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../HOF/AuthReducer/auth.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "88%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Profile() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const profileData = useSelector((store) => store.authReducer.profileData);
  console.log(profileData, "profiledata");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    password: "",
  });

  const [avatarUrl, setAvatarUrl] = useState(
    "https://thumbs.dreamstime.com/z/serious-indian-business-man-working-studying-laptop-computer-young-professional-focused-ethnic-male-student-wearing-glasses-214010622.jpg"
  );
  const fileInputRef = React.useRef(null);

  React.useEffect(() => {
    setFormData(profileData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handelUpdateData = (data) => {
    console.log(data,"data patch req");
    fetch("https://multitenancy.onrender.com/user/updateuserinfo", {
      method: "PATCH",
      body: JSON.stringify({
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("login_token"),
        email: localStorage.getItem("user_email"),
        role: localStorage.getItem("role"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        alert("User update succesfully")
        console.log(result, "rsult");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async(e) => {
    if (
      formData.firstname == "" ||
      formData.lastname == "" ||
      formData.password == ""
    ) {
      alert("fill all the details");
    } else {
      await handelUpdateData(formData);
      handleClose()
      
    }
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button onClick={handleOpen}> Profile</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box margin="auto" sx={style}>
          <Grid
            margin="auto"
            paddingLeft="30%"
            justify="center"
            alignItems="center"
          ></Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item></Grid>
            <Grid gridTemplateColumns={"repeat(2,1fr)"} item xs={12}>
              <TextField
                name="firstname"
                type="text"
                value={formData?.firstname}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="lastname"
                value={formData?.lastname}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                type="email"
                value={profileData?.email}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                value={formData?.password}
                onChange={handleChange}
                type="password"
                fullWidth
              />
            </Grid>
          </Grid>
          <Box margin={"auto"} marginTop={"10px"} width={"25%"}>
            <Button text variant="outlined" onClick={handleSubmit}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
