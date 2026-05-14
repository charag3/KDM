// TractorCard — Card de tractor en catálogo /tecnologias/tractores
// Muestra: imagen, nombre, serie, HP, tracción, usos (tags), CTA
//
// Props: tractor (tipo Tractor de lib/data/tractores.ts)
//
// Interacciones pendientes:
//   - Click en "Ver detalles" → /tecnologias/tractores/[modelo]
//   - Click en "Cotizar" → WhatsApp con mensaje pre-llenado con nombre del modelo

import type { Tractor } from '@/lib/data/tractores'

type TractorCardProps = {
  tractor: Tractor
}

export default function TractorCard({ tractor }: TractorCardProps) {
  // TODO: reemplazar con next/image cuando haya imágenes reales
  // TODO: reemplazar hrefs con next/link

  const whatsappMsg = encodeURIComponent(
    `Hola, me interesa el ${tractor.nombre}. ¿Podrían darme información y cotización?`
  )
  const whatsappHref = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '521XXXXXXXXXX'}?text=${whatsappMsg}`

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      {/* Imagen placeholder */}
      <div className="bg-gray-100 h-52 flex items-center justify-center">
        {/* TODO: reemplazar con <Image src={tractor.imagenUrl} ... /> */}
        <div className="text-center text-gray-400">
          <div className="text-4xl mb-2">🚜</div>
          <span className="text-xs">Imagen: {tractor.nombre}</span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-1">
        {/* Badge serie */}
        <span className="inline-block text-xs font-semibold bg-agro-green/10 text-agro-green px-2 py-1 rounded mb-2 w-fit">
          Serie {tractor.serie}
        </span>

        <h3 className="font-rubik font-bold text-gray-900 text-xl mb-1">{tractor.nombre}</h3>

        {/* Specs en línea */}
        <div className="flex gap-4 text-sm text-gray-500 mb-3">
          <span>{tractor.hp} HP</span>
          <span>•</span>
          <span>{tractor.traccion}</span>
          <span>•</span>
          <span>{tractor.transmision}</span>
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{tractor.descripcion}</p>

        {/* Tags de usos */}
        <div className="flex flex-wrap gap-2 mb-5">
          {tractor.usos.map((uso) => (
            <span
              key={uso}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              {uso}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex gap-3 mt-auto">
          <a
            href={`/tecnologias/tractores/${tractor.id}`}
            className="flex-1 text-center text-sm font-medium border border-agro-green text-agro-green rounded-lg py-2 transition-all duration-300 hover:bg-agro-green hover:text-white"
          >
            Ver detalles
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-sm font-medium bg-agro-orange text-white rounded-lg py-2 transition-all duration-300 hover:bg-orange-600"
          >
            Cotizar
          </a>
        </div>
      </div>
    </article>
  )
}
