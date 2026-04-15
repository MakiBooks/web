import { BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-8 w-8 text-emerald-500" />
              <span className="text-xl font-bold text-white">Maki Book</span>
            </div>
            <p className="text-sm text-gray-400">
              Conectando lectores a través del intercambio de libros desde 2015
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 Maki Book. Todos los derechos reservados. Hecho con ❤️ para los amantes de los libros.</p>
        </div>
      </div>
    </footer>
  );
}
