// CRM Lead Detail — /crm/lead/[id]
// Internal demo view. Static data. Lead id=3 is the rich example (Club Offroad Morelia).

import Link from 'next/link'
import { notFound } from 'next/navigation'

type Lead = {
  id: string
  nombre: string
  empresa: string
  interes: string
  valor: string
  fuente: string
  fecha: string
  stage: string
  vertical: 'Tecnologías' | 'Offroad'
}

const leads: Lead[] = [
  { id: '1', nombre: 'Ing. Roberto Villanueva', empresa: 'Rancho Villanueva', interes: 'Kubota M5111 · Financiamiento', valor: '$420,000 MXN', fuente: 'Formulario web', fecha: '2026-05-10', stage: 'Nuevo', vertical: 'Tecnologías' },
  { id: '2', nombre: 'Lupita Estrada', empresa: 'Aguacates La Huerta', interes: 'Kubota B2601 · Compra directa', valor: '$215,000 MXN', fuente: 'WhatsApp', fecha: '2026-05-09', stage: 'Contactado', vertical: 'Tecnologías' },
  { id: '3', nombre: 'Carlos Mendoza', empresa: 'Club Offroad Morelia', interes: '3x Polaris RZR Pro R', valor: '$1,350,000 MXN', fuente: 'Instagram', fecha: '2026-05-08', stage: 'Cotizado', vertical: 'Offroad' },
  { id: '4', nombre: 'Fam. Gutiérrez', empresa: 'Rancho Los Pinos', interes: 'Tractor usado consignación', valor: '$180,000 MXN', fuente: 'Marketplace', fecha: '2026-05-07', stage: 'Nuevo', vertical: 'Tecnologías' },
  { id: '5', nombre: 'Ing. Paola Reyes', empresa: 'Agro Reyes SA', interes: 'Kubota L3560 · 2 unidades', valor: '$980,000 MXN', fuente: 'Google', fecha: '2026-05-06', stage: 'Cerrado', vertical: 'Tecnologías' },
  { id: '6', nombre: 'Marco Dávila', empresa: 'Personal', interes: 'Polaris Sportsman 570', valor: '$185,000 MXN', fuente: 'Formulario web', fecha: '2026-05-05', stage: 'Contactado', vertical: 'Offroad' },
]

const stages = ['Nuevo', 'Contactado', 'Cotizado', 'Cerrado']

const timeline: Record<string, { time: string; event: string }[]> = {
  '3': [
    { time: '2026-05-08 10:30', event: 'Lead recibido via Instagram' },
    { time: '2026-05-08 14:00', event: 'Primer contacto — WhatsApp enviado' },
    { time: '2026-05-09 09:15', event: 'Cotización enviada por email — $1,350,000 MXN · 3 unidades RZR Pro R' },
  ],
}

const notas: Record<string, string> = {
  '3': 'Carlos contactó por WhatsApp el 2026-05-08. Confirmó interés en 3 RZR Pro R para evento de mayo. Solicita cotización formal con tiempo de entrega.',
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
    lead.vertical === 'Tecnologías'
      ? { bg: '#e8f0e0', text: '#3D6B1F' }
      : { bg: '#fff0e6', text: '#F97316' }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/crm" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              ← Pipeline
            </Link>
            <span className="text-gray-200">|</span>
            <h1 className="text-lg font-semibold text-gray-900">{lead.nombre}</h1>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded"
              style={{ backgroundColor: verticalColor.bg, color: verticalColor.text }}
            >
              {lead.vertical}
            </span>
          </div>
          <nav className="flex items-center gap-1">
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
