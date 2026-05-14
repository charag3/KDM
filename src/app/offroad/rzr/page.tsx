// Página RZR — /offroad/rzr
// Hero fullscreen del RZR Pro R + specs detalladas + comparativa de modelos RZR
//
// Secciones:
//   1. RZRHero — hero fullscreen con specs clave (componente)
//   2. Specs expandidas — tabla de especificaciones
//   3. Comparativa RZR Pro R vs XP 1000 (cards lado a lado)
//   4. Galería de imágenes / videos (placeholder)
//   5. CTA final — cotizar / agendar prueba de manejo
//
// TODO: agregar tabs para comparar modelos de la línea RZR
// TODO: galería con lightbox

import RZRHero from '@/components/offroad/RZRHero'
import VehicleCard from '@/components/offroad/VehicleCard'
import { vehiculosPolaris } from '@/lib/data/polaris'

export default function RZRPage() {
  const rzrModelos = vehiculosPolaris.filter((v) => v.linea === 'RZR')
  const rzrProR = rzrModelos.find((v) => v.id === 'rzr-pro-r')

  return (
    <div>
      {/* ===== Hero ===== */}
      <RZRHero
        nombre={rzrProR?.nombre ?? 'RZR Pro R'}
        tagline={rzrProR?.tagline ?? 'Líder mundial en adrenalina todo terreno'}
        hp={rzrProR?.hp ?? 225}
        precio={rzrProR?.precioMXN ?? 750000}
      />

      {/* ===== Specs completas ===== */}
      {/*
        TODO: tabla de specs reales del RZR Pro R
        - Motor: ProStar R 4-cyl
        - Desplazamiento: 999cc
        - Suspensión delantera: Fox Live Valve 2.5 Podium RC2
        - Recorrido delantero: 18"
        - Recorrido trasero: 14"
        - Frenos: hidráulicos en las 4 ruedas
        - Dimensiones: largo/ancho/alto
        - Capacidad de combustible
      */}
      <section id="specs" className="bg-off-dark py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-grotesk font-bold text-white text-3xl uppercase mb-10">
            Especificaciones
          </h2>

          {/* Tabla placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-lg overflow-hidden">
            {[
              { label: 'Motor', valor: 'ProStar R 4 cilindros' },
              { label: 'Desplazamiento', valor: '999cc' },
              { label: 'Potencia', valor: '225 HP' },
              { label: 'Transmisión', valor: 'PVT Hi/Lo/Reversa' },
              { label: 'Suspensión delantera', valor: 'Fox Live Valve 2.5 Podium RC2' },
              { label: 'Suspensión trasera', valor: 'Fox Live Valve 2.5 Podium RC2' },
              { label: 'Recorrido delantero', valor: '18 pulgadas' },
              { label: 'Recorrido trasero', valor: '14 pulgadas' },
              { label: 'Ancho total', valor: '64 pulgadas' },
              { label: 'Capacidad combustible', valor: '9.5 galones' },
            ].map((spec) => (
              <div key={spec.label} className="bg-off-black px-6 py-4 flex justify-between items-center">
                <span className="text-gray-500 font-grotesk text-sm uppercase tracking-wide">{spec.label}</span>
                <span className="text-white font-grotesk font-medium">{spec.valor}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-600 font-grotesk mt-4 text-center">
            * Especificaciones del modelo 2025. Sujeto a cambios por el fabricante.
          </p>
        </div>
      </section>

      {/* ===== Modelos RZR disponibles ===== */}
      <section className="bg-off-black py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-grotesk font-bold text-white text-3xl uppercase mb-3">
            Línea RZR
          </h2>
          <p className="text-gray-500 font-grotesk mb-10 font-light">
            Elige el modelo que se adapta a tu nivel.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rzrModelos.map((v) => (
              <VehicleCard key={v.id} vehiculo={v} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA final ===== */}
      <section className="bg-off-orange py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-grotesk font-bold text-white text-4xl uppercase mb-4">
            ¿Listo para manejarlo?
          </h2>
          <p className="text-white/80 font-grotesk font-light text-lg mb-8">
            Agenda una prueba de manejo o solicita tu cotización directamente.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/521XXXXXXXXXX?text=Hola%2C%20quiero%20agendar%20una%20prueba%20de%20manejo%20del%20RZR"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-off-orange font-grotesk font-bold px-8 py-4 rounded-lg uppercase tracking-widest text-sm transition-all duration-300 hover:bg-gray-100"
            >
              Agendar prueba de manejo
            </a>
            <a
              href="https://wa.me/521XXXXXXXXXX?text=Hola%2C%20quiero%20cotizar%20el%20RZR%20Pro%20R"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white font-grotesk font-bold px-8 py-4 rounded-lg uppercase tracking-widest text-sm transition-all duration-300 hover:bg-white/10"
            >
              Cotizar ahora
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
