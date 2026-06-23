// ─── MAIL SERVER (Node + Express) ──────────────────────────────
// Run: node mail-server/index.js
// Needs: npm install express cors resend nodemailer dotenv
// ───────────────────────────────────────────────────────────────
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { Resend } from 'resend'
import nodemailer from 'nodemailer'

const app = express()
app.use(cors())
app.use(express.json())

// ── Resend ──
const resend = new Resend(process.env.RESEND_API_KEY)

app.post('/mail/resend', async (req, res) => {
  const { to, subject, html } = req.body
  try {
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM, // e.g. you@yourdomain.com
      to, subject, html,
    })
    res.json(data)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

// ── Nodemailer (SMTP) ──
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,      // e.g. smtp.gmail.com
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,    // Gmail: use an App Password
  },
})

app.post('/mail/nodemailer', async (req, res) => {
  const { to, subject, html } = req.body
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to, subject, html,
    })
    res.json({ messageId: info.messageId })
  } catch (e) {
    res.status(500).send(e.message)
  }
})

app.listen(3001, () => console.log('Mail server on http://localhost:3001'))
