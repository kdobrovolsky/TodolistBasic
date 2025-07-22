import { useReducer, useState } from "react";
import "./App.css";
import { Task, TodoListItem } from "../components/TodoListItem";
import { v1 } from "uuid";
import { CreateItemForm } from "../components/CreateItemForm";
import {
  AppBar,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavButton } from "../components/styles/TodolistItem.styles";
import { changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC, todolistsReducer } from "../model/todolists-reducer";
import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTasksAC, tasksReducer } from "../model/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";


export type FilterValues = "all" | "active" | "completed";
export type TasksState = {
  [key: string]: Task[];
};

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValues;
};

function App() {

  const dispatch = useDispatch()

  const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)
  const tasks = useSelector<RootState, TasksState>(state => state.tasks)

  // const [todolists, dispatchTodolists] = useReducer(todolistsReducer,[
  //   { id: todolistId1, title: "What to learn", filter: "all" },
  //   { id: todolistId2, title: "What to learn", filter: "all" },
  // ]);

  // const [tasks, dispatchTasks] = useReducer(tasksReducer,{
  //   [todolistId1]: [
  //     { id: v1(), title: "HTML&CSS", isDone: true },
  //     { id: v1(), title: "JS", isDone: true },
  //     { id: v1(), title: "ReactJS", isDone: false },
  //   ],
  //   [todolistId2]: [
  //     { id: v1(), title: "Rest API", isDone: true },
  //     { id: v1(), title: "GraphQL", isDone: false },
  //   ],
  // });


  const deleteTasks = (todolistId: string, taskId: string) => {
    dispatch(deleteTasksAC({todolistId,taskId}))
  };

  const createTaskTitle = (todolistId: string, title: string) => {
    dispatch(createTaskAC({todolistId,title}))
  };

  const changeStatus = (todolistId: string,taskId: string,isDone: boolean) => {
    dispatch(changeTaskStatusAC({todolistId,taskId,isDone}));
  };

  const changeTaskTitleEditableSpan = (todolistId: string,taskId: string,title: string) => {
    dispatch(changeTaskTitleAC({todolistId,taskId,title}))
  };

  
  
  
  //todolists
  const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistAC(todolistId))
    delete tasks[todolistId];
  };

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({id: todolistId, filter: filter}))
  };


  const changeTodolistTitleEditableSpan = (
    taskId: string,
    newTitle: string
  ) => {
    dispatch(changeTodolistTitleAC({id: taskId, title: newTitle}))
  };

  const createTodolist = (title: string) => {
    const actionCreateTodo = createTodolistAC(title)
    dispatch(actionCreateTodo)
  };


  

  return (
    <div>
      <AppBar position="fixed" sx={{margin:'0 0 20px 0 '}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          > 
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <div>
              <NavButton>Sign in</NavButton>
              <NavButton>Sign up</NavButton>
              <NavButton background={'dodgerblue'}>Faq</NavButton>
            </div>
        </Toolbar>
      </AppBar>

      <Container>
        <Grid container spacing={2} sx={{ margin: "100px 0px 0px  0px" }}>
          
          <CreateItemForm addItem={createTodolist} />
        </Grid>
        <Grid container spacing={1} >
          {todolists.map((tl) => {
            // функция фильтрации таски
            const getFilteredTasks = (tasks: Task[], filter: FilterValues) => {
              switch (filter) {
                case "active":
                  return tasks.filter((task) => !task.isDone);
                case "completed":
                  return tasks.filter((task) => task.isDone);
              }
              return tasks;
            };
            //функция помещенная в переменную
            const tasksForTodoList = getFilteredTasks(tasks[tl.id], tl.filter);
            return (
              <div style={{margin:'0 30px 0 0'}} key={tl.id}>
                <TodoListItem 
                  id={tl.id}
                  title={tl.title}
                  tasks={tasksForTodoList}
                  deleteTasks={deleteTasks}
                  changeFilter={changeFilter}
                  createTaskTitle={createTaskTitle}
                  changeStatus={changeStatus}
                  filter={tl.filter}
                  deleteTodolist={deleteTodolist}
                  changeTaskTitleEditableSpan={changeTaskTitleEditableSpan}
                  changeTodolistTitleEditableSpan={
                    changeTodolistTitleEditableSpan
                  }/>
              </div>
        
            );
          })}
          
        </Grid>
      </Container>
    </div>
  );
}

export default App;
