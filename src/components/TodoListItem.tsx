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
  deleteTasks: (taskId: string) => void;
  changeFilter: (filter: FilterValues) => void;
  createTaskTitle: (title: string) => void;
  changeStatus: (taskId: string, isDone: boolean) => void;
}

export const TodoListItem = ({
  title,
  tasks,
  deleteTasks,
  changeFilter,
  createTaskTitle,
  changeStatus,
}: TodoListPropsType) => {
  const [taskTitle, setTaskTitle] = useState("");

  const onClickHandler = () => {
    createTaskTitle(taskTitle);
    setTaskTitle("");
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
  };

  const createTaskOnEnterHandler = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    //функция для отправки таски по нажатию Enter
    if (event.key === "Enter") {
      createTaskTitle(taskTitle);
      setTaskTitle("");
    }
  };

  return (
    <>
      <div>
        <h3>{title}</h3>
        <div>
          <input
            value={taskTitle}
            onChange={onChangeHandler}
            onKeyDown={createTaskOnEnterHandler}
          />
          <Button title={"+"} onClick={onClickHandler} />
        </div>
        {tasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          <ul>
            {tasks.map((task) => {
              const deleteTaskHandler = () => {
                deleteTasks(task.id); 
              };

              const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                // changeStatus(e.currentTarget.value)
                console.log(e.currentTarget.checked)
                changeStatus(task.id, e.currentTarget.checked);
              }

              return (
                <li key={task.id}>
                  <input type="checkbox" checked={task.isDone}  onChange={onChangeHandler}/>
                  <span>{task.title}</span>
                  <Button title={"X"} onClick={deleteTaskHandler} />
                </li>
              );
            })}
          </ul>
        )}

        <div>
          <Button title={"All"} onClick={() => changeFilter("all")} />
          <Button title={"Active"} onClick={() => changeFilter("active")} />
          <Button title={"Completed"} onClick={() => changeFilter("completed")}
          />
        </div>
      </div>
    </>
  );
};
