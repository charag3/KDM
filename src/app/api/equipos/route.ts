import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const tipo = searchParams.get('tipo')

  let text = 'SELECT * FROM equipos_seminuevos WHERE disponible = TRUE'
  const params: string[] = []

  if (tipo && tipo !== 'Todo') {
    params.push(tipo)
    text += ` AND tipo = $${params.length}`
  }

  text += ' ORDER BY orden ASC, created_at DESC'

  const { rows } = await db.query(text, params)
  return NextResponse.json(rows)
}
