import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TodoList from '../Components/TodoItem';
import { fetchTodos } from '../HOF/TodoReducer/todo.action';
import { fetchProfile } from '../HOF/AuthReducer/auth.action';


const Home = () => {
    const[page,setpage]=useState(1)
    const todo = useSelector((store) => store.todoReducer); // Selecting the todo state from the Redux store
    const auth = useSelector((store) => store.authReducer); // Selecting the authentication state from the Redux store
    const dispatch = useDispatch();
    console.log(todo) // Creating a dispatch function for Redux actions

    useEffect(() => {
      dispatch(fetchTodos(page)); // Fetching todos when the page changes
      dispatch(fetchProfile())
    }, [page]);

  return (
    <div>
<TodoList todo={todo} loading={todo.loading} auth={auth} setpage={setpage} totalPages={todo.pagination.totalPages}  page={page}/>
    </div>
  )
}

export default Home
