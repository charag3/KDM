'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import RoleSwitcher, { getRolSession } from '@/components/shared/RoleSwitcher'

type Lead = {
  id: string
  nombre: string
  empresa: string
  telefono: string
  interes: string
  valor: string
  fuente: string
  fecha: string
  stage: 'Nuevo' | 'Contactado' | 'Cotizado' | 'Cerrado'
  vertical: 'Compra' | 'Consignación'
  vendedorId: string
}

const seedLeads: Lead[] = [
  { id: '1', nombre: 'Ing. Roberto Villanueva', empresa: 'Rancho Villanueva', telefono: '+52 443 100 0001', interes: 'Tractor Kubota B2601 seminuevo · Financiamiento', valor: '$195,000 MXN', fuente: 'Portal KDM', fecha: '2026-05-10', stage: 'Nuevo', vertical: 'Compra', vendedorId: 'vend-1' },
  { id: '2', nombre: 'Lupita Estrada', empresa: 'Aguacates La Huerta', telefono: '+52 443 100 0002', interes: 'Kubota L3301 seminuevo · Compra directa', valor: '$285,000 MXN', fuente: 'WhatsApp', fecha: '2026-05-09', stage: 'Contactado', vertical: 'Compra', vendedorId: 'vend-1' },
  { id: '3', nombre: 'Carlos Mendoza', empresa: 'Granja Mendoza', telefono: '+52 443 100 0003', interes: 'Kubota M5091 seminuevo · 1 unidad', valor: '$620,000 MXN', fuente: 'Instagram', fecha: '2026-05-08', stage: 'Cotizado', vertical: 'Compra', vendedorId: 'vend-2' },
  { id: '4', nombre: 'Fam. Gutiérrez', empresa: 'Rancho Los Pinos', telefono: '+52 443 100 0004', interes: 'Consignar Kubota L3560 2019 · 1,200 hrs', valor: '$380,000 MXN', fuente: 'Portal KDM', fecha: '2026-05-07', stage: 'Nuevo', vertical: 'Consignación', vendedorId: 'vend-1' },
  { id: '5', nombre: 'Ing. Paola Reyes', empresa: 'Agro Reyes SA', telefono: '+52 443 100 0005', interes: 'Kubota L4701 seminuevo · 2 unidades', valor: '$980,000 MXN', fuente: 'Google', fecha: '2026-05-06', stage: 'Cerrado', vertical: 'Compra', vendedorId: 'admin-1' },
  { id: '6', nombre: 'Marco Dávila', empresa: 'Ganadería Dávila', telefono: '+52 443 100 0006', interes: 'Consignar Kubota B2301 2020 · 800 hrs', valor: '$135,000 MXN', fuente: 'Portal KDM', fecha: '2026-05-05', stage: 'Contactado', vertical: 'Consignación', vendedorId: 'vend-2' },
]

const stages: { key: Lead['stage']; label: string; color: string; headerBg: string }[] = [
  { key: 'Nuevo',      label: 'Nuevo',      color: 'border-blue-400',   headerBg: 'bg-blue-50 text-blue-700' },
  { key: 'Contactado', label: 'Contactado', color: 'border-yellow-400', headerBg: 'bg-yellow-50 text-yellow-700' },
  { key: 'Cotizado',   label: 'Cotizado',   color: 'border-orange-400', headerBg: 'bg-orange-50 text-orange-700' },
  { key: 'Cerrado',    label: 'Cerrado',    color: 'border-green-500',  headerBg: 'bg-green-50 text-green-700' },
]

const fuenteColor: Record<string, string> = {
  'Portal KDM':         'bg-gray-100 text-gray-600',
  'WhatsApp':           'bg-green-100 text-green-700',
  'Instagram':          'bg-pink-100 text-pink-700',
  'Google':             'bg-blue-100 text-blue-700',
  'Prospección directa':'bg-purple-100 text-purple-700',
  'Correo de marca':    'bg-indigo-100 text-indigo-700',
  'Otro':               'bg-gray-100 text-gray-500',
  // legacy keys kept so seed data doesn't lose color
  'Formulario web':     'bg-gray-100 text-gray-600',
  'Marketplace':        'bg-indigo-100 text-indigo-700',
}

const emptyForm = {
  nombre: '',
  empresa: '',
  telefono: '',
  interes: '',
  valor: '',
  fuente: 'Portal KDM',
  vertical: 'Compra' as Lead['vertical'],
  stage: 'Nuevo' as Lead['stage'],
}

