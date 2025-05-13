import { useRef } from "react";
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
  createTasks: (title:string) => void;
};

export const TodoListItem = ({
  title,
  tasks,
  deleteTasks,
  changeFilter,
  createTasks,
}: TodoListPropsType) => {

    const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <div>
        <h3>{title}</h3>
        <div>
          <input ref={inputRef}/>
          <Button title={"+"} onClick={() => {
            if(inputRef.current){
                createTasks(inputRef.current.value)
            }
          }} />
        </div>
        {tasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />{" "}
                <span>{task.title}</span>
                <Button title={"X"} onClick={() => deleteTasks(task.id)} />
              </li>
            ))}
          </ul>
        )}

        <div>
          <Button title={"All"} onClick={() => changeFilter("all")} />
          <Button title={"Active"} onClick={() => changeFilter("active")} />
          <Button
            title={"Completed"}
            onClick={() => changeFilter("completed")}
          />
        </div>
      </div>
    </>
  );
};
