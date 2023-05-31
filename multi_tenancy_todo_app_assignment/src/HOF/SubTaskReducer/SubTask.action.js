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
  } from './SubTask.actionType'
  
  export const fetchSubtask = (taskId, subtaskId) => {
    return (dispatch) => {
      dispatch({ type: FETCH_SUBTASKS_REQUEST });
  
      // Make API request to fetch the specified subtask for the given taskId
      fetch(`your-api-endpoint-for-subtasks/${taskId}/${subtaskId}`)
        .then((response) => response.json())
        .then((data) => dispatch({ type: FETCH_SUBTASKS_SUCCESS, payload: data }))
        .catch((error) => dispatch({ type: FETCH_SUBTASKS_FAILURE, payload: error.message }));
    };
  };

  export const createSubtask = (taskId, subtaskData) => {
    return (dispatch) => {
      dispatch({ type: CREATE_SUBTASK_REQUEST });
  
    
      fetch(`your-api-endpoint-for-subtasks/${taskId}`, {
        method: 'POST',
        body: JSON.stringify(subtaskData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => dispatch({ type: CREATE_SUBTASK_SUCCESS, payload: data }))
        .catch((error) => dispatch({ type: CREATE_SUBTASK_FAILURE, error }));
    };
  };
  
  // Asynchronous action creator to update a subtask
  export const updateSubtask = (taskId, subtaskId, updatedSubtaskData) => {
    return (dispatch) => {
      dispatch({ type: UPDATE_SUBTASK_REQUEST });
  
      // Make API request to update the specified subtask for the given taskId
      fetch(`your-api-endpoint-for-subtasks/${taskId}/${subtaskId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedSubtaskData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => dispatch({ type: UPDATE_SUBTASK_SUCCESS, payload: data }))
        .catch((error) => dispatch({ type: UPDATE_SUBTASK_FAILURE, error }));
    };
  };
  

  export const deleteSubtask = (taskId, subtaskId) => {
    return (dispatch) => {
      dispatch({ type: DELETE_SUBTASK_REQUEST });
  
      // Make API request to delete the specified subtask for the given taskId
      fetch(`your-api-endpoint-for-subtasks/${taskId}/${subtaskId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then(() => dispatch({ type: DELETE_SUBTASK_SUCCESS, subtaskId }))
        .catch((error) => dispatch({ type: DELETE_SUBTASK_FAILURE, error }));
    };
  };