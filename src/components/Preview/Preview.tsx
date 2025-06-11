import { useMarkdown } from '../../context/markdownContext'
import ReactMarkdown from 'react-markdown'
import TitleBar from '../Title-Bar/Title-Bar'
import style from './Preview.module.css'

const Preview = () => {

    // const [markdown] = useState<string>("")

    const { markdown } = useMarkdown()!

    return (
        <div className={style.preview} >
            <TitleBar title='Preview' asideTxt='' />
            <div className={style.preview__scroll}>
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
        </div>
    )

}

export default Preview