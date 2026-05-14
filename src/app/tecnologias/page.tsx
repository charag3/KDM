// Home KDM Tecnologías — /tecnologias
//
// Secciones planificadas para la siguiente sesión:
//   1. Hero — imagen tractor en campo + headline + CTA a catálogo
//   2. Marcas — logos Kubota, Jacto, Kverneland, Land Pride, Maruyama
//   3. Tractores destacados — grid con 3 TractorCard (B2601, L4701, M5091)
//   4. Por qué KDM — 3 puntos: experiencia, servicio técnico, financiamiento
//   5. CTA Usados — banner con link a /marketplace
//   6. Mapa + horarios + contacto (datos reales)

export default function TecnologiasHome() {
  return (
    <div>
      {/* ===== HERO ===== */}
      {/*
        TODO: Hero fullscreen con imagen de tractor en campo michoacano
        - Fondo: imagen con overlay verde oscuro semitransparente
        - Headline: "La maquinaria que tu campo necesita" (Rubik 700)
        - Subhead: "Distribuidores Kubota en Morelia. Tractores, implementos y servicio técnico."
        - CTA primario: "Ver tractores" → /tecnologias/tractores
        - CTA secundario: "Cotizar ahora" → WhatsApp
      */}
      <section className="bg-agro-green-dark text-white min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <span className="text-agro-orange text-xs font-nunito uppercase tracking-widest block mb-4">
            Distribuidor autorizado Kubota — Morelia, Mich.
          </span>
          <h1 className="font-rubik font-bold text-4xl md:text-6xl leading-tight mb-6">
            Tu campo, en su<br />
            <span className="text-agro-orange">mejor versión</span>
          </h1>
          <p className="text-white/70 font-nunito text-lg mb-10 leading-relaxed">
            El único dealer Kubota en Michoacán con catálogo digital completo, tractores usados en consignación y soporte técnico local.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/tecnologias/tractores"
              className="bg-agro-orange text-white font-rubik font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:bg-orange-600"
            >
              Ver catálogo de tractores
            </a>
            <a
              href="/tecnologias/marketplace/consignar"
              className="border border-white/30 text-white font-nunito font-medium px-8 py-3 rounded-lg transition-all duration-300 hover:border-agro-orange hover:text-agro-orange"
            >
              Consignar un tractor
            </a>
          </div>
        </div>
      </section>

      {/* ===== MARCAS ===== */}
      {/*
        TODO: Franja de logos de marcas con fondo blanco
        - Logos: Kubota, Jacto, Kverneland, Land Pride, Maruyama
        - Estilo: escala de grises, hover → color original
        - Copy: "Marcas que distribuimos"
      */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-nunito uppercase tracking-widest text-gray-400 mb-6">
            Marcas que distribuimos
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {['Kubota', 'Jacto', 'Kverneland', 'Land Pride', 'Maruyama'].map((marca) => (
              <div key={marca} className="text-gray-300 font-rubik font-bold text-xl hover:text-agro-green transition-colors duration-300">
                {marca}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            — Logos reales van aquí en la siguiente sesión —
          </p>
        </div>
      </section>

      {/* ===== TRACTORES DESTACADOS ===== */}
      {/*
        TODO: Grid 3 columnas con TractorCard
        - Mostrar: B2601, L4701, M5091
        - Título sección: "Tractores disponibles"
        - Link al final: "Ver catálogo completo →"
      */}
      <section className="bg-[#F4F4F0] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-rubik font-bold text-3xl text-gray-900 mb-2">Tractores disponibles</h2>
          <p className="text-gray-500 font-nunito mb-10">Series B, L y M para todo tipo de aplicación</p>
          {/* TODO: mapear tractores.filter() y renderizar <TractorCard /> */}
          <div className="bg-white rounded-lg p-8 text-center text-gray-400 shadow-md">
            <p className="font-nunito">Grid de TractorCards — construir en siguiente sesión</p>
            <a href="/tecnologias/tractores" className="inline-block mt-4 text-agro-green font-semibold hover:underline">
              Ver catálogo completo →
            </a>
          </div>
        </div>
      </section>

      {/* ===== POR QUE KDM ===== */}
      {/*
        TODO: 3 columnas con íconos y texto
        - Experiencia regional: "Conocemos el campo michoacano"
        - Servicio técnico: "Técnicos certificados Kubota en Morelia"
        - Financiamiento: "Opciones de crédito y arrendamiento disponibles"
      */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-rubik font-bold text-3xl text-gray-900 mb-12 text-center">
            ¿Por qué KDM Tecnologías?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { titulo: 'Experiencia regional', desc: 'Más de 15 años distribuyendo maquinaria agrícola en Michoacán. Conocemos las necesidades del campo local.' },
              { titulo: 'Servicio técnico', desc: 'Técnicos certificados por Kubota. Refacciones originales en stock. Mantenimiento preventivo y correctivo.' },
              { titulo: 'Financiamiento', desc: 'Opciones de crédito a plazos y arrendamiento disponibles. Asesoramiento sin costo.' },
            ].map((item) => (
              <div key={item.titulo} className="text-center p-6">
                {/* TODO: agregar ícono SVG o Heroicons */}
                <div className="w-12 h-12 bg-agro-green/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="w-6 h-6 bg-agro-green/40 rounded" />
                </div>
                <h3 className="font-rubik font-semibold text-gray-900 text-lg mb-2">{item.titulo}</h3>
                <p className="text-gray-500 font-nunito text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA TRACTORES USADOS ===== */}
      {/*
        TODO: Banner oscuro con texto + CTA a /marketplace
        - "¿Tienes un tractor que ya no usas? Consígnalo con nosotros"
      */}
      <section className="bg-agro-green py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-rubik font-bold text-white text-2xl mb-2">
              Tractores usados disponibles
            </h3>
            <p className="text-white/70 font-nunito">
              Revisa nuestro inventario de tractores en consignación o consigna el tuyo.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/tecnologias/marketplace" className="bg-white text-agro-green font-rubik font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:bg-gray-100">
              Ver inventario
            </a>
            <a href="/tecnologias/marketplace/consignar" className="border border-white text-white font-nunito px-6 py-3 rounded-lg transition-all duration-300 hover:bg-white/10">
              Consignar el mío
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
