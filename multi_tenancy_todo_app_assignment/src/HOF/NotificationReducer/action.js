// actions.js

import {
    FETCH_NOTIFICATIONS_REQUEST,
    FETCH_NOTIFICATIONS_SUCCESS,
    FETCH_NOTIFICATIONS_FAILURE,
    POST_NOTIFICATION_REQUEST,
    POST_NOTIFICATION_SUCCESS,
    POST_NOTIFICATION_FAILURE,
  } from "./actionTypes";
  
  export const postNotification = (message) => {
    return async (dispatch) => {
      try {
        const email = localStorage.getItem("user_email");
        const token = localStorage.getItem("login_token");
        // Dispatch the request action
        dispatch({ type: POST_NOTIFICATION_REQUEST });
  
        // Make the API call to post the notification
        const response = await fetch("https://multitenancy.onrender.com/notification/postnotification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            email:email
          },
          body: JSON.stringify({ message, email: localStorage.getItem("user_email") }),
        });
  
        // Check the response and dispatch the success or failure action accordingly
        const data = await response.json();
        if (data.message) {
         
          dispatch({ type: POST_NOTIFICATION_SUCCESS, payload: {message,email} });
        } else {
          const error = await response.json();
          dispatch({ type: POST_NOTIFICATION_FAILURE, payload: error });
        }
      } catch (error) {
        dispatch({ type: POST_NOTIFICATION_FAILURE, payload: error });
      }
    };
  };
  
  export const fetchNotifications = () => {
    return async (dispatch) => {
      try {
        // Dispatch the request action
        dispatch({ type: FETCH_NOTIFICATIONS_REQUEST });
  
        // Make the API call to fetch notifications
        const response = await fetch("https://multitenancy.onrender.com/notification/allnotification", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("login_token"),
            Email: localStorage.getItem("user_email"),
          },
        });
  
        // Check the response and dispatch the success or failure action accordingly
        const data = await response.json();
        if (data) {
          dispatch({ type: FETCH_NOTIFICATIONS_SUCCESS, payload: data });
        } else {
          const error = await response.json();
          dispatch({ type: FETCH_NOTIFICATIONS_FAILURE, payload: error });
        }
      } catch (error) {
        dispatch({ type: FETCH_NOTIFICATIONS_FAILURE, payload: error });
      }
    };
  };
  