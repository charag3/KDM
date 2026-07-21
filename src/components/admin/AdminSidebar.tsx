'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Package, Handshake, ArrowSquareOut, SignOut } from '@phosphor-icons/react'

type Session = { id: string; email: string; nombre: string; role: string }

const NAV_ITEMS = [
  { href: '/admin/equipos', label: 'Inventario', Icon: Package },
  { href: '/admin/consignaciones', label: 'Consignaciones', Icon: Handshake },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)
  const [leadsNuevos, setLeadsNuevos] = useState(0)

  useEffect(() => {
    fetch('/api/admin/me').then(r => (r.ok ? r.json() : null)).then(setSession).catch(() => {})
    fetch('/api/admin/consignaciones')
      .then(r => (r.ok ? r.json() : []))
      .then((leads: { status: string }[]) => setLeadsNuevos(leads.filter(l => l.status === 'nuevo').length))
      .catch(() => {})
  }, [])

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside className="w-60 shrink-0 h-screen sticky top-0 bg-oxford-900 border-r border-white/6 flex flex-col">
      <div className="px-5 h-14 flex items-center border-b border-white/6">
        <p className="font-rubik font-bold text-white">
          KDM<span className="text-kdm-orange-500">.</span> Admin
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const active = pathname?.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm font-nunito font-medium transition-colors ${
                active
                  ? 'bg-kdm-orange-500/15 text-white border border-kdm-orange-500/30'
                  : 'text-oxford-400 hover:text-white hover:bg-white/6 border border-transparent'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Icon size={17} weight={active ? 'fill' : 'regular'} className="text-kdm-orange-500" />
                {label}
              </span>
              {label === 'Consignaciones' && leadsNuevos > 0 && (
                <span className="bg-kdm-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {leadsNuevos}
                </span>
              )}
            </Link>
          )
        })}

        <div className="pt-3 mt-3 border-t border-white/6">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-nunito font-medium text-oxford-400 hover:text-white hover:bg-white/6 transition-colors"
          >
            <ArrowSquareOut size={17} className="text-kdm-orange-500" />
            Ver sitio
          </a>
        </div>
      </nav>

      <div className="px-3 py-4 border-t border-white/6">
        {session && (
          <div className="px-3 mb-2">
            <p className="text-xs font-rubik font-semibold text-white truncate">{session.nombre}</p>
            <p className="text-[11px] font-nunito text-oxford-400 truncate">{session.email}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-nunito font-medium text-oxford-400 hover:text-white hover:bg-white/6 transition-colors"
        >
          <SignOut size={17} className="text-kdm-orange-500" />
          Salir
        </button>
      </div>
    </aside>
  )
}
