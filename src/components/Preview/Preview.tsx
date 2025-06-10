import { useMarkdown } from '../../context/markdownContext'
import ReactMarkdown from 'react-markdown'
import TitleBar from '../Title-Bar/Title-Bar'

const Preview = () => {

    // const [markdown] = useState<string>("")

    const { markdown } = useMarkdown()!

    return (
        <div style={{ background: 'red' }}>
            <TitleBar title='Preview' asideTxt='' />
            <div>
                <h1>hello</h1>
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
        </div>
    )

}

export default Preview