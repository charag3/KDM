'use client'

// Landing pública — KDM Seminuevos
// Ángulo diferenciador: agricultor que quiere vender su tractor viejo para comprar uno nuevo

import { useState, useEffect, useRef } from 'react'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import { tractores } from '@/lib/data/tractores'

// ─── Tipos ────────────────────────────────────────────────────────────────────

type FiltroTipo = 'Todo' | 'Tractores' | 'Vehículos offroad'

// ─── Mock inventario seminuevos ───────────────────────────────────────────────

const mockHoras = [1200, 2800, 1950, 3500, 2100, 1450]
const mockPrecios = [185000, 230000, 310000, 275000, 420000, 195000]

const inventarioTractores = tractores.map((t, i) => ({
  id: t.id,
  tipo: 'Tractores' as FiltroTipo,
  nombre: t.nombre,
  año: 2017 + (i % 5),
  horas: mockHoras[i % mockHoras.length],
  precio: mockPrecios[i % mockPrecios.length],
}))

const inventarioOffroad = [
  {
    id: 'rzr-pro-r-2021',
    tipo: 'Vehículos offroad' as FiltroTipo,
    nombre: 'Polaris RZR Pro R',
    año: 2021,
    horas: 320,
    precio: 480000,
  },
  {
    id: 'sportsman-570-2020',
    tipo: 'Vehículos offroad' as FiltroTipo,
    nombre: 'Polaris Sportsman 570',
    año: 2020,
    horas: 510,
    precio: 128000,
  },
  {
    id: 'ranger-1000-2022',
    tipo: 'Vehículos offroad' as FiltroTipo,
    nombre: 'Polaris Ranger 1000',
    año: 2022,
    horas: 280,
    precio: 390000,
  },
]

