'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import RoleSwitcher, { getRolSession } from '@/components/shared/RoleSwitcher'

type Lead = {
  id: string
  nombre: string
  empresa: string
  interes: string
  valor: string
  fuente: string
  fecha: string
  stage: 'Nuevo' | 'Contactado' | 'Cotizado' | 'Cerrado'
  vertical: 'Tecnologías' | 'Offroad'
  vendedorId: string
}

const allLeads: Lead[] = [
  { id: '1', nombre: 'Ing. Roberto Villanueva', empresa: 'Rancho Villanueva', interes: 'Kubota M5111 · Financiamiento', valor: '$420,000 MXN', fuente: 'Formulario web', fecha: '2026-05-10', stage: 'Nuevo', vertical: 'Tecnologías', vendedorId: 'vend-1' },
  { id: '2', nombre: 'Lupita Estrada', empresa: 'Aguacates La Huerta', interes: 'Kubota B2601 · Compra directa', valor: '$215,000 MXN', fuente: 'WhatsApp', fecha: '2026-05-09', stage: 'Contactado', vertical: 'Tecnologías', vendedorId: 'vend-1' },
  { id: '3', nombre: 'Carlos Mendoza', empresa: 'Club Offroad Morelia', interes: '3x Polaris RZR Pro R', valor: '$1,350,000 MXN', fuente: 'Instagram', fecha: '2026-05-08', stage: 'Cotizado', vertical: 'Offroad', vendedorId: 'vend-2' },
  { id: '4', nombre: 'Fam. Gutiérrez', empresa: 'Rancho Los Pinos', interes: 'Tractor usado consignación', valor: '$180,000 MXN', fuente: 'Marketplace', fecha: '2026-05-07', stage: 'Nuevo', vertical: 'Tecnologías', vendedorId: 'vend-1' },
  { id: '5', nombre: 'Ing. Paola Reyes', empresa: 'Agro Reyes SA', interes: 'Kubota L3560 · 2 unidades', valor: '$980,000 MXN', fuente: 'Google', fecha: '2026-05-06', stage: 'Cerrado', vertical: 'Tecnologías', vendedorId: 'admin-1' },
  { id: '6', nombre: 'Marco Dávila', empresa: 'Personal', interes: 'Polaris Sportsman 570', valor: '$185,000 MXN', fuente: 'Formulario web', fecha: '2026-05-05', stage: 'Contactado', vertical: 'Offroad', vendedorId: 'vend-2' },
]

const stages: { key: Lead['stage']; label: string; color: string; headerBg: string }[] = [
  { key: 'Nuevo',      label: 'Nuevo',      color: 'border-blue-400',   headerBg: 'bg-blue-50 text-blue-700' },
  { key: 'Contactado', label: 'Contactado', color: 'border-yellow-400', headerBg: 'bg-yellow-50 text-yellow-700' },
  { key: 'Cotizado',   label: 'Cotizado',   color: 'border-orange-400', headerBg: 'bg-orange-50 text-orange-700' },
  { key: 'Cerrado',    label: 'Cerrado',    color: 'border-green-500',  headerBg: 'bg-green-50 text-green-700' },
]

const fuenteColor: Record<string, string> = {
  'Formulario web': 'bg-gray-100 text-gray-600',
  'WhatsApp':       'bg-green-100 text-green-700',
  'Instagram':      'bg-pink-100 text-pink-700',
  'Marketplace':    'bg-indigo-100 text-indigo-700',
  'Google':         'bg-blue-100 text-blue-700',
}

export default function CRMPipelineClient() {
  const [session, setSession] = useState<{ rol: string; vendedorId: string } | null>(null)

  useEffect(() => {
    setSession(getRolSession())
  }, [])

  if (!session) return null

  const isAdmin = session.rol === 'Admin'
  const leads = isAdmin
    ? allLeads
    : allLeads.filter((l) => l.vendedorId === session.vendedorId)

  const pipelineValue = leads.reduce((sum, l) => {
    const n = parseInt(l.valor.replace(/[^0-9]/g, ''), 10) || 0
    return sum + n
  }, 0)
  const closed = leads.filter((l) => l.stage === 'Cerrado').length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">CRM — Pipeline de ventas</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {isAdmin ? 'KDM Tecnologías + Offroad · Todos los leads' : 'Mis leads asignados'}
            </p>
          </div>
          <div className="flex items-center gap-3">
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
          <span><span className="font-semibold text-gray-900">Total leads:</span> {leads.length}</span>
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

      {/* Kanban board */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {stages.map((stage) => {
            const stageLeads = leads.filter((l) => l.stage === stage.key)
            return (
              <div key={stage.key} className={`border-t-4 ${stage.color} bg-white rounded-lg shadow-sm overflow-hidden`}>
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
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded"
                          style={
                            lead.vertical === 'Tecnologías'
                              ? { backgroundColor: '#e8f0e0', color: '#3D6B1F' }
                              : { backgroundColor: '#fff0e6', color: '#F97316' }
                          }
                        >
                          {lead.vertical}
                        </span>
                        <span className="text-xs text-gray-400">{lead.fecha}</span>
                      </div>
                      <p className="font-semibold text-gray-900 text-sm leading-tight">{lead.nombre}</p>
                      <p className="text-xs text-gray-500 mb-2">{lead.empresa}</p>
                      <p className="text-xs text-gray-600 mb-3 leading-relaxed">{lead.interes}</p>
                      <p className="font-semibold text-gray-900 text-base mb-3">{lead.valor}</p>
                      <span className={`inline-block text-xs px-2 py-0.5 rounded font-medium ${fuenteColor[lead.fuente] ?? 'bg-gray-100 text-gray-600'}`}>
                        {lead.fuente}
                      </span>
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
