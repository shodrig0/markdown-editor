type Props = {
    title: string
    asideTxt: string
}

const TitleBar: React.FC<Props> = ({ title, asideTxt }) => {
    return (
        <div>
            <div>
                {title && <h5>{title}</h5>}
                {asideTxt && <h5>{asideTxt}</h5>}
            </div>
            <hr />
        </div>
    )
}

export default TitleBar