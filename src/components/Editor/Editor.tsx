import { useState } from "react";
// import { useMarkdown } from "../../context/markdownContext";
// import type { IMarkdown } from "../../types/mdTypes";
import TitleBar from "../Title-Bar/Title-Bar";

const Editor = () => {
    // const markdownContext = useMarkdown()
    const [markdown, setMarkdown] = useState<string>("")
    const [words, setWords] = useState(0)
    const [chars, setChars] = useState(0)

    const getWordsCount = (string: string) => {
        return string.match(/(\w)/g)?.length
    }

    const getCharsCount = (string: string) => {
        return string.length
    }

    const editMarkdown = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value

        setMarkdown(value)
        setWords(getWordsCount(value) || 0)
        setChars(getCharsCount(value))
    }

    // i think it's better to create a component
    const downloadFile = () => {
        const link = document.createElement('a')
        const file = new Blob([markdown], { type: 'text/plain' })
        link.href = URL.createObjectURL(file)
        link.download = 'Untitled.md'
        link.click()
        URL.revokeObjectURL(link.href)
    }

    return (
        <div>
            <TitleBar title="Editor" asideTxt={`${words} words ${chars} characters`} />
            <textarea value={markdown} onChange={editMarkdown} />
            <button onClick={downloadFile}>Download md</button>
        </div>
    )
}

export default Editor