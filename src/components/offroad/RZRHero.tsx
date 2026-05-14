// RZRHero — Hero fullscreen para la página del RZR
// Ruta: /offroad/rzr
//
// Diseño:
//   - Fullscreen (min-h-screen) con imagen de fondo oscura (gradient negro sobre foto)
//   - Texto: nombre modelo en grande, tagline, specs clave, CTA
//   - Animación de entrada (CSS puro, sin framer-motion)
//
// TODO: agregar imagen real de fondo (RZR Pro R en acción)
// TODO: conectar con datos de vehiculosPolaris[0] (RZR Pro R)
// TODO: scroll indicator animado hacia la sección de specs

type RZRHeroProps = {
  nombre?: string
  tagline?: string
  hp?: number
  precio?: number
}

export default function RZRHero({
  nombre = 'RZR Pro R',
  tagline = 'Líder mundial en adrenalina todo terreno',
  hp = 225,
  precio = 750000,
}: RZRHeroProps) {
  const whatsappMsg = encodeURIComponent(
    `Hola, estoy interesado en el Polaris ${nombre}. ¿Podrían contactarme?`
  )
  const whatsappHref = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '521XXXXXXXXXX'}?text=${whatsappMsg}`

  const precioFormateado = precio.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
  })

  return (
    <section className="relative min-h-screen flex items-center bg-off-black overflow-hidden">
      {/* Fondo — placeholder hasta tener imagen real */}
      {/* TODO: reemplazar con: <Image src="/images/polaris/rzr-pro-r-hero.jpg" fill className="object-cover" alt="RZR Pro R" /> */}
      <div className="absolute inset-0 bg-gradient-to-br from-off-black via-off-dark to-orange-950/30" />

      {/* Detalles decorativos */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-off-orange/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-off-orange/10 rounded-full blur-3xl" />

      {/* Contenido */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-24">
        {/* Badge */}
        <span className="inline-block text-xs font-grotesk font-bold text-off-orange uppercase tracking-widest border border-off-orange/40 px-3 py-1 rounded mb-6">
          Polaris — Línea RZR
        </span>

        {/* Nombre modelo */}
        <h1 className="font-grotesk font-bold text-white text-6xl md:text-8xl uppercase leading-none mb-4">
          {nombre}
        </h1>

        {/* Tagline */}
        <p className="font-grotesk text-gray-300 text-xl md:text-2xl font-light max-w-2xl mb-10">
          {tagline}
        </p>

        {/* Specs en horizontal */}
        <div className="flex flex-wrap gap-8 mb-12">
          <div>
            <span className="block text-gray-500 text-xs font-grotesk uppercase tracking-wider mb-1">Potencia</span>
            <span className="block text-white text-3xl font-grotesk font-bold">{hp} <span className="text-off-orange">HP</span></span>
          </div>
          <div className="border-l border-white/10 pl-8">
            <span className="block text-gray-500 text-xs font-grotesk uppercase tracking-wider mb-1">Recorrido</span>
            <span className="block text-white text-3xl font-grotesk font-bold">32 <span className="text-off-orange">in</span></span>
          </div>
          <div className="border-l border-white/10 pl-8">
            <span className="block text-gray-500 text-xs font-grotesk uppercase tracking-wider mb-1">Precio est.</span>
            <span className="block text-white text-3xl font-grotesk font-bold">{precioFormateado} <span className="text-gray-500 text-sm">MXN</span></span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-off-orange text-white font-grotesk font-bold px-8 py-4 rounded-lg text-sm uppercase tracking-widest transition-all duration-300 hover:bg-orange-600 hover:scale-105"
          >
            Cotizar ahora
          </a>
          <a
            href="#specs"
            className="inline-block border border-white/20 text-white font-grotesk font-medium px-8 py-4 rounded-lg text-sm uppercase tracking-widest transition-all duration-300 hover:border-off-orange hover:text-off-orange"
          >
            Ver especificaciones
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* TODO: animar con CSS keyframes — bounce suave hacia abajo */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs font-grotesk uppercase tracking-widest animate-bounce">
        Scroll
      </div>
    </section>
  )
}
