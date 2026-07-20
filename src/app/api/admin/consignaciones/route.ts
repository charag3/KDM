import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET() {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { rows } = await db.query(
    'SELECT * FROM consignaciones ORDER BY created_at DESC'
  )
  return NextResponse.json(rows)
}
