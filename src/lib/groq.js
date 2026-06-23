import Groq from 'groq-sdk'

// Single Groq client — import this wherever needed
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
})

// Text chat — returns reply string
export async function groqChat(prompt) {
  const res = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 512,
  })
  return res.choices[0].message.content
}

// Vision — pass base64 image string (no prefix needed, we add it)
export async function groqVision(base64Image, prompt = 'Explain this receipt: list all items and prices.') {
  const res = await groq.chat.completions.create({
    model: 'meta-llama/llama-4-scout-17b-16e-instruct',
    messages: [{
      role: 'user',
      content: [
        { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` } },
        { type: 'text', text: prompt },
      ],
    }],
    max_tokens: 512,
  })
  return res.choices[0].message.content
}
