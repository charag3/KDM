// Datos estáticos de implementos agrícolas
// Marcas distribuidas por KDM Tecnologías: Jacto, Kverneland, Land Pride, Maruyama
// Datos aproximados para prototipo

export type Implemento = {
  id: string
  nombre: string
  marca: 'Jacto' | 'Kverneland' | 'Land Pride' | 'Maruyama'
  categoria: 'Aspersión' | 'Labranza' | 'Corte' | 'Aplicación manual'
  compatibilidad: string // series de tractor compatibles o "Manual"
  descripcion: string
  imagenUrl: string
}

export const implementos: Implemento[] = [
  {
    id: 'jacto-pj600',
    nombre: 'Aspersora Jacto PJ-600',
    marca: 'Jacto',
    categoria: 'Aspersión',
    compatibilidad: 'Serie L, Serie M',
    descripcion:
      'Aspersora de arrastre con tanque de 600 litros. Ideal para aplicación de fitosanitarios en cultivos de maíz, frijol y hortalizas. Bomba centrífuga de alta presión incluida.',
    imagenUrl: '/images/implementos/jacto-pj600.jpg',
  },
  {
    id: 'kverneland-rastra',
    nombre: 'Rastra de Discos Kverneland',
    marca: 'Kverneland',
    categoria: 'Labranza',
    compatibilidad: 'Serie L, Serie M',
    descripcion:
      'Rastra de discos de doble acción para preparación primaria de suelo. Estructura robusta de acero al boro, discos de 20" intercambiables. Anchos de trabajo de 1.8 a 3.0 m.',
    imagenUrl: '/images/implementos/kverneland-rastra.jpg',
  },
  {
    id: 'landpride-cortadora',
    nombre: 'Cortadora Rotativa Land Pride RCR1260',
    marca: 'Land Pride',
    categoria: 'Corte',
    compatibilidad: 'Serie B, Serie L',
    descripcion:
      'Cortadora rotativa de 60 pulgadas para control de maleza y residuos de cosecha. Accionada por toma de fuerza a 540 RPM. Ideal para potreros y bordes de cultivo.',
    imagenUrl: '/images/implementos/landpride-rcr1260.jpg',
  },
  {
    id: 'maruyama-mochila',
    nombre: 'Aspersora de Mochila Maruyama MS070',
    marca: 'Maruyama',
    categoria: 'Aplicación manual',
    compatibilidad: 'Manual',
    descripcion:
      'Motor de 2 tiempos de 70cc, tanque de 20 litros. Alta presión para aspersión de precisión en cultivos de huerta y viveros. Ligera y ergonómica para trabajo prolongado.',
    imagenUrl: '/images/implementos/maruyama-ms070.jpg',
  },
]
