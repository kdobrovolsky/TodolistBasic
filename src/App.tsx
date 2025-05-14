import { useState } from "react";
import "./App.css";
import { Task, TodoListItem } from "./components/TodoListItem";
import { v1 } from "uuid";

export type FilterValues = "all" | "active" | "completed";

function App() {
  let [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValues>("all");

  //delete tasks
  const deleteTasks = (taskId: string) => {
    tasks = tasks.filter((task) => {
      return task.id !== taskId;
    });
    setTasks(tasks);
  };

  //filtered tasks
  let filteredTasks = tasks;
  if (filter === "active") {
    filteredTasks = tasks.filter((task) => !task.isDone);
  }
  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.isDone);
  }
  const changeFilter = (filter: FilterValues) => {
    setFilter(filter);
  };

  //create tasks
  const createTaskTitle = (title: string) => {
    const newTask = { id: v1(), title: title, isDone: true };
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };

  const changeStatus = (taskId: string, isDone: boolean) => {    
    const task = tasks.map(t => t.id === taskId ? {...t, isDone}:t)
    setTasks(task)
  }


  return (
    <div className="app">
      <TodoListItem
        title={"TodoList"}
        tasks={filteredTasks}
        deleteTasks={deleteTasks}
        changeFilter={changeFilter}
        createTaskTitle={createTaskTitle}
        changeStatus= {changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
