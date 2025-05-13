import { FilterValues } from "../App";
import { Button } from "./Button";

export type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  title: string;
  tasks: Task[];
  deleteTasks: (taskId: number) => void;
  changeFilter: (filter: FilterValues) => void;
};

export const TodoListItem = ({
  title,
  tasks,
  deleteTasks,
  changeFilter,
}: TodoListPropsType) => {
  return (
    <>
      <div>
        <h3>{title}</h3>
        <div>
          <input />
          <Button title={"+"} />
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
