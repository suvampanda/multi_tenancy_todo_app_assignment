import axios from "axios";
import {
  FETCH_SUBTASKS_FAILURE,
  FETCH_SUBTASKS_SUCCESS,
  FETCH_SUBTASKS_REQUEST,
  CREATE_SUBTASK_REQUEST,
  CREATE_SUBTASK_SUCCESS,
  CREATE_SUBTASK_FAILURE,
  UPDATE_SUBTASK_REQUEST,
  UPDATE_SUBTASK_SUCCESS,
  UPDATE_SUBTASK_FAILURE,
  DELETE_SUBTASK_REQUEST,
  DELETE_SUBTASK_SUCCESS,
  DELETE_SUBTASK_FAILURE,
} from "./SubTask.actionType";

export const fetchSubtask = (userId) => {
  return async(dispatch) => {
    const token = localStorage.getItem("login_token");
    const email = localStorage.getItem("user_email");
    dispatch({ type: FETCH_SUBTASKS_REQUEST });
try {
  const email = localStorage.getItem("user_email");
  const token = localStorage.getItem("login_token");
 
  const response = await fetch(
    `https://multitenancy.onrender.com/task/alltask`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Email: email,
      },
    }
  );
  const data = await response.json();
  console.log(data);
        dispatch({ type: FETCH_SUBTASKS_SUCCESS, payload: data.tasks });
      }
      catch(error){
        console.log(error)  
          dispatch({ type: FETCH_SUBTASKS_FAILURE, payload: error.message })
      }
  };
};

export const createSubtask = (taskId, subtaskData) => {
  return async (dispatch) => {
    const email = localStorage.getItem("user_email");
    const token = localStorage.getItem("login_token");
    dispatch({ type: CREATE_SUBTASK_REQUEST });

    try {
      const response = await fetch(`https://multitenancy.onrender.com/task/addsubtask/${taskId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          Email: email,
        },
        body: JSON.stringify(subtaskData),
      });
      const data = await response.json();
      console.log(data.data);
      dispatch({ type: CREATE_SUBTASK_SUCCESS, payload: data.data,taskId });
    } catch (err) {
      dispatch({ type: CREATE_SUBTASK_FAILURE, err });
    }
  };
};

export const updateSubtask = (taskId, subtaskId, updatedSubtaskData) => {
  const email = localStorage.getItem("user_email");
  const token = localStorage.getItem("login_token");
  return async (dispatch) => {
    dispatch({ type: UPDATE_SUBTASK_REQUEST });

    try {
      const response = await fetch(`https://multitenancy.onrender.com/task/updatesubtask/${taskId}/${subtaskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          Email: email,
        },
        body: JSON.stringify(updatedSubtaskData),
      });

      let data=await response.json()
      console.log(data)
      if (data.message){
      dispatch({ type: UPDATE_SUBTASK_SUCCESS, payload: updatedSubtaskData,taskId,subtaskId });
      }
      else {
        dispatch({ type: UPDATE_SUBTASK_FAILURE, error:data.error });
      }
    } catch (error) {
      dispatch({ type: UPDATE_SUBTASK_FAILURE, error });
    }
  };
};

export const deleteSubtask = (taskId, subtaskId) => {
  const email = localStorage.getItem("user_email");
  const token = localStorage.getItem("login_token");
  return async (dispatch) => {
    dispatch({ type: DELETE_SUBTASK_REQUEST });
    try {
      await fetch(`https://multitenancy.onrender.com/task/deletesubtask/${subtaskId}/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
          Email: email,
        },
      });
      dispatch({ type: DELETE_SUBTASK_SUCCESS, subtaskId,taskId });
    } catch (error) {
      dispatch({ type: DELETE_SUBTASK_FAILURE, error });
    }
  };
};

