'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, WhatsappLogo } from '@phosphor-icons/react'

type Consignacion = {
  id: string
  nombre: string
  telefono: string
  tractor_interes: string
  tiene_equipo: boolean
  marca_modelo: string | null
  ano_equipo: number | null
  horas_equipo: number | null
  condicion_equipo: string | null
  precio_esperado: number | null
  mensaje: string | null
  status: 'nuevo' | 'contactado' | 'cerrado' | 'descartado'
  notas_internas: string | null
  created_at: string
}

const statusColor: Record<string, string> = {
  nuevo: 'bg-kdm-orange-500/15 text-kdm-orange-400 border-kdm-orange-500/30',
  contactado: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  cerrado: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  descartado: 'bg-white/6 text-oxford-400 border-white/10',
}

const statusLabel: Record<string, string> = {
  nuevo: 'Nuevo', contactado: 'Contactado', cerrado: 'Cerrado', descartado: 'Descartado',
}

export default function AdminConsignaciones() {
  const router = useRouter()
  const [leads, setLeads] = useState<Consignacion[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Consignacion | null>(null)
  const [notas, setNotas] = useState('')
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/consignaciones')
    if (res.status === 401) { router.push('/admin/login'); return }
    setLeads(await res.json())
    setLoading(false)
  }, [router])

  useEffect(() => { load() }, [load])

  function openLead(lead: Consignacion) {
    setSelected(lead)
    setNotas(lead.notas_internas ?? '')
  }

  async function updateStatus(id: string, status: string, notas_internas?: string) {
    setSaving(true)
    await fetch(`/api/admin/consignaciones/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notas_internas: notas_internas ?? selected?.notas_internas }),
    })
    setSaving(false)
    setSelected(null)
    load()
  }

  const nuevo = leads.filter(l => l.status === 'nuevo').length

  return (
    <div className="min-h-screen bg-oxford-950">
      <nav className="bg-oxford-900 border-b border-white/6 px-6 h-14 flex items-center gap-4">
        <a href="/admin/equipos" className="flex items-center gap-1.5 text-sm text-oxford-400 hover:text-white transition-colors">
          <ArrowLeft size={15} /> Inventario
        </a>
        <span className="text-white/10">|</span>
        <p className="font-rubik font-bold text-white">Consignaciones</p>
        {nuevo > 0 && (
          <span className="bg-kdm-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{nuevo} nuevas</span>
        )}
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {loading ? (
          <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-oxford-800 rounded-xl animate-pulse" />)}</div>
        ) : leads.length === 0 ? (
          <div className="text-center py-20 text-oxford-400 font-nunito">No hay consignaciones todavía.</div>
        ) : (
          <div className="space-y-3">
            {leads.map(lead => (
              <button
                key={lead.id}
                onClick={() => openLead(lead)}
                className="w-full text-left bg-oxford-800 rounded-2xl border border-white/8 hover:border-white/20 p-5 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusColor[lead.status]}`}>
                        {statusLabel[lead.status]}
                      </span>
                      <span className="text-oxford-400 text-xs font-nunito">
                        {new Date(lead.created_at).toLocaleDateString('es-MX')}
                      </span>
                    </div>
                    <p className="font-rubik font-semibold text-white text-sm">{lead.nombre}</p>
                    <p className="text-oxford-400 text-xs font-nunito mt-0.5">
                      Interés: {lead.tractor_interes}
                      {lead.tiene_equipo && lead.marca_modelo && ` · Consigna: ${lead.marca_modelo}`}
                    </p>
                  </div>
                  <a
                    onClick={e => e.stopPropagation()}
                    href={`https://wa.me/52${lead.telefono.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${lead.nombre}, te contactamos de KDM Seminuevos.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <WhatsappLogo size={14} /> {lead.telefono}
                  </a>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Drawer detalle */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end md:items-center justify-center p-0 md:p-6">
          <div className="w-full md:max-w-lg bg-oxford-800 rounded-t-2xl md:rounded-2xl border border-white/10 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-oxford-800 flex items-center justify-between px-6 py-4 border-b border-white/6">
              <h2 className="font-rubik font-bold text-white">{selected.nombre}</h2>
              <button onClick={() => setSelected(null)} className="text-oxford-400 hover:text-white">✕</button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ['Teléfono', selected.telefono],
                  ['Interés', selected.tractor_interes],
                  selected.tiene_equipo && ['Equipo a consignar', selected.marca_modelo ?? '—'],
                  selected.ano_equipo && ['Año', String(selected.ano_equipo)],
                  selected.horas_equipo && ['Horas', `${selected.horas_equipo.toLocaleString()} hrs`],
                  selected.precio_esperado && ['Precio esperado', `$${selected.precio_esperado.toLocaleString('es-MX')} MXN`],
                ].filter(Boolean).map(([label, val]) => (
                  <div key={String(label)} className="bg-oxford-700 rounded-xl p-3">
                    <p className="text-xs text-oxford-400 font-nunito mb-0.5">{label}</p>
                    <p className="text-white font-rubik font-semibold text-sm">{val}</p>
                  </div>
                ))}
              </div>

              {selected.mensaje && (
                <div>
                  <p className="text-xs font-semibold text-oxford-400 mb-1.5">Mensaje del cliente</p>
                  <p className="text-sm text-oxford-200 font-nunito bg-oxford-700 rounded-xl p-3">{selected.mensaje}</p>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-oxford-200 mb-1.5">Notas internas</label>
                <textarea
                  rows={3}
                  value={notas}
                  onChange={e => setNotas(e.target.value)}
                  className="w-full border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white bg-oxford-700 focus:outline-none focus:ring-2 focus:ring-kdm-orange-500 resize-none placeholder-oxford-400"
                  placeholder="Notas para el equipo KDM..."
                />
              </div>

              <div>
                <p className="text-xs font-semibold text-oxford-200 mb-2">Cambiar status</p>
                <div className="grid grid-cols-2 gap-2">
                  {(['nuevo', 'contactado', 'cerrado', 'descartado'] as const).map(s => (
                    <button
                      key={s}
                      disabled={saving || selected.status === s}
                      onClick={() => updateStatus(selected.id, s, notas)}
                      className={`py-2 rounded-lg text-xs font-semibold border transition-all disabled:opacity-40 ${
                        selected.status === s
                          ? `${statusColor[s]} cursor-default`
                          : 'bg-oxford-700 text-oxford-400 border-white/10 hover:border-white/25'
                      }`}
                    >
                      {statusLabel[s]}
                    </button>
                  ))}
                </div>
              </div>

              <button
                disabled={saving}
                onClick={() => updateStatus(selected.id, selected.status, notas)}
                className="w-full bg-kdm-orange-500 hover:bg-kdm-orange-600 disabled:opacity-60 text-white font-rubik font-semibold py-2.5 rounded-lg text-sm transition-all"
              >
                {saving ? 'Guardando...' : 'Guardar notas'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