const todosLosEquipos = [...inventarioTractores, ...inventarioOffroad]

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function closeMobile() {
    setMobileOpen(false)
  }

  return (
    <nav
      className={`sticky top-0 z-40 bg-white transition-all duration-200 ${
        scrolled ? 'border-b border-gray-100 shadow-sm' : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-rubik font-bold text-gray-900 text-xl tracking-tight">
          KDM<span className="text-agro-orange">.</span> Seminuevos
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <a href="#inventario" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
            Inventario
          </a>
          <a href="#como-funciona" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
            Cómo funciona
          </a>
          <a href="#consignar" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
            Consignar
          </a>

          {/* Separador */}
          <div className="w-px h-5 bg-gray-200 mx-2" />

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
          >
            KDM Tecnologías
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Polaris Morelia
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Abrir menú"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-1">
          <a onClick={closeMobile} href="#inventario" className="px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">Inventario</a>
          <a onClick={closeMobile} href="#como-funciona" className="px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">Cómo funciona</a>
          <a onClick={closeMobile} href="#consignar" className="px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">Consignar</a>
          <div className="border-t border-gray-100 mt-2 pt-2 flex flex-col gap-1">
            <a href="#" target="_blank" rel="noopener noreferrer" className="px-3 py-2.5 text-sm text-gray-400 rounded-lg hover:bg-gray-50">KDM Tecnologías ↗</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="px-3 py-2.5 text-sm text-gray-400 rounded-lg hover:bg-gray-50">Polaris Morelia ↗</a>
          </div>
        </div>
      )}
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative overflow-hidden py-24 px-6"
      style={{ background: 'linear-gradient(135deg, #1a3a0f 0%, #2d6a1f 60%, #1f4d16 100%)' }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <div>
          <p className="inline-block text-xs font-nunito font-semibold text-agro-orange uppercase tracking-widest border border-agro-orange/40 px-3 py-1 rounded-full mb-6">
            Morelia, Michoacán · Verificado por KDM
          </p>
          <h1 className="font-rubik font-bold text-white text-4xl md:text-5xl leading-tight mb-5">
            ¿Tienes un tractor que ya no usas?
          </h1>
          <p className="text-white/75 font-nunito text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            Aquí empieza tu próximo equipo. Consigna el tuyo, encuentra el que necesitas — todo con el respaldo de KDM.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#consignar"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-agro-green text-white font-rubik font-semibold rounded-lg hover:bg-agro-green-dark transition-colors text-sm"
            >
              Consignar mi equipo
            </a>
            <a
              href="#inventario"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-white/30 text-white font-rubik font-semibold rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              Ver inventario disponible
            </a>
          </div>
        </div>

        {/* Placeholder imagen */}
        <div className="rounded-2xl overflow-hidden aspect-video bg-white/10 flex items-center justify-center border border-white/10">
          <p className="text-white/40 font-nunito text-sm text-center px-6">
            Foto hero — tractor en campo
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Cómo funciona ────────────────────────────────────────────────────────────

function ComoFunciona() {
  const pasos = [
    {
      num: '01',
      icono: '📋',
      titulo: 'Registra tu equipo',
      desc: 'Llena el formulario con los datos de tu tractor o maquinaria. Sin compromiso.',
    },
    {
      num: '02',
      icono: '🔍',
      titulo: 'KDM lo valida',
      desc: 'Nuestro equipo técnico revisa la información y te contacta para coordinar la inspección.',
    },
    {
      num: '03',
      icono: '🤝',
      titulo: 'Lo conectamos',
      desc: 'Publicamos tu equipo en el portal y lo conectamos con compradores calificados de la región.',
    },
  ]

  return (
    <section id="como-funciona" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-rubik font-bold text-3xl text-gray-900 mb-3">Así de fácil</h2>
          <p className="text-gray-500 font-nunito text-base max-w-md mx-auto">
            Desde que nos contactas hasta que tu equipo encuentra nuevo dueño.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {pasos.map((paso) => (
            <div
              key={paso.num}
              className="rounded-2xl border border-gray-100 p-8 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="font-rubik font-bold text-4xl text-agro-green/20 leading-none">{paso.num}</span>
              </div>
              <div className="text-3xl mb-4">{paso.icono}</div>
              <h3 className="font-rubik font-bold text-gray-900 text-lg mb-2">{paso.titulo}</h3>
              <p className="font-nunito text-gray-500 text-sm leading-relaxed">{paso.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Inventario ───────────────────────────────────────────────────────────────

function Inventario() {
  const [filtro, setFiltro] = useState<FiltroTipo>('Todo')

  const equiposFiltrados =
    filtro === 'Todo'
      ? todosLosEquipos
      : todosLosEquipos.filter((e) => e.tipo === filtro)

  const filtros: FiltroTipo[] = ['Todo', 'Tractores', 'Vehículos offroad']

  return (
    <section id="inventario" className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <h2 className="font-rubik font-bold text-3xl text-gray-900 mb-1">Equipo disponible</h2>
            <p className="font-nunito text-gray-500 text-sm">Maquinaria verificada por técnicos KDM</p>
          </div>
          <div className="flex gap-2">
            {filtros.map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                  filtro === f
                    ? 'bg-agro-green-dark text-white border-agro-green-dark'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {equiposFiltrados.map((equipo) => {
            const waMsg = encodeURIComponent(
              `Hola, me interesa el ${equipo.nombre} ${equipo.año}. ¿Sigue disponible?`
            )
            return (
              <div
                key={equipo.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Placeholder foto */}
                <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
                  <span className="font-nunito text-gray-400 text-sm px-4 text-center">{equipo.nombre}</span>
                  <span className="absolute top-3 left-3 text-xs font-semibold bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full">
                    Verificado
                  </span>
                </div>
                {/* Info */}
                <div className="p-5">
                  <h3 className="font-rubik font-semibold text-gray-900 text-base">{equipo.nombre}</h3>
                  <div className="flex gap-3 mt-1.5 text-xs text-gray-400 font-nunito">
                    <span>Año {equipo.año}</span>
                    <span>·</span>
                    <span>{equipo.horas.toLocaleString('es-MX')} hrs</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-rubik font-bold text-agro-green-dark text-lg">
                      ${equipo.precio.toLocaleString('es-MX')} MXN
                    </span>
                    <a
                      href={`https://wa.me/52XXXXXXXXXX?text=${waMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Consultar
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Trust section ────────────────────────────────────────────────────────────

function TrustSection() {
  const cards = [
    {
      icono: '🔧',
      titulo: 'Inspección técnica',
      desc: 'Cada unidad es revisada por nuestros técnicos antes de publicarse. Sin sorpresas mecánicas.',
    },
    {
      icono: '📄',
      titulo: 'Procedencia garantizada',
      desc: 'Conoces la historia del equipo. Sin intermediarios anónimos, sin riesgos de Facebook Marketplace.',
    },
    {
      icono: '🏅',
      titulo: 'Respaldo de distribuidor',
      desc: 'Somos distribuidores autorizados Kubota y Polaris. Tu compra tiene respaldo de marca.',
    },
    {
      icono: '💳',
      titulo: 'Financiamiento disponible',
      desc: 'Pregunta por nuestras opciones de crédito para facilitar tu compra.',
    },
  ]

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-rubik font-bold text-3xl text-gray-900 mb-3">
            ¿Por qué comprar seminuevo con KDM?
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cards.map((c) => (
            <div key={c.titulo} className="bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-sm transition-shadow">
              <div className="text-3xl mb-4">{c.icono}</div>
              <h3 className="font-rubik font-bold text-gray-900 text-base mb-2">{c.titulo}</h3>
              <p className="font-nunito text-gray-500 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Marcas section ───────────────────────────────────────────────────────────

function MarcasSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-rubik font-bold text-3xl text-gray-900 mb-3">
            También trabajamos con equipo nuevo
          </h2>
          <p className="font-nunito text-gray-500 text-base max-w-md mx-auto">
            Si buscas tu próximo tractor o vehículo nuevo, visita nuestras páginas oficiales
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* KDM Tecnologías */}
          <div className="rounded-2xl border-2 border-gray-100 p-8 hover:border-[#2d6a1f]/30 transition-colors">
            <div
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-5"
              style={{ background: '#2d6a1f20', color: '#2d6a1f' }}
            >
              Distribuidor autorizado Kubota
            </div>
            <h3 className="font-rubik font-bold text-gray-900 text-2xl mb-1">KDM Tecnologías</h3>
            <p className="font-nunito text-gray-500 text-sm mb-5">Distribuidor autorizado Kubota · Morelia</p>
            <ul className="space-y-2 mb-7">
              {['Tractores Serie B, L y M', 'Implementos agrícolas', 'Servicio técnico certificado'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-nunito text-gray-600">
                  <span style={{ color: '#2d6a1f' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-rubik font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors text-white"
              style={{ background: '#2d6a1f' }}
            >
              Ver tractores Kubota
              <span>→</span>
            </a>
          </div>

          {/* Polaris Morelia */}
          <div className="rounded-2xl border-2 border-gray-100 p-8 hover:border-orange-400/30 transition-colors">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 bg-orange-50 text-orange-600">
              Distribuidor autorizado Polaris
            </div>
            <h3 className="font-rubik font-bold text-gray-900 text-2xl mb-1">Polaris Morelia</h3>
            <p className="font-nunito text-gray-500 text-sm mb-5">Distribuidor autorizado Polaris · Michoacán</p>
            <ul className="space-y-2 mb-7">
              {['RZR · Ranger · Sportsman', 'Financiamiento disponible'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-nunito text-gray-600">
                  <span className="text-orange-500">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-rubik font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors text-white bg-orange-500 hover:bg-orange-600"
            >
              Ver vehículos Polaris
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Formulario consignación ──────────────────────────────────────────────────

function FormularioConsignacion() {
  const [tieneEquipo, setTieneEquipo] = useState<'si' | 'no' | null>(null)
  const [sent, setSent] = useState(false)

  const [form, setForm] = useState({
    tractorInteres: '',
    tipoEquipo: '',
    marcaModelo: '',
    año: '',
    horas: '',
    condicion: '',
    precioEsperado: '',
    nombre: '',
    telefono: '',
    mensaje: '',
  })

  const equipoRef = useRef<HTMLDivElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  const inputClass =
    'w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-agro-green bg-white placeholder-gray-400'

  return (
    <section
      id="consignar"
      className="py-20 px-6"
      style={{ background: '#1a3a0f' }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Títulos */}
        <div className="text-center mb-10">
          <h2 className="font-rubik font-bold text-3xl text-white mb-3">Consigna tu equipo</h2>
          <p className="font-nunito text-white/60 text-base">
            Dinos qué tienes y qué buscas — te contactamos en menos de 24 horas
          </p>
        </div>

        {/* Card del formulario */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          {sent ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-4">✅</div>
              <p className="font-rubik font-bold text-gray-900 text-xl mb-2">¡Recibido!</p>
              <p className="font-nunito text-gray-500 text-sm">Te contactamos en menos de 24 horas.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 1. Tractor de interés */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  ¿Cuál tractor nuevo te interesa comprar?
                </label>
                <select
                  required
                  value={form.tractorInteres}
                  onChange={(e) => setForm({ ...form, tractorInteres: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Selecciona una opción...</option>
                  <option>Kubota Serie B (compact)</option>
                  <option>Kubota Serie L (utility)</option>
                  <option>Kubota Serie M (high-power)</option>
                  <option>Polaris Ranger</option>
                  <option>Polaris RZR</option>
                  <option>Aún no lo decido</option>
                </select>
              </div>

              {/* 2. ¿Tiene equipo a consignar? */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  ¿Tienes equipo que quieras consignar?
                </label>
                <div className="flex gap-3">
                  {(['si', 'no'] as const).map((val) => (
                    <label
                      key={val}
                      className={`flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                        tieneEquipo === val
                          ? 'bg-agro-green text-white border-agro-green'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="tieneEquipo"
                        value={val}
                        checked={tieneEquipo === val}
                        onChange={() => setTieneEquipo(val)}
                        className="sr-only"
                      />
                      {val === 'si' ? 'Sí' : 'No'}
                    </label>
                  ))}
                </div>
              </div>

              {/* Campos adicionales si tiene equipo — animados con CSS transition */}
              <div
                ref={equipoRef}
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: tieneEquipo === 'si' ? '600px' : '0px', opacity: tieneEquipo === 'si' ? 1 : 0 }}
              >
                <div className="space-y-4 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Tipo de equipo</label>
                    <select
                      value={form.tipoEquipo}
                      onChange={(e) => setForm({ ...form, tipoEquipo: e.target.value })}
                      className={inputClass}
                    >
                      <option value="">Selecciona...</option>
                      <option>Tractor agrícola</option>
                      <option>Vehículo offroad</option>
                      <option>Implemento</option>
                      <option>Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Marca y modelo</label>
                    <input
                      type="text"
                      placeholder="Ej: Kubota L3560"
                      value={form.marcaModelo}
                      onChange={(e) => setForm({ ...form, marcaModelo: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Año</label>
                      <input
                        type="number"
                        placeholder="2018"
                        min={1990}
                        max={2026}
                        value={form.año}
                        onChange={(e) => setForm({ ...form, año: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Horas de uso aprox.</label>
                      <input
                        type="number"
                        placeholder="1200"
                        min={0}
                        value={form.horas}
                        onChange={(e) => setForm({ ...form, horas: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Condición</label>
                    <select
                      value={form.condicion}
                      onChange={(e) => setForm({ ...form, condicion: e.target.value })}
                      className={inputClass}
                    >
                      <option value="">Selecciona...</option>
                      <option>Excelente</option>
                      <option>Buena</option>
                      <option>Regular</option>
                      <option>Necesita servicio</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Precio esperado MXN</label>
                    <input
                      type="number"
                      placeholder="250000"
                      min={0}
                      value={form.precioEsperado}
                      onChange={(e) => setForm({ ...form, precioEsperado: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* 3. Nombre */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Tu nombre</label>
                <input
                  required
                  type="text"
                  placeholder="Nombre completo"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className={inputClass}
                />
              </div>

              {/* 4. Teléfono */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Teléfono</label>
                <input
                  required
                  type="tel"
                  placeholder="443 000 0000"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  className={inputClass}
                />
              </div>

              {/* 5. Mensaje opcional */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  ¿Algo más que quieras decirnos? <span className="font-normal text-gray-400">(opcional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Cuéntanos más sobre lo que necesitas..."
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-agro-green hover:bg-agro-green-dark text-white font-rubik font-semibold py-3.5 rounded-lg transition-colors text-sm"
              >
                Enviar — te contactamos pronto
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonios ──────────────────────────────────────────────────────────────

function Testimonios() {
  const testimonios = [
    {
      texto:
        'Vendí mi Kubota L3560 en 3 semanas. El proceso fue fácil y el precio fue justo. Ya estoy usando mi M5111 nuevo.',
      nombre: 'Ing. Roberto V.',
      ciudad: 'Zamora, Mich.',
    },
    {
      texto:
        'Tenía miedo de vender en Facebook por los fraudes. Con KDM todo fue transparente y rápido.',
      nombre: 'Don Aurelio G.',
      ciudad: 'Uruapan, Mich.',
    },
    {
      texto:
        'Me ayudaron a conseguir financiamiento para el tractor nuevo mientras me vendían el viejo. No esperaba eso.',
      nombre: 'Fam. Estrada',
      ciudad: 'Los Reyes, Mich.',
    },
  ]

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-rubik font-bold text-3xl text-gray-900 mb-3">
            Lo que dicen nuestros clientes
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonios.map((t) => (
            <div key={t.nombre} className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
              <div className="font-rubik font-bold text-5xl text-agro-green/20 leading-none mb-3">"</div>
              <p className="font-nunito text-gray-700 text-sm leading-relaxed mb-5">{t.texto}</p>
              <div>
                <p className="font-rubik font-semibold text-gray-900 text-sm">{t.nombre}</p>
                <p className="font-nunito text-gray-400 text-xs">{t.ciudad}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: '#111' }} className="px-6 py-14">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Logo + datos */}
          <div>
            <p className="font-rubik font-bold text-white text-xl mb-1">
              KDM<span className="text-agro-orange">.</span> Seminuevos
            </p>
            <p className="font-nunito text-white/40 text-sm mt-1">Morelia, Michoacán</p>
            <div className="mt-4 space-y-1.5 text-sm font-nunito text-white/50">
              <p>WhatsApp: +52 (443) 000-0000</p>
              <p>ventas@kdmseminuevos.com</p>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <p className="font-rubik font-semibold text-white/80 text-xs uppercase tracking-wider mb-4">
              Navegación
            </p>
            <div className="space-y-2 font-nunito text-sm text-white/50">
              <a href="#inventario" className="block hover:text-white/80 transition-colors">Inventario</a>
              <a href="#consignar" className="block hover:text-white/80 transition-colors">Consignar</a>
            </div>
          </div>

          {/* Marcas */}
          <div>
            <p className="font-rubik font-semibold text-white/80 text-xs uppercase tracking-wider mb-4">
              Nuestros portales
            </p>
            <div className="space-y-2 font-nunito text-sm text-white/50">
              <a href="#" target="_blank" rel="noopener noreferrer" className="block hover:text-white/80 transition-colors">
                KDM Tecnologías ↗
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="block hover:text-white/80 transition-colors">
                Polaris Morelia ↗
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="font-nunito text-white/30 text-xs text-center">
            © 2026 KDM Seminuevos · Morelia, Michoacán
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function KDMSeminuevosLanding() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ComoFunciona />
      <Inventario />
      <TrustSection />
      <MarcasSection />
      <FormularioConsignacion />
      <Testimonios />
      <Footer />
      <WhatsAppButton
        variant="agro"
        message="Hola, me interesa un equipo seminuevo KDM. ¿Me pueden ayudar?"
      />
    </div>
  )
}
