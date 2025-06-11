import { useEffect, useRef } from 'react'
import { useMarkdown } from '../../context/markdownContext'
import ReactMarkdown from 'react-markdown'
import TitleBar from '../Title-Bar/Title-Bar'
import style from './Preview.module.css'


const Preview = () => {

    const automaticScroll = useRef<HTMLDivElement>(null)


    // const [markdown] = useState<string>("")

    const { markdown } = useMarkdown()!

    useEffect(() => {
        if (automaticScroll.current) {
            automaticScroll.current.scrollTop = automaticScroll.current.scrollHeight
        }
    }, [markdown])

    return (
        <div className={style.preview} >
            <TitleBar title='Preview' asideTxt='' />
            <div className={style.preview__scroll} ref={automaticScroll}>
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
        </div>
    )

}

export default Preview