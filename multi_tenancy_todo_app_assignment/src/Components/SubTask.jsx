import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Button,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  AddCircleOutline,
  Delete,
  Edit,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  createSubtask,
  deleteSubtask,
  fetchSubtask,
  updateSubtask,
} from "../HOF/SubTaskReducer/SubTask.action";
import { useSelector } from "react-redux";

const Subtask = ({
  mainTask,
  handleAddSubtask,
  handleDeleteSubtask,
  handleUpdateSubtask,
}) => {
  const [collapseOpen, setCollapseOpen] = useState(true);
  const [status, setStatus] = useState(0);
  const [newSubtask, setNewSubtask] = useState({
    sub_task: "",
    status: status,
    color_code: "",
    custom_status: "",
  });

  const [editSubtask, setEditSubtask] = useState({
    subtask_id: "",
    sub_task: "",
    status: status,
    color_code: "",
    custom_status: "",
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleInputChange = (e) => {
    setNewSubtask({
      ...newSubtask,
      [e.target.name]: e.target.value,
    });
  };

  const handleCollapseToggle = () => {
    setCollapseOpen(!collapseOpen);
  };

  const handleAddSubtaskClick = () => {
      handleAddSubtask(mainTask.id, {...newSubtask,status:status});
      setNewSubtask({
        sub_task: "",
        status:0,
        color_code: "",
        custom_status: "",
      });
      setStatus(0)
      setIsAddDialogOpen(false);
  };

  const handleDeleteSubtaskClick = (subtaskId) => {
    handleDeleteSubtask(mainTask.id, subtaskId);
  };

  const handleEditSubtaskClick = (subtask) => {
    setEditSubtask(subtask);
    setIsEditDialogOpen(true);
  };

  const handleUpdateSubtaskClick = () => {
    handleUpdateSubtask(mainTask.id, editSubtask.subtask_id, editSubtask);
    setIsEditDialogOpen(false);
  };

  const handleAddDialogOpen = () => {
    setIsAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setIsAddDialogOpen(false);
  };

  const handleEditDialogOpen = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const getStatusText = (status,Custom) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "In Progress";
      case 2:
        return "Completed";
      case 3:
        return "Late";
      default:
        return Custom;
    }
  };


  const getStatusColor = (status,Custom,color_code) => {
    switch (status) {
      case 0:
        return "#FFF9C4";
      case 1:
        return "#ADD8E6";
      case 2:
        return "#61c99c";
      case 3:
        return "#C8E6C9";
      default:
        return color_code;
    }
  };
  return (
    <React.Fragment>
      <TableRow>
        <TableCell style={{ fontWeight: "bold", borderBottom: "none" }}>
          {mainTask.title}
        </TableCell>
        <TableCell style={{ borderBottom: "none" }}>
          <IconButton
            aria-label="expand"
            size="small"
            onClick={handleCollapseToggle}
          >
            {collapseOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={2}>
          <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>Subtask</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{color:"white",fontSize:"20px"}}>
                {mainTask.subtasks.map((subtask) => (
                  <TableRow  style={{border:"1px solid blue", backgroundColor: getStatusColor(subtask.status,subtask.custom_status,subtask.color_code)}} key={subtask.subtask_id}>
                    <TableCell style={{color:"grey",fontSize:"20px",fontWeight:"600"}}>{subtask.sub_task}</TableCell>
                    <TableCell style={{color:"grey",fontSize:"20px", fontWeight:"600"}}>{getStatusText(subtask.status,subtask.custom_status)}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="edit"
                        size="small"
                        onClick={() => handleEditSubtaskClick(subtask)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() =>
                          handleDeleteSubtaskClick(subtask.subtask_id)
                        }
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>
                    <IconButton
                      aria-label="add"
                      size="small"
                      onClick={handleAddDialogOpen}
                    >
                      <AddCircleOutline />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>
        <DialogTitle>Add Subtask</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="sub_task"
            label="Subtask"
            fullWidth
            value={newSubtask.sub_task}
            onChange={handleInputChange}
          />
          <RadioGroup name="colorOption" value={status}>
            <FormControlLabel
              value="0"
              control={<Radio onChange={() => setStatus(0)} />}
              label="Pending"
            />
            <FormControlLabel
              value="2"
              control={<Radio onChange={() => setStatus(2)} />}
              label="Completed"
            />
            <FormControlLabel
              value="1"
              control={<Radio onChange={() => setStatus(1)} />}
              label="In-Progress"
            />
            <FormControlLabel
              value="3"
              control={<Radio onChange={() => setStatus(3)} />}
              label="Late"
            />
            <FormControlLabel
              value="4"
              control={<Radio onChange={() => setStatus(4)} />}
              label="Custom"
            />
          </RadioGroup>

          {status == 4 && (
            <>
              <TextField
                margin="dense"
                name="custom_status"
                label="custom_status"
                fullWidth
                value={newSubtask.custom_status}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                name="color_code"
                label="color_code"
                type="color"
                fullWidth
                value={newSubtask.color_code}
                onChange={handleInputChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
          <Button onClick={handleAddSubtaskClick}>Add</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Subtask</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="sub_task"
            label="Subtask"
            fullWidth
            value={editSubtask.sub_task}
            onChange={(e) =>
              setEditSubtask({ ...editSubtask, sub_task: e.target.value })
            }
          />
          {/* Add more fields as needed */}
          <FormControl fullWidth>
  <InputLabel>Status</InputLabel>
  <Select
    value={editSubtask.status}
    onChange={(e) =>
      setEditSubtask({ ...editSubtask, status: e.target.value })
    }
    label="Status"
  >
    <MenuItem value={0}>Pending</MenuItem>
    <MenuItem value={1}>In Progress</MenuItem>
    <MenuItem value={2}>Completed</MenuItem>
    <MenuItem value={3}>Late</MenuItem>
    {/* Add custom status options if needed */}
  </Select>
</FormControl>



          {/* Add more fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleUpdateSubtaskClick}>Update</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Subtask;

const MainTaskList = () => {
  const allTask = useSelector((state) => state.subtaskReducer.allData);
  console.log(allTask);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSubtask());
  }, []);

  const handleAddSubtask = (mainTaskId, subtask) => {
    // Implement the add subtask functionality
    dispatch(createSubtask(mainTaskId, subtask));
    console.log(subtask)
  };

  const handleDeleteSubtask = (mainTaskId, subtaskId) => {
    // Implement the delete subtask functionality
    dispatch(deleteSubtask(mainTaskId, subtaskId));
    console.log(
      `Delete subtask with id: ${subtaskId} from main task id: ${mainTaskId}`
    );
  };

  const handleUpdateSubtask = (mainTaskId, subtask_id, updatedSubtask) => {
    dispatch(updateSubtask(mainTaskId, subtask_id, updatedSubtask));
    // Implement the update subtask functionality
    console.log(mainTaskId, subtask_id, updatedSubtask);
  };

  return (
    <Table style={{ margin: "auto", width: "80%" }}>
      <TableHead>
        <TableRow>
          <TableCell style={{ fontWeight: "bold" }}>Main Task</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {allTask.length > 0 &&
          allTask.map((mainTask) => (
            <Subtask
              key={mainTask.id}
              mainTask={mainTask}
              handleAddSubtask={handleAddSubtask}
              handleDeleteSubtask={handleDeleteSubtask}
              handleUpdateSubtask={handleUpdateSubtask}
            />
          ))}
      </TableBody>
    </Table>
  );
};

export { MainTaskList };

