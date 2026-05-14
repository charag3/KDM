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
  title: 'KDM — Kubota & Polaris Morelia',
  description:
    'Distribuidor autorizado Kubota y Polaris en Morelia, Michoacán. Tractores agrícolas, implementos y vehículos todo terreno.',
  keywords: ['Kubota Morelia', 'Polaris Morelia', 'tractores Michoacán', 'RZR Morelia', 'KDM Tecnologías'],
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
