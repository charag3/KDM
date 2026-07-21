// Corre con: node db/seed_admin.js
// Crea el super_admin de Soma Space y el admin de Mere
// CAMBIAR las contraseñas antes de compartir con el cliente

const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '../.env.local') })

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })

async function seed() {
  const admins = [
    { email: 'somaspace.site@gmail.com', nombre: 'Soma Space', role: 'super_admin', password: 'soma_kdm_2026' },
    { email: 'mare@kdmtecnologias.com', nombre: 'Mare — KDM', role: 'admin', password: 'kdm_admin_2026' },
  ]

  const client = await pool.connect()
  try {
    for (const admin of admins) {
      const hash = await bcrypt.hash(admin.password, 10)
      await client.query(
        `INSERT INTO perfiles_admin (email, password_hash, nombre, role)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (email) DO UPDATE SET password_hash=$2, nombre=$3, role=$4`,
        [admin.email, hash, admin.nombre, admin.role]
      )
      console.log(`✅ ${admin.role}: ${admin.email} / ${admin.password}`)
    }
  } finally {
    client.release()
    await pool.end()
  }
}

seed().catch(console.error)
