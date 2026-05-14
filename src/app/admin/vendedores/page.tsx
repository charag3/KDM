'use client'

// Admin — Gestión de vendedores /admin/vendedores
// Add, deactivate, and view sellers. Role-based access simulation.

import { useState } from 'react'
import Link from 'next/link'
import RoleSwitcher from '@/components/shared/RoleSwitcher'
import { vendedores as initialVendedores, Vendedor, Rol, VerticalAcceso } from '@/lib/data/vendedores'

const rolColor: Record<Rol, string> = {
  Admin: 'bg-purple-100 text-purple-700',
  Vendedor: 'bg-blue-100 text-blue-700',
}

const verticalColor: Record<VerticalAcceso, string> = {
  Tecnologías: 'bg-green-100 text-green-700',
  Offroad: 'bg-orange-100 text-orange-700',
  Ambas: 'bg-gray-100 text-gray-700',
}

const emptyForm = {
  nombre: '',
  email: '',
  telefono: '',
  rol: 'Vendedor' as Rol,
  vertical: 'Tecnologías' as VerticalAcceso,
}

export default function VendedoresPage() {
  const [lista, setLista] = useState<Vendedor[]>(initialVendedores)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saved, setSaved] = useState(false)

  function toggleActivo(id: string) {
    setLista((prev) =>
      prev.map((v) => (v.id === id ? { ...v, activo: !v.activo } : v))
    )
  }

  function addVendedor() {
    if (!form.nombre || !form.email) return
    const nuevo: Vendedor = {
      id: `vend-${Date.now()}`,
      ...form,
      leadsAsignados: 0,
      ventasCerradas: 0,
      fechaIngreso: new Date().toISOString().slice(0, 10),
      activo: true,
    }
    setLista((prev) => [...prev, nuevo])
    setForm(emptyForm)
    setShowForm(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const activos = lista.filter((v) => v.activo)
  const inactivos = lista.filter((v) => !v.activo)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">← Admin</Link>
            <span className="text-gray-200">|</span>
            <h1 className="text-lg font-semibold text-gray-900">Vendedores</h1>
          </div>
          <div className="flex items-center gap-3">
            <RoleSwitcher />
            <button
              onClick={() => setShowForm(true)}
              className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              + Agregar vendedor
            </button>
          </div>
        </div>
      </div>

      {saved && (
        <div className="bg-green-50 border-b border-green-200 px-6 py-2 text-sm text-green-700 text-center">
          Vendedor agregado correctamente (solo en esta sesión — sin DB real)
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Active vendors */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Activos ({activos.length})
          </h2>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Nombre</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">Email</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Rol</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 hidden lg:table-cell">Vertical</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 hidden lg:table-cell">Leads</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 hidden lg:table-cell">Cerrados</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {activos.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600 shrink-0">
                          {v.nombre.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{v.nombre}</p>
                          <p className="text-xs text-gray-400">Desde {v.fechaIngreso}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-500 hidden md:table-cell">{v.email}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${rolColor[v.rol]}`}>{v.rol}</span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${verticalColor[v.vertical]}`}>{v.vertical}</span>
                    </td>
                    <td className="px-5 py-4 text-gray-700 hidden lg:table-cell">{v.leadsAsignados}</td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className={v.ventasCerradas > 0 ? 'text-green-600 font-semibold' : 'text-gray-400'}>
                        {v.ventasCerradas}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      {v.rol !== 'Admin' && (
                        <button
                          onClick={() => toggleActivo(v.id)}
                          className="text-xs text-red-500 hover:text-red-700 hover:underline transition-colors"
                        >
                          Desactivar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Inactive vendors */}
        {inactivos.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Inactivos ({inactivos.length})
            </h2>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden opacity-60">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-50">
                  {inactivos.map((v) => (
                    <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-400 shrink-0">
                            {v.nombre.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-500 line-through">{v.nombre}</p>
                            <p className="text-xs text-gray-300">Inactivo</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-400 hidden md:table-cell">{v.email}</td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-400">{v.rol}</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => toggleActivo(v.id)}
                          className="text-xs text-green-600 hover:underline transition-colors"
                        >
                          Reactivar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      {/* Add vendedor modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Agregar vendedor</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Nombre completo *</label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="Ej. Luis Torres"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="luis@kdmtecnologias.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Teléfono / WhatsApp</label>
                <input
                  type="tel"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="4431234567"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Rol</label>
                  <select
                    value={form.rol}
                    onChange={(e) => setForm({ ...form, rol: e.target.value as Rol })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    <option value="Vendedor">Vendedor</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Vertical</label>
                  <select
                    value={form.vertical}
                    onChange={(e) => setForm({ ...form, vertical: e.target.value as VerticalAcceso })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    <option value="Tecnologías">Tecnologías</option>
                    <option value="Offroad">Offroad</option>
                    <option value="Ambas">Ambas</option>
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500">
                <strong>Accesos que tendrá:</strong>
                <ul className="mt-1 space-y-0.5 list-disc list-inside">
                  {form.rol === 'Admin' ? (
                    <>
                      <li>Dashboard global</li>
                      <li>CRM — todos los leads</li>
                      <li>Gestión de vendedores</li>
                      <li>Gestión de productos</li>
                    </>
                  ) : (
                    <>
                      <li>CRM — solo sus propios leads</li>
                      <li>Catálogo de productos ({form.vertical})</li>
                      <li className="line-through text-gray-300">Dashboard global</li>
                      <li className="line-through text-gray-300">Gestión de vendedores</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2"
              >
                Cancelar
              </button>
              <button
                onClick={addVendedor}
                disabled={!form.nombre || !form.email}
                className="text-sm bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
