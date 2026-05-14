import { useState } from "react"

export default function ChatBox({ resumeText }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)


const sendMessage = async () => {
  if (!input) return

  const userMessage = { role: 'user', content: input }
  const updatedMessages = [...messages, userMessage]
  setMessages(updatedMessages)
  setInput("")
  setLoading(true)

  const response = await fetch(
    `/gemini/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `this is my resume: ${resumeText}` }]
          },
          ...updatedMessages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }]
          }))
        ]
      })
    }
  )

  const data = await response.json()
  const aiReply = data.candidates[0].content.parts[0].text
  setMessages([...updatedMessages, { role: 'assistant' , content: aiReply  }])
  setLoading(false)
}

  return (
  <div className="mt-6 border rounded-xl p-4">
    <div className="h-64 overflow-y-auto mb-4 flex flex-col gap-3">
      {messages.map((m, i) => (
        <div
          key={i}
          className={`p-3 rounded-lg text-sm max-w-[80%] ${
            m.role === "user"
              ? "bg-blue-100 text-blue-800 self-end"
              : "bg-gray-100 text-gray-700 self-start"
          }`}
        >
          {m.content}
        </div>
      ))}
      {loading && (
        <div className="bg-gray-100 text-gray-500 text-sm p-3 rounded-lg self-start">
          Typing...
        </div>
      )}
    </div>

    <div className="flex gap-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="ASK FROM CHATBOT  🤖 ..."
        className="flex-1 border rounded-lg px-3 py-2 text-sm"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
      >
        Send
      </button>
    </div>
  </div>
)
}