import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import AsminAssignTodo from "./AdminTodoAssign";
import { click } from "@testing-library/user-event/dist/click";
import { useDispatch } from "react-redux";
import { assignTodoToUser } from "../HOF/TodoReducer/todo.action";

const EmailModal = ({ open, setOpen, handleAssignTodo,assigneTodoId }) => {
  const [userEmail, setUserEmail] = useState("");
  const [text, setText] = useState("");
  const [assigne_email, setAssigne_email] = useState("");
const dispatch=useDispatch()
  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleAssignTodoClick = () => {
    //dispatching the patch function ;
    dispatch( assignTodoToUser(assigneTodoId,assigne_email))
    console.log(text);
  };

  const handleClose = () => {
    setOpen(false);
  };
 

  const queryHandeler = useCallback(
    (val, clickSugg) => {
      setText(val);
      setAssigne_email(clickSugg);
    },
    [text]
  );

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Assign Todo</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <AsminAssignTodo queryHandeler={queryHandeler} />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleAssignTodoClick}
          color="primary"
          variant="contained"
        >
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmailModal;
