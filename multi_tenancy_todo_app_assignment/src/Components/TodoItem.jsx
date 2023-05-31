import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  IconButton,
  Box,
  Button,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Paper,
  Grid,
  CssBaseline,
} from "@mui/material";
import {
  Assignment,
  Delete,
  Edit,
  FormatListBulleted,
  GridOn,
} from "@mui/icons-material";
import { deleteTodo, updateTodo } from "../HOF/TodoReducer/todo.action";
import AddTodoModal from "./AddTodoModal";
import EmailModal from "./AssignUserTodoToAnathorUser.jsx";
import DataVisualization from "./DataVisualization";
import Pagination from "./Pagination";
import SocketComponent from "./Socket.io";
import { Link } from "react-router-dom";
import { decryptFn, encryptFn } from "../utils/encrypt";

const TodoList = ({ loading, page, setpage, totalPages }) => {
  const todo = useSelector((state) => state.todoReducer.todos);
  const [todos, setTodos] = useState(todo);
  const [view, setView] = useState("list"); // Added todos state
  const auth = useSelector((state) => state.authReducer);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddTodoModal, setOpenAddTodoModal] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(0);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [assignTodoId, setAssignTodoId] = useState("");
  const [draggedItemId, setDraggedItemId] = useState(null); // Added draggedItemId state
  let role = localStorage.getItem("role");

  const handleAssignTodo = (TodoID) => {
    setOpen((prev) => !prev);
    setAssignTodoId(TodoID);
    // dispatch()
  };

  useEffect(() => {
    setTodos(todo);
  }, [todo]);
  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };
 
  const handleOpenEditModal = (todo) => {
    setEditTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
    setStatus(todo.status);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditTodo(null);
    setTitle("");
    setDescription("");
    setStatus(0);
  };

  const handleUpdateTodo = () => {
    const updatedTodo = {
      id: editTodo.id,
      title,
      description,
      status,
    };

    dispatch(updateTodo(updatedTodo.id, updatedTodo));
    setOpenEditModal(false);
    setEditTodo(null);
    setTitle("");
    setDescription("");
    setStatus(0);
  };
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id.toString());
    setDraggedItemId(id); // Set the draggedItemId state
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetId) => {
    const sourceId = e.dataTransfer.getData("text/plain");
    const updatedTodos = [...todos];
    const sourceIndex = todos.findIndex((todo) => todo.id === Number(sourceId));
    const targetIndex = todos.findIndex((todo) => todo.id === Number(targetId));

    const [removed] = updatedTodos.splice(sourceIndex, 1);
    updatedTodos.splice(targetIndex, 0, removed);

    // Update the state with the new order
    setTodos(updatedTodos);
    setDraggedItemId(null); // Reset the draggedItemId state
  };
  const changeView = () => {
    if (view === "list") setView("grid");
    else setView("list");
  };
  const topics = todos.map((x) => x.status);
  // console.log(topics);
  const arraySize = 4;
  let values = Array.from({ length: arraySize }, () => 0);
  topics?.forEach((t) => {
    values[t]++;
  });
  const email = localStorage.getItem("user_email");
  return (
    <Box>
      <Typography
        variant="h1"
        sx={{
          fontSize: "40px",
          color: "grey",
          margin: "22px",
          fontFamily: "Arial, sans-serif",
          textTransform: "uppercase",
        }}
      >
        {role.toUpperCase()} TABLE
      </Typography>
      <Box>
        <Button
          style={{ marginRight: "20px" }}
          variant="contained"
          startIcon={<Assignment />}
          onClick={() => setOpenAddTodoModal(true)}
        >
          ADD TODO
        </Button>
        {"  "}

        <Button
          style={{ marginLeft: "20px" }}
          variant="contained"
          startIcon={view === "list" ? <GridOn /> : <FormatListBulleted />}
          onClick={changeView}
        >
          {view === "list" ? "GRID VIEW" : "LIST VIEW"}
        </Button>
      </Box>
      <SocketComponent email={email} />
      {view === "list" ? (
        <TableContainer
          style={{
            height: "400px",
            maxWidth: 1000,
            margin: "auto",
            marginTop: "40px",
            p: 4,
            boxShadow: 3,
            overflowY: "scroll",
          }}
        >
          {loading && <LinearProgress />}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell colSpan={2}>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>created_at</TableCell>
                <TableCell>deadline</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.length > 0 &&
                todos.map((todo) => (
                  <TableRow
                    key={todo.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, todo.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, todo.id)}
                    style={{
                      backgroundColor:
                        draggedItemId === todo.id ? "white" : "white",
                      fontWeight: "500", // Apply background color when item is being dragged
                    }}
                  >
                    <TableCell>{todo.id}</TableCell>
                    <Link to={`/${encryptFn(todo?.id.toString())}`}>
                      {" "}
                      <TableCell>{todo.title}</TableCell>
                    </Link>
                    <TableCell colSpan={2}>
                      {todo.description
                        ? todo.description.length > 50
                          ? `${todo.description.slice(0, 50)}...`
                          : todo.description
                        : ""}
                    </TableCell>

                    <TableCell
                      style={{
                        color:
                          todo.status === 0
                            ? "orange"
                            : todo.status === 1
                            ? "green"
                            : todo.status === 2
                            ? "blue"
                            : "red",
                        fontWeight: 600,
                      }}
                    >
                      {todo.status === 0
                        ? "Pending"
                        : todo.status === 1
                        ? "Completed"
                        : todo.status === 2
                        ? "In-Progress"
                        : "Late"}
                    </TableCell>
                    <TableCell>{todo.time_at_created}</TableCell>
                    <TableCell>{todo.deadline_time}</TableCell>
                    <TableCell width="40%" align="center">
                      <Box display="flex" justifyContent="space-between">
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleOpenEditModal(todo)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDeleteTodo(todo.id)}
                        >
                          <Delete />
                        </IconButton>

                        <Button
                          variant="contained"
                          startIcon={<Assignment />}
                          onClick={() => handleAssignTodo(todo.id)}
                        >
                          Assign
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start", // Align blocks to top-left
            height: "400px",
            overflowY: "scroll",
            maxWidth: 800,
            margin: "auto",
            marginTop: "40px",
            p: 4,
            boxShadow: 3,
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #f1f1f1",
          }}
        >
          <CssBaseline />
          <Box>
            <Grid container spacing={3} alignItems="left">
              {todos.map((todo) => (
                <Grid
                  item
                  width="225px"
                  key={todo.id}
                  sx={{
                    margin: "auto",
                    fontWeight: "500",
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingTop: "8px",
                  }}
                >
                  <Paper
                    sx={{
                      p: 2,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {todo.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 1,
                        lineHeight: "1.2rem",
                        maxHeight: "2.4rem",
                        overflow: "hidden",
                      }}
                    >
                      {todo.description
                        ? todo.description.length > 50
                          ? `${todo.description.slice(0, 30)}...`
                          : todo.description
                        : ""}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 2,
                        color:
                          todo.status === 0
                            ? "orange"
                            : todo.status === 1
                            ? "green"
                            : todo.status === 2
                            ? "blue"
                            : "red",
                        fontWeight: 600,
                      }}
                    >
                      {todo.status === 0
                        ? "Pending"
                        : todo.status === 1
                        ? "Completed"
                        : todo.status === 2
                        ? "In-Progress"
                        : "Late"}
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleOpenEditModal(todo)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteTodo(todo.id)}
                      >
                        <Delete />
                      </IconButton>

                      <IconButton
                        aria-label="assign"
                        onClick={() => handleAssignTodo(todo.id)}
                      >
                        <Assignment />
                      </IconButton>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setpage}
      />
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="edit_status">Status</InputLabel>
            <Select
              labelId="edit_status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
              required
            >
              <MenuItem value={0}>Pending</MenuItem>
              <MenuItem value={1}>Completed</MenuItem>
              <MenuItem value={2}>In-Progress</MenuItem>
              <MenuItem value={3}>Late</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal}>Cancel</Button>
          <Button
            onClick={handleUpdateTodo}
            color="primary"
            variant="contained"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <AddTodoModal
        setOpenAddTodoModal={setOpenAddTodoModal}
        openAddTodoModal={openAddTodoModal}
      />
      {/* <PieChart values={PieValues} lebels={PieLabels} /> */}
      <DataVisualization values={values} />
      <EmailModal
        open={open}
        setOpen={setOpen}
        handleAssignTodo={handleAssignTodo}
        assigneTodoId={assignTodoId}
      />
    </Box>
  );
};

export default TodoList;
