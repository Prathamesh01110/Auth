import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import { useAuth } from '../AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [money, setMoney] = useState([])
  const [form, setForm] = useState({ label: '', amount: '' })

  const load = async () => {
    const { data } = await supabase
      .from('money')
      .select('*')
      .order('created_at', { ascending: false })
    setMoney(data || [])
  }

  useEffect(() => { load() }, [])

  const add = async () => {
    if (!form.label || !form.amount) return
    await supabase.from('money').insert({ ...form, amount: Number(form.amount), user_id: user.id })
    setForm({ label: '', amount: '' })
    load()
  }

  const del = async (id) => {
    await supabase.from('money').delete().eq('id', id)
    load()
  }

  const total = money.reduce((s, m) => s + Number(m.amount), 0)

  return (
    <div className="dashboard">
      <header className="dash-header">
        <span className="logo">App</span>
        <div className="dash-user">
          <span>{user?.email}</span>
          <button className="btn btn-ghost sm" onClick={() => supabase.auth.signOut().then(() => navigate('/'))}>Sign out</button>
        </div>
      </header>

      <main className="dash-main">
        {/* Money Tracker */}
        <h2>Money Tracker</h2>
        <p className="sub">Total: ₹{total.toFixed(2)}</p>

        <div className="inline-form" style={{ marginBottom: '1rem' }}>
          <input
            placeholder="Label"
            value={form.label}
            onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
          />
          <input
            placeholder="Amount"
            type="number"
            value={form.amount}
            onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
          />
          <button className="btn" onClick={add}>Add</button>
        </div>

        <ul className="item-list" style={{ marginBottom: '2.5rem' }}>
          {money.map(m => (
            <li key={m.id}>
              <span>{m.label}</span>
              <span className="amount">₹{Number(m.amount).toFixed(2)}</span>
              <button className="del" onClick={() => del(m.id)}>×</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}