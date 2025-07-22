import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "../model/tasks-reducer";
import { todolistsReducer } from "../model/todolists-reducer";

// объединение reducer'ов с помощью combineReducers
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

//создание store(хранилище редьюсеров)
export const store = configureStore({
    reducer: rootReducer
})