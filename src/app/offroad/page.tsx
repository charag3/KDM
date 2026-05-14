// Home KDM Offroad — /offroad
//
// Secciones planificadas:
//   1. Hero — fullscreen, fondo oscuro + video/imagen RZR, headline agresivo
//   2. Líneas disponibles — RZR / Ranger / Sportsman / Xpedition (cards horizontales)
//   3. Featured: RZR Pro R — specs clave + CTA grande
//   4. Financiamiento — mensaje corto + CTA
//   5. Galería / lifestyle photos (grid asimétrico)
//
// TODO en siguiente sesión:
//   - Agregar VehicleCard para cada línea
//   - Considerar video de fondo en hero (muted autoplay loop)
//   - Galería con lightbox

import VehicleCard from '@/components/offroad/VehicleCard'
import { vehiculosPolaris } from '@/lib/data/polaris'

export default function OffroadHome() {
  return (
    <div>
      {/* ===== HERO ===== */}
      {/*
        TODO: video/imagen fullscreen de RZR en acción
        - Video: muted autoplay loop — archivo local o CDN
        - Overlay: gradiente negro
        - Headline en mayúsculas agresivo
      */}
      <section className="bg-off-black text-white min-h-screen flex items-center justify-center relative overflow-hidden px-6">
        {/* Detalles decorativos */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-off-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-off-orange/10 rounded-full blur-3xl" />

        {/* Línea diagonal decorativa */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-1/3 bottom-0 w-px bg-white transform -skew-x-12" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <span className="inline-block text-xs font-grotesk text-off-orange uppercase tracking-widest border border-off-orange/40 px-4 py-1.5 rounded mb-8">
            Distribuidor Polaris — Morelia, Michoacán
          </span>

          <h1 className="font-grotesk font-bold text-6xl md:text-8xl uppercase leading-none mb-6">
            La adrenalina<br />
            <span className="text-off-orange">empieza aquí</span>
          </h1>

          <p className="text-white/60 font-grotesk text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">
            Distribuidor oficial Polaris en Morelia. RZR, Ranger, Sportsman — en tu ciudad, con soporte real.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/offroad/rzr"
              className="bg-off-orange text-white font-grotesk font-bold px-8 py-4 rounded-lg text-sm uppercase tracking-widest transition-all duration-300 hover:bg-orange-600 hover:scale-105"
            >
              Ver modelos Polaris
            </a>
            <a
              href="https://wa.me/521XXXXXXXXXX?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20Polaris"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 text-white font-grotesk font-medium px-8 py-4 rounded-lg text-sm uppercase tracking-widest transition-all duration-300 hover:border-off-orange hover:text-off-orange"
            >
              Cotizar ahora
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs font-grotesk uppercase tracking-widest animate-bounce">
          Scroll
        </div>
      </section>

      {/* ===== LÍNEAS POLARIS ===== */}
      <section className="bg-off-dark py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-xs text-off-orange font-grotesk uppercase tracking-widest block mb-3">Catálogo 2025</span>
            <h2 className="font-grotesk font-bold text-white text-4xl uppercase">
              Elige tu línea
            </h2>
          </div>

          {/* Grid de vehículos */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {vehiculosPolaris.map((vehiculo) => (
              <VehicleCard key={vehiculo.id} vehiculo={vehiculo} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINANCIAMIENTO ===== */}
      {/*
        TODO: en siguiente sesión, agregar calculadora de mensualidades estimadas
        - Precio del vehículo → plazo → mensualidad estimada
        - Disclaimer: "sujeto a aprobación crediticia"
      */}
      <section className="bg-off-black py-16 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-grotesk font-bold text-white text-3xl uppercase mb-3">
              Financia tu <span className="text-off-orange">Polaris</span>
            </h3>
            <p className="text-white/50 font-grotesk font-light max-w-md">
              Opciones de crédito a plazos disponibles. Sin anualidad. Respuesta rápida.
              Pregunta por nuestros planes de financiamiento.
            </p>
          </div>
          <a
            href="https://wa.me/521XXXXXXXXXX?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20financiamiento%20Polaris"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 border border-off-orange text-off-orange font-grotesk font-bold px-8 py-4 rounded-lg uppercase tracking-widest text-sm transition-all duration-300 hover:bg-off-orange hover:text-white"
          >
            Consultar financiamiento
          </a>
        </div>
      </section>
    </div>
  )
}
