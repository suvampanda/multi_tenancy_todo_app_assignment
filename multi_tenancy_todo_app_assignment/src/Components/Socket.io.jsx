import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const TodoComponent = ({ email }) => {
  const [assignedTodo, setAssignedTodo] = useState([]);

  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io('http://localhost:8090');

    // Emit the 'subscribe' event with the user's email
    socket.emit('subscribe', { email });

    // Listen for the 'todoAssigned' event
    socket.on('todoAssigned', (assignedTodo) => {
      // Handle the received todoAssigned event here    
      console.log('Todo assigned:', assignedTodo);

      // Update the state or perform any necessary actions
      setAssignedTodo(assignedTodo);
      
    });

    // Clean up the Socket.IO connection when the component unmounts
    return () => {
      // Emit the 'unsubscribe' event with the user's email
      socket.emit('unsubscribe', { email });

      socket.disconnect();
    };
  }, [email]);

  return (
    <div>
      {assignedTodo ? (
        <p>Task assigned: {assignedTodo.title}</p>
      ) : (
        <p>No task assigned</p>
      )}
    </div>
  );
};

export default TodoComponent;
