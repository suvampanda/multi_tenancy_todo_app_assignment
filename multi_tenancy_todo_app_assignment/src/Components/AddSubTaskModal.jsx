import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSubtask } from "../HOF/SubTaskReducer/SubTask.action";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Typography,
  Box,
} from "@mui/material";

const AddSubTaskModal = ({ openAddSubTaskModal, setopenAddSubTaskModal }) => {
  const [sub_task, setSub_task] = useState("");
  const [status, setStatus] = useState(0);
  const [customColor, setCustomColor] = useState("#000000");
  const [customText, setCustomText] = useState("");
  const [isCustomSelected, setIsCustomSelected] = useState(false);
  const dispatch = useDispatch();

  const options = [
    {
      id: 0,
      label: "Pending",
      value: { name: "Pending", color: "orange" },
    },
    {
      id: 1,
      label: "Pending",
      value: { name: "Pending", color: "green" },
    },
    {
      id: 2,
      label: "In-Progress",
      value: { name: "In-Progress", color: "blue" },
    },
    {
      id: 3,
      label: "Late",
      value: { name: "Late", color: "red" },
    },
    {
      id: 4,
      label: "Custom",
      value: { name: customText, color: customColor },
    },
  ];

  const handleSub_taskChange = (e) => {
    setSub_task(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleColorChange = (event) => {
    setCustomColor(event.target.value);
  };

  const handleTextChange = (event) => {
    setCustomText(event.target.value);
  };

  const handleRadioChange = (event) => {
    if (event.target.value === "4") {
      setIsCustomSelected(true);
    } else {
      setIsCustomSelected(false);
    }
  };

  const handleAddSubTask = () => {
    const newSubTask = {
      sub_task,
      status,
      statusName: options[status].value.name,
      statusColor: options[status].value.color,
    };
    dispatch(createSubtask(newSubTask));
    console.log(newSubTask);
    setopenAddSubTaskModal(false);
  };

  return (
    <Dialog
      open={openAddSubTaskModal}
      onClose={() => setopenAddSubTaskModal(false)}
    >
      <DialogTitle>Add SubTask</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Sub_task"
            value={sub_task}
            onChange={handleSub_taskChange}
            required
          />
        </FormControl>
        {/* <FormControl fullWidth margin="normal">
          <TextField
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </FormControl> */}
        {/* <FormControl fullWidth margin="normal">
          <InputLabel id="Addnew_status">Status</InputLabel>
          <Select
            labelId="Addnew_status"
            value={status}
            onChange={handleStatusChange}
            label="Status"
            required
          >
            <MenuItem value={0}>Pending</MenuItem>
            <MenuItem value={1}>Completed</MenuItem>
            <MenuItem value={2}>In-Progress</MenuItem>
            <MenuItem value={3}>Late</MenuItem>
          </Select>
        </FormControl> */}
        <FormControl component="fieldset">
          <RadioGroup
            name="colorOption"
            value={status}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="0"
              control={<Radio onChange={() => setStatus(0)} />}
              label="Pending"
            />
            <FormControlLabel
              value="1"
              control={<Radio onChange={() => setStatus(1)} />}
              label="Completed"
            />
            <FormControlLabel
              value="2"
              control={<Radio onChange={() => setStatus(2)} />}
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
          {isCustomSelected && (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="subtitle1">Custom Color:</Typography>
              <input
                type="color"
                value={customColor}
                onChange={handleColorChange}
              />
              <br />
              <Typography variant="subtitle1">Custom Status:</Typography>
              <TextField
                value={customText}
                onChange={handleTextChange}
                required
              />
            </Box>
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setopenAddSubTaskModal(false)}>Cancel</Button>
        <Button onClick={handleAddSubTask} color="primary" variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSubTaskModal;
