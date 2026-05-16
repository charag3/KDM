// CRM Lead Detail — /crm/lead/[id]
// Internal demo view. Static data.

import Link from 'next/link'
import { notFound } from 'next/navigation'

type Lead = {
  id: string
  nombre: string
  empresa: string
  telefono: string
  interes: string
  valor: string
  fuente: string
  fecha: string
  stage: string
  vertical: 'Compra' | 'Consignación'
}

const leads: Lead[] = [
  { id: '1', nombre: 'Ing. Roberto Villanueva', empresa: 'Rancho Villanueva', telefono: '+52 443 100 0001', interes: 'Tractor Kubota B2601 seminuevo · Financiamiento', valor: '$195,000 MXN', fuente: 'Portal KDM', fecha: '2026-05-10', stage: 'Nuevo', vertical: 'Compra' },
  { id: '2', nombre: 'Lupita Estrada', empresa: 'Aguacates La Huerta', telefono: '+52 443 100 0002', interes: 'Kubota L3301 seminuevo · Compra directa', valor: '$285,000 MXN', fuente: 'WhatsApp', fecha: '2026-05-09', stage: 'Contactado', vertical: 'Compra' },
  { id: '3', nombre: 'Carlos Mendoza', empresa: 'Granja Mendoza', telefono: '+52 443 100 0003', interes: 'Kubota M5091 seminuevo · 1 unidad', valor: '$620,000 MXN', fuente: 'Instagram', fecha: '2026-05-08', stage: 'Cotizado', vertical: 'Compra' },
  { id: '4', nombre: 'Fam. Gutiérrez', empresa: 'Rancho Los Pinos', telefono: '+52 443 100 0004', interes: 'Consignar Kubota L3560 2019 · 1,200 hrs', valor: '$380,000 MXN', fuente: 'Portal KDM', fecha: '2026-05-07', stage: 'Nuevo', vertical: 'Consignación' },
  { id: '5', nombre: 'Ing. Paola Reyes', empresa: 'Agro Reyes SA', telefono: '+52 443 100 0005', interes: 'Kubota L4701 seminuevo · 2 unidades', valor: '$980,000 MXN', fuente: 'Google', fecha: '2026-05-06', stage: 'Cerrado', vertical: 'Compra' },
  { id: '6', nombre: 'Marco Dávila', empresa: 'Ganadería Dávila', telefono: '+52 443 100 0006', interes: 'Consignar Kubota B2301 2020 · 800 hrs', valor: '$135,000 MXN', fuente: 'Portal KDM', fecha: '2026-05-05', stage: 'Contactado', vertical: 'Consignación' },
]

const stages = ['Nuevo', 'Contactado', 'Cotizado', 'Cerrado']

const timeline: Record<string, { time: string; event: string }[]> = {
  '3': [
    { time: '2026-05-08 10:30', event: 'Lead recibido via Instagram' },
    { time: '2026-05-08 14:00', event: 'Primer contacto — WhatsApp enviado' },
    { time: '2026-05-09 09:15', event: 'Cotización enviada por email — $620,000 MXN · 1 unidad M5091' },
  ],
}

const notas: Record<string, string> = {
  '3': 'Carlos contactó por Instagram el 2026-05-08. Confirma interés en Kubota M5091 para uso en granja. Solicita cotización con tiempo de entrega.',
}

export function generateStaticParams() {
  return leads.map((l) => ({ id: l.id }))
}

type Props = {
  params: Promise<{ id: string }>
}

export default async function LeadDetailPage({ params }: Props) {
  const { id } = await params
  const lead = leads.find((l) => l.id === id)

  if (!lead) notFound()

  const events = timeline[id] ?? []
  const nota = notas[id] ?? ''

  const verticalColor =
    lead.vertical === 'Compra'
      ? { bg: '#dcfce7', text: '#16a34a' }
      : { bg: '#fef3c7', text: '#d97706' }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="min-w-0">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-1.5">
              <Link href="/crm" className="hover:text-gray-600 transition-colors">KDM Seminuevos</Link>
              <span>/</span>
              <Link href="/crm" className="hover:text-gray-600 transition-colors">CRM</Link>
              <span>/</span>
              <span className="text-gray-700 font-medium truncate">{lead.nombre}</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold text-gray-900 truncate">{lead.nombre}</h1>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded shrink-0"
                style={{ backgroundColor: verticalColor.bg, color: verticalColor.text }}
              >
                {lead.vertical}
              </span>
            </div>
          </div>
          <nav className="flex items-center gap-1 shrink-0 ml-4">
            <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">Dashboard</Link>
            <Link href="/crm" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">CRM</Link>
            <Link href="/admin/productos" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">Productos</Link>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Lead info + notas */}
        <div className="lg:col-span-2 space-y-6">
          {/* Info del lead */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Info del lead</h2>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: 'Nombre', value: lead.nombre },
                  { label: 'Empresa', value: lead.empresa },
                  { label: 'Teléfono', value: lead.telefono },
                  { label: 'Interés', value: lead.interes },
                  { label: 'Valor estimado', value: lead.valor },
                  { label: 'Fuente', value: lead.fuente },
                  { label: 'Fecha', value: lead.fecha },
                  { label: 'Vertical', value: lead.vertical },
                ].map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-5 py-3 text-gray-500 font-medium w-36">{row.label}</td>
                    <td className="px-5 py-3 text-gray-900">{row.value}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className="px-5 py-3 text-gray-500 font-medium">Stage</td>
                  <td className="px-5 py-3">
                    <select
                      defaultValue={lead.stage}
                      className="border border-gray-200 rounded px-2 py-1 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-300"
                    >
                      {stages.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <span className="text-xs text-gray-400 ml-2">(visual only)</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Notas */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Notas</h2>
            </div>
            <div className="p-5">
              <textarea
                defaultValue={nota}
                rows={5}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 resize-none focus:outline-none focus:ring-1 focus:ring-gray-300 bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Right: Timeline */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Timeline de actividad</h2>
            </div>
            <div className="p-5">
              {events.length === 0 ? (
                <p className="text-sm text-gray-400">Sin actividad registrada.</p>
              ) : (
                <ol className="relative border-l border-gray-200 space-y-6 ml-2">
                  {events.map((ev, i) => (
                    <li key={i} className="ml-4">
                      <div className="absolute -left-1.5 w-3 h-3 rounded-full bg-gray-300 border-2 border-white" />
                      <time className="block text-xs text-gray-400 mb-1">{ev.time}</time>
                      <p className="text-sm text-gray-700 leading-relaxed">{ev.event}</p>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
