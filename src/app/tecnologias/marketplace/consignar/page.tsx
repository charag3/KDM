// Página de consignación — /tecnologias/marketplace/consignar
//
// Estructura:
//   1. Header — título + explicación del proceso de consignación
//   2. 3 pasos del proceso (visual de steps)
//   3. ConsignForm — formulario completo
//
// La notificación al equipo KDM va vía CallMeBot (WhatsApp)
// Conectar form con Server Action en siguiente sesión

import ConsignForm from '@/components/tecnologias/ConsignForm'

export default function ConsignarPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 font-nunito mb-6">
        <a href="/tecnologias" className="hover:text-agro-green transition-colors duration-300">KDM Tecnologías</a>
        <span className="mx-2">/</span>
        <a href="/tecnologias/marketplace" className="hover:text-agro-green transition-colors duration-300">Usados</a>
        <span className="mx-2">/</span>
        <span className="text-gray-600">Consignar</span>
      </nav>

      {/* Header */}
      <h1 className="font-rubik font-bold text-4xl text-gray-900 mb-4">
        Consigna tu <span className="text-agro-green">tractor</span>
      </h1>
      <p className="text-gray-500 font-nunito text-lg max-w-2xl mb-10">
        Sin costo hasta que vendamos. Publicamos tu tractor en nuestro sitio y redes.
        Nos encargamos de mostrar la unidad y cerrar el trato.
      </p>

      {/* Steps del proceso */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            num: '01',
            titulo: 'Llena el formulario',
            desc: 'Cuéntanos sobre tu tractor: modelo, año, condición y precio esperado.',
          },
          {
            num: '02',
            titulo: 'Revisión técnica',
            desc: 'Nuestro equipo revisa la unidad y acuerdan el precio final de lista.',
          },
          {
            num: '03',
            titulo: 'Vendemos por ti',
            desc: 'Publicamos, atendemos compradores y te avisamos cuando esté vendido.',
          },
        ].map((step) => (
          <div key={step.num} className="flex gap-4">
            <span className="font-rubik font-bold text-3xl text-agro-green/30 flex-shrink-0">
              {step.num}
            </span>
            <div>
              <h3 className="font-rubik font-semibold text-gray-900 mb-1">{step.titulo}</h3>
              <p className="text-sm text-gray-500 font-nunito leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="font-rubik font-bold text-2xl text-gray-900 mb-6">
          Datos de tu tractor
        </h2>
        <ConsignForm />
      </div>

      {/* Nota legal */}
      <p className="text-xs text-gray-400 font-nunito mt-6 text-center">
        Al enviar este formulario, aceptas que KDM Tecnologías contacte tu número para
        coordinar la revisión técnica de la unidad. Datos usados únicamente para este proceso.
      </p>
    </div>
  )
}
