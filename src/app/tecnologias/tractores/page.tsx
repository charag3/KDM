'use client'

// Catálogo de tractores Kubota — /tecnologias/tractores
//
// Secciones:
//   1. Header de página — título + descripción
//   2. TractorFilters — barra de filtros por serie y tracción
//   3. Grid de TractorCard — todos los tractores, filtrados
//   4. CTA inferior — cotización grupal por WhatsApp
//
// TODO: conectar filtros con estado real y filtrar tractores[]

import { useState } from 'react'
import TractorCard from '@/components/tecnologias/TractorCard'
import TractorFilters from '@/components/tecnologias/TractorFilters'
import { tractores } from '@/lib/data/tractores'

type Filtros = {
  serie: string | null
  traccion: string | null
}

export default function TractoresPage() {
  const [filtros, setFiltros] = useState<Filtros>({ serie: null, traccion: null })

  // Filtrado reactivo
  const tractoresFiltrados = tractores.filter((t) => {
    if (filtros.serie && t.serie !== filtros.serie) return false
    if (filtros.traccion && t.traccion !== filtros.traccion) return false
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <nav className="text-sm text-gray-400 font-nunito mb-4">
          <a href="/tecnologias" className="hover:text-agro-green transition-colors duration-300">KDM Tecnologías</a>
          <span className="mx-2">/</span>
          <span className="text-gray-600">Tractores</span>
        </nav>
        <h1 className="font-rubik font-bold text-4xl text-gray-900 mb-3">
          Tractores <span className="text-agro-green">Kubota</span>
        </h1>
        <p className="text-gray-500 font-nunito text-lg max-w-2xl">
          Distribuidor autorizado en Morelia. Series B, L y M para huerto, rancho y agricultura comercial.
          Todos los modelos con garantía de fábrica y soporte técnico certificado.
        </p>
      </div>

      {/* Filtros */}
      <div className="mb-8">
        <TractorFilters filtrosActivos={filtros} onFilterChange={setFiltros} />
      </div>

      {/* Resultados */}
      <div className="mb-4">
        <p className="text-sm text-gray-400 font-nunito">
          {tractoresFiltrados.length} modelo{tractoresFiltrados.length !== 1 ? 's' : ''} disponible{tractoresFiltrados.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Grid */}
      {tractoresFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tractoresFiltrados.map((tractor) => (
            <TractorCard key={tractor.id} tractor={tractor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="font-nunito text-lg">No hay modelos con esos filtros.</p>
          <button
            onClick={() => setFiltros({ serie: null, traccion: null })}
            className="mt-4 text-agro-green font-semibold hover:underline text-sm"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* CTA inferior */}
      <div className="bg-agro-green/5 border border-agro-green/20 rounded-lg p-8 text-center">
        <h3 className="font-rubik font-bold text-gray-900 text-2xl mb-2">
          ¿No encuentras el modelo que necesitas?
        </h3>
        <p className="text-gray-500 font-nunito mb-6">
          Contáctanos directamente. Podemos conseguir cualquier modelo de la línea Kubota.
        </p>
        <a
          href="https://wa.me/521XXXXXXXXXX?text=Hola%2C%20busco%20un%20tractor%20Kubota%20espec%C3%ADfico"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-agro-green text-white font-rubik font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:bg-agro-green-dark"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  )
}
