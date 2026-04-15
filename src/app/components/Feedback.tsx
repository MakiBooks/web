import { MessageSquare } from "lucide-react";

export function Feedback() {
  return (
    <section id="formulario" className="py-20 bg-gradient-to-b from-white to-emerald-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm mb-4">
            <MessageSquare className="w-4 h-4" />
            Tu opinión importa
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Feedback
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ayúdanos a mejorar Maki Book. Comparte tus experiencias, sugerencias o cualquier comentario que tengas
          </p>
        </div>

        {/* Google Forms iframe */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-emerald-800">
            <iframe
              src="https://docs.google.com/forms/d/12rowR3FdqSKu7Gb_-TJJoqbya_QRbYQ-hz9UNESXVw4/viewform?embedded=true"
              width="100%"
              height="900"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Formulario de Feedback - Maki Book"
              className="w-full"
              loading="lazy"
            >
              Cargando…
            </iframe>
          </div>

          {/* Info adicional */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100 text-center">
              <div className="text-3xl mb-2">💬</div>
              <h3 className="font-semibold text-gray-900 mb-1">Comparte</h3>
              <p className="text-sm text-gray-600">Tu experiencia con el book crossing</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100 text-center">
              <div className="text-3xl mb-2">💡</div>
              <h3 className="font-semibold text-gray-900 mb-1">Sugiere</h3>
              <p className="text-sm text-gray-600">Ideas para mejorar el servicio</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100 text-center">
              <div className="text-3xl mb-2">🌟</div>
              <h3 className="font-semibold text-gray-900 mb-1">Mejora</h3>
              <p className="text-sm text-gray-600">Ayúdanos a crecer juntos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}