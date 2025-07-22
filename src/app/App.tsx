import "./App.css";
import { Task, TodoListItem } from "../components/TodoListItem";
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
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
} from "../model/todolists-reducer";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
  deleteTasksAC,
} from "../model/tasks-reducer";

import { useAppSelector } from "./hooks/useAppSelector";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { selectTodolists } from "../model/selector/todolists-selector";
import { selectTasks } from "../model/selector/tasks-selector";

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
  const dispatch = useAppDispatch();

  const todolists = useAppSelector(selectTodolists);
  const tasks = useAppSelector(selectTasks);

  const deleteTasks = (todolistId: string, taskId: string) => {
    dispatch(deleteTasksAC({ todolistId, taskId }));
  };

  const createTaskTitle = (todolistId: string, title: string) => {
    dispatch(createTaskAC({ todolistId, title }));
  };

  const changeStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    dispatch(changeTaskStatusAC({ todolistId, taskId, isDone }));
  };

  const changeTaskTitleEditableSpan = (
    todolistId: string,
    taskId: string,
    title: string
  ) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId, title }));
  };

  //todolists
  const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistAC({id:todolistId}));
    delete tasks[todolistId];
  };

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id: todolistId, filter: filter }));
  };

  const changeTodolistTitleEditableSpan = (
    taskId: string,
    newTitle: string
  ) => {
    dispatch(changeTodolistTitleAC({ id: taskId, title: newTitle }));
  };

  const createTodolist = (title: string) => {
    const actionCreateTodo = createTodolistAC(title);
    dispatch(actionCreateTodo);
  };

  return (
    <div>
      <AppBar position="fixed" sx={{ margin: "0 0 20px 0 " }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <div>
            <NavButton>Sign in</NavButton>
            <NavButton>Sign up</NavButton>
            <NavButton background={"dodgerblue"}>Faq</NavButton>
          </div>
        </Toolbar>
      </AppBar>

      <Container>
        <Grid container spacing={2} sx={{ margin: "100px 0px 0px  0px" }}>
          <CreateItemForm addItem={createTodolist} />
        </Grid>
        <Grid container spacing={1}>
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
              <div style={{ margin: "0 30px 0 0" }} key={tl.id}>
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
                  }
                />
              </div>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
