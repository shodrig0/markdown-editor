export interface FileNode {
    id: string
    name: string
    type: "file" | "folder"
    children?: FileNode[]
    extension?: string
}

export interface FileTreeProps {
    data?: FileNode[]
    onFileSelect?: (file: FileNode) => void
    selectedFile?: string
}

export interface TreeNodeProps {
    node: FileNode
    level: number
    onFileSelect: (node: FileNode) => void
    selectedFile: FileNode | null
    onRename: (id: string, newName: string) => void
    nodeId: string
}