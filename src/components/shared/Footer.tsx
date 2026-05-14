// Footer compartido entre ambas verticales
// Props:
//   - variant: 'agro' (fondo verde oscuro) | 'offroad' (fondo negro)
//
// Contiene:
//   - Logo + nombre de la vertical
//   - Dirección y datos de contacto reales de KDM Tecnologías
//   - Links rápidos por vertical
//   - Horarios de atención
//   - Copyright

type FooterProps = {
  variant?: 'agro' | 'offroad'
}

export default function Footer({ variant = 'agro' }: FooterProps) {
  // TODO: separar links por vertical (tecnologias vs offroad)
  const isAgro = variant === 'agro'

  const bgClass = isAgro ? 'bg-agro-green-dark' : 'bg-off-black'
  const accentClass = isAgro ? 'text-agro-orange' : 'text-off-orange'
  const textClass = isAgro ? 'text-gray-200' : 'text-gray-300'

  return (
    <footer className={`${bgClass} ${textClass} py-12 px-6`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna 1 — Info de contacto */}
        <div>
          <h3 className={`font-bold text-lg mb-4 ${accentClass}`}>
            {isAgro ? 'KDM Tecnologías' : 'KDM Offroad'}
          </h3>
          {/* Datos reales extraídos de kdmtecnologias.com */}
          <address className="not-italic space-y-2 text-sm">
            <p>Carretera Morelia-Pátzcuaro Km 13</p>
            <p>Uruapilla, Mich. CP 58342</p>
            <p className="mt-3">
              <a href="tel:4433031141" className="hover:text-white transition-colors duration-300">
                44 33 03 11 41
              </a>
            </p>
            <p>
              <a
                href="mailto:sclientes@kdmtecnologias.com"
                className="hover:text-white transition-colors duration-300"
              >
                sclientes@kdmtecnologias.com
              </a>
            </p>
          </address>
        </div>

        {/* Columna 2 — Horarios */}
        <div>
          <h3 className={`font-bold text-lg mb-4 ${accentClass}`}>Horarios</h3>
          <ul className="text-sm space-y-2">
            <li>
              <span className="font-medium">Lun – Vie</span>
              <br />
              9:00 – 15:00 y 16:00 – 18:00
            </li>
            <li>
              <span className="font-medium">Sábado</span>
              <br />
              9:00 – 14:00
            </li>
            <li className="text-gray-400">Domingo: Cerrado</li>
          </ul>
        </div>

        {/* Columna 3 — Links rápidos */}
        <div>
          <h3 className={`font-bold text-lg mb-4 ${accentClass}`}>
            {isAgro ? 'Productos' : 'Explorar'}
          </h3>
          {isAgro ? (
            <ul className="text-sm space-y-2">
              {/* TODO: usar next/link */}
              <li><a href="/tecnologias/tractores" className="hover:text-white transition-colors duration-300">Tractores Kubota</a></li>
              <li><a href="/tecnologias/implementos" className="hover:text-white transition-colors duration-300">Implementos</a></li>
              <li><a href="/tecnologias/marketplace" className="hover:text-white transition-colors duration-300">Tractores Usados</a></li>
              <li><a href="/tecnologias/marketplace/consignar" className="hover:text-white transition-colors duration-300">Consignar mi tractor</a></li>
            </ul>
          ) : (
            <ul className="text-sm space-y-2">
              <li><a href="/offroad/rzr" className="hover:text-white transition-colors duration-300">RZR</a></li>
              <li><a href="/offroad" className="hover:text-white transition-colors duration-300">Ranger</a></li>
              <li><a href="/offroad" className="hover:text-white transition-colors duration-300">Sportsman</a></li>
              <li><a href="/offroad" className="hover:text-white transition-colors duration-300">Financiamiento</a></li>
            </ul>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 text-xs text-gray-400 flex flex-col md:flex-row justify-between gap-2">
        <p>© {new Date().getFullYear()} KDM Tecnologías. Todos los derechos reservados.</p>
        <p>Distribuidor autorizado Kubota y Polaris — Morelia, Michoacán</p>
      </div>
    </footer>
  )
}
