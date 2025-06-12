import * as React from "react"
import { useMarkdown } from "../../context/markdownContext"
import { Sidebar } from "../Sidebar/Sidebar"
import type { FileNode } from "../../utils/fileNode"
import { Separator } from "../Ui/Separator"
import { Badge } from "../Ui/Badge"

const Editor = () => {
    const { markdown, setMarkdown } = useMarkdown()!

    const [selectedFile, setSelectedFile] = React.useState<string>("README.md")

    const [words, setWords] = React.useState(0)
    const [chars, setChars] = React.useState(0)

    const handleFileSelect = (file: FileNode) => {
        if (file.type === "file") {
            setSelectedFile(file.name)
            setMarkdown(`# ${file.name}\n\nAcá debería ir el contenido ${file.name} o la nota que el usuario cree`)
        }
    }

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

    // fix style btn
    // const downloadFile = () => {
    //     const link = document.createElement('a')
    //     const file = new Blob([markdown], { type: 'text/plain' })
    //     link.href = URL.createObjectURL(file)
    //     link.download = 'Untitled.md'
    //     link.click()
    //     URL.revokeObjectURL(link.href)
    // }

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100">
            <div className="w-64 border-r border-gray-700 bg-gray-800">
                <div className="p-4 border-b border-gray-700">
                    <h3 className="font-semibold text-sm text-gray-200">Explorer</h3>
                </div>
                <div className="p-2">
                    <Sidebar onFileSelect={handleFileSelect} selectedFile={selectedFile} />
                </div>
            </div>

            <div className="flex-1 flex">
                <div className="flex-1 flex flex-col bg-gray-900">
                    <div className="border-b border-gray-700 p-4 flex items-center justify-between">
                        <h3 className="font-medium text-gray-200">Editor</h3>
                        <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300 border-gray-600">
                            {words} words {chars} characters
                        </Badge>
                    </div>
                    <div className="flex-1 p-4">
                        <textarea
                            value={markdown}
                            onChange={editMarkdown}
                            className="w-full h-full bg-transparent border-none outline-none resize-none font-mono text-sm leading-relaxed text-gray-100 placeholder-gray-500"
                            placeholder="Write here..."
                        />
                    </div>
                </div>

                <Separator orientation="vertical" className="bg-gray-700" />
                {/* <button className="bg-transparent hover:bg-dark-500 text-dark-700 font-semibold hover:text-white py-2 px-4 border border-dark-500 hover:border-transparent rounded" onClick={downloadFile}>Download md</button> */}
            </div>
        </div>
    )
}

export default Editor