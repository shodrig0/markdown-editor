import { useState } from "react";

type Props = {
    name: string
    onRename: (newName: string) => void
    selected: boolean
    onClick: () => void
}

const FileItem: React.FC<Props> = ({ name, onRename, selected, onClick }) => {
    const [editItem, setEditItem] = useState<boolean>(false)
    const [value, setValue] = useState<string>(name)

    const handleDoubleClick = () => setEditItem(true)

    const handleBlur = () => {
        setEditItem(false)
        if (value !== name) onRename(value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setEditItem(false)
            if (value !== name) onRename(value)
        }

        if (event.key === "Escape") {
            setEditItem(false)
            setValue(name)
        }
    }

    return editItem ? (
        <input
            className="border px-1 py-0.5 text-sm"
            value={value}
            autoFocus
            onChange={event => setValue(event.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
        >
        </input>
    ) : (
        <span
            onDoubleClick={handleDoubleClick}
            className={`cursor-pointer select-none px-1 py-0.5 rounded ${selected ? "bg-blue-200" : ""}`}
            onClick={onClick}
        >
            {name}
        </span>
    )
}

export default FileItem