function getInitial(nombre: string) {
  return nombre.trim().charAt(0).toUpperCase() || '?'
}

function AvatarCircle({ nombre, vertical }: { nombre: string; vertical: Lead['vertical'] }) {
  const bg = vertical === 'Compra' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
  return (
    <div className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center text-sm font-bold shrink-0`}>
      {getInitial(nombre)}
    </div>
  )
}

export default function CRMPipelineClient() {
  const [session, setSession] = useState<{ rol: string; vendedorId: string } | null>(null)
  const [leads, setLeads] = useState<Lead[]>(seedLeads)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [toast, setToast] = useState(false)
  const [mobileStage, setMobileStage] = useState<Lead['stage']>('Nuevo')
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setSession(getRolSession())
  }, [])

  useEffect(() => {
    if (showModal) {
      setTimeout(() => firstInputRef.current?.focus(), 50)
    }
  }, [showModal])

  if (!session) return null

  const isAdmin = session.rol === 'Admin'
  const visibleLeads = isAdmin
    ? leads
    : leads.filter((l) => l.vendedorId === session.vendedorId)

  const pipelineValue = visibleLeads.reduce((sum, l) => {
    const n = parseInt(l.valor.replace(/[^0-9]/g, ''), 10) || 0
    return sum + n
  }, 0)
  const closed = visibleLeads.filter((l) => l.stage === 'Cerrado').length

  function openModal() {
    setForm(emptyForm)
    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
    setForm(emptyForm)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const sess = getRolSession()
    const newLead: Lead = {
      id: String(Date.now()),
      nombre: form.nombre,
      empresa: form.empresa,
      telefono: form.telefono,
      interes: form.interes,
      valor: form.valor ? `$${form.valor} MXN` : '—',
      fuente: form.fuente,
      fecha: new Date().toISOString().split('T')[0],
      stage: form.stage,
      vertical: form.vertical,
      vendedorId: sess.vendedorId,
    }
    setLeads((prev) => [newLead, ...prev])
    closeModal()
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Lead agregado correctamente
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">Agregar lead</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              {/* Nombre */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Nombre del contacto <span className="text-red-500">*</span></label>
                <input
                  ref={firstInputRef}
                  type="text"
                  required
                  value={form.nombre}
                  onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500"
                  placeholder="Ej: Ing. Roberto Villanueva"
                />
              </div>
              {/* Empresa */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Empresa / Rancho</label>
                <input
                  type="text"
                  value={form.empresa}
                  onChange={(e) => setForm((f) => ({ ...f, empresa: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500"
                  placeholder="Ej: Rancho Los Pinos"
                />
              </div>
              {/* Teléfono */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Teléfono <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  required
                  value={form.telefono}
                  onChange={(e) => setForm((f) => ({ ...f, telefono: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500"
                  placeholder="+52 443 000 0000"
                />
              </div>
              {/* Interés */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">¿Qué le interesa? <span className="text-red-500">*</span></label>
                <textarea
                  required
                  rows={3}
                  value={form.interes}
                  onChange={(e) => setForm((f) => ({ ...f, interes: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500"
                  placeholder="Ej: Kubota L3560 seminuevo, consignar tractor 2018..."
                />
              </div>
              {/* Valor */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Valor estimado MXN</label>
                <input
                  type="number"
                  value={form.valor}
                  onChange={(e) => setForm((f) => ({ ...f, valor: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500"
                  placeholder="Ej: 350000"
                />
              </div>
              {/* Row: Fuente + Vertical */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Fuente</label>
                  <select
                    value={form.fuente}
                    onChange={(e) => setForm((f) => ({ ...f, fuente: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 bg-white"
                  >
                    {['Portal KDM', 'WhatsApp', 'Instagram', 'Google', 'Prospección directa', 'Correo de marca', 'Otro'].map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Vertical</label>
                  <select
                    value={form.vertical}
                    onChange={(e) => setForm((f) => ({ ...f, vertical: e.target.value as Lead['vertical'] }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 bg-white"
                  >
                    <option value="Compra">Compra</option>
                    <option value="Consignación">Consignación</option>
                  </select>
                </div>
              </div>
              {/* Stage inicial */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Stage inicial</label>
                <select
                  value={form.stage}
                  onChange={(e) => setForm((f) => ({ ...f, stage: e.target.value as Lead['stage'] }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 bg-white"
                >
                  <option value="Nuevo">Nuevo</option>
                  <option value="Contactado">Contactado</option>
                </select>
              </div>
              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Agregar lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">KDM Seminuevos — Pipeline</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {isAdmin ? 'Todos los leads' : 'Mis leads asignados'}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-end">
            <button
              onClick={openModal}
              className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Agregar lead
            </button>
            <RoleSwitcher />
            <nav className="flex items-center gap-1">
              {isAdmin && (
                <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">Dashboard</Link>
              )}
              <Link href="/crm" className="text-sm font-medium px-3 py-1.5 rounded-lg bg-gray-100 text-gray-900">CRM</Link>
              {isAdmin && (
                <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">Admin</Link>
              )}
              <Link href="/admin/productos" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">Productos</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-6 text-sm text-gray-600">
          <span><span className="font-semibold text-gray-900">Total leads:</span> {visibleLeads.length}</span>
          <span className="text-gray-300">|</span>
          <span><span className="font-semibold text-gray-900">Pipeline:</span> ${pipelineValue.toLocaleString('es-MX')} MXN</span>
          <span className="text-gray-300">|</span>
          <span><span className="font-semibold text-gray-900">Cerrados:</span> {closed}</span>
          {!isAdmin && (
            <>
              <span className="text-gray-300">|</span>
              <span className="text-yellow-600 text-xs font-medium bg-yellow-50 px-2 py-0.5 rounded-full">
                Solo tus leads — el admin ve todos
              </span>
            </>
          )}
        </div>
      </div>

      {/* Mobile stage tabs */}
      <div className="md:hidden bg-white border-b border-gray-100 px-4 py-2 overflow-x-auto">
        <div className="flex gap-2 w-max">
          {stages.map((s) => (
            <button
              key={s.key}
              onClick={() => setMobileStage(s.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                mobileStage === s.key
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s.label}
              <span className="ml-1.5 opacity-70">
                {visibleLeads.filter((l) => l.stage === s.key).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Kanban board */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {stages.map((stage) => {
            const stageLeads = visibleLeads.filter((l) => l.stage === stage.key)
            const isHiddenOnMobile = mobileStage !== stage.key
            return (
              <div
                key={stage.key}
                className={`${isHiddenOnMobile ? 'hidden md:block' : ''} border-t-4 ${stage.color} bg-white rounded-lg shadow-sm overflow-hidden`}
              >
                <div className={`px-4 py-3 flex items-center justify-between ${stage.headerBg}`}>
                  <span className="font-semibold text-sm">{stage.label}</span>
                  <span className="text-xs font-medium bg-white/60 px-2 py-0.5 rounded-full">
                    {stageLeads.length}
                  </span>
                </div>
                <div className="p-3 space-y-3">
                  {stageLeads.map((lead) => (
                    <Link
                      key={lead.id}
                      href={`/crm/lead/${lead.id}`}
                      className="block bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200"
                    >
                      {/* Top row: avatar + vertical badge + date */}
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <AvatarCircle nombre={lead.nombre} vertical={lead.vertical} />
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 text-base leading-tight truncate">{lead.nombre}</p>
                            <p className="text-xs text-gray-500 leading-tight">{lead.empresa}</p>
                          </div>
                        </div>
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded shrink-0"
                          style={
                            lead.vertical === 'Compra'
                              ? { backgroundColor: '#dcfce7', color: '#16a34a' }
                              : { backgroundColor: '#fef3c7', color: '#d97706' }
                          }
                        >
                          {lead.vertical}
                        </span>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-100 my-2" />

                      {/* Interest */}
                      <p className="text-xs text-gray-600 mb-2 leading-relaxed">{lead.interes}</p>

                      {/* Value */}
                      <p className="text-lg font-bold text-gray-800 mb-3">{lead.valor}</p>

                      {/* Bottom row: fuente + date */}
                      <div className="flex items-center justify-between gap-2">
                        <span className={`inline-block text-xs px-2 py-0.5 rounded font-medium ${fuenteColor[lead.fuente] ?? 'bg-gray-100 text-gray-600'}`}>
                          {lead.fuente}
                        </span>
                        <span className="text-xs text-gray-400">{lead.fecha}</span>
                      </div>
                    </Link>
                  ))}
                  {stageLeads.length === 0 && (
                    <div className="text-center text-gray-300 text-xs py-8">Sin leads</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
