// Página de implementos agrícolas — /tecnologias/implementos
//
// Secciones:
//   1. Header — título + intro
//   2. Filtro por marca (Jacto / Kverneland / Land Pride / Maruyama)
//   3. Grid de cards de implemento
//   4. CTA — cotización por WhatsApp
//
// Cada card muestra: nombre, marca, categoría, compatibilidad, descripción, CTA cotizar
//
// TODO: crear ImplementoCard como componente reutilizable
// TODO: agregar más modelos al catálogo

import { implementos } from '@/lib/data/implementos'

export default function ImplementosPage() {
  const marcas = [...new Set(implementos.map((i) => i.marca))]

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 font-nunito mb-6">
        <a href="/tecnologias" className="hover:text-agro-green transition-colors duration-300">KDM Tecnologías</a>
        <span className="mx-2">/</span>
        <span className="text-gray-600">Implementos</span>
      </nav>

      {/* Header */}
      <h1 className="font-rubik font-bold text-4xl text-gray-900 mb-3">
        Implementos <span className="text-agro-green">agrícolas</span>
      </h1>
      <p className="text-gray-500 font-nunito text-lg max-w-2xl mb-8">
        Jacto, Kverneland, Land Pride y Maruyama. Aspersoras, rastras, cortadoras y más.
        Todos compatibles con tractores Kubota de la serie correspondiente.
      </p>

      {/* Marcas disponibles — filtro visual */}
      {/*
        TODO: convertir en filtro real con estado cliente
        Por ahora: lista de badges decorativos
      */}
      <div className="flex flex-wrap gap-3 mb-10">
        {marcas.map((marca) => (
          <span
            key={marca}
            className="text-sm font-nunito font-medium border border-agro-green/30 text-agro-green px-3 py-1.5 rounded-lg"
          >
            {marca}
          </span>
        ))}
      </div>

      {/* Grid de implementos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {implementos.map((imp) => {
          const whatsappMsg = encodeURIComponent(
            `Hola, me interesa el implemento: ${imp.nombre}. ¿Podrían darme información?`
          )

          return (
            <article
              key={imp.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-xl"
            >
              {/* Imagen placeholder */}
              <div className="bg-gray-100 md:w-48 flex-shrink-0 flex items-center justify-center h-40 md:h-auto">
                {/* TODO: <Image src={imp.imagenUrl} width={192} height={160} objectFit="cover" alt={imp.nombre} /> */}
                <span className="text-3xl">🔧</span>
              </div>

              {/* Contenido */}
              <div className="p-5 flex flex-col flex-1">
                {/* Badges */}
                <div className="flex gap-2 mb-2">
                  <span className="text-xs bg-agro-orange/10 text-agro-orange font-semibold px-2 py-0.5 rounded">
                    {imp.marca}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                    {imp.categoria}
                  </span>
                </div>

                <h3 className="font-rubik font-bold text-gray-900 text-lg mb-1">{imp.nombre}</h3>
                <p className="text-xs text-gray-400 font-nunito mb-3">
                  Compatible con: {imp.compatibilidad}
                </p>
                <p className="text-sm text-gray-600 font-nunito leading-relaxed flex-1 mb-4">
                  {imp.descripcion}
                </p>

                <a
                  href={`https://wa.me/521XXXXXXXXXX?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block self-start text-sm font-rubik font-semibold bg-agro-orange text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-orange-600"
                >
                  Cotizar
                </a>
              </div>
            </article>
          )
        })}
      </div>

      {/* CTA */}
      <div className="text-center bg-agro-green/5 border border-agro-green/20 rounded-lg p-8">
        <h3 className="font-rubik font-bold text-gray-900 text-2xl mb-2">
          ¿Buscas un implemento específico?
        </h3>
        <p className="text-gray-500 font-nunito mb-6">
          Podemos conseguir cualquier implemento compatible con tu tractor Kubota.
        </p>
        <a
          href="https://wa.me/521XXXXXXXXXX?text=Hola%2C%20busco%20un%20implemento%20espec%C3%ADfico"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-agro-green text-white font-rubik font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:bg-agro-green-dark"
        >
          Consultar disponibilidad
        </a>
      </div>
    </div>
  )
}
