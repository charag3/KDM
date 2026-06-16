import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { inventarioSeminuevos } from '@/lib/data/inventario'

const condicionColor: Record<string, string> = {
  Excelente: 'bg-green-100 text-green-700',
  'Muy buena': 'bg-blue-100 text-blue-700',
  Buena: 'bg-yellow-100 text-yellow-700',
  Regular: 'bg-gray-100 text-gray-600',
}

export function generateStaticParams() {
  return inventarioSeminuevos.map((e) => ({ id: e.id }))
}

export default async function EquipoDetalle({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const equipo = inventarioSeminuevos.find((e) => e.id === id)
  if (!equipo) notFound()

  const waMsg = encodeURIComponent(
    `Hola, me interesa el ${equipo.nombre} ${equipo.año} que vi en KDM Seminuevos. ¿Sigue disponible?`
  )

  const similares = inventarioSeminuevos
    .filter((e) => e.id !== equipo.id && e.tipo === equipo.tipo)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      {/* Nav simple */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-rubik font-bold text-gray-900 text-xl tracking-tight">
            KDM<span className="text-agro-orange">.</span> Seminuevos
          </Link>
          <Link
            href="/#inventario"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
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
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-md">
            <Image
              src={equipo.imagen}
              alt={equipo.nombre}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${condicionColor[equipo.condicion]}`}>
              {equipo.condicion}
            </span>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {/* Breadcrumb */}
            <p className="font-nunito text-xs text-gray-400 mb-2 uppercase tracking-wider">
              KDM Seminuevos · {equipo.tipo === 'Tractor' ? 'Tractores' : 'Vehículos Offroad'}
            </p>

            <h1 className="font-rubik font-bold text-gray-900 text-3xl md:text-4xl leading-tight mb-2">
              {equipo.nombre}
            </h1>

            {/* Meta rápida */}
            <div className="flex gap-4 text-sm font-nunito text-gray-500 mb-6">
              <span>Año {equipo.año}</span>
              <span>·</span>
              <span>{equipo.horas.toLocaleString('es-MX')} horas de uso</span>
            </div>

            {/* Precio */}
            <div className="bg-agro-gray rounded-2xl p-6 mb-6">
              <p className="font-nunito text-xs text-gray-500 uppercase tracking-wider mb-1">Precio</p>
              <p className="font-rubik font-bold text-agro-green-dark text-4xl">
                ${equipo.precio.toLocaleString('es-MX')}
                <span className="text-lg font-normal text-gray-400 ml-1">MXN</span>
              </p>
              <p className="font-nunito text-xs text-gray-400 mt-1">Pregunta por opciones de financiamiento</p>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {equipo.specs.hp && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="font-nunito text-xs text-gray-400 mb-0.5">Potencia</p>
                  <p className="font-rubik font-bold text-gray-900">{equipo.specs.hp} HP</p>
                </div>
              )}
              {equipo.specs.traccion && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="font-nunito text-xs text-gray-400 mb-0.5">Tracción</p>
                  <p className="font-rubik font-bold text-gray-900">{equipo.specs.traccion}</p>
                </div>
              )}
              {equipo.specs.transmision && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="font-nunito text-xs text-gray-400 mb-0.5">Transmisión</p>
                  <p className="font-rubik font-bold text-gray-900">{equipo.specs.transmision}</p>
                </div>
              )}
              {equipo.specs.capacidad && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="font-nunito text-xs text-gray-400 mb-0.5">Capacidad</p>
                  <p className="font-rubik font-bold text-gray-900 text-sm">{equipo.specs.capacidad}</p>
                </div>
              )}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="font-nunito text-xs text-gray-400 mb-0.5">Marca</p>
                <p className="font-rubik font-bold text-gray-900">{equipo.specs.marca}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="font-nunito text-xs text-gray-400 mb-0.5">Condición</p>
                <p className={`font-rubik font-bold text-sm ${condicionColor[equipo.condicion].split(' ')[1]}`}>
                  {equipo.condicion}
                </p>
              </div>
            </div>

            {/* Descripción */}
            <p className="font-nunito text-gray-600 text-sm leading-relaxed mb-8">
              {equipo.descripcion}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/524430000000?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-rubik font-semibold py-3.5 px-6 rounded-xl transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultar por WhatsApp
              </a>
              <Link
                href="/#consignar"
                className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-agro-green text-agro-green font-rubik font-semibold py-3.5 px-6 rounded-xl hover:bg-agro-green hover:text-white transition-colors"
              >
                Consignar mi equipo
              </Link>
            </div>

            {/* Trust mini */}
            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-xs font-nunito text-gray-400">
                <svg className="w-3.5 h-3.5 text-agro-green/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
                Inspección técnica
              </div>
              <div className="flex items-center gap-1.5 text-xs font-nunito text-gray-400">
                <svg className="w-3.5 h-3.5 text-agro-green/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
                Procedencia verificada
              </div>
              <div className="flex items-center gap-1.5 text-xs font-nunito text-gray-400">
                <svg className="w-3.5 h-3.5 text-agro-green/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                Respaldo KDM
              </div>
            </div>
          </div>
        </div>

        {/* Similares */}
        {similares.length > 0 && (
          <div className="mt-20">
            <h2 className="font-rubik font-bold text-2xl text-gray-900 mb-8">Equipo similar disponible</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similares.map((s) => {
                const waSimilar = encodeURIComponent(
                  `Hola, me interesa el ${s.nombre} ${s.año}. ¿Sigue disponible?`
                )
                return (
                  <div key={s.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <Link href={`/equipo/${s.id}`} className="relative block aspect-video overflow-hidden bg-gray-100">
                      <Image
                        src={s.imagen}
                        alt={s.nombre}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </Link>
                    <div className="p-5">
                      <Link href={`/equipo/${s.id}`}>
                        <h3 className="font-rubik font-semibold text-gray-900 text-base hover:text-agro-green transition-colors">
                          {s.nombre}
                        </h3>
                      </Link>
                      <div className="flex gap-3 mt-1 text-xs text-gray-400 font-nunito">
                        <span>Año {s.año}</span>
                        <span>·</span>
                        <span>{s.horas.toLocaleString('es-MX')} hrs</span>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="font-rubik font-bold text-agro-green-dark">
                          ${s.precio.toLocaleString('es-MX')} MXN
                        </span>
                        <a
                          href={`https://wa.me/524430000000?text=${waSimilar}`}
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
