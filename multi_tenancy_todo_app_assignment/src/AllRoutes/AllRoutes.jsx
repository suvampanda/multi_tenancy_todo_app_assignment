import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Page/Home";
import Login from "../Page/Login";
import Signup from "../Page/Signup";
import Dashboard from "../Page/Dashboard";
import PrivateRoute from "./PrivateRoutes";
import { MainTaskList } from "../Components/SubTask";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
        <Route path="/:todoId" element={<MainTaskList />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
