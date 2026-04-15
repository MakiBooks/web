import { useState, useEffect, useMemo, useCallback } from "react";
import { MapView } from "./MapView";
import { LocationModal } from "./LocationModal";
import type { BookLocation } from "../data/streetData";
import { streetLocations } from "../data/streetData";
import { BookOpen, RefreshCw } from "lucide-react";
import { fetchGoogleSheetsData } from "../utils/googleSheets";

export function InteractiveMap() {
  const [locations, setLocations] = useState<BookLocation[]>(streetLocations);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState<'local' | 'sheets'>('local');

  const selectedLocation = useMemo(
    () => locations.find(loc => loc.id === selectedId) ?? null,
    [locations, selectedId]
  );

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchGoogleSheetsData();
      if (Array.isArray(data) && data.length > 0) {
        setLocations(data);
        setDataSource('sheets');
        console.log('✓ Dades carregades desde Google Sheets:', data.length, 'ubicacions');
      } else {
        console.log('⚠ No s\'han pogut carregar dades de Google Sheets, utilitzant dades locals');
        setDataSource('local');
      }
    } catch (error) {
      console.error("✗ Error carregant dades de Google Sheets:", error);
      setDataSource('local');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLocationClick = useCallback((loc: BookLocation) => {
    setSelectedId(loc.id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedId(null);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col font-sans bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white p-6 shadow-2xl z-10 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl"></div>

        <div className="relative flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl shadow-lg">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight drop-shadow-lg">Maki Book</h1>
              <p className="text-sm text-white/90 font-medium mt-1">
                📚 Seguiment de llibres compartits · Sant Andreu, Barcelona
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {!isLoading && (
              <button
                onClick={loadData}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-white/20"
                title="Refrescar dades"
              >
                <RefreshCw className="h-5 w-5" />
                <span className="text-sm font-semibold">Refrescar</span>
              </button>
            )}

            {isLoading && (
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border border-white/20">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
                <span className="text-sm font-semibold">Actualitzant...</span>
              </div>
            )}

            <div className="text-xs bg-white/20 backdrop-blur-sm px-4 py-2.5 rounded-xl hidden md:flex items-center gap-2 shadow-lg border border-white/20">
              <span className="text-lg">
                {dataSource === 'sheets' ? '📊' : '💾'}
              </span>
              <span className="font-semibold">
                {dataSource === 'sheets' ? 'Google Sheets' : 'Dades locals'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 relative">
        <MapView
          locations={locations}
          onLocationClick={handleLocationClick}
        />
      </main>

      <footer className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-slate-300 p-4 text-center border-t border-slate-700/50 shadow-2xl">
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl">📍</span>
          <span className="text-sm font-medium">
            Clica als marcadors per veure detalls dels punts d'intercanvi
          </span>
          <span className="text-2xl">📖</span>
        </div>
      </footer>

      <LocationModal location={selectedLocation} onClose={handleCloseModal} />
    </div>
  );
}
