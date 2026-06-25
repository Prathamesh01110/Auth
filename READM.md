# Full Stack Cheat Sheet (Syntax First)

---

# Vite

## Installation

```bash
npm create vite@latest
npm install
```

## Run

```bash
npm run dev
```

Starts frontend server.

---

# Express Backend

## Installation

```bash
npm install express cors dotenv
```

## Run

```bash
node server.js
```

or

```bash
nodemon server.js
```

Starts backend server.

---

# Express API

## General Syntax

```javascript
app.method(path, callback)
```

### GET

```javascript
app.get("/users", async (req, res) => {});
```

Gets data.

### POST

```javascript
app.post("/create", async (req, res) => {});
```

Receives data.

### Response

```javascript
res.json(data)
```

Sends JSON to frontend.

---

# Frontend Fetch

## General Syntax

```javascript
fetch(path, options)
```

### GET

```javascript
const res = await fetch("/users");

const data = await res.json();
```

Gets data from backend.

### POST

```javascript
const res = await fetch("/create", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(data)
});
```

Sends data to backend.

---

# React Router DOM

## Installation

```bash
npm install react-router-dom
```

## General Syntax

```javascript
<Route path="/" element={<Home />}/>
```

Maps URL to component.

### Navigation

```javascript
<Link to="/about">About</Link>
```

Changes page without reload.

---

# Supabase

## Installation

```bash
npm install @supabase/supabase-js
```

## Configuration

```javascript
import {supabase} from '@supabase/supabase-js'
const supabase = createClient("url","key");
```

Creates database client.

---

## General Query Pattern

```javascript
await supabase.from("table").operation()
```

Every query follows this pattern.

---

## Select

```javascript
await supabase.from("people").select("*");
```

Gets records.

---

## Insert

```javascript
await supabase.from("people").insert({ name });
```

Creates record.

---

## Update

```javascript
await supabase.from("people").update({ name }).eq("id", id);
```

Updates record.

---

## Delete

```javascript
await supabase.from("people").delete().eq("id", id);
```

Deletes record.

---

## Auth Sign Up

```javascript
await supabase.auth.signUp({email,password});
```

Creates account.

---

## Auth Login

```javascript
await supabase.auth.signInWithPassword({email,password});
```

Logs user in.

---

## Auth Logout

```javascript
await supabase.auth.signOut();
```

Logs user out.

---

# Gemini LLM

## Installation

```bash
npm install @google/generative-ai
```

## Configuration

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI =new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
```

Creates Gemini client.

---

## General Syntax

```javascript
await model.generateContent(prompt);
```

Generates text.

---

## Usage

```javascript
const result =  await model.generateContent("Explain React");
```

Returns AI response.

---

# Gemini Vision

## General Syntax

```javascript
await model.generateContent([prompt,imagePart]);
```

Analyzes image.

---

## Usage

```javascript
await model.generateContent(["Describe image",imagePart]);
```

Returns image analysis.

---

# Groq LLM

## Installation

```bash
npm install groq-sdk
```

## Configuration

```javascript
import Groq from "groq-sdk";
const groq =  new Groq({apiKey:process.env.GROQ_API_KEY});
```

Creates Groq client.

---

## General Syntax

```javascript
await groq.chat.completions.create({model,messages});
```

Generates text.

---

## Usage

```javascript
await groq.chat.completions.create({
    model:"llama-3.3-70b-versatile",
    messages: [{role: "user",content: prompt}]
  });
```

Returns AI response.

---

# Groq Vision

## General Syntax

```javascript
await groq.chat.completions.create({model,messages});
```

Analyzes image.

---

## Usage

```javascript
await groq.chat
  .completions.create({
    model:"meta-llama/llama-4-scout-17b-16e-instruct",
    messages: [{role: "user",
        content: [
          {type: "text",text: prompt},
          {type: "image_url",image_url: {url: imageUrl}}
        ]}]
  });
```

Returns image analysis.

---

# Resend

## Installation

```bash
npm install resend
```

## Configuration

```javascript
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
```

Creates email client.

---

## General Syntax

```javascript
await resend.emails.send({from,to,subject,text});
```

Sends email.

---

## Usage

```javascript
await resend.emails.send({
  from:"app@test.com",
  to:"user@gmail.com",
  subject:"Welcome",
  text:"Hello User"
});
```

Sends email.

---

# Nodemailer

## Installation

```bash
npm install nodemailer
```

## Configuration

```javascript
import nodemailer from "nodemailer";
const transporter =
  nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass }
  });
```

Creates SMTP transporter.

---

## General Syntax

```javascript
await transporter.sendMail({from,to,subject,text});
```

Sends email.

---

## Usage

```javascript
await transporter.sendMail({
  from:process.env.EMAIL_USER,
  to:"user@gmail.com",
  subject:"Welcome",
  text:"Hello User"
});
```

Sends email.

---

# Things To Remember

### Backend Endpoint

```javascript
app.method(path, callback)
```

### Frontend Request

```javascript
fetch(path, options)
```

### Database Query

```javascript
await supabase.from(table).operation()
```

### Gemini

```javascript
await model.generateContent()
```

### Groq

```javascript
await groq.chat
  .completions.create()
```

### Resend

```javascript
await resend.emails.send()
```

### Nodemailer

```javascript
await transporter.sendMail()
```



# Environment Variables (.env)

Create a `.env` file in the backend root.

```env
# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# Gemini
GEMINI_API_KEY=

# Groq
GROQ_API_KEY=

# Resend
RESEND_API_KEY=

# Nodemailer
EMAIL_USER=
EMAIL_PASS=

# Server
PORT=3000
```
