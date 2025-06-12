import { useEffect, useRef } from 'react'
import { useMarkdown } from '../../context/markdownContext'
import ReactMarkdown from 'react-markdown'


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
        <div className="flex-1 flex flex-col bg-gray-900">
            <div className="border-b border-gray-700 p-4">
                <h3 className="font-medium text-gray-200">Preview</h3>
            </div>
            <div className="flex-1 p-4 overflow-auto">
                <div className="prose prose-sm prose-invert max-w-none">
                    <ReactMarkdown>{markdown}</ReactMarkdown>
                </div>
            </div >
        </div>
    )

}

export default Preview