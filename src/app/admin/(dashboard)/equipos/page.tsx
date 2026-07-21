'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { PencilSimple, Trash, Plus, Eye, EyeSlash } from '@phosphor-icons/react'

type Equipo = {
  id: string
  tipo: string
  nombre: string
  ano: number
  horas: number
  precio: number | string
  condicion: string
  descripcion: string
  imagen_principal: string | null
  specs: Record<string, unknown>
  disponible: boolean
  verificado_kdm: boolean
  orden: number
}

const EMPTY: Omit<Equipo, 'id' | 'disponible' | 'verificado_kdm'> = {
  tipo: 'Tractor', nombre: '', ano: new Date().getFullYear(),
  horas: 0, precio: 0, condicion: 'Buena',
  descripcion: '', imagen_principal: '',
  specs: { marca: '', hp: '', traccion: '', transmision: '' },
  orden: 0,
}

function EquipoModal({ equipo, onSave, onClose }: {
  equipo: Partial<Equipo> | null
  onSave: (data: Partial<Equipo>) => Promise<void>
  onClose: () => void
}) {
  const [form, setForm] = useState<Partial<Equipo>>(equipo ?? { ...EMPTY, disponible: true, verificado_kdm: false })
  const [saving, setSaving] = useState(false)

  const input = 'w-full border border-oxford-200 rounded-lg px-3 py-2.5 text-sm text-oxford-950 bg-white focus:outline-none focus:ring-2 focus:ring-kdm-orange-500 placeholder-oxford-400'

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await onSave(form)
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-oxford-950/60 flex items-start justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-oxford-200 shadow-xl my-8">
        <div className="flex items-center justify-between p-6 border-b border-oxford-100">
          <h2 className="font-rubik font-bold text-oxford-950 text-lg">{equipo?.id ? 'Editar equipo' : 'Agregar equipo'}</h2>
          <button onClick={onClose} className="text-oxford-400 hover:text-oxford-950">✕</button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-oxford-700 mb-1.5">Tipo</label>
              <select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} className={input}>
                <option>Tractor</option>
                <option>Offroad</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-oxford-700 mb-1.5">Condición</label>
              <select value={form.condicion} onChange={e => setForm({ ...form, condicion: e.target.value })} className={input}>
                <option>Excelente</option>
                <option>Muy buena</option>
                <option>Buena</option>
                <option>Regular</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-oxford-700 mb-1.5">Nombre del equipo</label>
            <input required type="text" placeholder="Ej: Kubota L3901" value={form.nombre ?? ''} onChange={e => setForm({ ...form, nombre: e.target.value })} className={input} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-oxford-700 mb-1.5">Año</label>
              <input required type="number" min={1990} max={2030} value={form.ano ?? ''} onChange={e => setForm({ ...form, ano: Number(e.target.value) })} className={input} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-oxford-700 mb-1.5">Horas de uso</label>
              <input required type="number" min={0} value={form.horas ?? ''} onChange={e => setForm({ ...form, horas: Number(e.target.value) })} className={input} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-oxford-700 mb-1.5">Precio MXN</label>
              <input required type="number" min={0} value={form.precio ?? ''} onChange={e => setForm({ ...form, precio: Number(e.target.value) })} className={input} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-oxford-700 mb-1.5">Descripción</label>
            <textarea required rows={3} value={form.descripcion ?? ''} onChange={e => setForm({ ...form, descripcion: e.target.value })} className={`${input} resize-none`} placeholder="Descripción del equipo..." />
          </div>

          <div>
            <label className="block text-xs font-semibold text-oxford-700 mb-1.5">URL de imagen principal</label>
            <input type="url" value={form.imagen_principal ?? ''} onChange={e => setForm({ ...form, imagen_principal: e.target.value })} className={input} placeholder="https://..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-oxford-700 mb-1.5">Marca</label>
              <input type="text" value={(form.specs as Record<string, string>)?.marca ?? ''} onChange={e => setForm({ ...form, specs: { ...form.specs, marca: e.target.value } })} className={input} placeholder="Kubota / Polaris" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-oxford-700 mb-1.5">HP</label>
              <input type="number" value={(form.specs as Record<string, string>)?.hp ?? ''} onChange={e => setForm({ ...form, specs: { ...form.specs, hp: e.target.value } })} className={input} placeholder="39" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-oxford-700 mb-1.5">Tracción</label>
              <input type="text" value={(form.specs as Record<string, string>)?.traccion ?? ''} onChange={e => setForm({ ...form, specs: { ...form.specs, traccion: e.target.value } })} className={input} placeholder="4WD / 2WD" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-oxford-700 mb-1.5">Transmisión</label>
              <input type="text" value={(form.specs as Record<string, string>)?.transmision ?? ''} onChange={e => setForm({ ...form, specs: { ...form.specs, transmision: e.target.value } })} className={input} placeholder="HST / GST" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-oxford-700 mb-1.5">Orden (menor = primero)</label>
              <input type="number" min={0} value={form.orden ?? 0} onChange={e => setForm({ ...form, orden: Number(e.target.value) })} className={input} />
            </div>
            <div className="flex items-end gap-4 pb-0.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.disponible ?? true} onChange={e => setForm({ ...form, disponible: e.target.checked })} className="w-4 h-4 accent-kdm-orange-500" />
                <span className="text-sm text-oxford-700 font-nunito">Disponible</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.verificado_kdm ?? false} onChange={e => setForm({ ...form, verificado_kdm: e.target.checked })} className="w-4 h-4 accent-kdm-orange-500" />
                <span className="text-sm text-oxford-700 font-nunito">Verificado KDM</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-oxford-200 text-oxford-600 hover:text-oxford-950 hover:border-oxford-400 font-rubik font-semibold py-2.5 rounded-lg text-sm transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={saving} className="flex-1 bg-kdm-orange-500 hover:bg-kdm-orange-600 disabled:opacity-60 text-white font-rubik font-semibold py-2.5 rounded-lg text-sm transition-all">
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminEquipos() {
  const router = useRouter()
  const [equipos, setEquipos] = useState<Equipo[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<Partial<Equipo> | null | false>(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/equipos')
    if (res.status === 401) { router.push('/admin/login'); return }
    setEquipos(await res.json())
    setLoading(false)
  }, [router])

  useEffect(() => { load() }, [load])

  async function save(data: Partial<Equipo>) {
    const isEdit = !!(data as Equipo).id
    const url = isEdit ? `/api/admin/equipos/${(data as Equipo).id}` : '/api/admin/equipos'
    await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setModal(false)
    load()
  }

  async function toggleDisponible(equipo: Equipo) {
    await fetch(`/api/admin/equipos/${equipo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...equipo, disponible: !equipo.disponible }),
    })
    load()
  }

  async function remove(id: string) {
    if (!confirm('¿Eliminar este equipo?')) return
    setDeleting(id)
    await fetch(`/api/admin/equipos/${id}`, { method: 'DELETE' })
    setDeleting(null)
    load()
  }

  const condicionColor: Record<string, string> = {
    Excelente: 'bg-kdm-orange-500 text-white',
    'Muy buena': 'bg-oxford-900 text-white',
    Buena: 'bg-oxford-900 text-white',
    Regular: 'bg-oxford-900 text-white',
  }

  return (
    <div className="min-h-screen bg-oxford-100">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-rubik font-bold text-oxford-950 text-2xl">Inventario</h1>
            <p className="text-oxford-600 text-sm font-nunito mt-1">{equipos.length} equipos en total</p>
          </div>
          <button
            onClick={() => setModal({})}
            className="inline-flex items-center gap-2 bg-kdm-orange-500 hover:bg-kdm-orange-600 text-white font-rubik font-semibold px-5 py-2.5 rounded-lg text-sm transition-all active:scale-[0.98]"
          >
            <Plus size={16} weight="bold" /> Agregar equipo
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-white border border-oxford-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-oxford-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-oxford-100">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-oxford-600 uppercase tracking-wider">Equipo</th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-oxford-600 uppercase tracking-wider hidden md:table-cell">Tipo</th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-oxford-600 uppercase tracking-wider hidden sm:table-cell">Condición</th>
                  <th className="text-right px-4 py-3.5 text-xs font-semibold text-oxford-600 uppercase tracking-wider">Precio</th>
                  <th className="text-center px-4 py-3.5 text-xs font-semibold text-oxford-600 uppercase tracking-wider">Estado</th>
                  <th className="px-4 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-oxford-100">
                {equipos.map(e => (
                  <tr key={e.id} className="hover:bg-oxford-100/50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-rubik font-semibold text-oxford-950 text-sm">{e.nombre}</p>
                      <p className="text-oxford-600 text-xs font-nunito mt-0.5">Año {e.ano} · {e.horas.toLocaleString('es-MX')} hrs</p>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-xs text-oxford-600 font-nunito">{e.tipo}</span>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${condicionColor[e.condicion]}`}>{e.condicion}</span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="font-rubik font-bold text-kdm-orange-600 text-sm">
                        ${Number(e.precio).toLocaleString('es-MX')}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => toggleDisponible(e)}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors ${
                          e.disponible ? 'bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20' : 'bg-oxford-100 text-oxford-600 hover:bg-oxford-200'
                        }`}
                      >
                        {e.disponible ? <Eye size={13} /> : <EyeSlash size={13} />}
                        {e.disponible ? 'Activo' : 'Oculto'}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => setModal(e)}
                          className="p-1.5 text-oxford-600 hover:text-oxford-950 hover:bg-oxford-100 rounded-lg transition-colors"
                        >
                          <PencilSimple size={15} />
                        </button>
                        <button
                          onClick={() => remove(e.id)}
                          disabled={deleting === e.id}
                          className="p-1.5 text-oxford-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                        >
                          <Trash size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal !== false && (
        <EquipoModal
          equipo={modal ?? null}
          onSave={save}
          onClose={() => setModal(false)}
        />
      )}
    </div>
  )
}
