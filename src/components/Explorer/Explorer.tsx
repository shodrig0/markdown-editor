import * as React from "react"
import { useMarkdown } from "../../context/markdownContext"
import type { FileNode } from "../../utils/fileNode"
import Sidebar from "../Sidebar/Sidebar"

const FILE_IN_TREE = "markdown-editor-file-tree"
const CONTENT_FILE = "markdown-editor-content-"

const initialFileTree: FileNode[] = [
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
]

const initialContent = {
    "readme-1": "# README\n\nBienvenido a tu editor de Markdown!"
}

const Explorer = () => {

    const { markdown, setMarkdown } = useMarkdown()!

    const [selectedFile, setSelectedFile] = React.useState<FileNode | null>(null)

    const [fileTree, setFileTree] = React.useState<FileNode[]>(() => {
        const savedFileTree = localStorage.getItem(FILE_IN_TREE)
        return savedFileTree ? JSON.parse(savedFileTree) : initialFileTree
    })

    React.useEffect(() => {
        localStorage.setItem(FILE_IN_TREE, JSON.stringify(fileTree))
    }, [fileTree])


    React.useEffect(() => {
        if (selectedFile?.id && selectedFile.type === "file") {
            localStorage.setItem(CONTENT_FILE + selectedFile.id, markdown)
        }
    }, [markdown, selectedFile])

    const handleFileSelect = (file: FileNode) => {
        if (file.type === "file") {
            setSelectedFile(file)
            const savedContent = localStorage.getItem(CONTENT_FILE + file.id)
            const content = savedContent || initialContent[file.id as keyof typeof initialContent] ||
                `# ${file.name}\n\nAcá debería ir el contenido de ${file.name} o lo que el usuario cree`

            setMarkdown(content)
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

    const handleAddNode = (newNode: FileNode, parentId: string | null) => {
        const updateArchives = [...fileTree]

        if (!parentId) {
            updateArchives.push(newNode)
            setFileTree(updateArchives)
            return
        }

        const updateNodeChild = (nodes: FileNode[]): boolean => {
            for (let i = 0; i < nodes.length; i++) {
                const actualNode = nodes[i]

                if (actualNode.id === parentId) {
                    if (actualNode.type === "folder") {
                        if (!actualNode.children) {
                            actualNode.children = []
                        }
                        actualNode.children.push(newNode)
                        return true
                    }
                    return false
                }
                if (actualNode.children && updateNodeChild(actualNode.children)) {
                    return true
                }
            }
            return false
        }

        updateNodeChild(updateArchives)
        setFileTree(updateArchives)
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
                            onAddNode={handleAddNode}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Explorer