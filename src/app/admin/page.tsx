// Admin index — /admin
// Entry point for all admin sections.

import Link from 'next/link'
import RoleSwitcher from '@/components/shared/RoleSwitcher'
import { vendedores } from '@/lib/data/vendedores'
import { tractores } from '@/lib/data/tractores'
import { vehiculosPolaris } from '@/lib/data/polaris'
import { implementos } from '@/lib/data/implementos'

const sections = [
  {
    title: 'Vendedores',
    href: '/admin/vendedores',
    icon: '👥',
    stat: `${vendedores.filter((v) => v.activo).length} activos`,
    desc: 'Agregar, quitar y configurar permisos del equipo de ventas.',
    color: 'border-blue-200 hover:border-blue-300',
    iconBg: 'bg-blue-50',
  },
  {
    title: 'Productos',
    href: '/admin/productos',
    icon: '🚜',
    stat: `${tractores.length + vehiculosPolaris.length + implementos.length} en catálogo`,
    desc: 'Gestionar tractores, vehículos Polaris e implementos del catálogo.',
    color: 'border-green-200 hover:border-green-300',
    iconBg: 'bg-green-50',
  },
]

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Panel de administración</h1>
            <p className="text-sm text-gray-500 mt-0.5">KDM Tecnologías + Offroad</p>
          </div>
          <div className="flex items-center gap-3">
            <RoleSwitcher />
            <nav className="flex items-center gap-1">
              <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">Dashboard</Link>
              <Link href="/crm" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">CRM</Link>
              <Link href="/admin" className="text-sm font-medium px-3 py-1.5 rounded-lg bg-gray-100 text-gray-900">Admin</Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`bg-white border-2 ${s.color} rounded-2xl p-7 shadow-sm hover:shadow-md transition-all group`}
            >
              <div className={`w-12 h-12 ${s.iconBg} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {s.icon}
              </div>
              <div className="flex items-baseline gap-3 mb-1">
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{s.title}</h2>
                <span className="text-sm text-gray-400">{s.stat}</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              <p className="text-sm text-indigo-500 mt-4 group-hover:underline">Ir a {s.title.toLowerCase()} →</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
