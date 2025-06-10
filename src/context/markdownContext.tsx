import * as React from "react"
import type { MarkdownContextType, IMarkdown } from "../types/mdTypes"

export const MarkdownContext = React.createContext<MarkdownContextType | null>(null)

const MarkdownProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [markdowns, setMarkdowns] = React.useState<IMarkdown[]>([])
    const [markdown, setMarkdown] = React.useState<string>("")

    const saveMarkdown = (markdown: IMarkdown) => {
        const newMarkdown: IMarkdown = {
            id: crypto.randomUUID(),
            title: markdown.title,
            content: markdown.content
        }
        setMarkdowns([...markdowns, newMarkdown])
    }

    return <MarkdownContext.Provider value={{ markdowns, saveMarkdown, markdown, setMarkdown }}>{children}</MarkdownContext.Provider>
}

export const useMarkdown = () => React.useContext(MarkdownContext)

export default MarkdownProvider