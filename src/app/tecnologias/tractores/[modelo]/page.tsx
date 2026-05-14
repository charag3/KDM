// Ficha individual de tractor — /tecnologias/tractores/[modelo]
// Ej: /tecnologias/tractores/l4701
//
// Secciones planificadas:
//   1. Hero — imagen grande + nombre + specs clave en sidebar
//   2. Descripción completa (tabs: Overview / Especificaciones / Implementos compatibles)
//   3. Galería de imágenes (placeholder)
//   4. CTA sticky sidebar: Cotizar por WhatsApp + Llamar + Descargar ficha PDF
//   5. Tractores relacionados (misma serie)
//
// generateStaticParams() para prerenderizar todas las fichas en build

import { tractores } from '@/lib/data/tractores'
import { notFound } from 'next/navigation'

// Prerenderiza rutas estáticas para todos los modelos
export function generateStaticParams() {
  return tractores.map((t) => ({ modelo: t.id }))
}

type Props = {
  params: Promise<{ modelo: string }>
}

export default async function TractorDetallePage({ params }: Props) {
  const { modelo } = await params
  const tractor = tractores.find((t) => t.id === modelo)

  if (!tractor) notFound()

  const whatsappMsg = encodeURIComponent(
    `Hola, me interesa el ${tractor.nombre}. ¿Podrían enviarme información y cotización?`
  )

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 font-nunito mb-6">
        <a href="/tecnologias" className="hover:text-agro-green transition-colors duration-300">KDM Tecnologías</a>
        <span className="mx-2">/</span>
        <a href="/tecnologias/tractores" className="hover:text-agro-green transition-colors duration-300">Tractores</a>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{tractor.nombre}</span>
      </nav>

      {/* Layout: contenido + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Columna principal */}
        <div className="lg:col-span-2">
          {/* Imagen placeholder */}
          <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center mb-8">
            {/* TODO: <Image src={tractor.imagenUrl} fill objectFit="contain" alt={tractor.nombre} /> */}
            <div className="text-center text-gray-400">
              <div className="text-6xl mb-3">🚜</div>
              <span className="text-sm">Imagen: {tractor.nombre}</span>
            </div>
          </div>

          {/* Nombre + badge */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-semibold bg-agro-green/10 text-agro-green px-2 py-1 rounded">
              Serie {tractor.serie}
            </span>
            <span className="text-xs text-gray-400 font-nunito">{tractor.traccion} · {tractor.transmision}</span>
          </div>
          <h1 className="font-rubik font-bold text-4xl text-gray-900 mb-4">{tractor.nombre}</h1>
          <p className="text-gray-600 font-nunito text-lg leading-relaxed mb-8">{tractor.descripcion}</p>

          {/* Specs básicas */}
          {/*
            TODO: tabla de specs completa — agregar campos al tipo Tractor:
            - cilindros, cilindrada, toma de fuerza RPM, levante trasero (kg),
              peso operativo, dimensiones, capacidad tanque
          */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Potencia', valor: `${tractor.hp} HP` },
              { label: 'Tracción', valor: tractor.traccion },
              { label: 'Transmisión', valor: tractor.transmision },
            ].map((spec) => (
              <div key={spec.label} className="bg-gray-50 rounded-lg p-4">
                <span className="block text-xs text-gray-400 font-nunito uppercase tracking-wide mb-1">{spec.label}</span>
                <span className="block font-rubik font-bold text-gray-900 text-xl">{spec.valor}</span>
              </div>
            ))}
          </div>

          {/* ROI callout */}
          <div className="bg-agro-green/5 border border-agro-green/20 rounded-lg p-6 mb-8">
            <p className="text-xs font-nunito uppercase tracking-widest text-agro-green font-semibold mb-2">
              ¿Cuánto ahorra este tractor?
            </p>
            <p className="text-gray-700 font-nunito leading-relaxed">
              Con <span className="font-semibold text-gray-900">{tractor.nombre}</span> puedes reducir hasta 60% el tiempo de labranza vs. trabajo manual — recupera la inversión en una temporada.
            </p>
          </div>

          {/* Usos recomendados */}
          <div className="mb-8">
            <h3 className="font-rubik font-semibold text-gray-900 text-lg mb-3">Usos recomendados</h3>
            <div className="flex flex-wrap gap-2">
              {tractor.usos.map((uso) => (
                <span key={uso} className="bg-agro-green/10 text-agro-green text-sm px-3 py-1.5 rounded-lg">
                  {uso}
                </span>
              ))}
            </div>
          </div>

          {/* TODO: sección "Implementos compatibles" con cards de implementos */}
          <div className="bg-gray-50 rounded-lg p-6 text-gray-400 text-sm font-nunito text-center">
            Sección "Implementos compatibles" — construir en siguiente sesión
          </div>
        </div>

        {/* Sidebar — CTAs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="font-rubik font-bold text-gray-900 text-xl mb-1">{tractor.nombre}</h3>
            <p className="text-gray-400 font-nunito text-sm mb-6">Consulta precio y disponibilidad</p>

            {/* CTA WhatsApp */}
            <a
              href={`https://wa.me/521XXXXXXXXXX?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-agro-green text-white font-rubik font-semibold py-3 rounded-lg mb-3 transition-all duration-300 hover:bg-agro-green-dark"
            >
              Cotizar por WhatsApp
            </a>

            {/* CTA Llamar */}
            <a
              href="tel:4433031141"
              className="block w-full text-center border border-agro-green text-agro-green font-nunito font-medium py-3 rounded-lg mb-3 transition-all duration-300 hover:bg-agro-green hover:text-white"
            >
              44 33 03 11 41
            </a>

            {/* TODO: botón descargar ficha PDF */}
            <button
              disabled
              className="block w-full text-center border border-gray-200 text-gray-400 font-nunito text-sm py-3 rounded-lg cursor-not-allowed"
            >
              Descargar ficha técnica (próximo)
            </button>

            {/* Info adicional */}
            <div className="mt-6 pt-6 border-t border-gray-100 text-xs text-gray-400 font-nunito space-y-2">
              <p>Carretera Morelia-Pátzcuaro Km 13</p>
              <p>Uruapilla, Mich. CP 58342</p>
              <p>Lun-Vie 9:00-18:00 · Sáb 9:00-14:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
