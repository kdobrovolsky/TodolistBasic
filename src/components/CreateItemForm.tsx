import { ChangeEvent, useState,KeyboardEvent } from "react";
import { Button } from "./Button";
import { Fab, TextField } from "@mui/material";
import { Add, Send } from "@mui/icons-material";

    export type CreateItemForm = {
        addItem: (newTitle: string) => void
    }

export const CreateItemForm = ({addItem}:CreateItemForm) => {
      const [taskTitle, setTaskTitle] = useState("");
      const [error, setError] = useState<string | null>(null);
    
      const onClickHandler = () => {
        if (taskTitle.trim() !== "") {
            addItem(taskTitle.trim());
          setTaskTitle("");
        } else {
          setError("Title is requared");
          return;
        }
      };
    
      const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
      };
    
      const createTaskOnEnterHandler = (
        event: KeyboardEvent<HTMLInputElement>
      ) => {
        setError(null);
        if (event.key === "Enter") {
          const trimmedTitle = taskTitle.trim();
    
          if (!trimmedTitle) {
            setError("Title is required");
            return;
          }
          setError(null);
          addItem(trimmedTitle);
          setTaskTitle("");
        }
      };

    return(
        <div>
        <TextField
        label="Type name"
        color="primary"
        focused
        onChange={onChangeHandler}
        onKeyDown={createTaskOnEnterHandler}
        value={taskTitle}
        error={!!error}
        helperText={error?"Title is required":''}
      />
        <Fab color="primary" aria-label="add"  onClick={onClickHandler} sx={{width: '45px', height:'45px', margin: '5px 0px 0px 5px'}} >
      <Add />
      </Fab>
     
      </div>
    )
}