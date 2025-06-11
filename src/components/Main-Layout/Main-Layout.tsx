import type { FC, ReactNode } from "react"
import styles from "./Main-Layout.module.css"


type Props = {
    children: ReactNode
}

// extend props
type MainLayoutComponent = FC<Props> & {
    Column: FC<Props>
}

const MainLayout: MainLayoutComponent = ({ children }) => {
    return (
        <div className={styles.mainLayout}>
            {children}
        </div>
    )
}

const Column: FC<Props> = ({ children }) => {
    return (
        <div className={styles.mainLayout__col}>
            {children}
        </div>
    )

}

MainLayout.Column = Column

export default MainLayout