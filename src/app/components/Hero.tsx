import { BookHeart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm">
              <BookHeart className="h-4 w-4" />
              Comparte la pasión por la lectura
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              Libera un libro, 
              <span className="text-emerald-600"> comparte una historia</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Únete a la comunidad de book crossing más grande. Intercambia libros, descubre nuevas lecturas y conecta con otros amantes de la literatura.
            </p>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-gray-900">12K+</div>
                <div className="text-sm text-gray-600">Libros Compartidos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">8K+</div>
                <div className="text-sm text-gray-600">Lectores Activos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">45+</div>
                <div className="text-sm text-gray-600">Países</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1763368230669-3a2e97368032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYm9va3MlMjBsaWJyYXJ5fGVufDF8fHx8MTc3NDIzNTI3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Biblioteca de libros" 
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-emerald-200 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-teal-200 rounded-full blur-3xl opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
