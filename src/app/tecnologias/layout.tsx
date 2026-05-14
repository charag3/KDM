// Layout KDM Tecnologías — paleta verde, fuentes Rubik + Nunito Sans
// Aplica a todas las rutas bajo /tecnologias
//
// Estructura:
//   - Header verde con logo KDM + nav principal
//   - WhatsApp flotante (variante agro)
//   - {children}
//   - Footer compartido (variante agro)

import Footer from '@/components/shared/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KDM Tecnologías — Tractores Kubota en Morelia',
  description:
    'Distribuidor autorizado Kubota en Morelia, Michoacán. Tractores serie B, L y M, implementos agrícolas Jacto, Kverneland y Land Pride.',
}

export default function TecnologiasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="font-nunito min-h-screen flex flex-col bg-[#FAFAFA]">
      {/* ===== Header ===== */}
      <header className="bg-agro-green-dark text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo / wordmark */}
          {/* TODO: reemplazar texto con <Image> del logo real */}
          <a href="/tecnologias" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-agro-orange rounded flex items-center justify-center font-rubik font-bold text-white text-sm">
              K
            </div>
            <div>
              <span className="font-rubik font-bold text-white text-lg leading-none block">KDM</span>
              <span className="text-agro-orange text-xs font-nunito leading-none">Tecnologías</span>
            </div>
          </a>

          {/* Nav principal */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-nunito">
            <a
              href="/tecnologias/tractores"
              className="text-white/80 hover:text-agro-orange transition-colors duration-300 font-medium"
            >
              Tractores
            </a>
            <a
              href="/tecnologias/implementos"
              className="text-white/80 hover:text-agro-orange transition-colors duration-300 font-medium"
            >
              Implementos
            </a>
            <a
              href="/tecnologias/marketplace"
              className="text-white/80 hover:text-agro-orange transition-colors duration-300 font-medium"
            >
              Usados
            </a>
            <a
              href="tel:4433031141"
              className="text-white/80 hover:text-agro-orange transition-colors duration-300 font-medium"
            >
              44 33 03 11 41
            </a>
            <a
              href="/crm"
              className="text-white/60 hover:text-agro-orange transition-colors duration-300 font-medium text-xs border border-white/20 px-3 py-1 rounded"
            >
              CRM
            </a>
          </nav>

          {/* CTA derecha */}
          <a
            href="/tecnologias/marketplace/consignar"
            className="hidden md:inline-block bg-agro-orange text-white text-sm font-rubik font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:bg-orange-600"
          >
            Consignar tractor
          </a>

          {/* TODO: agregar hamburger menu para mobile */}
        </div>
      </header>

      {/* ===== Contenido ===== */}
      <main className="flex-1">{children}</main>

      {/* ===== WhatsApp flotante ===== */}
      <WhatsAppButton
        variant="agro"
        message="Hola, me interesa información sobre tractores Kubota."
      />

      {/* ===== Footer ===== */}
      <Footer variant="agro" />
    </div>
  )
}
