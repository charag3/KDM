import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { rows } = await db.query('SELECT * FROM equipos_seminuevos ORDER BY orden ASC, created_at DESC')
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const {
    tipo, nombre, ano, horas, precio, condicion,
    descripcion, imagen_principal, imagenes, specs,
    disponible, verificado_kdm, orden,
  } = body

  const { rows } = await db.query(
    `INSERT INTO equipos_seminuevos
       (tipo, nombre, ano, horas, precio, condicion, descripcion,
        imagen_principal, imagenes, specs, disponible, verificado_kdm, orden)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
     RETURNING *`,
    [
      tipo, nombre, Number(ano), Number(horas), Number(precio),
      condicion, descripcion,
      imagen_principal || null,
      JSON.stringify(imagenes || []),
      JSON.stringify(specs || {}),
      disponible ?? true,
      verificado_kdm ?? false,
      Number(orden || 0),
    ]
  )
  return NextResponse.json(rows[0], { status: 201 })
}
