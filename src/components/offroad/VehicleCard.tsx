// VehicleCard — Card de vehículo Polaris en catálogo offroad
// Diseño oscuro, tipografía Space Grotesk, accento naranja Polaris
//
// Props: vehiculo (tipo VehiculoPolaris de lib/data/polaris.ts)
//
// TODO: click en "Ver más" → página de detalle individual (pendiente de crear)
// TODO: click en "Cotizar" → WhatsApp con mensaje pre-llenado

import type { VehiculoPolaris } from '@/lib/data/polaris'

type VehicleCardProps = {
  vehiculo: VehiculoPolaris
}

export default function VehicleCard({ vehiculo }: VehicleCardProps) {
  const whatsappMsg = encodeURIComponent(
    `Hola, me interesa el Polaris ${vehiculo.nombre}. ¿Podrían darme información y precio?`
  )
  const whatsappHref = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '521XXXXXXXXXX'}?text=${whatsappMsg}`

  const precioFormateado = vehiculo.precioMXN.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
  })

  return (
    <article className="bg-off-dark rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-off-orange/10 hover:-translate-y-1 flex flex-col border border-white/5">
      {/* Imagen placeholder */}
      <div className="bg-black h-56 flex items-center justify-center relative">
        {/* Badge de línea */}
        <span className="absolute top-3 left-3 text-xs font-bold bg-off-orange text-white px-2 py-1 rounded uppercase tracking-wide font-grotesk">
          {vehiculo.linea}
        </span>
        {/* TODO: reemplazar con <Image src={vehiculo.imagenUrl} ... /> */}
        <div className="text-center text-gray-600">
          <div className="text-4xl mb-2">🏎</div>
          <span className="text-xs font-grotesk">Imagen: {vehiculo.nombre}</span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-grotesk font-bold text-white text-xl uppercase tracking-tight mb-1">
          {vehiculo.nombre}
        </h3>

        <p className="text-off-orange text-xs font-grotesk font-medium uppercase tracking-wider mb-3">
          {vehiculo.tagline}
        </p>

        {/* Specs */}
        <div className="flex gap-4 text-sm text-gray-400 font-grotesk mb-3">
          <span>{vehiculo.hp} HP</span>
          <span>•</span>
          <span>{vehiculo.capacidad}</span>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-1">{vehiculo.descripcion}</p>

        {/* Precio */}
        <div className="mb-5">
          <span className="text-xs text-gray-500 font-grotesk uppercase tracking-wide">Precio estimado</span>
          <p className="text-white font-grotesk font-bold text-2xl">{precioFormateado}</p>
          <span className="text-xs text-gray-500">* Precio de referencia — consultar disponibilidad</span>
        </div>

        {/* CTAs */}
        <div className="flex gap-3 mt-auto">
          <button className="flex-1 text-center text-sm font-grotesk font-medium border border-white/20 text-white rounded-lg py-2 transition-all duration-300 hover:border-off-orange hover:text-off-orange uppercase tracking-wide">
            Ver más
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-sm font-grotesk font-bold bg-off-orange text-white rounded-lg py-2 transition-all duration-300 hover:bg-orange-600 uppercase tracking-wide"
          >
            Cotizar
          </a>
        </div>
      </div>
    </article>
  )
}
