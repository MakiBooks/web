import { useState, useEffect, useMemo, useCallback } from "react";
import { MapView } from "./components/MapView";
import { LocationModal } from "./components/LocationModal";
import { AddLocationModal } from "./components/AddLocationModal";
import type { BookLocation } from "./data/streetData";
import { streetLocations } from "./data/streetData";
import { BookOpen } from "lucide-react";
import { fetchGoogleSheetsData } from "./utils/googleSheets";

export default function App() {
  const [locations, setLocations] = useState<BookLocation[]>(streetLocations);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 Derivado
  const selectedLocation = useMemo(() => {
    if (selectedId === null) return null;
    return locations.find(loc => loc.id === selectedId) ?? null;
  }, [locations, selectedId]);

  // 🔹 Fetch de datos
  const loadData = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await fetchGoogleSheetsData();

      if (Array.isArray(data) && data.length) {
        setLocations(data);
      }
    } catch (error) {
      console.error("Error carregant dades:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 🔹 Handlers memoizados
  const handleLocationClick = useCallback((loc: BookLocation) => {
    setSelectedId(loc.id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedId(null);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col font-sans">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 shadow-lg z-10">
        <div className="container mx-auto flex items-center gap-3">
          <BookOpen className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">Maki Book</h1>
            <p className="text-sm text-red-100 opacity-90">
              Seguiment de llibres compartits al barri
            </p>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 relative">
        {isLoading && <LoadingOverlay />}

        <MapView
          locations={locations}
          isAddMode={false}
          onLocationClick={handleLocationClick}
          onToggleAddMode={noop}
          onAddPoint={noop}
          onAddByAddress={noop}
        />
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 p-3 text-center text-sm">
        👀 Mode visualització (no es pot editar)
      </footer>

      {/* MODALS */}
      <LocationModal
        location={selectedLocation}
        onClose={handleCloseModal}
      />

      <AddLocationModal
        isOpen={false}
        coordinates={null}
        onClose={noop}
        onAdd={noop}
      />
    </div>
  );
}

/* 🔹 Componentes auxiliares */

function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto mb-4" />
        <p className="text-slate-700 font-medium">Carregant mapa...</p>
      </div>
    </div>
  );
}

// Evita recrear funciones vacías en cada render
const noop = () => {};