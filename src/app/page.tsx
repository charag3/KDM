'use client'

import { useState } from 'react'
import WhatsAppButton from '@/components/shared/WhatsAppButton'

const KUBOTA_MODELS = [
  { id: 'l', name: 'Serie L', range: '35-55 HP', desc: 'Compacta, eficiente' },
  { id: 'm', name: 'Serie M', range: '60-95 HP', desc: 'Versátil, confiable' },
  { id: 'ub', name: 'Serie UB', range: '100-140 HP', desc: 'Potente, especializada' },
]

function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-kdm-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="text-lg font-bold text-kdm-green-900">KDM Seminuevos</div>
        <a href="https://wa.me/5215551234567" className="text-sm font-medium text-kdm-green-700 hover:text-kdm-orange-600 transition-colors">
          WhatsApp
        </a>
      </div>
    </nav>
  )
}

function Hero() {
  const [selected, setSelected] = useState<string | null>(null)

  function handleSelect(modelId: string) {
    setSelected(modelId)
    setTimeout(() => {
      window.location.href = `/marketplace?model=${modelId}`
    }, 300)
  }

  return (
    <section className="relative min-h-[100dvh] bg-gradient-to-b from-kdm-green-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto w-full space-y-12">

        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-kdm-green-900 leading-tight">
            ¿Qué tractor buscas?
          </h1>
          <p className="text-lg sm:text-xl text-kdm-neutral-600 max-w-2xl leading-relaxed">
            Encuentra el equipo Kubota perfecto para tu operación. Vende tu tractor viejo y compra el nuevo en un solo lugar.
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {KUBOTA_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => handleSelect(model.id)}
                className={`relative group overflow-hidden rounded-lg p-6 transition-all duration-300 transform ${
                  selected === model.id
                    ? 'bg-kdm-green-900 text-white shadow-2xl scale-105'
                    : 'bg-white border-2 border-kdm-green-200 text-kdm-green-900 hover:border-kdm-green-700 hover:shadow-lg'
                }`}
              >
                <div className="space-y-2 text-left">
                  <div className="text-2xl font-bold">{model.name}</div>
                  <div className={`text-sm font-mono ${selected === model.id ? 'text-kdm-neutral-100' : 'text-kdm-neutral-500'}`}>
                    {model.range}
                  </div>
                  <div className={`text-sm ${selected === model.id ? 'text-kdm-neutral-200' : 'text-kdm-neutral-600'}`}>
                    {model.desc}
                  </div>
                </div>
                {selected !== model.id && (
                  <div className="absolute top-0 right-0 w-12 h-12 bg-kdm-orange-500 opacity-0 group-hover:opacity-10 transition-opacity rounded-bl-full" />
                )}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-kdm-neutral-500">
            Selecciona tu modelo para ver tractores seminuevos disponibles
          </p>
        </div>

        <div className="border-t border-kdm-neutral-200 pt-12 space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-kdm-green-900">¿Tienes un tractor viejo?</h2>
            <p className="text-kdm-neutral-600 max-w-2xl mx-auto">
              Consignalo con nosotros y obtén el mejor precio. Nuestro equipo se encarga de todo el trámite.
            </p>
          </div>
          <div className="flex justify-center">
            <a
              href="https://wa.me/5215551234567?text=Me%20interesa%20consignar%20mi%20tractor%20viejo"
              className="inline-flex items-center gap-3 px-8 py-3 bg-kdm-orange-600 text-white font-medium rounded-lg hover:bg-kdm-orange-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.782 1.276c-1.314.687-2.518 1.645-3.426 2.862-.909 1.217-1.5 2.632-1.733 4.148-.233 1.515.048 3.038.823 4.418.775 1.38 1.993 2.546 3.46 3.285 1.466.738 3.12 1.031 4.749.757 1.63-.274 3.122-1.102 4.228-2.338.906-1.007 1.549-2.237 1.856-3.582.307-1.345.211-2.76-.278-4.066a9.827 9.827 0 00-2.933-4.362 9.844 9.844 0 00-4.36-2.396z"/>
              </svg>
              Quiero consignar mi tractor
            </a>
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </section>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
    </div>
  )
}
