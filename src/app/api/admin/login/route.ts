import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { signToken, setCookie, AdminPayload } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  if (!email || !password) {
    return NextResponse.json({ error: 'Credenciales requeridas' }, { status: 400 })
  }

  const { rows } = await db.query(
    'SELECT * FROM perfiles_admin WHERE email = $1',
    [email.toLowerCase()]
  )
  const admin = rows[0]
  if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
    return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 })
  }

  const payload: AdminPayload = {
    id: admin.id,
    email: admin.email,
    nombre: admin.nombre,
    role: admin.role,
  }
  const token = signToken(payload)

  return NextResponse.json(payload, {
    headers: { 'Set-Cookie': setCookie(token) },
  })
}
