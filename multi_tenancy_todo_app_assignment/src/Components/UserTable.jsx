import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  FormControl,
  TextField,
  Modal,
  LinearProgress,
} from "@mui/material";
import {
  Edit,
  Delete,
  Assignment,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import {
  updateUser,
  deleteUser,
  fetchUsers,
} from "../HOF/UserReducer/user.action";
import AssignTodoToUser from "./AssignTodoToUser";

const UserTable = () => {
  const [editModal, setEditModal] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [asigneuser, setAssigneuser] = useState({});
  const [asignModal, setAsignModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector((store) => store.userReducer.users);
  const user = useSelector((store) => store.userReducer);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleEditModalOpen = (user) => {
    setEditedUser(user);
    console.log(user);
    setEditModal(true);
  };

  const handleEditModalClose = () => {
    setEditModal(false);
    setEditedUser(null);
  };

  const handleUpdate = () => {
    dispatch(updateUser(editedUser.id, editedUser));
    handleEditModalClose();
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };
  const handleAssignTodo = (user) => {
    setAssigneuser(user);
    setAsignModal(true);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Box sx={{ height: "85vh", overflowY: "auto" }}>
      <Typography
        sx={{
          fontSize: "30px",
          margin: "22px",
          fontFamily: "open sans",
        }}
      >
        All User Data
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto" }}>
        {user.loading && <LinearProgress />}
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.lastname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditModalOpen(user)}
                      style={{ width: "50px" }}
                    >
                      <Edit />
                    </IconButton>

                    {user.id !== 1 && (
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(user.id)}
                        style={{ width: "50px" }}
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {user.id !== 1 && (
                      <Button
                        variant="contained"
                        startIcon={<Assignment />}
                        onClick={() => handleAssignTodo(user)}
                      >
                        Assign
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Modal */}
      <Modal
        open={editModal}
        onClose={handleEditModalClose}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            width: "80%",
            maxWidth: 500,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            borderRadius: 8,
            padding: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component="h2" id="edit-modal-title">
              Edit User
            </Typography>
            <IconButton aria-label="close" onClick={handleEditModalClose}>
              {/* <CloseIcon /> */}
            </IconButton>
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <FormControl fullWidth>
              <TextField
                label="First Name"
                value={editedUser?.firstname || ""}
                onChange={(e) =>
                  setEditedUser((prevUser) => ({
                    ...prevUser,
                    firstname: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <TextField
                label="Last Name"
                value={editedUser?.lastname || ""}
                onChange={(e) =>
                  setEditedUser((prevUser) => ({
                    ...prevUser,
                    lastname: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <TextField
                label="Email"
                value={editedUser?.email || ""}
                onChange={(e) =>
                  setEditedUser((prevUser) => ({
                    ...prevUser,
                    email: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <TextField
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={editedUser?.password || ""}
                onChange={(e) =>
                  setEditedUser((prevUser) => ({
                    ...prevUser,
                    password: e.target.value,
                  }))
                }
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
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleEditModalClose}
              sx={{ marginRight: 2 }}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleUpdate}>
              Update
            </Button>
          </Box>
        </Box>
      </Modal>

      <AssignTodoToUser
        asignModal={asignModal}
        setAsignModal={setAsignModal}
        email={asigneuser.email}
        firstname={asigneuser.firstname}
      />
    </Box>
  );
};

export default UserTable;
