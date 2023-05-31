import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
} from "@mui/material";
import {
  Assignment,
  Delete,
  Edit,
  FormatListBulleted,
  GridOn,
} from "@mui/icons-material";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SubTask = () => {
  const { todoId } = useParams();

  console.log(todoId);
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
  });

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      { id: tasks.length + 1, title: "", description: "", status: "" },
    ]);
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index, task) => {
    setEditIndex(index);
    setEditTask(task);
  };

  const handleUpdateTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editTask;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditTask({ id: "", title: "", description: "", status: "" });
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditTask({ id: "", title: "", description: "", status: "" });
  };

  const handleTaskChange = (field, value) => {
    setEditTask((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <Card style={{ width: "70%", margin: "auto" }}>
      <CardContent>
        <Typography
          variant="h1"
          sx={{
            fontSize: "30px",
            margin: "22px",
            fontFamily: "open sans",
            textTransform: "uppercase",
          }}
        >
          SUBTASK
        </Typography>
        <Box>
          <Button
            style={{ marginRight: "20px" }}
            variant="contained"
            startIcon={<Assignment />}
            onClick={handleAddTask}
          >
            ADD SUBTASK
          </Button>
        </Box>
        {/* <TableContainer
          style={{
            height: "400px",
            maxWidth: 1000,
            margin: "auto",
            marginTop: "40px",
            p: 4,
            boxShadow: 3,
            overflowY: "scroll",
          }}
        > */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => (
                <TableRow key={task.id}>
                  <TableCell>{task.id}</TableCell>
                  <TableCell>
                    {editIndex === index ? (
                      <TextField
                        value={editTask.title}
                        onChange={(e) =>
                          handleTaskChange("title", e.target.value)
                        }
                      />
                    ) : (
                      task.title
                    )}
                  </TableCell>
                  <TableCell>
                    {editIndex === index ? (
                      <TextField
                        value={editTask.description}
                        onChange={(e) =>
                          handleTaskChange("description", e.target.value)
                        }
                      />
                    ) : (
                      task.description
                    )}
                  </TableCell>
                  <TableCell>
                    {editIndex === index ? (
                      <TextField
                        value={editTask.status}
                        onChange={(e) =>
                          handleTaskChange("status", e.target.value)
                        }
                      />
                    ) : (
                      task.status
                    )}
                  </TableCell>
                  <TableCell>
                    {editIndex === index ? (
                      <>
                        <IconButton onClick={() => handleUpdateTask(index)}>
                          <FormatListBulleted />
                        </IconButton>
                        <IconButton onClick={handleCancelEdit}>
                          <Delete />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => handleEditTask(index, task)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleRemoveTask(index)}>
                          <Delete />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        {/* </TableContainer> */}
      </CardContent>
    </Card>
  );
};

export default SubTask;