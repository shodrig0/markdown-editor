// import { useMarkdown } from '../../context/markdownContext'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import TitleBar from '../Title-Bar/Title-Bar'

const Preview = () => {

    const [markdown] = useState<string>("")

    return (
        <div>
            <TitleBar title='Preview' asideTxt='' />
            <div>
                {/* <h1>hello</h1> */}
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
        </div>
    )

}

export default Preview