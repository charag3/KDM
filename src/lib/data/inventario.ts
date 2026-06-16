// Inventario seminuevos — datos estáticos para el prototipo
// Imágenes: Pexels placeholders — reemplazar con fotos reales antes de lanzar
// En producción: reemplazar con CMS o base de datos

export type EquipoSeminuevo = {
  id: string
  tipo: 'Tractor' | 'Offroad'
  nombre: string
  año: number
  horas: number
  precio: number
  condicion: 'Excelente' | 'Muy buena' | 'Buena' | 'Regular'
  imagen: string
  descripcion: string
  specs: {
    marca: string
    hp?: number
    traccion?: string
    transmision?: string
    capacidad?: string
  }
}

export const inventarioSeminuevos: EquipoSeminuevo[] = [
  {
    id: 'kubota-b2301-2019',
    tipo: 'Tractor',
    nombre: 'Kubota B2301',
    año: 2019,
    horas: 1200,
    precio: 185000,
    condicion: 'Muy buena',
    imagen: 'https://images.pexels.com/photos/35510874/pexels-photo-35510874.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    descripcion:
      'Tractor compacto en excelente estado. Ideal para huertos y espacios reducidos. Transmisión hidrostática, motor diesel de 3 cilindros. Revisión técnica completa por KDM antes de la venta.',
    specs: { marca: 'Kubota', hp: 23, traccion: '4WD', transmision: 'HST' },
  },
  {
    id: 'kubota-l3301-2018',
    tipo: 'Tractor',
    nombre: 'Kubota L3301',
    año: 2018,
    horas: 2800,
    precio: 230000,
    condicion: 'Buena',
    imagen: 'https://images.pexels.com/photos/29253996/pexels-photo-29253996.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    descripcion:
      'Caballo de trabajo de la serie L. Historial de uso en rancho ganadero en Zamora. Motor y sistema hidráulico revisados. Documentación completa disponible.',
    specs: { marca: 'Kubota', hp: 33, traccion: '4WD', transmision: 'GST' },
  },
  {
    id: 'kubota-l3901-2020',
    tipo: 'Tractor',
    nombre: 'Kubota L3901',
    año: 2020,
    horas: 1950,
    precio: 310000,
    condicion: 'Excelente',
    imagen: 'https://images.pexels.com/photos/30248663/pexels-photo-30248663.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    descripcion:
      'Un solo dueño, uso en finca hortícola. Mantenimiento puntual con registros completos. Llantas al 80%. El más completo de la serie L en inventario.',
    specs: { marca: 'Kubota', hp: 39, traccion: '4WD', transmision: 'HST' },
  },
  {
    id: 'kubota-l4701-2017',
    tipo: 'Tractor',
    nombre: 'Kubota L4701',
    año: 2017,
    horas: 3500,
    precio: 275000,
    condicion: 'Buena',
    imagen: 'https://images.pexels.com/photos/34632627/pexels-photo-34632627.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    descripcion:
      'Tractor de trabajo intensivo con historial documentado. Recién salido de servicio mayor en KDM. Ideal para operaciones de carga y labranza en rancho.',
    specs: { marca: 'Kubota', hp: 47, traccion: '4WD', transmision: 'HST' },
  },
  {
    id: 'kubota-m5091-2016',
    tipo: 'Tractor',
    nombre: 'Kubota M5091',
    año: 2016,
    horas: 2100,
    precio: 420000,
    condicion: 'Muy buena',
    imagen: 'https://images.pexels.com/photos/9422727/pexels-photo-9422727.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    descripcion:
      'Serie M de alta potencia. Cabina con A/C, motor turbo de 4 cilindros. Operación en grandes extensiones maiceras. Sistema hidráulico de alta capacidad en perfecto estado.',
    specs: { marca: 'Kubota', hp: 91, traccion: '4WD', transmision: 'GST' },
  },
  {
    id: 'polaris-rzr-pro-r-2021',
    tipo: 'Offroad',
    nombre: 'Polaris RZR Pro R',
    año: 2021,
    horas: 320,
    precio: 480000,
    condicion: 'Excelente',
    imagen: 'https://images.pexels.com/photos/11488068/pexels-photo-11488068.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    descripcion:
      'RZR Pro R con pocas horas. Motor ProStar R de 225 HP, suspensión Fox Live Valve. Sin accidentes, uso recreativo ocasional. Incluye jaula reforzada aftermarket.',
    specs: { marca: 'Polaris', hp: 225, capacidad: '2 pasajeros' },
  },
  {
    id: 'polaris-sportsman-570-2020',
    tipo: 'Offroad',
    nombre: 'Polaris Sportsman 570',
    año: 2020,
    horas: 510,
    precio: 128000,
    condicion: 'Muy buena',
    imagen: 'https://images.pexels.com/photos/19995804/pexels-photo-19995804.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    descripcion:
      'ATV versátil para trabajo y aventura. Motor 570cc, tracción AWD en demanda. Uso mixto en rancho y recreativo. Llantas al 70%, sin golpes visibles.',
    specs: { marca: 'Polaris', hp: 44, capacidad: '1 pasajero' },
  },
  {
    id: 'polaris-ranger-1000-2022',
    tipo: 'Offroad',
    nombre: 'Polaris Ranger 1000',
    año: 2022,
    horas: 280,
    precio: 390000,
    condicion: 'Excelente',
    imagen: 'https://images.pexels.com/photos/14699493/pexels-photo-14699493.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    descripcion:
      'Ranger casi nuevo, usado principalmente en labores de carga en rancho. Motor ProStar 82 HP, caja de carga 680 kg. Garantía extendida Polaris transferible al comprador.',
    specs: { marca: 'Polaris', hp: 82, capacidad: '3 pasajeros / 680 kg carga' },
  },
]
