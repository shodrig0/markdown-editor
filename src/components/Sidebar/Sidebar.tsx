import type { FileNode, FileTreeProps } from "../../utils/fileNode"
import TreeNode from "../TreeNode/TreeNode"

const sampleData: FileNode[] = [
    {
        name: "Docs",
        type: "folder",
        children: [
            {
                name: "Primer intento",
                type: "folder",
                children: [
                    { name: "README.md", type: "file", extension: "md" }
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
            {data.map((node, index) => (
                <TreeNode
                    key={`${node.name}-${index}`}
                    node={node}
                    onFileSelect={onFileSelect ?? (() => { })}
                    selectedFile={selectedFile || null}
                    onRename={onRename}
                    nodeId={`${node.name}-${index}`}
                    level={0}
                />
            ))}
        </div>
    )
}

export default Sidebar