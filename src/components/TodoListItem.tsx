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
  filter: FilterValues;
  deleteAllTasks: () => void
};

export const TodoListItem = ({
  title,
  tasks,
  deleteTasks,
  changeFilter,
  createTaskTitle,
  changeStatus,
  filter,
  deleteAllTasks
}: TodoListPropsType) => {

  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string|null>(null)

  const onClickHandler = () => {
    if(taskTitle.trim() !== ''){
      createTaskTitle(title.trim())
      setTaskTitle('')
    }else{
      setError("Title is requared")
      return
    }
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
    setError(null)
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
            className={error?"error": ''}
          />
          <Button 
          title={"+"} 
          onClick={onClickHandler} 
          />
          {error&&<div className="error-message">{error}</div>}
        </div>
        {tasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          <ul>
            {tasks.map((task) => {
              const deleteTaskHandler = () => {
                deleteTasks(task.id);
              };

              const changeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                changeStatus(task.id, e.currentTarget.checked)
              }
             

              return (
                <li key={task.id} className={task.isDone ? "is-done": ''}>
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
        <Button title={"Delete all tasks"} onClick={deleteAllTasks}/>
        <div>
          <Button className={filter === 'all' ? 'active-filter': ""} title={"All"} onClick={() => changeFilter("all")} />
          <Button className={filter === 'active' ? 'active-filter': ""} title={"Active"} onClick={() => changeFilter("active")} />
          <Button className={filter === 'completed' ? 'active-filter': ""} title={"Completed"}onClick={() => changeFilter("completed")}
          />
        </div>
        
      </div>
    </>
  );
};
