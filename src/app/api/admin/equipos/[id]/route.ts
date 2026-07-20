import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

type Ctx = { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Ctx) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const {
    tipo, nombre, ano, horas, precio, condicion,
    descripcion, imagen_principal, imagenes, specs,
    disponible, verificado_kdm, orden,
  } = body

  const { rows } = await db.query(
    `UPDATE equipos_seminuevos SET
       tipo=$1, nombre=$2, ano=$3, horas=$4, precio=$5, condicion=$6,
       descripcion=$7, imagen_principal=$8, imagenes=$9, specs=$10,
       disponible=$11, verificado_kdm=$12, orden=$13
     WHERE id=$14 RETURNING *`,
    [
      tipo, nombre, Number(ano), Number(horas), Number(precio),
      condicion, descripcion,
      imagen_principal || null,
      JSON.stringify(imagenes || []),
      JSON.stringify(specs || {}),
      disponible, verificado_kdm,
      Number(orden || 0),
      id,
    ]
  )
  if (!rows[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(rows[0])
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await db.query('DELETE FROM equipos_seminuevos WHERE id=$1', [id])
  return NextResponse.json({ ok: true })
}
