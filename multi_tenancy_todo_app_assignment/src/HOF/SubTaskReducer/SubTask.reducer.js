import {
    FETCH_SUBTASKS_REQUEST,
    FETCH_SUBTASKS_SUCCESS,
    FETCH_SUBTASKS_FAILURE,
    CREATE_SUBTASK_REQUEST,
    CREATE_SUBTASK_SUCCESS,
    CREATE_SUBTASK_FAILURE,
    UPDATE_SUBTASK_REQUEST,
    UPDATE_SUBTASK_SUCCESS,
    UPDATE_SUBTASK_FAILURE,
    DELETE_SUBTASK_REQUEST,
    DELETE_SUBTASK_SUCCESS,
    DELETE_SUBTASK_FAILURE,
  } from './SubTask.actionType';

  const initialState = {
    subtask: null,
    loading: false,
    error: null,
  }

  
  const subtaskReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SUBTASKS_REQUEST:
        return {
          ...state,
          [action.taskId]: {
            ...state[action.taskId],
            loading: true,
            error: null,
          },
        };
      case FETCH_SUBTASKS_SUCCESS:
        return {
          ...state,
          [action.taskId]: {
            ...state[action.taskId],
            loading: false,
            data: action.payload,
            error: null,
          },
        };
      case FETCH_SUBTASKS_FAILURE:
        return {
          ...state,
          [action.taskId]: {
            ...state[action.taskId],
            loading: false,
            data: [],
            error: action.error,
          },
        };
      case CREATE_SUBTASK_REQUEST:
        return {
          ...state,
          [action.taskId]: {
            ...state[action.taskId],
            loading: true,
            error: null,
          },
        };
      case CREATE_SUBTASK_SUCCESS:
        return {
          ...state,
          [action.taskId]: {
            ...state[action.taskId],
            loading: false,
            data: [...state[action.taskId].data, action.payload],
            error: null,
          },
        };
      case CREATE_SUBTASK_FAILURE:
        return {
          ...state,
          [action.taskId]: {
            ...state[action.taskId],
            loading: false,
            error: action.error,
          },
        };
      case UPDATE_SUBTASK_REQUEST:
        return {
          ...state,
          [action.taskId]: {
            ...state[action.taskId],
            loading: true,
            error: null,
          },
        };
      case UPDATE_SUBTASK_SUCCESS:
        return {
          ...state,
          [action.taskId]: {
            ...state[action.taskId],
            loading: false,
            data: state[action.taskId].data.map((subtask) =>
              subtask.id === action.payload.id ? action.payload : subtask
            ),
            error: null,
          },
        };
      case UPDATE_SUBTASK_FAILURE:
        return {
          ...state,
          [action.taskId]: {
            ...state[action.taskId],
            loading: false,
            error: action.error,
          },
        };
      case DELETE_SUBTASK_REQUEST:
        return {
          ...state,
          [action.taskId]: {
            ...state[action.taskId],
            loading: true,
            error: null,
          },
        };
      case DELETE_SUBTASK_SUCCESS:
        return {
          ...state,
          [action.taskId]: {
            ...state[action.taskId],
            loading: false,
            data: state[action.taskId].data.filter((subtask) => subtask.id !== action.subtaskId),
            error: null,
          },
        };
      case DELETE_SUBTASK_FAILURE:
        return {
          ...state,
          [action.taskId]: {
            ...state[action.taskId],
            loading: false,
            error: action.error,
          },
        };
      default:
        return state;
    }
  };
  
  export default subtaskReducer;
  
