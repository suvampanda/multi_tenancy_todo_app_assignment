import logo from "./logo.svg";
import "./App.css";
import AllRoutes from "./AllRoutes/AllRoutes";
import Navbar from "./Components/Navbar";
import { useLocation } from "react-router-dom";
import AsminAssignTodo from "./Components/AdminTodoAssign";
import { useCallback, useState } from "react";
import TodoComponent from "./Components/Socket.io";

function App() {
  const location = useLocation();
  
const email=localStorage.getItem("user_email")

 
  return (
    <div className="App">

      {location.pathname === '/' || location.pathname === '/dashboard' ? (
        <Navbar />
      ) : null}
      <AllRoutes />
    </div>
  );
}

export default App;
