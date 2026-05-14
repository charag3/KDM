// Datos estáticos de vendedores — KDM Tecnologías + Offroad
// En producción: reemplazar con tabla de usuarios en DB

export type Rol = 'Admin' | 'Vendedor'
export type VerticalAcceso = 'Tecnologías' | 'Offroad' | 'Ambas'

export type Vendedor = {
  id: string
  nombre: string
  email: string
  telefono: string
  rol: Rol
  vertical: VerticalAcceso
  leadsAsignados: number
  ventasCerradas: number
  fechaIngreso: string
  activo: boolean
}

export const vendedores: Vendedor[] = [
  {
    id: 'admin-1',
    nombre: 'Mare Elisea',
    email: 'mare@kdmtecnologias.com',
    telefono: '4431112233',
    rol: 'Admin',
    vertical: 'Ambas',
    leadsAsignados: 6,
    ventasCerradas: 1,
    fechaIngreso: '2024-01-15',
    activo: true,
  },
  {
    id: 'vend-1',
    nombre: 'Juan Pérez',
    email: 'juan@kdmtecnologias.com',
    telefono: '4432223344',
    rol: 'Vendedor',
    vertical: 'Tecnologías',
    leadsAsignados: 3,
    ventasCerradas: 1,
    fechaIngreso: '2024-06-01',
    activo: true,
  },
  {
    id: 'vend-2',
    nombre: 'Sofía Ramírez',
    email: 'sofia@kdmoffroad.com',
    telefono: '4433334455',
    rol: 'Vendedor',
    vertical: 'Offroad',
    leadsAsignados: 2,
    ventasCerradas: 0,
    fechaIngreso: '2025-02-10',
    activo: true,
  },
  {
    id: 'vend-3',
    nombre: 'Héctor Morales',
    email: 'hector@kdmtecnologias.com',
    telefono: '4434445566',
    rol: 'Vendedor',
    vertical: 'Ambas',
    leadsAsignados: 1,
    ventasCerradas: 0,
    fechaIngreso: '2025-08-20',
    activo: false,
  },
]
