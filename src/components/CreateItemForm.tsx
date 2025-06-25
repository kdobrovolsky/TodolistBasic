import { ChangeEvent, useState,KeyboardEvent } from "react";
import { Button } from "./Button";

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
        <input
          value={taskTitle}
          onChange={onChangeHandler}
          onKeyDown={createTaskOnEnterHandler}
          className={error ? "error" : ""}
        />
        <Button title={"+"} onClick={onClickHandler} />
        {error && <div className="error-message">{error}</div>}
      </div>
    )
}