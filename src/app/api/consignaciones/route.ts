import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    nombre, telefono, tractor_interes, tiene_equipo,
    tipo_equipo, marca_modelo, ano_equipo, horas_equipo,
    condicion_equipo, precio_esperado, mensaje,
  } = body

  if (!nombre || !telefono || !tractor_interes) {
    return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 })
  }

  await db.query(
    `INSERT INTO consignaciones
       (nombre, telefono, tractor_interes, tiene_equipo,
        tipo_equipo, marca_modelo, ano_equipo, horas_equipo,
        condicion_equipo, precio_esperado, mensaje)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
    [
      nombre, telefono, tractor_interes, tiene_equipo ?? false,
      tipo_equipo || null, marca_modelo || null,
      ano_equipo ? Number(ano_equipo) : null,
      horas_equipo ? Number(horas_equipo) : null,
      condicion_equipo || null,
      precio_esperado ? Number(precio_esperado) : null,
      mensaje || null,
    ]
  )

  // Notificar a Mare vía CallMeBot si está configurado
  const phone = process.env.CALLMEBOT_PHONE
  const apikey = process.env.CALLMEBOT_APIKEY
  if (phone && apikey) {
    const msg = encodeURIComponent(
      `KDM - Nueva consignación: ${nombre} / ${telefono}. Interés: ${tractor_interes}. Equipo: ${tiene_equipo ? (marca_modelo || 'sí') : 'no'}.`
    )
    fetch(`https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${msg}&apikey=${apikey}`).catch(() => {})
  }

  return NextResponse.json({ ok: true })
}
