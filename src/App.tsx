import { useState } from "react";
import "./App.css";
import { Task, TodoListItem } from "./components/TodoListItem";

function App() {
  let [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "Redux", isDone: false },
  ]);

  //delete tasks
  const deleteTasks = (taskId: number) => {
    tasks = tasks.filter((task) => {
      return task.id !== taskId;
    });
    setTasks(tasks);
  };

  return (
    <div className="app">
      <TodoListItem
        title={"TodoList"}
        tasks={tasks}
        deleteTasks={deleteTasks}
      />
    </div>
  );
}

export default App;
