import * as React from "react"
import { ChevronRight, File, FileText, Folder, FolderOpen } from "lucide-react"
import { cn } from "../../utils/cn"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../Ui/Collapsible"


interface FileNode {
    name: string
    type: "file" | "folder"
    children?: FileNode[]
    extension?: string
}

interface FileTreeProps {
    data?: FileNode[]
    onFileSelect?: (file: FileNode) => void
    selectedFile?: string
}

const sampleData: FileNode[] = [
    {
        name: "Docs",
        type: "folder",
        children: [
            {
                name: "Primer intento",
                type: "folder",
                children: [
                    { name: "README.md", type: "file", extension: "md" },
                    { name: "javascript.md", type: "file", extension: "md" },
                    { name: "react.md", type: "file", extension: "md" },
                ],
            },
        ]
    }
]

const getFileIcon = (extension?: string) => {
    if (!extension) return <File className="h-4 w-4 text-gray-400" />

    switch (extension.toLowerCase()) {
        case "md":
        case "markdown":
            return <FileText className="h-4 w-4 text-blue-300" />
        default:
            return <File className="h-4 w-4 text-gray-400" />
    }
}

const TreeNode = ({
    node,
    level = 0,
    onFileSelect,
    selectedFile,
}: {
    node: FileNode
    level?: number
    onFileSelect?: (file: FileNode) => void
    selectedFile?: string
}) => {
    const [isOpen, setIsOpen] = React.useState(level < 2)
    const isSelected = selectedFile === node.name

    if (node.type === "file") {
        return (
            <div
                className={cn(
                    "flex items-center gap-2 py-1 px-2 text-sm cursor-pointer hover:bg-gray-700/50 rounded-sm transition-colors text-gray-300",
                    isSelected && "bg-gray-600 text-gray-100",
                )}
                style={{ paddingLeft: `${level * 12 + 8}px` }}
                onClick={() => onFileSelect?.(node)}
            >
                {getFileIcon(node.extension)}
                <span className="truncate">{node.name}</span>
            </div>
        )
    }

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
                <div
                    className="flex items-center gap-2 py-1 px-2 text-sm cursor-pointer hover:bg-gray-700/50 rounded-sm transition-colors w-full text-gray-300"
                    style={{ paddingLeft: `${level * 12 + 8}px` }}
                >
                    <ChevronRight className={cn("h-4 w-4 transition-transform text-gray-400", isOpen && "rotate-90")} />
                    {isOpen ? <FolderOpen className="h-4 w-4 text-blue-400" /> : <Folder className="h-4 w-4 text-blue-400" />}
                    <span className="truncate">{node.name}</span>
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
                {node.children?.map((child, index) => (
                    <TreeNode
                        key={`${child.name}-${index}`}
                        node={child}
                        level={level + 1}
                        onFileSelect={onFileSelect}
                        selectedFile={selectedFile}
                    />
                ))}
            </CollapsibleContent>
        </Collapsible>
    )
}

export function Sidebar({ data = sampleData, onFileSelect, selectedFile }: FileTreeProps) {
    return (
        <div className="w-full" >
            {
                data.map((node, index) => (
                    <TreeNode key={`${node.name}-${index}`} node={node} onFileSelect={onFileSelect} selectedFile={selectedFile} />
                ))
            }
        </div >
    )
}