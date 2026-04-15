import { X } from "lucide-react";
import type { BookLocation } from "../data/streetData";

interface LocationModalProps {
  location: BookLocation | null;
  onClose: () => void;
}

export function LocationModal({ location, onClose }: LocationModalProps) {
  if (!location) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden transform transition-all animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con gradiente y decoración */}
        <div className="relative bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 text-white p-6 overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
          
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight drop-shadow-lg">Detalls del llibre</h2>
              <p className="text-white/80 text-sm mt-1">Informació completa de la ubicació</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-110 backdrop-blur-sm"
              aria-label="Tancar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Contenido del modal */}
        <div className="p-8 space-y-6 bg-gradient-to-br from-white to-slate-50">
          {location.bookCode && (
            <div className="group">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                Codi
              </h3>
              <div className="bg-gradient-to-r from-slate-100 to-slate-50 p-4 rounded-xl border-2 border-slate-200 group-hover:border-rose-300 transition-colors">
                <p className="text-2xl font-mono font-bold text-slate-800 tracking-wide">{location.bookCode}</p>
              </div>
            </div>
          )}

          {location.bookTitle && (
            <div className="group">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                Llibre
              </h3>
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl border-2 border-pink-200 group-hover:border-pink-400 transition-colors">
                <p className="text-xl font-bold text-slate-900">{location.bookTitle}</p>
              </div>
            </div>
          )}

          <div className="group">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              Ubicació
            </h3>
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border-2 border-purple-200 group-hover:border-purple-400 transition-colors">
              <p className="text-base font-semibold text-slate-700 flex items-center gap-2">
                <span className="text-xl">📍</span>
                {location.street}
              </p>
            </div>
          </div>

          {location.bookSummary && (
            <div className="group">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                Resum
              </h3>
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl border-2 border-indigo-200 group-hover:border-indigo-400 transition-colors">
                <p className="text-sm text-slate-700 leading-relaxed">
                  {location.bookSummary}
                </p>
              </div>
            </div>
          )}

          {/* Estado del libro con diseño premium */}
          <div className="pt-2">
            <div
              className={`relative overflow-hidden inline-flex items-center gap-3 px-5 py-3 rounded-2xl text-base font-bold shadow-lg border-2 transition-all duration-300 hover:scale-105 ${
                location.hasBook
                  ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white border-rose-300 shadow-rose-200"
                  : "bg-gradient-to-r from-slate-200 to-slate-300 text-slate-700 border-slate-300 shadow-slate-200"
              }`}
            >
              {/* Decoración de fondo */}
              <div className="absolute inset-0 bg-white/10"></div>
              
              <span
                className={`relative z-10 h-3 w-3 rounded-full animate-pulse ${
                  location.hasBook ? "bg-white shadow-lg shadow-white/50" : "bg-slate-500"
                }`}
              />
              <span className="relative z-10">
                {location.hasBook ? "✓ Llibre disponible" : "○ Sense llibre"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer con botón mejorado */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-8 py-5 flex justify-end border-t border-slate-200">
          <button
            onClick={onClose}
            className="group px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 font-bold shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
          >
            <span>Tancar</span>
            <X className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}