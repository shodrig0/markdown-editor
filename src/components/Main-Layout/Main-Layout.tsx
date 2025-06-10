import type { FC, ReactNode } from "react"

type Props = {
    children: ReactNode
}

// extend props
type MainLayoutComponent = FC<Props> & {
    Column: FC<Props>
}

const MainLayout: MainLayoutComponent = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}

const Column: FC<Props> = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )

}

MainLayout.Column = Column

export default MainLayout