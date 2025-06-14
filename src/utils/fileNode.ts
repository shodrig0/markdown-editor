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
    selectedFile?: FileNode | null
}

export interface TreeNodeProps {
    node: FileNode
    level?: number
    onFileSelect: (file: FileNode) => void
    selectedFile: FileNode | null
    onRename: (nodeId: string, newName: string) => void
    nodeId: string
    onFolderFocus?: (node: FileNode) => void
    focusedFolderId?: string | null
}