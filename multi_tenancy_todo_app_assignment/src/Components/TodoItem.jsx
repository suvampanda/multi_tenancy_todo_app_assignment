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
} from "@mui/material";
import { Assignment, Delete, Edit } from "@mui/icons-material";
import { deleteTodo, updateTodo } from "../HOF/TodoReducer/todo.action";
import AddTodoModal from "./AddTodoModal";
import EmailModal from "./AssignUserTodoToAnathorUser.jsx";
// import DataVisualization from "./DataVisualization";

const TodoList = () => {
  const todo = useSelector((state) => state.todoReducer.todos);
  const [todos, setTodos] = useState(todo); // Added todos state
  const loading = useSelector((state) => state.todoReducer.loading);
  const auth = useSelector((state) => state.authReducer);
  console.log(todos);
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
//   const topics = todos.map((x) => x.status);
//   // console.log(topics);
//   const topicCounts = {};
//   topics?.forEach((t) => {
//     if (topicCounts[t]) topicCounts[t]++;
//     else topicCounts[t] = 1;
//   });
//   const values = Object.values(topicCounts);
  return (
    <Box>
      <Typography fontSize="70px" color="grey" margin="22px">
        {role.toUpperCase()} TABLE
      </Typography>
      <TableContainer
        style={{
          height: "400px",
          maxWidth: 800,
          margin: "auto",
          marginTop: "40px",
          p: 4,
          border: "2px solid",
          borderColor: "#00d5fa",
          borderRadius: "7px",
          overflowY: "scroll",
        }}
      >
        {loading && <LinearProgress />}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
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
                    backgroundColor: draggedItemId === todo.id ? "white" : "white",fontWeight:"500" // Apply background color when item is being dragged
                  }}
                >
                  <TableCell>{todo.id}</TableCell>
                  <TableCell>{todo.title}</TableCell>
                  <TableCell>{todo.description}</TableCell>

                  <TableCell
                    style={{
                      color: todo.status === 0 ? "red" : "green",
                      fontWeight: 600,
                    }}
                  >
                    {todo.status === 0 ? "Pending" : "Completed"}
                  </TableCell>
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

                      {role === "user" && (
                        <Button
                          variant="contained"
                          startIcon={<Assignment />}
                          onClick={() => handleAssignTodo(todo.id)}
                        >
                          Assign
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        style={{ marginTop: "20px" }}
        variant="contained"
        startIcon={<Assignment />}
        onClick={() => setOpenAddTodoModal(true)}
      >
        ADD TODO
      </Button>
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
//       <DataVisualization values={values} />
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
