Here's your cheat sheet:

---

**🔐 How the auth flow works**

**1. App starts**
`AuthContext` runs → asks Supabase *"is anyone logged in?"* → stores the `user` in React state → all pages can read this.

**2. Signup** (`/signup`)
User fills email + password → calls `supabase.auth.signUp()` → Supabase creates the account → returns a session → user is now logged in → redirected to `/dashboard`.

**3. Login** (`/login`)
User fills email + password → calls `supabase.auth.signInWithPassword()` → Supabase checks credentials → returns session → redirected to `/dashboard`.

**4. Protected route** (`/dashboard`)
`Protected.jsx` checks: *does `user` exist?*
- Yes → show the page
- No → redirect to `/login`
- Still loading → show "Loading…"

**5. Sign out**
Calls `supabase.auth.signOut()` → Supabase clears the session → `user` becomes `null` → redirected to `/`.

**6. Page refresh**
`AuthContext` runs again → calls `getSession()` → Supabase checks the cookie/localStorage it saved → restores the user automatically. You stay logged in.

---

**The 3 key pieces:**

| File | Job |
|---|---|
| `supabase.js` | Creates the Supabase connection |
| `AuthContext.jsx` | Holds who's logged in, shares it everywhere |
| `Protected.jsx` | Blocks pages from non-logged-in users |

That's the whole system.

## File structure
  src/
  ├── supabase.js       Supabase client
  ├── AuthContext.jsx   Auth state
  ├── Protected.jsx     Route guard
  ├── App.jsx           Router
  └── pages/
      ├── Home.jsx
      ├── Login.jsx
      ├── Signup.jsx
      └── Dashboard.jsx





Simple Definitions
createContext()
Creates a global storage container.
Provider
Stores data inside the container.
useContext()
Reads data from the container.
AuthContext
A context used to store authentication data.
One-Line Memory Trick
createContext() → Create Box
Provider → Put Data In Box
useContext() → Take Data From Box

{
  user: {...},
  session: {
    access_token: "...",
    refresh_token: "..."
  }
}
Login
  ↓
Supabase receives tokens
  ↓
Supabase stores tokens
  ↓
Browser refresh
  ↓
Tokens still exist
You never wrote:localStorage.setItem(...)
because the Supabase client does it internally.