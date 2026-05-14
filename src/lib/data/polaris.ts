// Datos estáticos de vehículos Polaris distribuidos por KDM Offroad
// Precios estimados en MXN — reemplazar con lista oficial antes de publicar

export type VehiculoPolaris = {
  id: string
  nombre: string
  linea: 'RZR' | 'Ranger' | 'Sportsman' | 'Xpedition' | 'Youth'
  hp: number
  capacidad: string // pasajeros o carga
  descripcion: string
  tagline: string
  precioMXN: number
  imagenUrl: string
}

export const vehiculosPolaris: VehiculoPolaris[] = [
  {
    id: 'rzr-pro-r',
    nombre: 'RZR Pro R',
    linea: 'RZR',
    hp: 225,
    capacidad: '2 pasajeros',
    tagline: 'Líder mundial en adrenalina todo terreno',
    descripcion:
      'El RZR más extremo jamás fabricado. Motor ProStar R de 225 HP, suspensión Fox Live Valve, 32" de recorrido total. Diseñado para quienes no conocen límites.',
    precioMXN: 750000,
    imagenUrl: '/images/polaris/rzr-pro-r.jpg',
  },
  {
    id: 'rzr-xp-1000',
    nombre: 'RZR XP 1000',
    linea: 'RZR',
    hp: 110,
    capacidad: '2 pasajeros',
    tagline: 'Rendimiento que define una categoría',
    descripcion:
      'El RZR más vendido del mundo. 110 HP, suspensión Walker Evans, 14" de recorrido trasero. La combinación perfecta de potencia, manejo y durabilidad para el trail.',
    precioMXN: 420000,
    imagenUrl: '/images/polaris/rzr-xp-1000.jpg',
  },
  {
    id: 'ranger-1000',
    nombre: 'Ranger 1000',
    linea: 'Ranger',
    hp: 82,
    capacidad: '3 pasajeros / 680 kg carga',
    tagline: 'El trabajador más fuerte con el manejo más suave',
    descripcion:
      'El UTV de trabajo definitivo. Motor ProStar de 82 HP, caja de carga de 680 kg, tracción en demanda. Ideal para ranchos, agricultura y trabajo en terreno difícil.',
    precioMXN: 380000,
    imagenUrl: '/images/polaris/ranger-1000.jpg',
  },
  {
    id: 'sportsman-570',
    nombre: 'Sportsman 570',
    linea: 'Sportsman',
    hp: 44,
    capacidad: '1 pasajero',
    tagline: 'Traza el camino',
    descripcion:
      'ATV versátil para trabajo y aventura. Motor de 570cc, tracción AWD en demanda, 9 pulgadas de separación del suelo. El punto de entrada perfecto a la familia Polaris.',
    precioMXN: 165000,
    imagenUrl: '/images/polaris/sportsman-570.jpg',
  },
]

export const lineasDisponibles: VehiculoPolaris['linea'][] = [
  'RZR',
  'Ranger',
  'Sportsman',
]
