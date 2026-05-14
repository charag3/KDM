'use client'

// Split screen router — Landing principal de KDM
//
// Sin nav. Sin footer de contenido.
// Izquierda: fondo verde oscuro + imagen tractor + "KDM Tecnologías" → /tecnologias
// Derecha:   fondo negro + imagen RZR + "KDM Offroad" → /offroad
//
// Interacción:
//   - Hover en un lado: ese panel crece a 60%, el otro baja a 40%
//   - Mobile: apilado vertical, cada mitad 50vh
//
// TODO: agregar imágenes reales de tractor y RZR (next/image con fill)
// TODO: considerar video de fondo en lugar de imagen estática para el lado offroad

import { useState } from 'react'
import Link from 'next/link'

type Side = 'agro' | 'offroad' | null

export default function SplitRouter() {
  const [hovered, setHovered] = useState<Side>(null)

  const agroWidth =
    hovered === 'agro' ? 'md:w-[60%]' : hovered === 'offroad' ? 'md:w-[40%]' : 'md:w-1/2'
  const offroadWidth =
    hovered === 'offroad' ? 'md:w-[60%]' : hovered === 'agro' ? 'md:w-[40%]' : 'md:w-1/2'

  return (
    <main className="flex flex-col md:flex-row min-h-screen w-full">
      {/* === Lado Agrícola === */}
      <Link
        href="/tecnologias"
        className={`
          relative flex-shrink-0
          h-[50vh] md:h-screen w-full ${agroWidth}
          flex flex-col items-center justify-center
          bg-agro-green-dark
          transition-all duration-500 ease-in-out
          overflow-hidden group cursor-pointer
        `}
        onMouseEnter={() => setHovered('agro')}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

        {/* Imagen placeholder — reemplazar con <Image fill objectFit="cover" /> */}
        {/* TODO: /images/hero/tractor-field.jpg */}
        <div className="absolute inset-0 bg-agro-green-dark flex items-center justify-center">
          <span className="text-8xl opacity-10">🚜</span>
        </div>

        {/* Contenido */}
        <div className="relative z-20 text-center px-8">
          {/* Logo placeholder */}
          <div className="mb-4 inline-block border-2 border-white/30 px-4 py-2 rounded">
            <span className="text-white/70 text-xs font-nunito uppercase tracking-widest">Distribuidor Kubota</span>
          </div>

          <h1 className="font-rubik font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-3">
            KDM<br />
            <span className="text-agro-orange">Tecnologías</span>
          </h1>

          <p className="text-white/70 font-nunito text-base md:text-lg mb-8 max-w-xs mx-auto">
            Maquinaria Kubota · Michoacán
          </p>

          <span className="inline-block border border-agro-orange text-agro-orange font-rubik font-semibold text-sm px-6 py-3 rounded-lg transition-all duration-300 group-hover:bg-agro-orange group-hover:text-white">
            Explorar tractores
          </span>
        </div>

        {/* Indicador de flecha */}
        <div className="absolute bottom-8 z-20 text-white/40 text-xs font-nunito uppercase tracking-widest">
          Agricultor / Ganadero
        </div>
      </Link>

      {/* Divisor vertical — solo visible en desktop */}
      <div className="hidden md:block w-px bg-white/10 flex-shrink-0 z-30" />

      {/* === Lado Offroad === */}
      <Link
        href="/offroad"
        className={`
          relative flex-shrink-0
          h-[50vh] md:h-screen w-full ${offroadWidth}
          flex flex-col items-center justify-center
          bg-off-black
          transition-all duration-500 ease-in-out
          overflow-hidden group cursor-pointer
        `}
        onMouseEnter={() => setHovered('offroad')}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />

        {/* Acento de color en hover */}
        <div className="absolute inset-0 bg-off-orange/0 group-hover:bg-off-orange/5 transition-all duration-500 z-10" />

        {/* Imagen placeholder */}
        {/* TODO: /images/hero/rzr-action.jpg */}
        <div className="absolute inset-0 bg-off-dark flex items-center justify-center">
          <span className="text-8xl opacity-10">🏎</span>
        </div>

        {/* Contenido */}
        <div className="relative z-20 text-center px-8">
          <div className="mb-4 inline-block border-2 border-white/20 px-4 py-2 rounded">
            <span className="text-white/50 text-xs font-grotesk uppercase tracking-widest">Distribuidor Polaris</span>
          </div>

          <h1 className="font-grotesk font-bold text-white text-4xl md:text-5xl lg:text-6xl uppercase leading-tight mb-3">
            KDM<br />
            <span className="text-off-orange">Offroad</span>
          </h1>

          <p className="text-white/60 font-grotesk text-base md:text-lg mb-8 max-w-xs mx-auto">
            Polaris · Adrenalina · Morelia
          </p>

          <span className="inline-block border border-off-orange text-off-orange font-grotesk font-bold text-sm px-6 py-3 rounded-lg uppercase tracking-widest transition-all duration-300 group-hover:bg-off-orange group-hover:text-white">
            Ver vehículos
          </span>
        </div>

        <div className="absolute bottom-8 z-20 text-white/30 text-xs font-grotesk uppercase tracking-widest">
          Aventurero / Deportivo
        </div>
      </Link>
    </main>
  )
}
