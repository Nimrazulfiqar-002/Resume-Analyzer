import { useState } from "react"
import UploadZone from "./components/UploadZone"
import PDFExtractor from "./components/PDFExtractor"
import ResumeAnalyzer from "./components/ResumeAnalyzer"
import KeywordMatcher from "./components/KeywordMatcher"
import ChatBox from "./components/ChatBox"


export default function App() {
  const [resumeFile, setResumeFile] = useState(null)
  const [resumeText, setResumeText] = useState("")
  

  return (
    <div className="p-6">
      <UploadZone onFileSelect={(file) => setResumeFile(file)} />
      <PDFExtractor 
      file={resumeFile} 
      onTextExtracted={(text) => {
    setResumeText(text)
  }}

       />
      {resumeFile && <p>File Name: {resumeFile.name}</p>}
      <ResumeAnalyzer text={resumeText} />
      <KeywordMatcher resumeText={resumeText} />
      <ChatBox resumeText={resumeText} />

    </div>
  )
}