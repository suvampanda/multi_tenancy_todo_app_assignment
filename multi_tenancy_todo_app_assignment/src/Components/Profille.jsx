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

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });

  const [avatarUrl, setAvatarUrl] = useState(
    "https://thumbs.dreamstime.com/z/serious-indian-business-man-working-studying-laptop-computer-young-professional-focused-ethnic-male-student-wearing-glasses-214010622.jpg"
  );
  const fileInputRef = React.useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

  };

  const handleSubmit = (e) => {
    if(formData.firstName =="" || formData.lastName=="" || formData.password==""){
        alert("fill all the details")
    }
    else{
        setOpen(false)
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setAvatarUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleEditAvatarClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Profile</Button>
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
          >
            <Avatar
              alt="Avatar"
              src={avatarUrl}
              style={{ width: "100px", height: "100px" }}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
            <Box width="20%" marginLeft="18%">
              <IconButton onClick={handleEditAvatarClick} color="primary">
                <AddPhotoAlternateTwoToneIcon color="action" />
              </IconButton>
            </Box>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item></Grid>
            <Grid gridTemplateColumns={"repeat(2,1fr)"} item xs={12}>
              <TextField
                name="firstName"
                placeholder="Enter firstname"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="lastName"
                placeholder="Enter lastname"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                value="adarsh474747@gmail.com"
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
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
    </div>
  );
}
