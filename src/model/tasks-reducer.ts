import { TasksState} from "../app/App";
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";
import { createTodolistAC, deleteTodolistAC } from "./todolists-reducer";

export const deleteTasksAC = createAction<{todolistId: string,taskId:string}>('tasks/deleteTasks')
export const createTaskAC = createAction<{todolistId: string, title: string}>('tasks/createTasks')
export const changeTaskStatusAC = createAction<{todolistId: string, taskId: string,isDone: boolean}>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{todolistId: string, taskId: string,title: string}>('tasks/changeTaskTitle')

const initialState: TasksState = {};

export const tasksReducer = createReducer(initialState, builder=>{
    builder.addCase(deleteTodolistAC,(state,action) =>{
      delete state[action.payload.id]
    }).addCase(createTodolistAC,(state,action)=>{
        state[action.payload.id] = []
    }).addCase(deleteTasksAC,(state, action) => {
       const tasks = state[action.payload.todolistId]
       if(tasks){
        const index = tasks.findIndex(task => task.id === action.payload.taskId);
        if (index !== -1) {
          tasks.splice(index, 1); 
       }
    }
    }).addCase(createTaskAC,(state,action) => {
        const newTask = { id: nanoid(), title: action.payload.title, isDone: false };
        state[action.payload.todolistId].unshift(newTask)
    }).addCase(changeTaskStatusAC,(state,action) => {
        const tasks = state[action.payload.todolistId]
        const task = tasks.find(t=> t.id === action.payload.taskId)
        if(task) task.isDone = action.payload.isDone
    }).addCase(changeTaskTitleAC,(state,action) => {
        const tasks = state[action.payload.todolistId]
        const task = tasks.find(t=> t.id === action.payload.taskId)
        if(task) task.title = action.payload.title
})})




