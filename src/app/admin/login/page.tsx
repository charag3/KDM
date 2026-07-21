'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/admin/equipos')
    } else {
      setError('Credenciales inválidas')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-oxford-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-rubik font-bold text-oxford-950 text-2xl">
            KDM<span className="text-kdm-orange-500">.</span> Admin
          </p>
          <p className="text-oxford-600 text-sm mt-1 font-nunito">Panel de administración</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-oxford-200 shadow-sm p-8 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-oxford-700 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full border border-oxford-200 rounded-lg px-3.5 py-2.5 text-sm text-oxford-950 bg-white focus:outline-none focus:ring-2 focus:ring-kdm-orange-500 placeholder-oxford-400"
              placeholder="admin@kdm.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-oxford-700 mb-1.5">Contraseña</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full border border-oxford-200 rounded-lg px-3.5 py-2.5 text-sm text-oxford-950 bg-white focus:outline-none focus:ring-2 focus:ring-kdm-orange-500 placeholder-oxford-400"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-600 text-xs font-nunito">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-kdm-orange-500 hover:bg-kdm-orange-600 disabled:opacity-60 text-white font-rubik font-semibold py-3 rounded-lg transition-all text-sm active:scale-[0.99]"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
