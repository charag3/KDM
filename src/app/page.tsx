'use client'

import { useState, useEffect } from 'react'
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
  ArrowRight,
  ArrowSquareOut,
} from '@phosphor-icons/react'
import WhatsAppButton from '@/components/shared/WhatsAppButton'

// ─── Types ─────────────────────────────────────────────────────────────────────

type FiltroTipo = 'Todo' | 'Tractores' | 'Offroad'

type Equipo = {
  id: string
  tipo: 'Tractor' | 'Offroad'
  nombre: string
  ano: number
  horas: number
  precio: string
  condicion: 'Excelente' | 'Muy buena' | 'Buena' | 'Regular'
  descripcion: string
  imagen_principal: string | null
  specs: { marca?: string; hp?: number; traccion?: string; transmision?: string; capacidad?: string }
  disponible: boolean
  verificado_kdm: boolean
}

// ─── Motion helper ─────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 bg-oxford-900/95 backdrop-blur border-b border-white/6 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="font-rubik font-bold text-white text-xl tracking-tight">
          KDM<span className="text-kdm-orange-500">.</span> Seminuevos
        </a>

        <div className="hidden md:flex items-center gap-1">
          <a href="#inventario" className="px-4 py-2 text-sm font-medium text-oxford-200 hover:text-white rounded-lg hover:bg-white/6 transition-colors">
            Inventario
          </a>
          <a href="#como-funciona" className="px-4 py-2 text-sm font-medium text-oxford-200 hover:text-white rounded-lg hover:bg-white/6 transition-colors">
            Cómo funciona
          </a>
          <a href="#consignar" className="px-4 py-2 text-sm font-medium text-oxford-200 hover:text-white rounded-lg hover:bg-white/6 transition-colors">
            Consignar
          </a>
          <div className="w-px h-5 bg-white/10 mx-2" />
          <a href="https://kdmtecnologias.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 text-sm text-oxford-400 hover:text-oxford-200 rounded-lg hover:bg-white/6 transition-colors">
            KDM Tecnologías <ArrowSquareOut size={12} />
          </a>
          <a href="https://www.polarismorelia.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 text-sm text-oxford-400 hover:text-oxford-200 rounded-lg hover:bg-white/6 transition-colors">
            Polaris Morelia <ArrowSquareOut size={12} />
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(v => !v)}
          className="md:hidden p-2 rounded-lg hover:bg-white/8 transition-colors"
          aria-label="Abrir menú"
        >
          <svg className="w-5 h-5 text-oxford-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/6 bg-oxford-900 px-6 py-4 flex flex-col gap-1">
          <a onClick={() => setMobileOpen(false)} href="#inventario" className="px-3 py-2.5 text-sm font-medium text-oxford-200 rounded-lg hover:bg-white/6">Inventario</a>
          <a onClick={() => setMobileOpen(false)} href="#como-funciona" className="px-3 py-2.5 text-sm font-medium text-oxford-200 rounded-lg hover:bg-white/6">Cómo funciona</a>
          <a onClick={() => setMobileOpen(false)} href="#consignar" className="px-3 py-2.5 text-sm font-medium text-oxford-200 rounded-lg hover:bg-white/6">Consignar</a>
          <div className="border-t border-white/6 mt-2 pt-2 flex flex-col gap-1">
            <a href="https://kdmtecnologias.com/" target="_blank" rel="noopener noreferrer" className="px-3 py-2.5 text-sm text-oxford-400 rounded-lg hover:bg-white/6">KDM Tecnologías ↗</a>
            <a href="https://www.polarismorelia.com/" target="_blank" rel="noopener noreferrer" className="px-3 py-2.5 text-sm text-oxford-400 rounded-lg hover:bg-white/6">Polaris Morelia ↗</a>
          </div>
        </div>
      )}
    </nav>
  )
}

// ─── Dual Path Hero ────────────────────────────────────────────────────────────

