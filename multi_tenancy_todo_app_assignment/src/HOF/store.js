import { applyMiddleware, legacy_createStore } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { todoReducer } from "./TodoReducer/todo.reducer";
import { reducer as authReducer } from "./AuthReducer/auth.reducer"
import { userReducer } from "./UserReducer/user.reducer";
import subtaskReducer from "./SubTaskReducer/SubTask.reducer";
import notificationReducer from "./NotificationReducer/reducer";
const rootreducer = combineReducers({authReducer,todoReducer,userReducer,subtaskReducer,notificationReducer});
const store = legacy_createStore(rootreducer, applyMiddleware(thunk));
export { store };
