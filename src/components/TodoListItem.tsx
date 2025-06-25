import { ChangeEvent, useState } from "react";
import { FilterValues } from "../App";

import { CreateItemForm } from "./CreateItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton, ListItem } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { getListItemSx } from "./styles/TodolistItem.styles";

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
  changeTaskTitleEditableSpan: (
    todolistId: string,
    taskId: string,
    newTitle: string
  ) => void;
  changeTodolistTitleEditableSpan: (
    todolistId: string,
    newTitle: string
  ) => void;
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
  changeTaskTitleEditableSpan,
  changeTodolistTitleEditableSpan,
}: TodoListPropsType) => {
  const deleteTodolistHandler = () => {
    deleteTodolist(id);
  };

  const handleNewTask = (newTitle: string) => {
    createTaskTitle(id, newTitle);
  };

  const todolistTitleEditableSpanHandler = (newTitle: string) => {
    changeTodolistTitleEditableSpan(id, newTitle);
  };

  return (
    <>
      <div>
        <h3>
          <EditableSpan
            title={title}
            onChange={todolistTitleEditableSpanHandler}
          />
          <IconButton onClick={deleteTodolistHandler} aria-label="delete">
            <Delete />
          </IconButton>
        </h3>
        <CreateItemForm addItem={handleNewTask} />

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

              const changeTaskTitleHandler = (newTitle: string) => {
                changeTaskTitleEditableSpan(id, task.id, newTitle);
              };

              return (
                <ListItem key={task.id}  sx={getListItemSx(task.isDone)}>
                  <Checkbox
                    checked={task.isDone}
                    onChange={changeStatusHandler}
                  />
                  <EditableSpan
                    title={task.title}
                    onChange={changeTaskTitleHandler}
                  />
                  <IconButton aria-label="delete" onClick={deleteTaskHandler}>
                    <Delete />
                  </IconButton>
                </ListItem>
              );
            })}
          </ul>
        )}
        <div>
          <Button
            variant={filter === "all" ? "contained" : "outlined"}
            onClick={() => changeFilter(id, "all")}
          >
            All
          </Button>
          <Button
            variant={filter === "active" ? "contained" : "outlined"}
            onClick={() => changeFilter(id, "active")}
          >
            Active
          </Button>
          <Button
            variant={filter === "completed" ? "contained" : "outlined"}
            onClick={() => changeFilter(id, "completed")}
          >
            Completed
          </Button>
        </div>
      </div>
    </>
  );
};
