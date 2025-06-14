import * as React from 'react'
import { useMarkdown } from '../../context/markdownContext'
import ReactMarkdown from 'react-markdown'
import styles from "./Preview.module.css"

const Preview = () => {

    const { markdown } = useMarkdown()!
    const automaticScroll = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (automaticScroll.current) {
            const element = automaticScroll.current
            const nearBottom = element.scrollHeight - element.clientHeight - element.scrollTop < 100

            if (nearBottom) {
                element.scrollTop = element.scrollHeight
            }
        }
    }, [markdown])


    /**
     * FIX AUTOSCROLL
     */

    return (
        <div className="flex-1 flex flex-col bg-gray-900">
            <div className="border-b border-gray-700 p-4">
                <h3 className="font-medium text-gray-200">Preview</h3>
            </div>
            <div className={`${styles.preview} flex flex-col h-full w-full bg-white`}>
                <div
                    ref={automaticScroll}
                    className={` ${styles.preview__scroll} h-full w-full overflow-y-auto px-6 py-4 prose max-w-none`}
                    style={{ scrollBehavior: 'smooth' }}
                >
                    <ReactMarkdown>{markdown}</ReactMarkdown>
                </div>
            </div >
        </div>
    )

}

export default Preview