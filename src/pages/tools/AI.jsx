import { useState } from 'react'
import { groqChat, groqVision } from '../../lib/groq'

export default function AI() {
  const [chat, setChat] = useState({ prompt: '', reply: '', loading: false })
  const [vision, setVision] = useState({ reply: '', loading: false, preview: null })

  const askChat = async () => {
    if (!chat.prompt) return
    setChat(c => ({ ...c, loading: true, reply: '' }))
    const reply = await groqChat(chat.prompt)
    setChat(c => ({ ...c, reply, loading: false }))
  }

  const handleImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (ev) => {
      const base64 = ev.target.result.split(',')[1]
      const preview = ev.target.result
      setVision({ reply: '', loading: true, preview })
      const reply = await groqVision(base64)
      setVision(v => ({ ...v, reply, loading: false }))
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="tool-page">
      <h2>AI Tools</h2>

      <div className="tool-grid">
        {/* Groq Chat */}
        <div className="tool-card">
          <h3>🤖 Ask Groq</h3>
          <textarea
            placeholder="Ask anything…"
            value={chat.prompt}
            onChange={e => setChat(c => ({ ...c, prompt: e.target.value }))}
            rows={3}
          />
          <button className="btn" onClick={askChat} disabled={chat.loading}>
            {chat.loading ? 'Thinking…' : 'Ask'}
          </button>
          {chat.reply && <div className="ai-reply">{chat.reply}</div>}
        </div>

        {/* Groq Vision */}
        <div className="tool-card">
          <h3>🧾 Receipt Scanner</h3>
          <p className="sub-label">Upload a receipt image — Groq will extract items & prices.</p>
          <input type="file" accept="image/*" onChange={handleImage} />
          {vision.preview && <img src={vision.preview} alt="receipt" className="receipt-preview" />}
          {vision.loading && <p className="muted">Scanning…</p>}
          {vision.reply && <div className="ai-reply">{vision.reply}</div>}
        </div>
      </div>
    </div>
  )
}
