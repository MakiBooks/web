import { useEffect, useRef, useState } from "react";
import { type BookLocation } from "../data/streetData";
import L from "leaflet";
import { MapPin } from "lucide-react";
import { StatsCard } from "./StatsCard";

interface MapViewProps {
  onLocationClick: (location: BookLocation) => void;
  locations: BookLocation[];
}

// Fix for default marker icons in Leaflet with React
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

// Custom icons for markers - Círculos elegantes con estilo moderno
const createCustomIcon = (hasBook: boolean) => {
  const color = hasBook ? "#ec4899" : "#94a3b8"; // Pink-500 or Slate-400
  const size = 20;
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        position: relative;
        width: ${size}px;
        height: ${size}px;
      ">
        <!-- Outer glow ring -->
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: ${size + 8}px;
          height: ${size + 8}px;
          background: ${color};
          border-radius: 50%;
          opacity: 0.2;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        "></div>
        
        <!-- Middle ring -->
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: ${size + 4}px;
          height: ${size + 4}px;
          background: ${color};
          border-radius: 50%;
          opacity: 0.3;
        "></div>
        
        <!-- Main circle -->
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: ${size}px;
          height: ${size}px;
          background: linear-gradient(135deg, ${color} 0%, ${hasBook ? '#db2777' : '#64748b'} 100%);
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        "
        onmouseover="this.style.transform='translate(-50%, -50%) scale(1.4)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.4)';"
        onmouseout="this.style.transform='translate(-50%, -50%) scale(1)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.3)';"
        >
          ${hasBook ? `
            <!-- Book icon for available books -->
            <div style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: white;
              font-size: 10px;
              font-weight: bold;
            ">📚</div>
          ` : ''}
        </div>
      </div>
      
      <style>
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.1;
            transform: translate(-50%, -50%) scale(1.3);
          }
        }
      </style>
    `,
    iconSize: [size + 8, size + 8],
    iconAnchor: [(size + 8) / 2, (size + 8) / 2],
    popupAnchor: [0, -(size + 8) / 2 - 10],
  });
};

export function MapView({ onLocationClick, locations }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize map
  useEffect(() => {
    if (!isClient || !mapRef.current || mapInstanceRef.current) return;

    // Centro de Sant Andreu, Barcelona
    const SANT_ANDREU_CENTER: [number, number] = [41.4355, 2.1895];
    
    // Create map
    const map = L.map(mapRef.current, {
      center: SANT_ANDREU_CENTER,
      zoom: 14,
      minZoom: 12,
      maxZoom: 18,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isClient]);

  // Update markers when locations change
  useEffect(() => {
    if (!mapInstanceRef.current || !locations.length) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    const newMarkers: L.Marker[] = [];

    locations.forEach((location) => {
      const marker = L.marker([location.lat, location.lng], {
        icon: createCustomIcon(location.hasBook),
      });

      // Create popup content
      const popupContent = document.createElement("div");
      popupContent.className = "p-1";
      popupContent.innerHTML = `
        <div class="bg-gradient-to-br from-white to-slate-50 rounded-xl p-4 min-w-[220px]">
          <div class="flex items-start gap-3 mb-3">
            <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-xl shadow-lg">
              📍
            </div>
            <div class="flex-1">
              <strong class="block text-sm font-black text-slate-800 mb-1">${location.street}</strong>
              ${location.bookTitle ? `
                <p class="text-xs text-slate-600 font-semibold flex items-center gap-1">
                  <span>📚</span>
                  <span>${location.bookTitle}</span>
                </p>
              ` : ""}
            </div>
          </div>
          
          <div class="mb-3 p-2.5 rounded-lg ${location.hasBook ? 'bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200' : 'bg-slate-100 border-2 border-slate-200'}">
            <p class="${location.hasBook ? "text-pink-700 font-bold" : "text-slate-600 font-semibold"} text-xs flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full ${location.hasBook ? 'bg-pink-600 animate-pulse' : 'bg-slate-400'}"></span>
              ${location.hasBook ? "✓ Llibre disponible" : "○ Sense llibre"}
            </p>
          </div>
        </div>
      `;

      const button = document.createElement("button");
      button.className = "w-full mt-2 text-xs bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold px-4 py-2.5 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 duration-200";
      button.textContent = "🔍 Veure tots els detalls";
      button.onclick = () => {
        onLocationClick(location);
      };
      popupContent.appendChild(button);

      marker.bindPopup(popupContent, {
        maxWidth: 280,
        className: 'custom-popup'
      });
      marker.on("click", () => {
        onLocationClick(location);
      });

      marker.addTo(mapInstanceRef.current!);
      newMarkers.push(marker);
    });

    // NO hacer fitBounds - mantener zoom y posición del usuario
    console.log(`🗺️ ${locations.length} marcadors afegits al mapa`);

    markersRef.current = newMarkers;
  }, [locations, onLocationClick]);

  if (!isClient) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-sky-200 to-blue-300 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl">Carregant mapa...</p>
        </div>
      </div>
    );
  }

  if (!locations || locations.length === 0) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-sky-200 to-blue-300 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl">Carregant ubicacions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full" style={{ minHeight: '400px' }}>
        <div ref={mapRef} className="w-full h-full" />

        {/* Stats Card - Nuevo componente flotante */}
        <StatsCard locations={locations} />

        {/* Leyenda mejorada con diseño premium */}
        <div className="absolute bottom-6 left-6 z-[1000] bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border-2 border-white/50 transform transition-all hover:scale-105 duration-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 animate-pulse"></div>
            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
              Llegenda del mapa
            </h4>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 border-3 border-white shadow-lg group-hover:scale-110 transition-transform"></div>
                <div className="absolute inset-0 rounded-full bg-pink-500 opacity-20 animate-ping"></div>
              </div>
              <span className="text-sm font-semibold text-slate-700">Llibre disponible</span>
            </div>
            
            <div className="flex items-center gap-3 group">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 border-3 border-white shadow-lg group-hover:scale-110 transition-transform"></div>
              <span className="text-sm font-semibold text-slate-700">Sense llibres</span>
            </div>
          </div>
          
          {/* Contador de ubicaciones */}
          <div className="mt-4 pt-4 border-t-2 border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Total</span>
              <span className="text-lg font-black text-slate-800">{locations.length}</span>
            </div>
          </div>
        </div>

        {/* Sidebar mejorado con diseño premium */}
        <div className="absolute right-6 top-6 z-[1000] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-sm w-80 max-h-[calc(100vh-200px)] overflow-hidden border-2 border-white/50 hidden lg:block">
          {/* Header del sidebar */}
          <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white p-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            
            <div className="relative flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-black text-lg tracking-tight">Ubicacions</h3>
                <p className="text-xs text-white/80 font-medium">{locations.length} punts d'intercanvi</p>
              </div>
            </div>
          </div>
          
          {/* Lista de ubicaciones con scroll */}
          <div className="overflow-y-auto max-h-[calc(100vh-320px)] p-4 space-y-2 custom-scrollbar">
            {[...locations]
              .sort((a, b) => {
                // Primero libros disponibles, luego por nombre
                if (a.hasBook === b.hasBook) {
                  return a.street.localeCompare(b.street);
                }
                return a.hasBook ? -1 : 1;
              })
              .map((location) => (
                <button
                  key={location.id}
                  onClick={() => onLocationClick(location)}
                  className="w-full text-left p-4 rounded-xl transition-all duration-300 border-2 hover:shadow-lg group bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:border-pink-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-3">
                    {/* Indicador de estado */}
                    <div className="flex-shrink-0 mt-0.5">
                      <div className={`w-3 h-3 rounded-full ${
                        location.hasBook 
                          ? 'bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg shadow-pink-300' 
                          : 'bg-gradient-to-br from-slate-400 to-slate-500'
                      } animate-pulse`}></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-slate-900 mb-1 truncate">
                        {location.street}
                      </div>
                      
                      {location.bookTitle && (
                        <div className="text-xs text-slate-600 mb-1 truncate">
                          📚 {location.bookTitle}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1">
                        <span className={`text-xs font-semibold ${
                          location.hasBook 
                            ? 'text-pink-600' 
                            : 'text-slate-500'
                        }`}>
                          {location.hasBook ? '✓ Disponible' : '○ No disponible'}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>
      
      {/* Estilos para scrollbar personalizado */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #ec4899 0%, #db2777 100%);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #db2777 0%, #be185d 100%);
        }
      `}</style>
    </div>
  );
}