import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import { fetchTodos } from "../HOF/TodoReducer/todo.action";
import { Alert, AlertTitle, Box } from "@mui/material";
import { postNotification } from "../HOF/NotificationReducer/action";

const SocketComponent = ({ email }) => {
  const [notifications, setNotifications] = useState("");
  const [show, setshow] = useState(false);
  const dispatch = useDispatch();
  let timeoutId = null; // Variable to store the timeout ID

  useEffect(() => {
    const socket = io("https://multitenancy.onrender.com"); // Replace with the actual URL of your backend server
    socket.on("todoAssigned", (data) => {
      // Handle the received data here
      console.log("Todo assigned:", data);
      if (data.email === email) {
        setshow(true);
        setNotifications(data);

        dispatch(fetchTodos());
        
        let message=`Task assigned by ${notifications.assignee_email || "client"}`;
        dispatch(postNotification(message));
        // Clear previous timeout if exists
        clearTimeout(timeoutId);

        // Set show to false after 5 seconds
        timeoutId = setTimeout(() => {
          setshow(false);
        }, 5000);
      }
    });

    return () => {
      setshow(false);
      socket.disconnect();

      // Clear the timeout when the component unmounts
      clearTimeout(timeoutId);
    };
  }, []);




  return (
    <>
    <Box  margin="auto" height="80px" display={show? "flex":"none"} width="400px" marginTop={"30px"}>
   
        <Alert severity="info" style={{ width: "400px", backgroundColor: "grey", color: "white",margin:"auto",textAlign:"center" }}>
          <AlertTitle>Todo assign.</AlertTitle>
          Task assigned by {notifications.assignee_email||"client"}
        </Alert>
      {/* )} */}
    </Box>
    </>
  );
};

export default SocketComponent;
