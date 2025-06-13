import type { TreeNodeProps } from "../../utils/fileNode"
import * as React from "react"
import { ChevronRight, File, FileText, Folder, FolderOpen } from "lucide-react"
import { cn } from "../../utils/cn"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../Ui/Collapsible"
import FileItem from "../FileItem/FileItem"

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
    onRename,
    nodeId
}: TreeNodeProps) => {
    const [isOpen, setIsOpen] = React.useState(level < 2)
    const isSelected = selectedFile?.name === node.name

    if (node.type === "file") {
        return (
            <>
                {getFileIcon(node.extension)}
                <FileItem
                    name={node.name}
                    onRename={newName => onRename(nodeId, newName)}
                    selected={isSelected}
                    onClick={() => onFileSelect(node)}
                />
            </>
        )
    }

    return (
        <Collapsible className="w-[220px] min-w-[220px] max-w-[220px] overflow-x-hidden p-5 border-gray-300 bg-gray-50 h-full" open={isOpen} onOpenChange={setIsOpen}>
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
                        onRename={onRename}
                        nodeId={child.id}
                    />
                ))}
            </CollapsibleContent>
        </Collapsible>
    )
}

export default TreeNode