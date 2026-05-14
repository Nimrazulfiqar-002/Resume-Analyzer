import { useState, useEffect } from "react"

export default function ResumeAnalyzer({ text }) {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

useEffect(() => {
  if (text) {
    analyzeResume()
  }
}, [text])

 const analyzeResume = async () => {
  if (!text) return
   console.log("API Key:", import.meta.env.VITE_GEMINI_API_KEY) 
  setLoading(true)

  const response = await fetch(
    `/gemini/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" ,
        "dangerouslyAllowBrowser": "true"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analyze this resume and respond ONLY in JSON format like this:
{
  "score": 75,
  "feedback": "Overall feedback here",
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
}

Resume text:
${text}`
          }]
        }]
      })
    }
  )

  const data = await response.json()
  const raw = data.candidates[0].content.parts[0].text
  const clean = raw.replace(/```json|```/g, "").trim()
  const parsed = JSON.parse(clean)
  setResult(parsed)
  setLoading(false)
}

    return (
  <div className="mt-6">
    <button
      onClick={analyzeResume}
      disabled={!text || loading}
      className="bg-purple-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
    >
      {loading ? "Analyzing..." : "Analyze Resume"}
    </button>

    {result && (
      <div className="mt-4 p-4 bg-white border rounded-lg">
        
        <div className="text-center mb-4">
          <p className="text-5xl font-bold text-purple-600">{result.score}%</p>
          <p className="text-gray-500 text-sm">Resume Score</p>
        </div>

        <div className="mb-4">
          <p className="font-medium text-gray-700 mb-1">Overall Feedback:</p>
         <p className={`text-sm p-3 rounded-lg border-l-4 ${result.score > 40 ? "text-green-700 border-green-400" : "text-red-700 border-red-400"}`}>
  {result.feedback}
</p>
        </div>

        <div>
          <p className="font-medium text-gray-700 mb-2">Suggestions:</p>
          {result.suggestions.map((s, i) => (
            <p key={i} className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-3 mb-2 text-blue-800 text-sm">• {s}</p>
          ))}
        </div>

      </div>
    )}
  </div>
)
}