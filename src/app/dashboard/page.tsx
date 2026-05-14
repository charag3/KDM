// Dashboard — /dashboard
// Command center interno. Visible solo para Admin.

import Link from 'next/link'
import RoleSwitcher from '@/components/shared/RoleSwitcher'

const kpis = [
  { label: 'Leads este mes', value: '6', sub: '+2 esta semana', color: 'text-blue-600', bg: 'bg-blue-50', icon: '👤' },
  { label: 'Pipeline total', value: '$3.33M', sub: 'MXN en negociación', color: 'text-indigo-600', bg: 'bg-indigo-50', icon: '📊' },
  { label: 'Cerrados este mes', value: '1', sub: '$980,000 MXN', color: 'text-green-600', bg: 'bg-green-50', icon: '✅' },
  { label: 'Tasa de cierre', value: '16.7%', sub: 'Meta: 20%', color: 'text-orange-600', bg: 'bg-orange-50', icon: '🎯' },
]

const funnelStages = [
  { label: 'Nuevo', count: 2, value: '$600,000', width: 'w-full', bg: 'bg-blue-100', text: 'text-blue-800' },
  { label: 'Contactado', count: 2, value: '$400,000', width: 'w-10/12', bg: 'bg-yellow-100', text: 'text-yellow-800' },
  { label: 'Cotizado', count: 1, value: '$1,350,000', width: 'w-8/12', bg: 'bg-orange-100', text: 'text-orange-800' },
  { label: 'Cerrado', count: 1, value: '$980,000', width: 'w-5/12', bg: 'bg-green-100', text: 'text-green-800' },
]

const fuenteStats = [
  { fuente: 'Formulario web', count: 2, pct: 33 },
  { fuente: 'WhatsApp', count: 1, pct: 17 },
  { fuente: 'Instagram', count: 1, pct: 17 },
  { fuente: 'Google', count: 1, pct: 17 },
  { fuente: 'Marketplace', count: 1, pct: 17 },
]

const actividadReciente = [
  { time: '2026-05-10', lead: 'Ing. Roberto Villanueva', evento: 'Nuevo lead — Formulario web', vertical: 'Tecnologías' },
  { time: '2026-05-09', lead: 'Lupita Estrada', evento: 'Lead contactado por WhatsApp', vertical: 'Tecnologías' },
  { time: '2026-05-09', lead: 'Carlos Mendoza', evento: 'Cotización enviada — $1,350,000 MXN', vertical: 'Offroad' },
  { time: '2026-05-08', lead: 'Carlos Mendoza', evento: 'Primer contacto vía Instagram', vertical: 'Offroad' },
  { time: '2026-05-07', lead: 'Fam. Gutiérrez', evento: 'Solicitud de consignación recibida', vertical: 'Tecnologías' },
  { time: '2026-05-06', lead: 'Ing. Paola Reyes', evento: 'Venta cerrada — $980,000 MXN', vertical: 'Tecnologías' },
]

const verticalSplit = [
  { label: 'Tecnologías', leads: 4, valor: '$1,795,000', pct: 67, color: 'bg-kdm-green' },
  { label: 'Offroad', leads: 2, valor: '$1,535,000', pct: 33, color: 'bg-orange-400' },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">KDM Tecnologías + Offroad · Panel de control</p>
          </div>
          <div className="flex items-center gap-3">
            <RoleSwitcher />
            <nav className="flex items-center gap-1">
              <Link href="/dashboard" className="text-sm font-medium px-3 py-1.5 rounded-lg bg-gray-100 text-gray-900">Dashboard</Link>
              <Link href="/crm" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">CRM</Link>
              <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">Admin</Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className={`w-9 h-9 ${kpi.bg} rounded-lg flex items-center justify-center text-lg mb-3`}>
                {kpi.icon}
              </div>
              <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
              <p className="text-sm font-medium text-gray-700 mt-0.5">{kpi.label}</p>
              <p className="text-xs text-gray-400 mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Funnel + Vertical Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Funnel */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Embudo de ventas</h2>
              <p className="text-xs text-gray-400 mt-0.5">Leads activos por etapa</p>
            </div>
            <div className="p-5 space-y-3">
              {funnelStages.map((stage) => (
                <div key={stage.label}>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span className="font-medium">{stage.label}</span>
                    <span>{stage.count} lead{stage.count !== 1 ? 's' : ''} · {stage.value} MXN</span>
                  </div>
                  <div className="h-8 bg-gray-50 rounded-lg overflow-hidden">
                    <div className={`h-full ${stage.width} ${stage.bg} rounded-lg flex items-center px-3`}>
                      <span className={`text-xs font-semibold ${stage.text}`}>{stage.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical Split */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Por vertical</h2>
              <p className="text-xs text-gray-400 mt-0.5">Leads y valor</p>
            </div>
            <div className="p-5 space-y-5">
              {verticalSplit.map((v) => (
                <div key={v.label}>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm font-medium text-gray-800">{v.label}</span>
                    <span className="text-xs text-gray-500">{v.leads} leads</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-1">
                    <div
                      className={`h-full rounded-full ${v.label === 'Tecnologías' ? 'bg-green-500' : 'bg-orange-400'}`}
                      style={{ width: `${v.pct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{v.pct}% del pipeline</span>
                    <span className="font-medium text-gray-600">{v.valor}</span>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total pipeline</span>
                  <span className="font-semibold text-gray-900">$3,330,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Cerrado este mes</span>
                  <span className="font-semibold text-green-600">$980,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fuente de leads + Actividad */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Fuente */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Fuente de leads</h2>
              <p className="text-xs text-gray-400 mt-0.5">Distribución por canal</p>
            </div>
            <div className="p-5 space-y-3">
              {fuenteStats.map((f) => (
                <div key={f.fuente}>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{f.fuente}</span>
                    <span>{f.count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${f.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actividad reciente */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">Actividad reciente</h2>
                <p className="text-xs text-gray-400 mt-0.5">Últimos eventos en el pipeline</p>
              </div>
              <Link href="/crm" className="text-xs text-indigo-600 hover:underline">Ver CRM →</Link>
            </div>
            <div className="divide-y divide-gray-50">
              {actividadReciente.map((a, i) => (
                <div key={i} className="px-5 py-3 flex items-start gap-3">
                  <span
                    className="mt-0.5 w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: a.vertical === 'Tecnologías' ? '#3D6B1F' : '#F97316', marginTop: '6px' }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-800 leading-tight">{a.evento}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.lead}</p>
                  </div>
                  <span className="text-xs text-gray-300 shrink-0 mt-0.5">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'CRM Pipeline', href: '/crm', icon: '📋', desc: 'Ver todos los leads' },
            { label: 'Vendedores', href: '/admin/vendedores', icon: '👥', desc: 'Gestionar equipo' },
            { label: 'Productos', href: '/admin/productos', icon: '🚜', desc: 'Catálogo completo' },
            { label: 'Sitio público', href: '/', icon: '🌐', desc: 'Ver como cliente' },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group"
            >
              <span className="text-2xl block mb-2">{a.icon}</span>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{a.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{a.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
