'use client'

// ConsignForm — Formulario para que usuarios consignen su tractor usado
// Ruta: /tecnologias/marketplace/consignar
//
// Campos:
//   - Nombre completo
//   - Teléfono (WhatsApp)
//   - Email
//   - Marca / Modelo / Año
//   - Horas de uso
//   - Precio esperado
//   - Estado del tractor (Excelente / Bueno / Regular)
//   - Descripción libre
//
// Al enviar:
//   - Server Action → sendWhatsAppNotification() con resumen del formulario
//   - TODO: en siguiente sesión conectar con lib/callmebot.ts via Server Action
//   - Mostrar confirmación en pantalla

import { useState } from 'react'

type FormData = {
  nombre: string
  telefono: string
  email: string
  marca: string
  modelo: string
  anio: string
  horasUso: string
  precioEsperado: string
  estado: 'Excelente' | 'Bueno' | 'Regular' | ''
  descripcion: string
}

const initialForm: FormData = {
  nombre: '',
  telefono: '',
  email: '',
  marca: '',
  modelo: '',
  anio: '',
  horasUso: '',
  precioEsperado: '',
  estado: '',
  descripcion: '',
}

export default function ConsignForm() {
  const [formData, setFormData] = useState<FormData>(initialForm)
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)

    // TODO: reemplazar con Server Action que llame a sendWhatsAppNotification()
    // Ejemplo del mensaje a enviar:
    // `Nueva consignacion:
    //  ${formData.nombre} | ${formData.telefono}
    //  ${formData.marca} ${formData.modelo} ${formData.anio}
    //  ${formData.horasUso} hrs | Estado: ${formData.estado}
    //  Precio esperado: $${formData.precioEsperado} MXN`

    await new Promise((r) => setTimeout(r, 800)) // placeholder
    setEnviando(false)
    setEnviado(true)
  }

  if (enviado) {
    return (
      <div className="bg-agro-green/10 border border-agro-green rounded-lg p-8 text-center">
        <p className="text-agro-green font-semibold text-xl mb-2">Solicitud enviada</p>
        <p className="text-gray-600 text-sm">
          Nos pondremos en contacto contigo en las próximas horas para revisar tu tractor.
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-agro-green transition-all duration-300'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Datos personales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nombre" className={labelClass}>Nombre completo *</label>
          <input required id="nombre" name="nombre" type="text" value={formData.nombre} onChange={handleChange} className={inputClass} placeholder="Juan Pérez" />
        </div>
        <div>
          <label htmlFor="telefono" className={labelClass}>Teléfono (WhatsApp) *</label>
          <input required id="telefono" name="telefono" type="tel" value={formData.telefono} onChange={handleChange} className={inputClass} placeholder="44 3XXX XXXX" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Email</label>
        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="correo@ejemplo.com" />
      </div>

      {/* Datos del tractor */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label htmlFor="marca" className={labelClass}>Marca *</label>
          <input required id="marca" name="marca" type="text" value={formData.marca} onChange={handleChange} className={inputClass} placeholder="Kubota" />
        </div>
        <div>
          <label htmlFor="modelo" className={labelClass}>Modelo *</label>
          <input required id="modelo" name="modelo" type="text" value={formData.modelo} onChange={handleChange} className={inputClass} placeholder="L3901" />
        </div>
        <div>
          <label htmlFor="anio" className={labelClass}>Año *</label>
          <input required id="anio" name="anio" type="number" min="1990" max="2025" value={formData.anio} onChange={handleChange} className={inputClass} placeholder="2018" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label htmlFor="horasUso" className={labelClass}>Horas de uso</label>
          <input id="horasUso" name="horasUso" type="number" min="0" value={formData.horasUso} onChange={handleChange} className={inputClass} placeholder="850" />
        </div>
        <div>
          <label htmlFor="precioEsperado" className={labelClass}>Precio esperado (MXN)</label>
          <input id="precioEsperado" name="precioEsperado" type="number" min="0" value={formData.precioEsperado} onChange={handleChange} className={inputClass} placeholder="280000" />
        </div>
        <div>
          <label htmlFor="estado" className={labelClass}>Estado general *</label>
          <select required id="estado" name="estado" value={formData.estado} onChange={handleChange} className={inputClass}>
            <option value="">Seleccionar...</option>
            <option value="Excelente">Excelente</option>
            <option value="Bueno">Bueno</option>
            <option value="Regular">Regular</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="descripcion" className={labelClass}>Descripción adicional</label>
        <textarea id="descripcion" name="descripcion" rows={4} value={formData.descripcion} onChange={handleChange} className={inputClass} placeholder="Accesorios incluidos, historial de mantenimiento, condición de llantas..." />
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="w-full bg-agro-green text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:bg-agro-green-dark disabled:opacity-60"
      >
        {enviando ? 'Enviando...' : 'Enviar solicitud de consignación'}
      </button>
    </form>
  )
}
