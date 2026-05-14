'use client'

// TractorFilters — Barra de filtros para catálogo de tractores
// Filtra por: Serie (B / L / M), Tracción (2WD / 4WD), Uso
//
// Estado manejado en el componente padre (tecnologias/tractores/page.tsx)
// Props:
//   - onFilterChange: callback con filtros seleccionados
//   - filtrosActivos: estado actual de filtros
//
// TODO: en la siguiente sesión, conectar con estado real y filtrar tractores[]

import { seriesDisponibles } from '@/lib/data/tractores'

type Filtros = {
  serie: string | null
  traccion: string | null
}

type TractorFiltersProps = {
  filtrosActivos: Filtros
  onFilterChange: (filtros: Filtros) => void
}

export default function TractorFilters({ filtrosActivos, onFilterChange }: TractorFiltersProps) {
  const traccionOpciones = ['2WD', '4WD']

  const handleSerie = (serie: string) => {
    onFilterChange({
      ...filtrosActivos,
      serie: filtrosActivos.serie === serie ? null : serie,
    })
  }

  const handleTraccion = (traccion: string) => {
    onFilterChange({
      ...filtrosActivos,
      traccion: filtrosActivos.traccion === traccion ? null : traccion,
    })
  }

  const activeClass = 'bg-agro-green text-white'
  const inactiveClass = 'bg-white text-gray-700 border border-gray-300 hover:border-agro-green'

  return (
    <div className="bg-gray-50 rounded-lg p-4 flex flex-wrap gap-6 items-center">
      {/* Filtro por Serie */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-500 mr-1">Serie:</span>
        {seriesDisponibles.map((serie) => (
          <button
            key={serie}
            onClick={() => handleSerie(serie)}
            className={`text-sm px-3 py-1.5 rounded transition-all duration-300 ${
              filtrosActivos.serie === serie ? activeClass : inactiveClass
            }`}
          >
            Serie {serie}
          </button>
        ))}
      </div>

      {/* Filtro por Tracción */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-500 mr-1">Tracción:</span>
        {traccionOpciones.map((op) => (
          <button
            key={op}
            onClick={() => handleTraccion(op)}
            className={`text-sm px-3 py-1.5 rounded transition-all duration-300 ${
              filtrosActivos.traccion === op ? activeClass : inactiveClass
            }`}
          >
            {op}
          </button>
        ))}
      </div>

      {/* Reset */}
      {(filtrosActivos.serie || filtrosActivos.traccion) && (
        <button
          onClick={() => onFilterChange({ serie: null, traccion: null })}
          className="text-sm text-agro-orange underline hover:no-underline transition-all duration-300"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  )
}
