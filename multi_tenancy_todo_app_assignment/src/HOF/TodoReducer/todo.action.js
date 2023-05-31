// Fetch Todos Action
import {
  ADD_TODO_FAILURE,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ASSIGN_TODO_TO_USER_FAILURE,
  ASSIGN_TODO_TO_USER_REQUEST,
  ASSIGN_TODO_TO_USER_SUCCESS,
  DELETE_TODO_FAILURE,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  FETCH_TODOS_FAILURE,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  UPDATE_TODO_FAILURE,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  
} from "./todo.actionTypes";
// Fetch all todos action
export const fetchTodos = (page = 1, limit = 5) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TODOS_REQUEST });
    let url;
    try {
      const email = localStorage.getItem("user_email");
      const token = localStorage.getItem("login_token");
      const role = localStorage.getItem("role")
      if (role == "user") {
        url = "todo/useralltodo";
      } else {
        url = "todo/alltodo";
      }
      const response = await fetch(
        `https://multitenancy.onrender.com/${url}?limit=${limit}&page=${page}`,
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

      const alldetails={...data,currentPage:page,itemsPerPage:limit}

      if (!data.error&&!data.message) {
        dispatch({ type: FETCH_TODOS_SUCCESS, payload: alldetails });
      } else {
        dispatch({ type: FETCH_TODOS_FAILURE, error: "Failed to fetch todos" });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: FETCH_TODOS_FAILURE, error: "An error occurred" });
    }
  };
};

// Add todo action
export const addTodo = (todo) => {
  return async (dispatch) => {
    dispatch({ type: ADD_TODO_REQUEST });

    try {
      const email = localStorage.getItem("user_email");
      const token = localStorage.getItem("login_token");
      const role = localStorage.getItem("role")
      let url;
      if (role == "user") {
        url = "todo/useraddtodo";
      } else {
        url = "todo/addtodo";
      }
      const response = await fetch(`https://multitenancy.onrender.com/${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          Email: email,
        },
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      if (data.message) {
        dispatch({ type: ADD_TODO_SUCCESS, payload: data.todo });
      } else {
        dispatch({ type: ADD_TODO_FAILURE, error: "Failed to add todo" });
      }
    } catch (error) {
      dispatch({ type: ADD_TODO_FAILURE, error: "An error occurred" });
    }
  };
};

// Delete todo action
export const deleteTodo = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_TODO_REQUEST });

    try {
      const email = localStorage.getItem("user_email");
      const token = localStorage.getItem("login_token");
      const role = localStorage.getItem("role")
      let url;
      if (role == "user") {
        url = "todo/userdeletetodo";
      } else {
        url = "todo/delete";
      }
      const response = await fetch(
        `https://multitenancy.onrender.com/${url}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            Email: email,
          },
        }
      );

      dispatch({ type: DELETE_TODO_SUCCESS, payload: id });

      // dispatch({ type: DELETE_TODO_FAILURE, error: 'Failed to delete todo' });
    } catch (error) {
      dispatch({ type: DELETE_TODO_FAILURE, error: "An error occurred" });
    }
  };
};

// Update todo action
export const updateTodo = (id, updatedTodo) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_TODO_REQUEST });
    let url;
    try {
      const email = localStorage.getItem("user_email");
      const token = localStorage.getItem("login_token");
      const role = localStorage.getItem("role")
      if (role == "user") {
        url = "todo/userupdatetodo";
      } else {
        url = "todo/update";
      }
      const response = await fetch(
        `https://multitenancy.onrender.com/${url}/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            Email: email,
          },
          body: JSON.stringify(updatedTodo),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.message) {
        dispatch({ type: UPDATE_TODO_SUCCESS, payload: data.todo });
      } else {
        dispatch({ type: UPDATE_TODO_FAILURE, error: "Failed to update todo" });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: UPDATE_TODO_FAILURE, error: "An error occurred" });
    }
  };
};

export const assignTodoToUser = (todoId, mail) => {

  console.log(todoId,mail)
  return async (dispatch) => {
    dispatch({ type: ASSIGN_TODO_TO_USER_REQUEST });
    const email = localStorage.getItem("user_email");
    const token = localStorage.getItem("login_token");
    const role = localStorage.getItem("role")

    try {
      // Make API call to assign todo to user
      let response = await fetch(
        `https://multitenancy.onrender.com/users/assignto/${todoId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":"application/json",
            Authorization: token,
            Email: email
          },
        
          body:JSON.stringify({email:mail})
        }
      );

      let data = await response.json();
      console.log(data);
      if (data.message) {
        alert(data.message);
        dispatch({ type: ASSIGN_TODO_TO_USER_SUCCESS, payload: todoId });
      } else if (data.error) {
        alert(data.error);
        dispatch({ type: ASSIGN_TODO_TO_USER_FAILURE, payload: data.error });
      }
    } catch (error) { 
      dispatch({ type: ASSIGN_TODO_TO_USER_FAILURE, payload: error.message });
    }
  };
};
