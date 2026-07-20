import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const SECRET = process.env.JWT_SECRET!
const COOKIE = 'kdm_admin_token'

export type AdminPayload = {
  id: string
  email: string
  nombre: string
  role: 'admin' | 'super_admin'
}

export function signToken(payload: AdminPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

export async function getSession(): Promise<AdminPayload | null> {
  try {
    const store = await cookies()
    const token = store.get(COOKIE)?.value
    if (!token) return null
    return jwt.verify(token, SECRET) as AdminPayload
  } catch {
    return null
  }
}

export function setCookie(token: string): string {
  const maxAge = 60 * 60 * 24 * 7
  return `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`
}

export function clearCookie(): string {
  return `${COOKIE}=; Path=/; HttpOnly; Max-Age=0`
}
