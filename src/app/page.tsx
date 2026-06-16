'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import {
  ClipboardText,
  MagnifyingGlass,
  Handshake,
  Wrench,
  Scroll,
  ShieldCheck,
  Bank,
} from '@phosphor-icons/react'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import { inventarioSeminuevos } from '@/lib/data/inventario'

// ─── Motion helpers ────────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Types ─────────────────────────────────────────────────────────────────────

type FiltroTipo = 'Todo' | 'Tractores' | 'Offroad'

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-rubik font-bold text-gray-900 text-xl tracking-tight">
          KDM<span className="text-agro-orange">.</span> Seminuevos
        </a>

        <div className="hidden md:flex items-center gap-1">
          <a href="#inventario" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
            Inventario
          </a>
          <a href="#como-funciona" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
            Cómo funciona
          </a>
          <a href="#consignar" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
            Consignar
          </a>
          <div className="w-px h-5 bg-gray-200 mx-2" />
          <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
            KDM Tecnologías
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
            Polaris Morelia
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

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

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-1">
          <a onClick={() => setMobileOpen(false)} href="#inventario" className="px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">Inventario</a>
          <a onClick={() => setMobileOpen(false)} href="#como-funciona" className="px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">Cómo funciona</a>
          <a onClick={() => setMobileOpen(false)} href="#consignar" className="px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">Consignar</a>
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
  const reduce = useReducedMotion()
  const hidden = reduce ? false : { opacity: 0, y: 20 }
  const visible = { opacity: 1, y: 0 }

  return (
    <section
      className="relative overflow-hidden bg-[#1a3a0f]"
      style={{ minHeight: 'clamp(500px, 68vh, 660px)' }}
    >
      {/* Hero image — fills the right half on desktop, full bleed on mobile */}
      <div className="absolute inset-0 md:left-[45%]">
        <Image
          src="https://images.pexels.com/photos/37314899/pexels-photo-37314899.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Tractor en campo agrícola"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a0f] via-[#1a3a0f]/70 to-[#1a3a0f]/10 md:via-[#1a3a0f]/55 md:to-transparent" />
        <div className="absolute inset-0 bg-[#1a3a0f]/55 md:bg-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 flex items-center h-full" style={{ minHeight: 'inherit' }}>
        <div className="py-20 md:py-24 max-w-[520px]">
          <motion.p
            initial={hidden} animate={visible} transition={{ duration: 0.55, delay: 0 }}
            className="inline-flex items-center gap-2 text-xs font-nunito font-semibold text-agro-orange uppercase tracking-widest border border-agro-orange/40 px-3 py-1 rounded-full mb-6"
          >
            Morelia, Michoacán · Verificado por KDM
          </motion.p>

          <motion.h1
            initial={hidden} animate={visible} transition={{ duration: 0.55, delay: 0.08 }}
            className="font-rubik font-bold text-white text-4xl md:text-[3.2rem] leading-tight mb-5"
          >
            ¿Tienes un tractor que ya no usas?
          </motion.h1>

          <motion.p
            initial={hidden} animate={visible} transition={{ duration: 0.55, delay: 0.16 }}
            className="text-white/70 font-nunito text-base md:text-lg leading-relaxed mb-8 max-w-md"
          >
            Consigna el tuyo, encuentra el que necesitas. Todo con respaldo técnico de KDM.
          </motion.p>

          <motion.div initial={hidden} animate={visible} transition={{ duration: 0.55, delay: 0.24 }} className="flex flex-col sm:flex-row gap-3">
            <a
              href="#consignar"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-agro-green text-white font-rubik font-semibold rounded-lg hover:bg-agro-green-dark active:scale-[0.98] transition-all text-sm"
            >
              Consignar mi equipo
            </a>
            <a
              href="#inventario"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-white/30 text-white font-rubik font-semibold rounded-lg hover:bg-white/10 active:scale-[0.98] transition-all text-sm"
            >
              Ver inventario disponible
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Cómo funciona ────────────────────────────────────────────────────────────

function ComoFunciona() {
  const pasos = [
    {
      Icon: ClipboardText,
      titulo: 'Registra tu equipo',
      desc: 'Llena el formulario con los datos de tu tractor o maquinaria. Sin compromiso.',
    },
    {
      Icon: MagnifyingGlass,
      titulo: 'KDM lo valida',
      desc: 'Nuestros técnicos revisan la información y coordinan una inspección contigo.',
    },
    {
      Icon: Handshake,
      titulo: 'Lo conectamos',
      desc: 'Publicamos tu equipo y lo conectamos con compradores calificados de la región.',
    },
  ]

  return (
    <section id="como-funciona" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-14">
          <h2 className="font-rubik font-bold text-3xl text-gray-900 mb-2">Así de fácil</h2>
          <p className="text-gray-500 font-nunito text-base max-w-sm">
            Desde que nos contactas hasta que tu equipo encuentra nuevo dueño.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-0 md:gap-8 relative">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-7 left-[calc(33.33%+24px)] right-[calc(33.33%+24px)] h-px bg-gray-100 z-0" />

          {pasos.map((paso, i) => (
            <FadeIn key={paso.titulo} delay={i * 0.1}>
              <div className="relative py-8 md:py-0 border-t border-gray-100 md:border-none first:border-none">
                {/* Step indicator */}
                <div className="flex items-center gap-4 mb-4 md:mb-5">
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-agro-green/8 flex items-center justify-center shrink-0 border border-agro-green/12">
                    <paso.Icon size={24} weight="duotone" className="text-agro-green" />
                  </div>
                  <span className="font-rubik font-bold text-3xl text-gray-100 leading-none select-none">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="font-rubik font-bold text-gray-900 text-lg mb-2">{paso.titulo}</h3>
                <p className="font-nunito text-gray-500 text-sm leading-relaxed max-w-[260px]">{paso.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Inventario ───────────────────────────────────────────────────────────────

const condicionColor: Record<string, string> = {
  Excelente: 'bg-green-100 text-green-700',
  'Muy buena': 'bg-blue-100 text-blue-700',
  Buena: 'bg-yellow-100 text-yellow-700',
  Regular: 'bg-gray-100 text-gray-600',
}

function Inventario() {
  const [filtro, setFiltro] = useState<FiltroTipo>('Todo')

  const equiposFiltrados =
    filtro === 'Todo'
      ? inventarioSeminuevos
      : inventarioSeminuevos.filter((e) =>
          filtro === 'Tractores' ? e.tipo === 'Tractor' : e.tipo === 'Offroad'
        )

  const filtros: { key: FiltroTipo; label: string }[] = [
    { key: 'Todo', label: 'Todo' },
    { key: 'Tractores', label: 'Tractores' },
    { key: 'Offroad', label: 'Vehículos offroad' },
  ]

  return (
    <section id="inventario" className="py-20 px-6 bg-agro-gray">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <h2 className="font-rubik font-bold text-3xl text-gray-900 mb-1">Equipo disponible</h2>
            <p className="font-nunito text-gray-500 text-sm">Maquinaria verificada por técnicos KDM</p>
          </div>
          <div className="flex gap-2">
            {filtros.map((f) => (
              <button
                key={f.key}
                onClick={() => setFiltro(f.key)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                  filtro === f.key
                    ? 'bg-agro-green-dark text-white border-agro-green-dark'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {equiposFiltrados.map((equipo, i) => {
            const waMsg = encodeURIComponent(
              `Hola, me interesa el ${equipo.nombre} ${equipo.año}. ¿Sigue disponible?`
            )
            return (
              <FadeIn key={equipo.id} delay={i * 0.06}>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full">
                  <Link href={`/equipo/${equipo.id}`} className="relative block aspect-video overflow-hidden bg-gray-100">
                    <Image
                      src={equipo.imagen}
                      alt={equipo.nombre}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${condicionColor[equipo.condicion]}`}>
                      {equipo.condicion}
                    </span>
                  </Link>

                  <div className="p-5 flex flex-col flex-1">
                    <Link href={`/equipo/${equipo.id}`} className="group">
                      <h3 className="font-rubik font-semibold text-gray-900 text-base group-hover:text-agro-green transition-colors">
                        {equipo.nombre}
                      </h3>
                    </Link>
                    <div className="flex gap-3 mt-1.5 text-xs text-gray-400 font-nunito">
                      <span>Año {equipo.año}</span>
                      <span>·</span>
                      <span>{equipo.horas.toLocaleString('es-MX')} hrs</span>
                      {equipo.specs.hp && (
                        <>
                          <span>·</span>
                          <span>{equipo.specs.hp} HP</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                      <span className="font-rubik font-bold text-agro-green-dark text-lg">
                        ${equipo.precio.toLocaleString('es-MX')} <span className="text-xs font-normal text-gray-400">MXN</span>
                      </span>
                      <div className="flex gap-2">
                        <Link
                          href={`/equipo/${equipo.id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                          Ver ficha
                        </Link>
                        <a
                          href={`https://wa.me/524430000000?text=${waMsg}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 active:scale-[0.97] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all"
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          WA
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
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
      Icon: Wrench,
      titulo: 'Inspección técnica',
      desc: 'Cada unidad es revisada por nuestros técnicos antes de publicarse. Sin sorpresas mecánicas.',
    },
    {
      Icon: Scroll,
      titulo: 'Procedencia garantizada',
      desc: 'Conoces el historial del equipo. Sin intermediarios anónimos ni riesgos de Marketplace.',
    },
    {
      Icon: ShieldCheck,
      titulo: 'Respaldo de distribuidor',
      desc: 'Somos distribuidores autorizados Kubota y Polaris. Tu compra tiene respaldo de marca.',
    },
    {
      Icon: Bank,
      titulo: 'Financiamiento disponible',
      desc: 'Pregunta por nuestras opciones de crédito para facilitar tu próxima compra.',
    },
  ]

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-12">
          <h2 className="font-rubik font-bold text-3xl text-gray-900 mb-2">
            ¿Por qué comprar seminuevo con KDM?
          </h2>
          <p className="text-gray-500 font-nunito text-base max-w-sm">
            Distribuidores autorizados. Revisión técnica. Sin riesgo.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((c, i) => (
            <FadeIn key={c.titulo} delay={i * 0.08}>
              <div className="flex gap-5 p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all bg-white">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-agro-green/8 border border-agro-green/12 flex items-center justify-center">
                  <c.Icon size={20} weight="duotone" className="text-agro-green" />
                </div>
                <div>
                  <h3 className="font-rubik font-bold text-gray-900 text-base mb-1">{c.titulo}</h3>
                  <p className="font-nunito text-gray-500 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Marcas section ───────────────────────────────────────────────────────────

function MarcasSection() {
  return (
    <section className="py-20 px-6 bg-agro-gray">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-12">
          <h2 className="font-rubik font-bold text-3xl text-gray-900 mb-2">
            También trabajamos con equipo nuevo
          </h2>
          <p className="font-nunito text-gray-500 text-base max-w-md">
            Si buscas tu próximo tractor o vehículo nuevo, visita nuestras páginas oficiales
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          <FadeIn delay={0.05}>
            <div className="rounded-2xl border-2 border-gray-100 bg-white p-8 hover:border-agro-green/30 transition-colors h-full">
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-5"
                style={{ background: '#2d6a1f20', color: '#2d6a1f' }}
              >
                Distribuidor autorizado Kubota
              </div>
              <h3 className="font-rubik font-bold text-gray-900 text-2xl mb-1">KDM Tecnologías</h3>
              <p className="font-nunito text-gray-500 text-sm mb-5">Morelia, Michoacán</p>
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
                className="inline-flex items-center gap-2 font-rubik font-semibold text-sm px-5 py-2.5 rounded-lg text-white transition-colors hover:opacity-90"
                style={{ background: '#2d6a1f' }}
              >
                Ver tractores Kubota <span>→</span>
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl border-2 border-gray-100 bg-white p-8 hover:border-orange-400/30 transition-colors h-full">
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 bg-orange-50 text-orange-600">
                Distribuidor autorizado Polaris
              </div>
              <h3 className="font-rubik font-bold text-gray-900 text-2xl mb-1">Polaris Morelia</h3>
              <p className="font-nunito text-gray-500 text-sm mb-5">Distribuidor autorizado · Michoacán</p>
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
                className="inline-flex items-center gap-2 font-rubik font-semibold text-sm px-5 py-2.5 rounded-lg text-white bg-orange-500 hover:bg-orange-600 transition-colors"
              >
                Ver vehículos Polaris <span>→</span>
              </a>
            </div>
          </FadeIn>
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  const inputClass =
    'w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-agro-green bg-white placeholder-gray-400'

  return (
    <section id="consignar" className="py-20 px-6" style={{ background: '#1a3a0f' }}>
      <div className="max-w-2xl mx-auto">
        <FadeIn className="text-center mb-10">
          <h2 className="font-rubik font-bold text-3xl text-white mb-3">Consigna tu equipo</h2>
          <p className="font-nunito text-white/60 text-base">
            Dinos qué tienes y qué buscas - te contactamos en menos de 24 horas
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            {sent ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-rubik font-bold text-gray-900 text-xl mb-2">Recibido</p>
                <p className="font-nunito text-gray-500 text-sm">Te contactamos en menos de 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
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

                <div
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

                <button
                  type="submit"
                  className="w-full bg-agro-green hover:bg-agro-green-dark active:scale-[0.99] text-white font-rubik font-semibold py-3.5 rounded-lg transition-all text-sm"
                >
                  Enviar - te contactamos pronto
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Testimonios ──────────────────────────────────────────────────────────────

function Testimonios() {
  const testimonios = [
    {
      texto: 'Vendí mi Kubota L3560 en 3 semanas. El proceso fue fácil y el precio fue justo. Ya estoy usando mi M5111 nuevo.',
      nombre: 'Ing. Roberto V.',
      ciudad: 'Zamora, Mich.',
    },
    {
      texto: 'Tenía miedo de vender en Facebook por los fraudes. Con KDM todo fue transparente y rápido.',
      nombre: 'Don Aurelio G.',
      ciudad: 'Uruapan, Mich.',
    },
    {
      texto: 'Me ayudaron a conseguir financiamiento para el tractor nuevo mientras vendían el mío. No esperaba eso.',
      nombre: 'Fam. Estrada',
      ciudad: 'Los Reyes, Mich.',
    },
  ]

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-12">
          <h2 className="font-rubik font-bold text-3xl text-gray-900 mb-2">
            Lo que dicen nuestros clientes
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonios.map((t, i) => (
            <FadeIn key={t.nombre} delay={i * 0.08}>
              <div className="flex flex-col h-full p-7 rounded-2xl border border-gray-100 bg-gray-50 hover:border-gray-200 transition-colors">
                <svg className="w-6 h-6 text-agro-green/30 mb-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="font-nunito text-gray-700 text-sm leading-relaxed flex-1 mb-5">{t.texto}</p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-rubik font-semibold text-gray-900 text-sm">{t.nombre}</p>
                  <p className="font-nunito text-gray-400 text-xs mt-0.5">{t.ciudad}</p>
                </div>
              </div>
            </FadeIn>
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

          <div>
            <p className="font-rubik font-semibold text-white/80 text-xs uppercase tracking-wider mb-4">
              Navegación
            </p>
            <div className="space-y-2 font-nunito text-sm text-white/50">
              <a href="#inventario" className="block hover:text-white/80 transition-colors">Inventario</a>
              <a href="#como-funciona" className="block hover:text-white/80 transition-colors">Cómo funciona</a>
              <a href="#consignar" className="block hover:text-white/80 transition-colors">Consignar</a>
            </div>
          </div>

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
