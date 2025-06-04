import { useState } from "react";
import "./App.css";
import { Task, TodoListItem } from "./components/TodoListItem";
import { v1 } from "uuid";

export type FilterValues = "all" | "active" | "completed";
export type TasksState = {
  [key: string]: Task[];
};

export type Todolist = {
  id: string;
  title: string;
  filter: FilterValues;
};

function App() {
  //delete tasks
  const deleteTasks = (todolistId: string, taskId: string) => {
    //Берем таски тудулиста по его 'id'
    const todolistTasks = tasks[todolistId];
    // Удаляем нужную таску:
    const newTodolist = todolistTasks.filter((task) => task.id !== taskId);
    //Перезаписываем массив тасок нужного тудулиста на новый (отфильтрованный):
    tasks[todolistId] = newTodolist;
    //Устанавливаем в state копию объекта, чтобы React отреагировал перерисовкой:
    setTasks({ ...tasks });
  };

  //delete all tasks
  // const deleteAllTasks = (todolistId:string) => {
  //   const todolistTasks = tasks[todolistId]
  //   const deleteTasks = todolistTasks.filter(() => false);
  //   tasks[todolistId] =deleteTasks
  //   setTasks({...tasks});
  // };

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    setTodolists(
      todolists.map((tl) => (tl.id === todolistId ? { ...tl, filter } : tl))
    );
  };

  //create tasks
  const createTaskTitle = (todolistId: string, title: string) => {
    const newTask = { id: v1(), title, isDone: false };
    const todolistTasks = tasks[todolistId];
    tasks[todolistId] = [newTask, ...todolistTasks];
    setTasks({ ...tasks });
  };

  const changeStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    const todolistTasks = tasks[todolistId];
    const newTodolistTasks = todolistTasks.map((t) =>
      t.id === taskId ? { ...t, isDone } : t
    );
    tasks[todolistId] = newTodolistTasks;
    setTasks({ ...tasks });
  };

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter((tl) => tl.id !== todolistId));
    delete tasks[todolistId];
    setTasks({ ...tasks });
  };

  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to learn", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<TasksState>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

  return (
    <div className="container">
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
          <div className="app" key={tl.id}>
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
            />
          </div>
        );
      })}
    </div>
  );
}

export default App;
