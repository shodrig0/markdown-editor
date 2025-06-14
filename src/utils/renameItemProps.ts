export type RenameItemProps = {
    name: string
    onRename: (newName: string) => void
    selected: boolean
    onClick?: (event: React.MouseEvent) => void
}