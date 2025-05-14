
type ButtonPropsType = {
    title: string
    onClick?: () => void
    disabled?: boolean
    className?: string
}

export const Button = ({title, onClick,disabled, className}:ButtonPropsType) => {
    return(
        <button className={className} onClick={onClick} disabled={disabled}>{title}</button>
    )
}