import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { db } from '@/lib/db'

type Equipo = {
  id: string
  tipo: string
  nombre: string
  ano: number
  horas: number
  precio: string
  condicion: string
  descripcion: string
  imagen_principal: string | null
  specs: Record<string, string | number>
  disponible: boolean
  verificado_kdm: boolean
}

const condicionColor: Record<string, string> = {
  Excelente: 'bg-kdm-orange-500 text-white',
  'Muy buena': 'bg-oxford-950/85 text-white',
  Buena: 'bg-oxford-950/85 text-white',
  Regular: 'bg-oxford-950/85 text-white',
}

export const dynamic = 'force-dynamic'

async function getEquipo(id: string): Promise<Equipo | null> {
  const { rows } = await db.query('SELECT * FROM equipos_seminuevos WHERE id = $1', [id])
  return (rows[0] as Equipo) ?? null
}

async function getSimilares(tipo: string, excludeId: string): Promise<Equipo[]> {
  const { rows } = await db.query(
    'SELECT * FROM equipos_seminuevos WHERE tipo = $1 AND id != $2 AND disponible = TRUE ORDER BY orden ASC LIMIT 3',
    [tipo, excludeId]
  )
  return rows as Equipo[]
}

export default async function EquipoDetalle({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const equipo = await getEquipo(id)
  if (!equipo) notFound()

  const similares = await getSimilares(equipo.tipo, equipo.id)
  const precio = Number(equipo.precio)

  const waMsg = encodeURIComponent(
    `Hola, me interesa el ${equipo.nombre} ${equipo.ano} que vi en KDM Seminuevos. ¿Sigue disponible?`
  )

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-oxford-950/95 backdrop-blur border-b border-white/6">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-rubik font-bold text-white text-xl tracking-tight">
            KDM<span className="text-kdm-orange-500">.</span> Seminuevos
          </Link>
          <Link
            href="/#inventario"
            className="flex items-center gap-1.5 text-sm font-medium text-oxford-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Ver inventario
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Imagen principal */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-oxford-100 shadow-md">
            {equipo.imagen_principal ? (
              <Image
                src={equipo.imagen_principal}
                alt={equipo.nombre}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-oxford-400">
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
            )}
            <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${condicionColor[equipo.condicion]}`}>
              {equipo.condicion}
            </span>
            {equipo.verificado_kdm && (
              <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full bg-kdm-orange-500/90 text-white">
                ✓ Verificado KDM
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="font-nunito text-xs text-oxford-400 mb-2 uppercase tracking-wider">
              KDM Seminuevos · {equipo.tipo === 'Tractor' ? 'Tractores' : 'Vehículos Offroad'}
            </p>

            <h1 className="font-rubik font-bold text-oxford-950 text-3xl md:text-4xl leading-tight mb-2">
              {equipo.nombre}
            </h1>

            <div className="flex gap-4 text-sm font-nunito text-oxford-600 mb-6">
              <span>Año {equipo.ano}</span>
              <span>·</span>
              <span>{equipo.horas.toLocaleString('es-MX')} horas de uso</span>
            </div>

            <div className="bg-oxford-100 rounded-2xl p-6 mb-6">
              <p className="font-nunito text-xs text-oxford-600 uppercase tracking-wider mb-1">Precio</p>
              <p className="font-rubik font-bold text-kdm-orange-600 text-4xl">
                ${precio.toLocaleString('es-MX')}
                <span className="text-lg font-normal text-oxford-400 ml-1">MXN</span>
              </p>
              <p className="font-nunito text-xs text-oxford-400 mt-1">Pregunta por opciones de financiamiento</p>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {equipo.specs?.hp && (
                <div className="bg-white rounded-xl p-4 border border-oxford-100">
                  <p className="font-nunito text-xs text-oxford-400 mb-0.5">Potencia</p>
                  <p className="font-rubik font-bold text-oxford-950">{equipo.specs.hp} HP</p>
                </div>
              )}
              {equipo.specs?.traccion && (
                <div className="bg-white rounded-xl p-4 border border-oxford-100">
                  <p className="font-nunito text-xs text-oxford-400 mb-0.5">Tracción</p>
                  <p className="font-rubik font-bold text-oxford-950">{equipo.specs.traccion}</p>
                </div>
              )}
              {equipo.specs?.transmision && (
                <div className="bg-white rounded-xl p-4 border border-oxford-100">
                  <p className="font-nunito text-xs text-oxford-400 mb-0.5">Transmisión</p>
                  <p className="font-rubik font-bold text-oxford-950">{equipo.specs.transmision}</p>
                </div>
              )}
              {equipo.specs?.capacidad && (
                <div className="bg-white rounded-xl p-4 border border-oxford-100">
                  <p className="font-nunito text-xs text-oxford-400 mb-0.5">Capacidad</p>
                  <p className="font-rubik font-bold text-oxford-950 text-sm">{equipo.specs.capacidad}</p>
                </div>
              )}
              {equipo.specs?.marca && (
                <div className="bg-white rounded-xl p-4 border border-oxford-100">
                  <p className="font-nunito text-xs text-oxford-400 mb-0.5">Marca</p>
                  <p className="font-rubik font-bold text-oxford-950">{equipo.specs.marca}</p>
                </div>
              )}
              <div className="bg-white rounded-xl p-4 border border-oxford-100">
                <p className="font-nunito text-xs text-oxford-400 mb-0.5">Condición</p>
                <p className="font-rubik font-bold text-oxford-950 text-sm">{equipo.condicion}</p>
              </div>
            </div>

            {/* Descripción */}
            <p className="font-nunito text-oxford-600 text-sm leading-relaxed mb-8">
              {equipo.descripcion}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/527551019938?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-rubik font-semibold py-3.5 px-6 rounded-xl transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultar por WhatsApp
              </a>
              <Link
                href="/#consignar"
                className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-kdm-orange-500 text-kdm-orange-600 font-rubik font-semibold py-3.5 px-6 rounded-xl hover:bg-kdm-orange-500 hover:text-white transition-colors"
              >
                Consignar mi equipo
              </Link>
            </div>

            {/* Trust mini */}
            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-oxford-100">
              <span className="text-xs font-nunito text-oxford-600">✓ Inspección técnica</span>
              <span className="text-xs font-nunito text-oxford-600">✓ Procedencia verificada</span>
              <span className="text-xs font-nunito text-oxford-600">✓ Respaldo KDM</span>
            </div>
          </div>
        </div>

        {/* Similares */}
        {similares.length > 0 && (
          <div className="mt-20">
            <h2 className="font-rubik font-bold text-2xl text-oxford-950 mb-8">Equipo similar disponible</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similares.map((s) => {
                const waSimilar = encodeURIComponent(
                  `Hola, me interesa el ${s.nombre} ${s.ano}. ¿Sigue disponible?`
                )
                const sPrecio = Number(s.precio)
                return (
                  <div key={s.id} className="bg-white rounded-2xl border border-oxford-100 overflow-hidden hover:shadow-md transition-shadow">
                    <Link href={`/equipo/${s.id}`} className="relative block aspect-video overflow-hidden bg-oxford-100">
                      {s.imagen_principal && (
                        <Image
                          src={s.imagen_principal}
                          alt={s.nombre}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                    </Link>
                    <div className="p-5">
                      <Link href={`/equipo/${s.id}`}>
                        <h3 className="font-rubik font-semibold text-oxford-950 text-base hover:text-kdm-orange-600 transition-colors">
                          {s.nombre}
                        </h3>
                      </Link>
                      <div className="flex gap-3 mt-1 text-xs text-oxford-400 font-nunito">
                        <span>Año {s.ano}</span>
                        <span>·</span>
                        <span>{s.horas.toLocaleString('es-MX')} hrs</span>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="font-rubik font-bold text-kdm-orange-600">
                          ${sPrecio.toLocaleString('es-MX')} MXN
                        </span>
                        <a
                          href={`https://wa.me/527551019938?text=${waSimilar}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
                        >
                          Consultar →
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
