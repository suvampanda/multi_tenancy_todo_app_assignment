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
  allData: [], // Updated to store all tasks with subtasks
  loading: false,
  error: null,
};

const subtaskReducer = (state = initialState, action) => {
  const { taskId, payload, error, subtaskId } = action;
  switch (action.type) {
    case FETCH_SUBTASKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SUBTASKS_SUCCESS:
      return {
        ...state,
        allData: payload,
        loading: false,
        error: null,
      };
    case FETCH_SUBTASKS_FAILURE:
      return {
        ...state,
        allData: [],
        loading: false,
        error,
      };
    case CREATE_SUBTASK_REQUEST:
    case UPDATE_SUBTASK_REQUEST:
    case DELETE_SUBTASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_SUBTASK_SUCCESS:
      console.log(taskId,payload, "ugujh")
      return {
        
        ...state,
        allData: state.allData.map((task) =>
          task.id === taskId
            ? {
                ...task,
                subtasks: [...task.subtasks, payload],
              }
            : task
        ),
        loading: false,
        error: null,
      };
    case UPDATE_SUBTASK_SUCCESS:
      return {
        ...state,
        allData: state.allData.map((task) =>
          task.id === taskId
            ? {
                ...task,
                subtasks: task.subtasks.map((subtask) =>
                  subtask.subtask_id === payload.subtask_id ? payload : subtask
                ),
              }
            : task
        ),
        loading: false,
        error: null,
      };
    case DELETE_SUBTASK_SUCCESS:
      return {
        ...state,
        allData: state.allData.map((task) =>
          task.id === taskId
            ? {
                ...task,
                subtasks: task.subtasks.filter(
                  (subtask) => subtask.subtask_id !== subtaskId
                ),
              }
            : task
        ),
        loading: false,
        error: null,
      };
    case CREATE_SUBTASK_FAILURE:
    case UPDATE_SUBTASK_FAILURE:
    case DELETE_SUBTASK_FAILURE:
      return {
        ...state,
        loading: false,
        error,
      };
    default:
      return state;
  }
};

export default subtaskReducer;
