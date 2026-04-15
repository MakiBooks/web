import { BookOpen } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-emerald-600" />
          <span className="text-2xl font-bold text-emerald-600">Maki Book</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#inicio" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            Inicio
          </a>
          <a href="#como-funciona" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            Cómo Funciona
          </a>
          <a href="#libros" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            Libros
          </a>
          <a href="#formulario" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            Formulario
          </a>
        </nav>

        <div className="flex items-center gap-4">
        </div>
      </div>
    </header>
  );
}
