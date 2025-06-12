import Editor from './components/Editor/Editor'
import MainLayout from './components/Main-Layout/Main-Layout'
import Preview from './components/Preview/Preview'
import MarkdownProvider from './context/markdownContext'
import "./App.css"

const App = () => {

  return (
    <>
      <MarkdownProvider>
        <MainLayout>
          <MainLayout.Column>
            <Editor />
          </MainLayout.Column>
          <MainLayout.Column>
            <Preview />
          </MainLayout.Column>
        </MainLayout>
      </MarkdownProvider>
    </>
  )
}

export default App
