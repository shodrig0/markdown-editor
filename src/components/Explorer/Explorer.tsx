import * as React from "react"
import { useMarkdown } from "../../context/markdownContext"
import type { FileNode } from "../../utils/fileNode"
import Sidebar from "../Sidebar/Sidebar"

const Explorer = () => {

    const { setMarkdown } = useMarkdown()!

    const [selectedFile, setSelectedFile] = React.useState<string>("README.md")

    const handleFileSelect = (file: FileNode) => {
        if (file.type === "file") {
            setSelectedFile(file.name)
            setMarkdown(`# ${file.name}\n\nAcá debería ir el contenido ${file.name} o la nota que el usuario cree`)
        }
    }

    return (
        <>
            <div className="flex h-screen bg-gray-900 text-gray-100">
                <div className="w-64 border-r border-gray-700 bg-gray-800">
                    <div className="p-4 border-b border-gray-700">
                        <h3 className="font-semibold text-sm text-gray-200">Explorer</h3>
                    </div>
                    <div className="p-2">
                        <Sidebar onFileSelect={handleFileSelect} selectedFile={selectedFile} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Explorer