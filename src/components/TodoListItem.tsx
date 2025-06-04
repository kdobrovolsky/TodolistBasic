import { ChangeEvent, useState } from "react";
import { FilterValues } from "../App";
import { Button } from "./Button";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  title: string;
  tasks: Task[];
  id: string;
  deleteTasks: (todolistId: string, taskId: string) => void;
  changeFilter: (todolistId: string, filter: FilterValues) => void;
  createTaskTitle: (todolistId: string, title: string) => void;
  changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void;
  filter: FilterValues;
  deleteTodolist: (todolistId: string) => void;
  // deleteAllTasks: () => void
};

export const TodoListItem = ({
  title,
  tasks,
  id,
  deleteTasks,
  changeFilter,
  createTaskTitle,
  changeStatus,
  filter,
  deleteTodolist,
}: // deleteAllTasks
TodoListPropsType) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onClickHandler = () => {
    if (taskTitle.trim() !== "") {
      createTaskTitle(id, title.trim());
      setTaskTitle("");
    } else {
      setError("Title is requared");
      return;
    }
    createTaskTitle(id, taskTitle);
    setTaskTitle("");
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
  };

  const createTaskOnEnterHandler = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    setError(null);
    if (event.key === "Enter") {
      const trimmedTitle = taskTitle.trim();

      if (!trimmedTitle) {
        setError("Title is required");
        return;
      }
      setError(null);
      createTaskTitle(id, trimmedTitle);
      setTaskTitle("");
    }
  };

  const deleteTodolistHandler = () => {
    deleteTodolist(id);
  };

  return (
    <>
      <div>
        <h3>
          {title} <Button title={"X"} onClick={deleteTodolistHandler} />
        </h3>
        <div>
          <input
            value={taskTitle}
            onChange={onChangeHandler}
            onKeyDown={createTaskOnEnterHandler}
            className={error ? "error" : ""}
          />
          <Button title={"+"} onClick={onClickHandler} />
          {error && <div className="error-message">{error}</div>}
        </div>
        {tasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          <ul>
            {tasks.map((task) => {
              const deleteTaskHandler = () => {
                deleteTasks(id, task.id);
              };

              const changeStatusHandler = (
                e: ChangeEvent<HTMLInputElement>
              ) => {
                changeStatus(id, task.id, e.currentTarget.checked);
              };

              return (
                <li key={task.id} className={task.isDone ? "is-done" : ""}>
                  <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeStatusHandler}
                  />
                  <span>{task.title}</span>
                  <Button title={"X"} onClick={deleteTaskHandler} />
                </li>
              );
            })}
          </ul>
        )}
        {/* <Button title={"Delete all tasks"} onClick={deleteAllTasks}/> */}
        <div>
          <Button
            className={filter === "all" ? "active-filter" : ""}
            title={"All"}
            onClick={() => changeFilter(id, "all")}
          />
          <Button
            className={filter === "active" ? "active-filter" : ""}
            title={"Active"}
            onClick={() => changeFilter(id, "active")}
          />
          <Button
            className={filter === "completed" ? "active-filter" : ""}
            title={"Completed"}
            onClick={() => changeFilter(id, "completed")}
          />
        </div>
      </div>
    </>
  );
};
