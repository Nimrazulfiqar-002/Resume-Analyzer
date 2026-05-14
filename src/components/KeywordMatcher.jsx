import { useState } from "react"

export default function KeywordMatcher({ resumeText }) {
  const [jobText, setJobText] = useState("")
  const [results, setResults] = useState([])

  const matchKeywords = () => {
  const jobWords = jobText.split(" ")
  
  const matched = jobWords.map((word) => ({
    word: word,
    matched: resumeText.includes(word)
  }))

  setResults(matched)
}

    return (
  <div className="mt-6">
    <textarea
      value={jobText}
      onChange={(e) => setJobText(e.target.value)}
      placeholder="Paste Job description here to Find the compatibility..."
      className="w-full border rounded-lg p-3 text-sm text-gray-600 h-32"
    />

    <button
      onClick={matchKeywords}
      className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg"
    >
      Match Keywords
    </button>

    <div className="mt-4 flex flex-wrap gap-2">
      {results.map((item, i) => (
        <span
          key={i}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            item.matched
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {item.word}
        </span>
      ))}
    </div>
  </div>
  )
}