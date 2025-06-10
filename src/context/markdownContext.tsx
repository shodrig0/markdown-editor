import * as React from "react"
import type { MarkdownContextType, IMarkdown } from "../types/mdTypes"

export const MarkdownContext = React.createContext<MarkdownContextType | null>(null)

const MarkdownProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [markdowns, setMarkdown] = React.useState<IMarkdown[]>([])

    const saveMarkdown = (markdown: IMarkdown) => {
        const newMarkdown: IMarkdown = {
            id: crypto.randomUUID(),
            title: markdown.title,
            content: markdown.content
        }
        setMarkdown([...markdowns, newMarkdown])
    }

    return <MarkdownContext.Provider value={{ markdowns, saveMarkdown }}>{children}</MarkdownContext.Provider>
}

export const useMarkdown = () => React.useContext(MarkdownContext)

export default MarkdownProvider