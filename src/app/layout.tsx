// Root layout — font loading compartido entre ambas verticales
// Cada vertical (tecnologias / offroad) tiene su propio layout con su paleta
// Aquí cargamos: Rubik + Nunito Sans (agro) + Space Grotesk (offroad) vía next/font/google

import type { Metadata } from 'next'
import { Rubik, Nunito_Sans, Space_Grotesk } from 'next/font/google'
import './globals.css'

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rubik',
  display: 'swap',
})

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-nunito',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KDM Seminuevos — Maquinaria Agrícola Usada · Morelia',
  description:
    'Compra y vende maquinaria agrícola y vehículos seminuevos verificados en Morelia, Michoacán. Distribuidor KDM.',
  keywords: ['Kubota Morelia', 'tractores seminuevos', 'maquinaria usada Michoacán', 'KDM Seminuevos', 'consignar tractor'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es-MX"
      className={`${rubik.variable} ${nunitoSans.variable} ${spaceGrotesk.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  )
}
