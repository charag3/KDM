'use client'

// RoleSwitcher — demo-only component. Simulates auth context for the prototype.
// Reads/writes to localStorage key "kdm_rol" and "kdm_vendedor_id".
// In production this would be replaced by real session management.

import { useEffect, useState } from 'react'
import { vendedores } from '@/lib/data/vendedores'

export type SessionRole = 'Admin' | 'Vendedor'

export function getRolSession(): { rol: SessionRole; vendedorId: string } {
  if (typeof window === 'undefined') return { rol: 'Admin', vendedorId: 'admin-1' }
  return {
    rol: (localStorage.getItem('kdm_rol') as SessionRole) ?? 'Admin',
    vendedorId: localStorage.getItem('kdm_vendedor_id') ?? 'admin-1',
  }
}

export default function RoleSwitcher() {
  const [rol, setRol] = useState<SessionRole>('Admin')
  const [vendedorId, setVendedorId] = useState('admin-1')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const s = getRolSession()
    setRol(s.rol)
    setVendedorId(s.vendedorId)
  }, [])

  function apply(newRol: SessionRole, newVendedorId: string) {
    localStorage.setItem('kdm_rol', newRol)
    localStorage.setItem('kdm_vendedor_id', newVendedorId)
    setRol(newRol)
    setVendedorId(newVendedorId)
    setOpen(false)
    window.location.reload()
  }

  const current = vendedores.find((v) => v.id === vendedorId)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-xs bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-1.5 rounded-full hover:bg-yellow-100 transition-colors"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block" />
        Demo — {rol}: {current?.nombre ?? '—'}
        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 bg-yellow-50 border-b border-yellow-100">
            <p className="text-xs font-semibold text-yellow-800">Simulador de sesión</p>
            <p className="text-xs text-yellow-600 mt-0.5">Solo visible en el prototipo</p>
          </div>
          <div className="p-2">
            {vendedores
              .filter((v) => v.activo)
              .map((v) => (
                <button
                  key={v.id}
                  onClick={() => apply(v.rol, v.id)}
                  className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors ${
                    vendedorId === v.id ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600 shrink-0">
                    {v.nombre.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 leading-tight">{v.nombre}</p>
                    <p className="text-xs text-gray-500">
                      {v.rol} · {v.vertical}
                    </p>
                  </div>
                  {vendedorId === v.id && (
                    <svg className="w-4 h-4 text-green-500 ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