function DualPathHero() {
  const reduce = useReducedMotion()

  return (
    <section className="bg-oxford-950 border-b border-white/6">
      {/* Eyebrow */}
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-10 text-center">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 text-xs font-nunito font-semibold text-kdm-orange-500 uppercase tracking-widest border border-kdm-orange-500/30 px-3 py-1 rounded-full mb-5"
        >
          Morelia, Michoacán · Verificado por KDM
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="font-rubik font-bold text-white text-3xl md:text-5xl leading-tight mb-4"
        >
          Compra, vende o consigna<br className="hidden md:block" /> maquinaria agrícola y offroad
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.14 }}
          className="text-oxford-400 font-nunito text-base md:text-lg max-w-xl mx-auto"
        >
          Distribuidores autorizados Kubota y Polaris en Michoacán. Inspección técnica incluida.
        </motion.p>
      </div>

      {/* Two path cards */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.22 }}
        className="max-w-6xl mx-auto px-6 pb-14 grid md:grid-cols-2 gap-4"
      >
        {/* Camino 1 — Comprar nuevo */}
        <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-oxford-800 group hover:border-kdm-orange-500/40 transition-all duration-300">
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
            <Image
              src="https://images.pexels.com/photos/9422727/pexels-photo-9422727.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Tractor Kubota nuevo"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-oxford-800 via-oxford-800/60 to-transparent" />
          </div>
          <div className="relative z-10 p-8 flex flex-col h-full min-h-[300px]">
            <div className="inline-flex items-center gap-2 text-xs font-nunito font-semibold text-kdm-orange-500 uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-kdm-orange-500" />
              Quiero comprar
            </div>
            <h2 className="font-rubik font-bold text-white text-2xl md:text-3xl mb-3 leading-tight">
              Equipo nuevo<br />con respaldo oficial
            </h2>
            <p className="font-nunito text-oxford-400 text-sm leading-relaxed mb-6 max-w-xs">
              Tractores Kubota Serie B, L y M. Vehículos Polaris RZR, Ranger y Sportsman. Distribuidores autorizados — garantía de fábrica, servicio técnico y financiamiento disponible.
            </p>
            <div className="mt-auto">
              <a
                href="https://kdmtecnologias.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-kdm-orange-500 hover:bg-kdm-orange-600 active:scale-[0.98] text-white font-rubik font-semibold rounded-lg transition-all text-sm"
              >
                Ver tractores Kubota <ArrowSquareOut size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Camino 2 — Consignar / Vender */}
        <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-oxford-800 group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-300">
            <Image
              src="https://images.pexels.com/photos/37314899/pexels-photo-37314899.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Tractor seminuevo"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-oxford-800 via-oxford-800/70 to-transparent" />
          </div>
          <div className="relative z-10 p-8 flex flex-col h-full min-h-[300px]">
            <div className="inline-flex items-center gap-2 text-xs font-nunito font-semibold text-oxford-400 uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-oxford-400" />
              Quiero vender o consignar
            </div>
            <h2 className="font-rubik font-bold text-white text-2xl md:text-3xl mb-3 leading-tight">
              Tu tractor viejo<br />como enganche
            </h2>
            <p className="font-nunito text-oxford-400 text-sm leading-relaxed mb-4 max-w-xs">
              Consigna tu equipo con KDM. Nosotros lo vendemos por ti — el capital que obtengas se aplica directamente como enganche para tu próximo tractor nuevo.
            </p>
            {/* Proceso en 3 pasos */}
            <ol className="space-y-2 mb-6">
              {[
                'Nos dejas tu equipo a consignación',
                'KDM lo vende con respaldo técnico',
                'El capital se abona a tu tractor nuevo',
              ].map((paso, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs font-nunito text-oxford-200">
                  <span className="shrink-0 w-4 h-4 rounded-full bg-white/10 text-oxford-400 text-[10px] font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  {paso}
                </li>
              ))}
            </ol>
            <div className="mt-auto">
              <a
                href="#consignar"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 hover:bg-white/6 text-white font-rubik font-semibold rounded-lg transition-all text-sm active:scale-[0.98]"
              >
                Consignar mi equipo <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
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
    <section id="como-funciona" className="py-20 px-6 bg-oxford-100">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-10">
          <h2 className="font-rubik font-bold text-3xl text-oxford-950 mb-2">Así de fácil</h2>
          <p className="text-oxford-600 font-nunito text-base max-w-sm">
            Desde que nos contactas hasta que tu equipo encuentra nuevo dueño.
          </p>
        </FadeIn>

        <FadeIn delay={0.05} className="relative rounded-2xl overflow-hidden mb-14 aspect-[21/9] md:aspect-[3/1]">
          <Image
            src="https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Técnico KDM revisando un tractor en el taller"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-oxford-950/50 via-transparent to-transparent" />
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {pasos.map((paso, i) => (
            <FadeIn key={paso.titulo} delay={i * 0.1}>
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-kdm-orange-500/10 flex items-center justify-center shrink-0 border border-kdm-orange-500/20">
                    <paso.Icon size={24} weight="duotone" className="text-kdm-orange-500" />
                  </div>
                  <span className="font-rubik font-bold text-3xl text-oxford-950/10 leading-none select-none">0{i + 1}</span>
                </div>
                <h3 className="font-rubik font-bold text-oxford-950 text-lg mb-2">{paso.titulo}</h3>
                <p className="font-nunito text-oxford-600 text-sm leading-relaxed max-w-[260px]">{paso.desc}</p>
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
  Excelente: 'bg-kdm-orange-500 text-white',
  'Muy buena': 'bg-oxford-950/85 text-white',
  Buena: 'bg-oxford-950/85 text-white',
  Regular: 'bg-oxford-950/85 text-white',
}

function Inventario() {
  const [filtro, setFiltro] = useState<FiltroTipo>('Todo')
  const [equipos, setEquipos] = useState<Equipo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/equipos')
      .then(r => r.json())
      .then(data => { setEquipos(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const equiposFiltrados = filtro === 'Todo'
    ? equipos
    : equipos.filter(e => filtro === 'Tractores' ? e.tipo === 'Tractor' : e.tipo === 'Offroad')

  const filtros: { key: FiltroTipo; label: string }[] = [
    { key: 'Todo', label: 'Todo' },
    { key: 'Tractores', label: 'Tractores' },
    { key: 'Offroad', label: 'Vehículos offroad' },
  ]

  return (
    <section id="inventario" className="py-20 px-6 bg-oxford-100">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <h2 className="font-rubik font-bold text-3xl text-oxford-950 mb-1">Equipo disponible</h2>
            <p className="font-nunito text-oxford-600 text-sm">Maquinaria verificada por técnicos KDM</p>
          </div>
          <div className="flex gap-2">
            {filtros.map(f => (
              <button
                key={f.key}
                onClick={() => setFiltro(f.key)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                  filtro === f.key
                    ? 'bg-kdm-orange-500 text-white border-kdm-orange-500'
                    : 'bg-white text-oxford-600 border-oxford-200 hover:border-oxford-400/50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-white border border-oxford-100 overflow-hidden animate-pulse">
                <div className="aspect-video bg-oxford-100" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-oxford-100 rounded w-3/4" />
                  <div className="h-3 bg-oxford-100 rounded w-1/2" />
                  <div className="h-8 bg-oxford-100 rounded mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {equiposFiltrados.map((equipo, i) => {
              const waMsg = encodeURIComponent(`Hola, me interesa el ${equipo.nombre} ${equipo.ano}. ¿Sigue disponible?`)
              return (
                <FadeIn key={equipo.id} delay={i * 0.06}>
                  <div className="bg-white rounded-2xl border border-oxford-100 overflow-hidden hover:border-kdm-orange-500/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-oxford-950/5 transition-all duration-200 flex flex-col h-full">
                    <Link href={`/equipo/${equipo.id}`} className="relative block aspect-video overflow-hidden bg-oxford-100">
                      {equipo.imagen_principal ? (
                        <Image
                          src={equipo.imagen_principal}
                          alt={equipo.nombre}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-oxford-400">
                          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                      )}
                      <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${condicionColor[equipo.condicion]}`}>
                        {equipo.condicion}
                      </span>
                      {equipo.verificado_kdm && (
                        <span className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full bg-kdm-orange-500/90 text-white">
                          ✓ KDM
                        </span>
                      )}
                    </Link>

                    <div className="p-5 flex flex-col flex-1">
                      <Link href={`/equipo/${equipo.id}`} className="group">
                        <h3 className="font-rubik font-semibold text-oxford-950 text-base group-hover:text-kdm-orange-600 transition-colors">
                          {equipo.nombre}
                        </h3>
                      </Link>
                      <div className="flex gap-3 mt-1.5 text-xs text-oxford-600 font-nunito">
                        <span>Año {equipo.ano}</span>
                        <span>·</span>
                        <span>{equipo.horas.toLocaleString('es-MX')} hrs</span>
                        {equipo.specs?.hp && (
                          <>
                            <span>·</span>
                            <span>{equipo.specs.hp} HP</span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-oxford-100">
                        <span className="font-rubik font-bold text-kdm-orange-600 text-lg">
                          ${Number(equipo.precio).toLocaleString('es-MX')} <span className="text-xs font-normal text-oxford-600">MXN</span>
                        </span>
                        <div className="flex gap-2">
                          <Link
                            href={`/equipo/${equipo.id}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg border border-kdm-orange-500/40 text-kdm-orange-700 hover:bg-kdm-orange-500/10 hover:border-kdm-orange-500 transition-colors"
                          >
                            Ver ficha
                          </Link>
                          <a
                            href={`https://wa.me/527551019938?text=${waMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 active:scale-[0.97] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all"
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
        )}
      </div>
    </section>
  )
}

// ─── Trust section ────────────────────────────────────────────────────────────

function TrustSection() {
  const cards = [
    { Icon: Wrench, titulo: 'Inspección técnica', desc: 'Cada unidad es revisada por nuestros técnicos antes de publicarse. Sin sorpresas mecánicas.' },
    { Icon: Scroll, titulo: 'Procedencia garantizada', desc: 'Conoces el historial del equipo. Sin intermediarios anónimos ni riesgos de Marketplace.' },
    { Icon: ShieldCheck, titulo: 'Respaldo de distribuidor', desc: 'Somos distribuidores autorizados Kubota y Polaris. Tu compra tiene respaldo de marca.' },
    { Icon: Bank, titulo: 'Financiamiento disponible', desc: 'Pregunta por nuestras opciones de crédito para facilitar tu próxima compra.' },
  ]

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <FadeIn className="mb-8">
            <h2 className="font-rubik font-bold text-3xl text-oxford-950 mb-2">¿Por qué comprar seminuevo con KDM?</h2>
            <p className="text-oxford-600 font-nunito text-base max-w-sm">Distribuidores autorizados. Revisión técnica. Sin riesgo.</p>
          </FadeIn>
          <div className="grid grid-cols-1 gap-4">
            {cards.map((c, i) => (
              <FadeIn key={c.titulo} delay={i * 0.08}>
                <div className="flex gap-5 p-5 rounded-2xl border border-oxford-100 hover:border-kdm-orange-500/30 hover:bg-oxford-100/50 transition-all bg-white">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-kdm-orange-500/10 border border-kdm-orange-500/20 flex items-center justify-center">
                    <c.Icon size={20} weight="duotone" className="text-kdm-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-rubik font-bold text-oxford-950 text-base mb-1">{c.titulo}</h3>
                    <p className="font-nunito text-oxford-600 text-sm leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        <FadeIn delay={0.1} className="relative rounded-2xl overflow-hidden aspect-[4/5] md:aspect-square">
          <Image
            src="https://images.pexels.com/photos/35510874/pexels-photo-35510874.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Tractor Kubota verificado por KDM"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Marcas section ───────────────────────────────────────────────────────────

function MarcasSection() {
  return (
    <section className="py-20 px-6 bg-oxford-950">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-12">
          <h2 className="font-rubik font-bold text-3xl text-white mb-2">También trabajamos con equipo nuevo</h2>
          <p className="font-nunito text-oxford-400 text-base max-w-md">
            Si buscas tu próximo tractor o vehículo nuevo, visita nuestras páginas oficiales
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          <FadeIn delay={0.05}>
            <div className="rounded-2xl border border-white/8 bg-oxford-800 p-8 hover:border-kdm-orange-500/30 transition-colors h-full">
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 bg-kdm-orange-500/10 text-kdm-orange-400 border border-kdm-orange-500/20">
                Distribuidor autorizado Kubota
              </div>
              <h3 className="font-rubik font-bold text-white text-2xl mb-1">KDM Tecnologías</h3>
              <p className="font-nunito text-oxford-400 text-sm mb-5">Morelia, Michoacán</p>
              <ul className="space-y-2 mb-7">
                {['Tractores Serie B, L y M', 'Implementos agrícolas', 'Servicio técnico certificado'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm font-nunito text-oxford-200">
                    <span className="text-kdm-orange-500">✓</span> {item}
                  </li>
                ))}
              </ul>
              <a href="https://kdmtecnologias.com/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-rubik font-semibold text-sm px-5 py-2.5 rounded-lg text-white bg-kdm-orange-500 hover:bg-kdm-orange-600 transition-colors">
                Ver tractores Kubota <ArrowSquareOut size={14} />
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-white/8 bg-oxford-800 p-8 hover:border-white/20 transition-colors h-full">
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 bg-white/6 text-oxford-200 border border-white/10">
                Distribuidor autorizado Polaris
              </div>
              <h3 className="font-rubik font-bold text-white text-2xl mb-1">Polaris Morelia</h3>
              <p className="font-nunito text-oxford-400 text-sm mb-5">Distribuidor autorizado · Michoacán</p>
              <ul className="space-y-2 mb-7">
                {['RZR · Ranger · Sportsman', 'Financiamiento disponible'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm font-nunito text-oxford-200">
                    <span className="text-oxford-400">✓</span> {item}
                  </li>
                ))}
              </ul>
              <a href="https://www.polarismorelia.com/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-rubik font-semibold text-sm px-5 py-2.5 rounded-lg text-white bg-oxford-700 hover:bg-oxford-600 border border-white/10 transition-colors">
                Ver vehículos Polaris <ArrowSquareOut size={14} />
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
  const [sending, setSending] = useState(false)

  const [form, setForm] = useState({
    tractorInteres: '', tipoEquipo: '', marcaModelo: '',
    año: '', horas: '', condicion: '', precioEsperado: '',
    nombre: '', telefono: '', mensaje: '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    try {
      await fetch('/api/consignaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          telefono: form.telefono,
          tractor_interes: form.tractorInteres,
          tiene_equipo: tieneEquipo === 'si',
          tipo_equipo: form.tipoEquipo || null,
          marca_modelo: form.marcaModelo || null,
          ano_equipo: form.año ? Number(form.año) : null,
          horas_equipo: form.horas ? Number(form.horas) : null,
          condicion_equipo: form.condicion || null,
          precio_esperado: form.precioEsperado ? Number(form.precioEsperado) : null,
          mensaje: form.mensaje || null,
        }),
      })
      setSent(true)
    } catch {
      setSent(true)
    } finally {
      setSending(false)
    }
  }

  const inputClass = 'w-full border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white bg-oxford-700 focus:outline-none focus:ring-2 focus:ring-kdm-orange-500 placeholder-oxford-400'

  return (
    <section id="consignar" className="py-20 px-6 bg-oxford-800">
      <div className="max-w-2xl mx-auto">
        <FadeIn className="text-center mb-10">
          <h2 className="font-rubik font-bold text-3xl text-white mb-3">Consigna tu equipo</h2>
          <p className="font-nunito text-oxford-400 text-base">
            Dinos qué tienes y qué buscas — te contactamos en menos de 24 horas
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-oxford-900 rounded-2xl p-8 border border-white/8">
            {sent ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 bg-kdm-orange-500/15 rounded-full flex items-center justify-center mx-auto mb-4 border border-kdm-orange-500/30">
                  <svg className="w-7 h-7 text-kdm-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-rubik font-bold text-white text-xl mb-2">Recibido</p>
                <p className="font-nunito text-oxford-400 text-sm">Te contactamos en menos de 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-oxford-200 mb-1.5">¿Cuál tractor nuevo te interesa comprar?</label>
                  <select required value={form.tractorInteres} onChange={e => setForm({ ...form, tractorInteres: e.target.value })} className={inputClass}>
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
                  <label className="block text-xs font-semibold text-oxford-200 mb-2">¿Tienes equipo que quieras consignar?</label>
                  <div className="flex gap-3">
                    {(['si', 'no'] as const).map(val => (
                      <label key={val} className={`flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                        tieneEquipo === val
                          ? 'bg-kdm-orange-500 text-white border-kdm-orange-500'
                          : 'bg-oxford-700 text-oxford-200 border-white/10 hover:border-white/25'
                      }`}>
                        <input type="radio" name="tieneEquipo" value={val} checked={tieneEquipo === val} onChange={() => setTieneEquipo(val)} className="sr-only" />
                        {val === 'si' ? 'Sí' : 'No'}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: tieneEquipo === 'si' ? '600px' : '0px', opacity: tieneEquipo === 'si' ? 1 : 0 }}>
                  <div className="space-y-4 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-oxford-200 mb-1.5">Tipo de equipo</label>
                      <select value={form.tipoEquipo} onChange={e => setForm({ ...form, tipoEquipo: e.target.value })} className={inputClass}>
                        <option value="">Selecciona...</option>
                        <option>Tractor agrícola</option>
                        <option>Vehículo offroad</option>
                        <option>Implemento</option>
                        <option>Otro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-oxford-200 mb-1.5">Marca y modelo</label>
                      <input type="text" placeholder="Ej: Kubota L3560" value={form.marcaModelo} onChange={e => setForm({ ...form, marcaModelo: e.target.value })} className={inputClass} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-oxford-200 mb-1.5">Año</label>
                        <input type="number" placeholder="2018" min={1990} max={2026} value={form.año} onChange={e => setForm({ ...form, año: e.target.value })} className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-oxford-200 mb-1.5">Horas de uso aprox.</label>
                        <input type="number" placeholder="1200" min={0} value={form.horas} onChange={e => setForm({ ...form, horas: e.target.value })} className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-oxford-200 mb-1.5">Condición</label>
                      <select value={form.condicion} onChange={e => setForm({ ...form, condicion: e.target.value })} className={inputClass}>
                        <option value="">Selecciona...</option>
                        <option>Excelente</option>
                        <option>Buena</option>
                        <option>Regular</option>
                        <option>Necesita servicio</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-oxford-200 mb-1.5">Precio esperado MXN</label>
                      <input type="number" placeholder="250000" min={0} value={form.precioEsperado} onChange={e => setForm({ ...form, precioEsperado: e.target.value })} className={inputClass} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-oxford-200 mb-1.5">Tu nombre</label>
                  <input required type="text" placeholder="Nombre completo" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-oxford-200 mb-1.5">Teléfono</label>
                  <input required type="tel" placeholder="443 000 0000" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-oxford-200 mb-1.5">¿Algo más que quieras decirnos? <span className="font-normal text-oxford-400">(opcional)</span></label>
                  <textarea rows={3} placeholder="Cuéntanos más sobre lo que necesitas..." value={form.mensaje} onChange={e => setForm({ ...form, mensaje: e.target.value })} className={`${inputClass} resize-none`} />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-kdm-orange-500 hover:bg-kdm-orange-600 disabled:opacity-60 active:scale-[0.99] text-white font-rubik font-semibold py-3.5 rounded-lg transition-all text-sm"
                >
                  {sending ? 'Enviando...' : 'Enviar — te contactamos pronto'}
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
    { texto: 'Vendí mi Kubota L3560 en 3 semanas. El proceso fue fácil y el precio fue justo. Ya estoy usando mi M5111 nuevo.', nombre: 'Ing. Roberto V.', ciudad: 'Zamora, Mich.' },
    { texto: 'Tenía miedo de vender en Facebook por los fraudes. Con KDM todo fue transparente y rápido.', nombre: 'Don Aurelio G.', ciudad: 'Uruapan, Mich.' },
    { texto: 'Me ayudaron a conseguir financiamiento para el tractor nuevo mientras vendían el mío. No esperaba eso.', nombre: 'Fam. Estrada', ciudad: 'Los Reyes, Mich.' },
  ]

  return (
    <section className="py-20 px-6 bg-oxford-900">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-12">
          <h2 className="font-rubik font-bold text-3xl text-white mb-2">Lo que dicen nuestros clientes</h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonios.map((t, i) => (
            <FadeIn key={t.nombre} delay={i * 0.08}>
              <div className="flex flex-col h-full p-7 rounded-2xl border border-white/8 bg-oxford-800 hover:border-white/15 transition-colors">
                <svg className="w-6 h-6 text-kdm-orange-500/30 mb-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="font-nunito text-oxford-200 text-sm leading-relaxed flex-1 mb-5">{t.texto}</p>
                <div className="border-t border-white/6 pt-4">
                  <p className="font-rubik font-semibold text-white text-sm">{t.nombre}</p>
                  <p className="font-nunito text-oxford-400 text-xs mt-0.5">{t.ciudad}</p>
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
    <footer className="bg-oxford-950 border-t border-white/6 px-6 py-14">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <p className="font-rubik font-bold text-white text-xl mb-1">
              KDM<span className="text-kdm-orange-500">.</span> Seminuevos
            </p>
            <p className="font-nunito text-oxford-400 text-sm mt-1">Morelia, Michoacán</p>
            <div className="mt-4 space-y-1.5 text-sm font-nunito text-oxford-400">
              <p>WhatsApp: +52 (443) 000-0000</p>
              <p>ventas@kdmseminuevos.com</p>
            </div>
          </div>
          <div>
            <p className="font-rubik font-semibold text-oxford-400 text-xs uppercase tracking-wider mb-4">Navegación</p>
            <div className="space-y-2 font-nunito text-sm text-oxford-400">
              <a href="#inventario" className="block hover:text-oxford-200 transition-colors">Inventario</a>
              <a href="#como-funciona" className="block hover:text-oxford-200 transition-colors">Cómo funciona</a>
              <a href="#consignar" className="block hover:text-oxford-200 transition-colors">Consignar</a>
            </div>
          </div>
          <div>
            <p className="font-rubik font-semibold text-oxford-400 text-xs uppercase tracking-wider mb-4">Nuestros portales</p>
            <div className="space-y-2 font-nunito text-sm text-oxford-400">
              <a href="https://kdmtecnologias.com/" target="_blank" rel="noopener noreferrer" className="block hover:text-oxford-200 transition-colors">KDM Tecnologías ↗</a>
              <a href="https://www.polarismorelia.com/" target="_blank" rel="noopener noreferrer" className="block hover:text-oxford-200 transition-colors">Polaris Morelia ↗</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/6 pt-6">
          <p className="font-nunito text-oxford-400 text-xs text-center">© 2026 KDM Seminuevos · Morelia, Michoacán</p>
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
      <DualPathHero />
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
