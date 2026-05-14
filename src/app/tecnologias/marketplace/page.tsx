// Marketplace de tractores usados — /tecnologias/marketplace
//
// Secciones:
//   1. Header — "Tractores usados en consignación"
//   2. Grid de listados (datos placeholder — en producción vendrán de DB o CMS)
//   3. CTA — invitar a consignar
//
// Cada listado muestra: foto, nombre, año, horas, precio, estado, CTA
//
// TODO: en siguiente sesión conectar con Supabase o Railway para listados dinámicos
// TODO: agregar filtros por marca, precio, horas

type TractorUsado = {
  id: string
  nombre: string
  anio: number
  horasUso: number
  precioMXN: number
  estado: 'Excelente' | 'Bueno' | 'Regular'
  descripcion: string
}

// Datos placeholder — reemplazar con fetch real
const tractoresUsados: TractorUsado[] = [
  {
    id: 'usado-1',
    nombre: 'Kubota L3901',
    anio: 2019,
    horasUso: 620,
    precioMXN: 320000,
    estado: 'Excelente',
    descripcion: 'Tractor en excelentes condiciones. Mantenimiento al corriente, llantas nuevas. Incluye pala frontal.',
  },
  {
    id: 'usado-2',
    nombre: 'Kubota B2601',
    anio: 2017,
    horasUso: 1100,
    precioMXN: 165000,
    estado: 'Bueno',
    descripcion: 'Operativo. Transmisión HST funcionando perfectamente. Ideal para huerto o rancho pequeño.',
  },
  {
    id: 'usado-3',
    nombre: 'Kubota L4701',
    anio: 2020,
    horasUso: 430,
    precioMXN: 420000,
    estado: 'Excelente',
    descripcion: 'Semi-nuevo. Pocas horas. Dueño único. Se entrega con implemento cortador de zacate.',
  },
]

const estadoColor = {
  Excelente: 'bg-green-100 text-green-700',
  Bueno: 'bg-yellow-100 text-yellow-700',
  Regular: 'bg-orange-100 text-orange-700',
}

export default function MarketplacePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 font-nunito mb-6">
        <a href="/tecnologias" className="hover:text-agro-green transition-colors duration-300">KDM Tecnologías</a>
        <span className="mx-2">/</span>
        <span className="text-gray-600">Tractores usados</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="font-rubik font-bold text-4xl text-gray-900 mb-3">
            Tractores usados — <span className="text-agro-green">con respaldo KDM</span>
          </h1>
          <p className="text-gray-500 font-nunito text-lg max-w-2xl">
            Unidades en consignación revisadas por nuestros técnicos. Precio fijo, sin regateo.
          </p>
        </div>
        <a
          href="/tecnologias/marketplace/consignar"
          className="flex-shrink-0 bg-agro-orange text-white font-rubik font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:bg-orange-600 text-center"
        >
          Consignar el mío
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {tractoresUsados.map((t) => {
          const precio = t.precioMXN.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0,
          })
          const msg = encodeURIComponent(
            `Hola, me interesa el ${t.nombre} ${t.anio} en consignación. ¿Sigue disponible?`
          )

          return (
            <article
              key={t.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Imagen placeholder */}
              <div className="bg-gray-100 h-48 flex items-center justify-center">
                <span className="text-5xl">🚜</span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                {/* Estado */}
                <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded mb-2 w-fit ${estadoColor[t.estado]}`}>
                  {t.estado}
                </span>

                <h3 className="font-rubik font-bold text-gray-900 text-xl mb-1">{t.nombre}</h3>

                {/* Meta */}
                <div className="flex gap-4 text-sm text-gray-400 font-nunito mb-3">
                  <span>{t.anio}</span>
                  <span>·</span>
                  <span>{t.horasUso.toLocaleString()} hrs</span>
                </div>

                <p className="text-sm text-gray-600 font-nunito leading-relaxed mb-5 flex-1">
                  {t.descripcion}
                </p>

                {/* Trust badge */}
                <p className="text-xs text-agro-green font-nunito font-medium mb-4">
                  ✓ Historial de servicio verificado · Garantía 3 meses KDM
                </p>

                {/* Precio + CTA */}
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-rubik font-bold text-2xl text-gray-900">{precio}</span>
                  <a
                    href={`https://wa.me/521XXXXXXXXXX?text=${msg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-rubik font-semibold bg-agro-green text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-agro-green-dark"
                  >
                    Consultar
                  </a>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* CTA consignar */}
      <div className="bg-agro-green-dark text-white rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-rubik font-bold text-2xl mb-2">¿Tienes un tractor que ya no usas?</h3>
          <p className="text-white/70 font-nunito">
            Consígnalo con nosotros. Sin costo hasta que vendamos. Nos encargamos de la difusión y el proceso de venta.
          </p>
        </div>
        <a
          href="/tecnologias/marketplace/consignar"
          className="flex-shrink-0 bg-agro-orange text-white font-rubik font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:bg-orange-600"
        >
          Consignar mi tractor
        </a>
      </div>
    </div>
  )
}
