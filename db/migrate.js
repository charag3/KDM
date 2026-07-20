// Corre con: node db/migrate.js
// Requiere DATABASE_URL en .env.local o como variable de entorno

const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '../.env.local') })

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })

async function migrate() {
  const sql = fs.readFileSync(path.join(__dirname, '001_schema.sql'), 'utf8')
  const client = await pool.connect()
  try {
    console.log('Conectando a Railway...')
    await client.query(sql)
    console.log('✅ Schema aplicado correctamente')
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

migrate()
