// Datos estáticos de tractores Kubota
// Fuente: kdmtecnologias.com — valores aproximados para prototipo
// En producción: reemplazar con CMS o API

export type Tractor = {
  id: string
  nombre: string
  serie: 'B' | 'L' | 'M'
  hp: number
  traccion: '2WD' | '4WD'
  transmision: 'HST' | 'GST' | 'Manual'
  usos: string[]
  descripcion: string
  imagenUrl: string
}

export const tractores: Tractor[] = [
  {
    id: 'b2301',
    nombre: 'Kubota B2301',
    serie: 'B',
    hp: 23,
    traccion: '4WD',
    transmision: 'HST',
    usos: ['Huerto', 'Jardín', 'Rancho pequeño'],
    descripcion:
      'Compacto y maniobrable, ideal para espacios reducidos y trabajo en huertos. Motor diesel de 3 cilindros con transmisión hidrostática para máxima facilidad de operación.',
    imagenUrl: '/images/tractores/b2301.jpg',
  },
  {
    id: 'b2601',
    nombre: 'Kubota B2601',
    serie: 'B',
    hp: 26,
    traccion: '4WD',
    transmision: 'HST',
    usos: ['Huerto', 'Rancho pequeño', 'Paisajismo'],
    descripcion:
      'Mayor potencia dentro de la serie B. Motor diesel de 3 cilindros, ideal para trabajos de paisajismo y preparación de terrenos en propiedades residenciales.',
    imagenUrl: '/images/tractores/b2601.jpg',
  },
  {
    id: 'l3301',
    nombre: 'Kubota L3301',
    serie: 'L',
    hp: 33,
    traccion: '4WD',
    transmision: 'GST',
    usos: ['Agricultura mediana', 'Ganadería', 'Preparación de suelo'],
    descripcion:
      'La serie L es el caballo de trabajo de Kubota. El L3301 ofrece la versatilidad necesaria para operaciones agrícolas medianas con implementos de labranza.',
    imagenUrl: '/images/tractores/l3301.jpg',
  },
  {
    id: 'l3901',
    nombre: 'Kubota L3901',
    serie: 'L',
    hp: 39,
    traccion: '4WD',
    transmision: 'HST',
    usos: ['Agricultura mediana', 'Horticultura', 'Carga'],
    descripcion:
      'Potencia y control precisos para operaciones hortícolas y de preparación de terreno. Compatible con la gama completa de implementos de la línea L.',
    imagenUrl: '/images/tractores/l3901.jpg',
  },
  {
    id: 'l4701',
    nombre: 'Kubota L4701',
    serie: 'L',
    hp: 47,
    traccion: '4WD',
    transmision: 'HST',
    usos: ['Agricultura', 'Ganadería', 'Manejo de carga pesada'],
    descripcion:
      'El más potente de la serie L estándar. Ideal para ranchos ganaderos y operaciones agrícolas que demandan mayor capacidad de levante y potencia en la toma de fuerza.',
    imagenUrl: '/images/tractores/l4701.jpg',
  },
  {
    id: 'm5091',
    nombre: 'Kubota M5091',
    serie: 'M',
    hp: 91,
    traccion: '4WD',
    transmision: 'GST',
    usos: ['Agricultura intensiva', 'Grandes extensiones', 'Trabajo pesado'],
    descripcion:
      'Serie M: máxima potencia para operaciones de escala comercial. Motor de 4 cilindros turboalimentado, cabina con aire acondicionado y sistema hidráulico de alta capacidad.',
    imagenUrl: '/images/tractores/m5091.jpg',
  },
]

export const seriesDisponibles: Tractor['serie'][] = ['B', 'L', 'M']
