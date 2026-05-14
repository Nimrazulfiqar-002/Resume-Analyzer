import { useState, useEffect } from "react"
import pdfToText from "react-pdftotext"

export default function PDFExtractor({ file,onTextExtracted  }) {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  const extractText = () => {
    if (!file) return
    setLoading(true)
    pdfToText(file)
      .then((extractedText) => {
        setText(extractedText)
        onTextExtracted(extractedText)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!file) return
    setLoading(true)
    pdfToText(file)
      .then((extractedText) => {
        onTextExtracted(extractedText)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [file])


  return (
    <div className="mt-6">

    <div>
      {loading && <p className="text-gray-500 text-sm">Extracting text...</p>}
    </div>
      {text && (
        <div className="mt-4 p-4 bg-gray-50 border rounded-lg">
          <p className="font-medium text-gray-700 mb-2">Extracted Text:</p>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{text}</p>
        </div>
      )}
    </div>
  )
}