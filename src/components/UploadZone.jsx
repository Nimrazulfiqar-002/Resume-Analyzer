import React, { useState,useRef } from 'react'

const UploadZone = ({onFileSelect }) => {
    const [file,setFile]=useState(null)
    const [isDragging, setIsDragging] = useState(false)
    const inputRef = useRef(null)
    const [error,setError]=useState('')

  const handleFile = (selectedFile) => {
  if(selectedFile.type != "application/pdf" && 
     selectedFile.type != "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
    setError("Only PDF or DOCX allowed")
    return
  }
  setError("")
  setFile(selectedFile)
  onFileSelect(selectedFile)
}

const handleInputChange = (e) => {
  const selected = e.target.files[0]
  if (selected) handleFile(selected)
}

 return (
  <div
    onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
    onDragLeave={() => setIsDragging(false)}
    onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          const dropped = e.dataTransfer.files[0]
          setFile(dropped)
          handleFile(dropped) 
    }
    }
    onClick={() => inputRef.current.click()}
    className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"}`}
  >
    <input
      type="file"
      ref={inputRef}
      className="hidden"
      accept=".pdf,.docx"
      onChange={handleInputChange}
    />
    {file && <p className="text-green-600 font-medium">✅ {file.name}</p>}
    <p className="text-gray-500">Drag & drop your resume here</p>
    <p className="text-sm text-gray-400 mt-1">PDF or DOCX only</p>
    <p className="text-sm text-red-400 mt-1">{error}</p>
  </div>
)
}

export default UploadZone
