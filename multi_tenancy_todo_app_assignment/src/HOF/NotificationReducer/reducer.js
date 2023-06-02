// reducer.js

import {
    FETCH_NOTIFICATIONS_REQUEST,
    FETCH_NOTIFICATIONS_SUCCESS,
    FETCH_NOTIFICATIONS_FAILURE,
    POST_NOTIFICATION_REQUEST,
    POST_NOTIFICATION_SUCCESS,
    POST_NOTIFICATION_FAILURE,
  } from "./actionTypes";
  
  const initialState = {
    notifications: [],
    loading: false,
    error: null,
  };
  
  const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_NOTIFICATIONS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_NOTIFICATIONS_SUCCESS:
        return {
          ...state,
          loading: false,
          notifications: action.payload,
        };
      case FETCH_NOTIFICATIONS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case POST_NOTIFICATION_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case POST_NOTIFICATION_SUCCESS:
        // Optionally, you can update the state or perform additional actions after successfully posting a notification
        return {
          ...state,
          loading: false,
          notifications:[...state.notifications,action.payload]
        };
      case POST_NOTIFICATION_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default notificationReducer;
  