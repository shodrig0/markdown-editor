import * as React from "react"
import type { FileNode, FileTreeProps } from "../../utils/fileNode"
import TreeNode from "../TreeNode/TreeNode"
import { FilePlus, FolderPlus } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

const sampleData: FileNode[] = [
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

interface SidebarProps extends FileTreeProps {
    onRename: (nodeId: string, newName: string) => void
    onAddNode?: (node: FileNode, parentId: string | null) => void
}


const Sidebar = ({
    data = sampleData,
    onFileSelect,
    selectedFile,
    onRename,
    onAddNode
}: SidebarProps) => {

    const [folderFocusId, setFolderFocusId] = React.useState<string | null>(null)

    const handleFolderFocus = (node: FileNode) => {
        if (node.type === "folder") {
            setFolderFocusId(node.id)
        }
    }

    const handleSidebarClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            setFolderFocusId(null)
        }
    }

    const handleCreateFile = () => {
        if (!onAddNode) return

        const newFile: FileNode = {
            id: uuidv4(),
            name: "New File",
            type: "file",
            extension: "md"
        }

        onAddNode(newFile, folderFocusId)
    }

    const handleCreateFolder = () => {
        if (!onAddNode) return

        const newFolder: FileNode = {
            id: uuidv4(),
            name: "New Folder",
            type: "folder",
            children: []
        }

        onAddNode(newFolder, folderFocusId)
    }

    return (
        <div className="w-full flex flex-col" onClick={handleSidebarClick}>
            <div className="flex justify-between items-center p-2 border-b border-gray-700">
                <span className="text-sm font-semibold">Files</span>
                <div className="flex gap-2">
                    <button
                        className="p-1 rounded hover:bg-gray-700/50"
                        onClick={handleCreateFile}
                        title="New File"
                    >
                        <FilePlus className="h-4 w-4 text-gray-400" />
                    </button>
                    <button
                        className="p-1 rounded hover:bg-gray-700/50"
                        onClick={handleCreateFolder}
                        title="New Folder"
                    >
                        <FolderPlus className="h-4 w-4 text-gray-400" />
                    </button>
                </div>
            </div>
            <div className="overflow-auto">
                {data.map((node: FileNode) => (
                    <TreeNode
                        key={node.id}
                        node={node}
                        onFileSelect={onFileSelect ?? (() => { })}
                        selectedFile={selectedFile || null}
                        onRename={onRename}
                        nodeId={node.id}
                        level={0}
                        onFolderFocus={handleFolderFocus}
                        focusedFolderId={folderFocusId}
                    />
                ))}
            </div>
        </div>
    )
}



export default Sidebar