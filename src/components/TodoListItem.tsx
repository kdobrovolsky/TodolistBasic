import { ChangeEvent, useState } from "react";
import { FilterValues } from "../App";
import { Button } from "./Button";
import { CreateItemForm } from "./CreateItemForm";

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


  const deleteTodolistHandler = () => {
    deleteTodolist(id);
  };

  const onChangeNewTitile = (newTitle: string) => {
    createTaskTitle(id, newTitle)
  }

  return (
    <>
      <div>
        <h3>
          {title} <Button title={"X"} onClick={deleteTodolistHandler} />
        </h3>
        <CreateItemForm addItem={onChangeNewTitile}/>

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
