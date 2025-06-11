import styles from "./Title-Bar.module.css"

type Props = {
    title: string
    asideTxt: string
}

const TitleBar: React.FC<Props> = ({ title, asideTxt }) => {
    return (
        <div className={styles.mb4}>
            <div className={styles.titleBar__wrap}>
                {title && <h5>{title}</h5>}
                {asideTxt && <h5>{asideTxt}</h5>}
            </div>
            <hr />
        </div>
    )
}

export default TitleBar