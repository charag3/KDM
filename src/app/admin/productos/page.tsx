'use client'

// Admin — Gestión de productos /admin/productos
// CRUD para tractores, vehículos Polaris e implementos.
// Accesible para Admin (completo) y Vendedores (solo su vertical).

import { useState } from 'react'
import Link from 'next/link'
import RoleSwitcher from '@/components/shared/RoleSwitcher'
import { tractores as initialTractores, Tractor } from '@/lib/data/tractores'
import { vehiculosPolaris as initialPolaris, VehiculoPolaris } from '@/lib/data/polaris'
import { implementos as initialImplementos, Implemento } from '@/lib/data/implementos'

type Tab = 'tractores' | 'polaris' | 'implementos'

type ProductoNuevo = {
  tipo: Tab
  nombre: string
  descripcion: string
  precio: string
  categoria: string
}

const emptyForm: ProductoNuevo = {
  tipo: 'tractores',
  nombre: '',
  descripcion: '',
  precio: '',
  categoria: '',
}

export default function ProductosPage() {
  const [tab, setTab] = useState<Tab>('tractores')
  const [tractores, setTractores] = useState<Tractor[]>(initialTractores)
  const [polaris, setPolaris] = useState<VehiculoPolaris[]>(initialPolaris)
  const [implementos, setImplementos] = useState<Implemento[]>(initialImplementos)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<ProductoNuevo>({ ...emptyForm, tipo: tab })
  const [saved, setSaved] = useState(false)
  const [deletedId, setDeletedId] = useState<string | null>(null)

  const tabs: { key: Tab; label: string; count: number; icon: string }[] = [
    { key: 'tractores', label: 'Tractores Kubota', count: tractores.length, icon: '🚜' },
    { key: 'polaris', label: 'Polaris', count: polaris.length, icon: '🏎️' },
    { key: 'implementos', label: 'Implementos', count: implementos.length, icon: '⚙️' },
  ]

  function openForm() {
    setForm({ ...emptyForm, tipo: tab })
    setShowForm(true)
  }

  function addProducto() {
    if (!form.nombre) return
    if (form.tipo === 'tractores') {
      const nuevo: Tractor = {
        id: `t-${Date.now()}`,
        nombre: form.nombre,
        serie: 'L',
        hp: 0,
        traccion: '4WD',
        transmision: 'HST',
        usos: [form.categoria || 'General'],
        descripcion: form.descripcion,
        imagenUrl: '/images/tractores/placeholder.jpg',
      }
      setTractores((p) => [...p, nuevo])
    } else if (form.tipo === 'polaris') {
      const nuevo: VehiculoPolaris = {
        id: `p-${Date.now()}`,
        nombre: form.nombre,
        linea: 'RZR',
        hp: 0,
        capacidad: '2 pasajeros',
        tagline: form.categoria || '',
        descripcion: form.descripcion,
        precioMXN: parseInt(form.precio.replace(/\D/g, ''), 10) || 0,
        imagenUrl: '/images/polaris/placeholder.jpg',
      }
      setPolaris((p) => [...p, nuevo])
    } else {
      const nuevo: Implemento = {
        id: `i-${Date.now()}`,
        nombre: form.nombre,
        marca: 'Jacto',
        categoria: 'Aspersión',
        compatibilidad: form.categoria || 'Serie L',
        descripcion: form.descripcion,
        imagenUrl: '/images/implementos/placeholder.jpg',
      }
      setImplementos((p) => [...p, nuevo])
    }
    setShowForm(false)
    setForm(emptyForm)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  function deleteItem(id: string) {
    setDeletedId(id)
    if (tab === 'tractores') setTractores((p) => p.filter((x) => x.id !== id))
    else if (tab === 'polaris') setPolaris((p) => p.filter((x) => x.id !== id))
    else setImplementos((p) => p.filter((x) => x.id !== id))
    setTimeout(() => setDeletedId(null), 100)
  }

  const currentTab = tabs.find((t) => t.key === tab)!

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">← Admin</Link>
            <span className="text-gray-200">|</span>
            <h1 className="text-lg font-semibold text-gray-900">Productos</h1>
          </div>
          <div className="flex items-center gap-3">
            <RoleSwitcher />
            <button
              onClick={openForm}
              className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              + Agregar producto
            </button>
          </div>
        </div>
      </div>

      {saved && (
        <div className="bg-green-50 border-b border-green-200 px-6 py-2 text-sm text-green-700 text-center">
          Producto agregado (solo en esta sesión — sin DB real)
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t.key
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === t.key ? 'bg-gray-100 text-gray-600' : 'bg-gray-200 text-gray-400'}`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Products table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Producto</th>
                {tab === 'tractores' && (
                  <>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">Serie</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">HP</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 hidden lg:table-cell">Tracción</th>
                  </>
                )}
                {tab === 'polaris' && (
                  <>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">Línea</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">HP</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 hidden lg:table-cell">Precio MXN</th>
                  </>
                )}
                {tab === 'implementos' && (
                  <>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">Marca</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">Categoría</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 hidden lg:table-cell">Compatibilidad</th>
                  </>
                )}
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tab === 'tractores' &&
                tractores.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-900">{t.nombre}</p>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{t.descripcion}</p>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-green-100 text-green-700">Serie {t.serie}</span>
                    </td>
                    <td className="px-5 py-4 text-gray-700 hidden md:table-cell">{t.hp} HP</td>
                    <td className="px-5 py-4 text-gray-500 hidden lg:table-cell">{t.traccion}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/tecnologias/tractores/${t.id}`} className="text-xs text-indigo-500 hover:underline">Ver</Link>
                        <button onClick={() => deleteItem(t.id)} className="text-xs text-red-400 hover:text-red-600 hover:underline">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}

              {tab === 'polaris' &&
                polaris.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-900">{v.nombre}</p>
                      <p className="text-xs text-gray-400 mt-0.5 italic">{v.tagline}</p>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-orange-100 text-orange-700">{v.linea}</span>
                    </td>
                    <td className="px-5 py-4 text-gray-700 hidden md:table-cell">{v.hp > 0 ? `${v.hp} HP` : '—'}</td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      {v.precioMXN > 0 ? (
                        <span className="font-semibold text-gray-900">${v.precioMXN.toLocaleString('es-MX')}</span>
                      ) : '—'}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/offroad/rzr`} className="text-xs text-indigo-500 hover:underline">Ver</Link>
                        <button onClick={() => deleteItem(v.id)} className="text-xs text-red-400 hover:text-red-600 hover:underline">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}

              {tab === 'implementos' &&
                implementos.map((imp) => (
                  <tr key={imp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-900">{imp.nombre}</p>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{imp.descripcion}</p>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">{imp.marca}</span>
                    </td>
                    <td className="px-5 py-4 text-gray-500 hidden md:table-cell">{imp.categoria}</td>
                    <td className="px-5 py-4 text-gray-500 hidden lg:table-cell text-xs">{imp.compatibilidad}</td>
                    <td className="px-5 py-4 text-right">
                      <button onClick={() => deleteItem(imp.id)} className="text-xs text-red-400 hover:text-red-600 hover:underline">Eliminar</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {((tab === 'tractores' && tractores.length === 0) ||
            (tab === 'polaris' && polaris.length === 0) ||
            (tab === 'implementos' && implementos.length === 0)) && (
            <div className="text-center py-12 text-gray-300">
              <p className="text-4xl mb-3">{currentTab.icon}</p>
              <p className="text-sm">Sin productos. Agrega el primero.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add product modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Agregar producto</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Tipo de producto</label>
                <select
                  value={form.tipo}
                  onChange={(e) => setForm({ ...form, tipo: e.target.value as Tab })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <option value="tractores">Tractor Kubota</option>
                  <option value="polaris">Vehículo Polaris</option>
                  <option value="implementos">Implemento</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Nombre del producto *</label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder={form.tipo === 'tractores' ? 'Ej. Kubota L4060' : form.tipo === 'polaris' ? 'Ej. RZR Pro XP 4' : 'Ej. Sembradora Kverneland'}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {form.tipo === 'tractores' ? 'Usos principales' : form.tipo === 'polaris' ? 'Tagline' : 'Compatibilidad'}
                </label>
                <input
                  type="text"
                  value={form.categoria}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder={form.tipo === 'tractores' ? 'Agricultura, ganadería...' : form.tipo === 'polaris' ? 'Conquistar cualquier terreno' : 'Serie L, Serie M'}
                />
              </div>
              {form.tipo === 'polaris' && (
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Precio (MXN)</label>
                  <input
                    type="text"
                    value={form.precio}
                    onChange={(e) => setForm({ ...form, precio: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                    placeholder="Ej. 520000"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Descripción</label>
                <textarea
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="Descripción técnica del producto..."
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2">
                Cancelar
              </button>
              <button
                onClick={addProducto}
                disabled={!form.nombre}
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
