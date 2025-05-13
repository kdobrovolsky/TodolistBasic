import { ChangeEvent } from "react"

type InputPropsType = {
    onChange: (event: ChangeEvent<HTMLInputElement>,) => void
}

export const Input = ({onChange}:InputPropsType) => {
    return(
        <input onChange={onChange} />
    )
}