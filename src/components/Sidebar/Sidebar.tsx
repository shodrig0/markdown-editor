import type { FileNode, FileTreeProps } from "../../utils/fileNode"
import TreeNode from "../TreeNode/TreeNode"

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
                    { id: "readme-1", name: "README.md", type: "file", extension: "md" }
                ],
            },
        ]
    }
]

interface SidebarProps extends FileTreeProps {
    onRename: (nodeId: string, newName: string) => void
}


const Sidebar = ({
    data = sampleData,
    onFileSelect,
    selectedFile,
    onRename
}: SidebarProps) => {
    return (
        <div className="w-full">
            {data.map((node) => (
                <TreeNode
                    key={node.id}
                    node={node}
                    onFileSelect={onFileSelect ?? (() => { })}
                    selectedFile={selectedFile}
                    onRename={onRename}
                    nodeId={node.id}
                    level={0}
                />
            ))}
        </div>
    )
}

/**
 * por que no anda
 */

export default Sidebar