// Layout KDM Offroad — paleta oscura, fuente Space Grotesk
// Aplica a todas las rutas bajo /offroad
//
// Estructura:
//   - Header negro con logo KDM + nav Polaris
//   - WhatsApp flotante (variante offroad)
//   - {children}
//   - Footer compartido (variante offroad)

import Footer from '@/components/shared/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KDM Offroad — Polaris RZR, Ranger y Sportsman en Morelia',
  description:
    'Distribuidor Polaris en Morelia, Michoacán. RZR, Ranger, Sportsman y accesorios todo terreno. Adrenalina sin límites.',
}

export default function OffroadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="font-grotesk min-h-screen flex flex-col bg-off-black">
      {/* ===== Header ===== */}
      <header className="bg-off-black border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo / wordmark */}
          {/* TODO: reemplazar texto con <Image> del logo real */}
          <a href="/offroad" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-off-orange rounded flex items-center justify-center font-grotesk font-bold text-white text-sm">
              P
            </div>
            <div>
              <span className="font-grotesk font-bold text-white text-lg leading-none block uppercase tracking-tight">KDM</span>
              <span className="text-off-orange text-xs font-grotesk leading-none uppercase tracking-widest">Offroad</span>
            </div>
          </a>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-grotesk">
            <a
              href="/offroad/rzr"
              className="text-white/70 hover:text-off-orange transition-colors duration-300 uppercase tracking-wide font-medium"
            >
              RZR
            </a>
            <a
              href="/offroad"
              className="text-white/70 hover:text-off-orange transition-colors duration-300 uppercase tracking-wide font-medium"
            >
              Ranger
            </a>
            <a
              href="/offroad"
              className="text-white/70 hover:text-off-orange transition-colors duration-300 uppercase tracking-wide font-medium"
            >
              Sportsman
            </a>
            <a
              href="/offroad"
              className="text-white/70 hover:text-off-orange transition-colors duration-300 uppercase tracking-wide font-medium"
            >
              Accesorios
            </a>
            <a
              href="/offroad"
              className="text-white/70 hover:text-off-orange transition-colors duration-300 uppercase tracking-wide font-medium"
            >
              Financiamiento
            </a>
          </nav>

          {/* CTA derecha */}
          <a
            href="https://wa.me/521XXXXXXXXXX?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20veh%C3%ADculos%20Polaris"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-block bg-off-orange text-white text-sm font-grotesk font-bold px-4 py-2 rounded-lg uppercase tracking-wide transition-all duration-300 hover:bg-orange-600"
          >
            Cotizar
          </a>

          {/* TODO: hamburger menu mobile */}
        </div>
      </header>

      {/* ===== Contenido ===== */}
      <main className="flex-1">{children}</main>

      {/* ===== WhatsApp flotante ===== */}
      <WhatsAppButton
        variant="offroad"
        message="Hola, me interesa un vehículo Polaris. ¿Pueden informarme?"
      />

      {/* ===== Footer ===== */}
      <Footer variant="offroad" />
    </div>
  )
}
