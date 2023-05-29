import { UPDATE_TODO_FAILURE } from "../TodoReducer/todo.actionTypes";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  ASSIGN_TODO_TO_USER_REQ,
  ASSIGN_TODO_TO_USER_FAIL,
  ASSIGN_TODO_TO_USER_SUC,
} from "./user.actionTypes";
// Fetch users action
export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    try {
       let email = localStorage.getItem("user_email");
      let token = localStorage.getItem("login_token");
      let role = localStorage.getItem("role")

      // Make API call to fetch users
      const users = await fetch(`http://localhost:8090/user/alluser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          Email: email,
        },
      });
      const data = await users.json();
      if (data) {
        dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
      } else {
        dispatch({ type: FETCH_USERS_FAILURE, payload: data.error });
      }
    } catch (error) {
      dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
    }
  };
};

// Assign todo to user action
export const assignTodoToUser = (mail, todo) => {
  return async (dispatch) => {
     let email = localStorage.getItem("user_email");
      let token = localStorage.getItem("login_token");
      let role = localStorage.getItem("role")
    try {
      // Make API call to assign todo to user
      let response = await fetch(
        `http://localhost:8090/clients/assigntodo`,
        {
        method:"POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          Email: email,
          specific_user_email:mail
        },
      body:JSON.stringify(todo)
      }
      );
      let data = await response.json();

      console.log(data)

      if(data.message){
        alert(data.message)
      }
      // if (data) {
      //   dispatch({ type: ASSIGN_TODO_TO_USER_SUC, payload: todoId });
      // } else {
      //   dispatch({ type: ASSIGN_TODO_TO_USER_FAIL, payload: data.error });
      // }
    } catch (error) {
      // dispatch({ type: ASSIGN_TODO_TO_USER_FAIL, payload: error.message });
    }
  };
};

// Add user action
export const addUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: ADD_USER_REQUEST });
     let email = localStorage.getItem("user_email");
      let token = localStorage.getItem("login_token");
      let role = localStorage.getItem("role")
    try {
      // Make API call to add user
      const response = await fetch(`http://localhost:8090/user/adduser`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          Email: email,
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.error) {
        alert(data.error);
        dispatch({ type: ADD_USER_FAILURE, payload: data.error });
      } else if ((data.message === "User already exits")) {
        alert(data.message);

        dispatch({ type: ADD_USER_FAILURE, payload: data.error });
      } else if (data.message) {
        alert(data.message);
        dispatch({ type: ADD_USER_SUCCESS, payload: user });
      }
    } catch (error) {
      alert(error.error);
      dispatch({ type: ADD_USER_FAILURE, payload: error.message });
    }
  };
};

// Update user action
export const updateUser = (userId, updatedUser) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
     let email = localStorage.getItem("user_email");
      let token = localStorage.getItem("login_token");
      let role = localStorage.getItem("role")
    try {
      // Make API call to update user
      const response = await fetch(
        `http://localhost:8090/user/updateuser/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            Email: email,
          },
          body: JSON.stringify(updatedUser),
        }
      );
      const data = await response.json();
      if (data.message) {
        alert(data.message)
        dispatch({ type: UPDATE_USER_SUCCESS, payload: updatedUser });
      } else {
        dispatch({ type: UPDATE_TODO_FAILURE, payload: data.error });
      }
    } catch (error) {
      dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
    }
  };
};

// Delete user action

export const deleteUser = (userId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });

  
    try {
       let email = localStorage.getItem("user_email");
      let token = localStorage.getItem("login_token");
      let role = localStorage.getItem("role")
      // Make API call to delete user
      const response = await fetch(
        `http://localhost:8090/user/deleteuser/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            Email: email,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.message) {
        dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
      } else {
        dispatch({ type: DELETE_USER_FAILURE, payload: data.error });
      }
    } catch (error) {
      dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
    }
  };
};
