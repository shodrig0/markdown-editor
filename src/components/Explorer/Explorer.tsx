import * as React from "react"
import { useMarkdown } from "../../context/markdownContext"
import type { FileNode } from "../../utils/fileNode"
import Sidebar from "../Sidebar/Sidebar"

const Explorer = () => {

    const { setMarkdown } = useMarkdown()!

    const [selectedFile, setSelectedFile] = React.useState<FileNode | null>(null)

    const [fileTree, setFileTree] = React.useState<FileNode[]>([
        {
            id: "docs-1",
            name: "Docs",
            type: "folder",
            children: [
                {
                    id: "primer-intento-1",
                    name: "Primer intento",
                    type: "folder",
                    children: [
                        { id: "readme-1", name: "README", type: "file", extension: "md" }
                    ],
                },
            ]
        }
    ])

    const handleFileSelect = (file: FileNode) => {
        if (file.type === "file") {
            setSelectedFile(file)
            setMarkdown(`# ${file.name}\n\nAcá debería ir el contenido ${file.name} o la nota que el usuario cree`)
        }
    }

    const handleRename = (nodeId: string, newName: string) => {
        setFileTree(prev => renameNodeById(prev, nodeId, newName))
    }

    const renameNodeById = (nodes: FileNode[], nodeId: string, newName: string): FileNode[] => {
        return nodes.map(node => {
            if (node.id === nodeId) {
                return { ...node, name: newName }
            }

            if (node.children) {
                return {
                    ...node,
                    children: renameNodeById(node.children, nodeId, newName)
                }
            }

            return node
        })
    }

    return (
        <>
            <div className="flex h-screen bg-gray-900 text-gray-100">
                <div className="w-64 border-r border-gray-700 bg-gray-800">
                    <div className="p-4 border-b border-gray-700">
                        <h3 className="font-semibold text-sm text-gray-200">Explorer</h3>
                    </div>
                    <div className="p-2">
                        <Sidebar
                            data={fileTree}
                            onFileSelect={handleFileSelect}
                            selectedFile={selectedFile}
                            onRename={handleRename}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Explorer