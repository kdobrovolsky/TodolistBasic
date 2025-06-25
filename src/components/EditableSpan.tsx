import { TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"

export type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = ({title,onChange}:EditableSpanPropsType) => {
    const [editMode,setEditMode] = useState(false)
    const [taskTitle,setTaskTitle] = useState(title)

    const onEditModeOnHandler = () => {
        setEditMode(false)
        onChange(taskTitle)
    }

    const onEditModeOffHandler = () => {
        setEditMode(true)
    }

    const onChangeEvent = (e:ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    return(
        !editMode
        ?<span onDoubleClick={onEditModeOffHandler} >{title}</span>
        : <TextField
        label="Type name"
        color="primary"
        focused
        onChange={onChangeEvent}
        onBlur={onEditModeOnHandler}
        value={taskTitle}
        autoFocus
      />
    )
}