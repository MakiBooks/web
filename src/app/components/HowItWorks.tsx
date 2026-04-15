import { BookOpen, Users, RefreshCw, Heart } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: BookOpen,
      title: 'Registra tu Libro',
      description: 'Crea una cuenta y registra los libros que quieres compartir con la comunidad.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Users,
      title: 'Deja tu Libro',
      description: 'Coloca tu libro en un lugar público o envíalo directamente a otro lector.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: RefreshCw,
      title: 'Sigue su Viaje',
      description: 'Observa cómo tu libro viaja por el mundo y pasa por diferentes manos.',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: Heart,
      title: 'Encuentra Nuevos',
      description: 'Descubre libros dejados por otros y continúa el ciclo de compartir.',
      color: 'bg-pink-100 text-pink-600',
    },
  ];

  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Cómo Funciona?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            El book crossing es simple y mágico. Solo cuatro pasos para formar parte de un movimiento global.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center space-y-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${step.color}`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-600 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
