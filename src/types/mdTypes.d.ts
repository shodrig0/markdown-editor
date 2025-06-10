export interface IMarkdown {
    id: string,
    title: string,
    content: string
}

export type MarkdownContextType = {
    markdowns: IMarkdown[]
    saveMarkdown: (markdown: IMarkdown) => void
    markdown: string
    setMarkdown: (value: string) => void
}