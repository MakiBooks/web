import { Button } from "./ui/button";
import { useState, useRef } from "react";
import mapImage from "figma:asset/0bc09c8f7b452d0aeb64e89a27b8612445ba44f9.png";

interface MapViewProps {
  onLocationClick: (location: BookLocation) => void;
  locations: BookLocation[];
  isAddMode: boolean;
  onToggleAddMode: () => void;
  onAddPoint: (lat: number, lng: number) => void;
  onAddByAddress?: () => void;
}

export function MapView({
  onLocationClick,
  locations,
  isAddMode,
  onToggleAddMode,
  onAddPoint,
  onAddByAddress,
}: MapViewProps) {
  // Estado para pan y zoom
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  // Calcular límites del mapa
  const lats = locations.map((l) => l.lat);
  const lngs = locations.map((l) => l.lng);
  const minLat = lats.length > 0 ? Math.min(...lats) : 41.4;
  const maxLat = lats.length > 0 ? Math.max(...lats) : 41.5;
  const minLng = lngs.length > 0 ? Math.min(...lngs) : 2.1;
  const maxLng = lngs.length > 0 ? Math.max(...lngs) : 2.2;

  // Función para convertir coordenadas geográficas a píxeles
  const coordToPixel = (lat: number, lng: number) => {
    const width = 800;
    const height = 600;
    const padding = 50;

    // Prevent division by zero
    const lngRange = maxLng - minLng || 0.1;
    const latRange = maxLat - minLat || 0.1;

    const x =
      ((lng - minLng) / lngRange) *
        (width - 2 * padding) +
      padding;
    const y =
      ((maxLat - lat) / latRange) *
        (height - 2 * padding) +
      padding;

    return { x, y };
  };

  // Función para convertir píxeles a coordenadas geográficas
  const pixelToCoord = (x: number, y: number) => {
    const width = 800;
    const height = 600;
    const padding = 50;

    // Prevent division by zero
    const lngRange = maxLng - minLng || 0.1;
    const latRange = maxLat - minLat || 0.1;

    const lng =
      ((x - padding) / (width - 2 * padding)) *
        lngRange +
      minLng;
    const lat =
      maxLat -
      ((y - padding) / (height - 2 * padding)) *
        latRange;

    return { lat, lng };
  };

  const handleMapClick = (
    e: React.MouseEvent<SVGSVGElement>,
  ) => {
    if (!isAddMode) return;

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 800;
    const y = ((e.clientY - rect.top) / rect.height) * 600;

    const { lat, lng } = pixelToCoord(x, y);
    onAddPoint(lat, lng);
  };

  const handleMouseDown = (
    e: React.MouseEvent<SVGSVGElement>,
  ) => {
    if (isAddMode) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (
    e: React.MouseEvent<SVGSVGElement>,
  ) => {
    if (!isDragging) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setPan({ x: pan.x + dx, y: pan.y + dy });
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 800;
    const y = ((e.clientY - rect.top) / rect.height) * 600;

    const delta = e.deltaY * -0.001;
    const newZoom = Math.max(0.5, Math.min(5, zoom + delta));

    setZoom(newZoom);
    setPan({
      x: pan.x - (x - 400) * (newZoom - zoom),
      y: pan.y - (y - 300) * (newZoom - zoom),
    });
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-sky-200 to-blue-300 flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-7xl h-full p-4">
        {/* Mapa SVG de Sant Andreu */}
        <div className="absolute inset-4 bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-slate-800">
          <svg
            viewBox="0 0 800 600"
            className="w-full h-full"
            style={{
              cursor: isAddMode
                ? "crosshair"
                : isDragging
                  ? "grabbing"
                  : "grab",
            }}
            onClick={handleMapClick}
            onMouseDown={handleMouseDown}
            //onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            ref={svgRef}
          >
            <g
              transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
            >
              {/* Mapa oficial de fondo */}
              <defs>
                <pattern
                  id="map-bg"
                  x="0"
                  y="0"
                  width="800"
                  height="600"
                  patternUnits="userSpaceOnUse"
                >
                  <image
                    href={mapImage}
                    width="800"
                    height="600"
                    preserveAspectRatio="xMidYMid meet"
                  />
                </pattern>
              </defs>

              {/* Fondo del mapa oficial */}
              <rect
                width="800"
                height="600"
                fill="url(#map-bg)"
              />

              {/* Overlay semitransparente para mejorar contraste */}
              <rect
                width="800"
                height="600"
                fill="#ffffff"
                opacity="0.15"
              />

              {/* Marco del mapa */}
              <rect
                width="800"
                height="600"
                fill="none"
                stroke="#475569"
                strokeWidth="2"
              />

              {/* Título del mapa */}
              <g>
                <rect
                  x="0"
                  y="0"
                  width="800"
                  height="70"
                  fill="#1e293b"
                  opacity="0.92"
                />
                <text
                  x="400"
                  y="32"
                  textAnchor="middle"
                  fontSize="32"
                  fontWeight="bold"
                  fill="#fbbf24"
                >
                  MAKI BOOK
                </text>
                <text
                  x="400"
                  y="50"
                  textAnchor="middle"
                  fontSize="13"
                  fill="#cbd5e1"
                >
                  Sant Andreu - Barcelona
                </text>
                <text
                  x="400"
                  y="62"
                  textAnchor="middle"
                  fontSize="9"
                  fill="#94a3b8"
                >
                  Red de intercambio de libros compartidos
                </text>
              </g>

              {/* Marcadores de ubicación con efecto 3D */}
              {locations.map((location) => {
                const { x, y } = coordToPixel(
                  location.lat,
                  location.lng,
                );
                const scale = 1.5; // Escala para hacer los marcadores más grandes

                return (
                  <g
                    key={location.id}
                    onClick={(e) => {
                      if (!isAddMode) {
                        e.stopPropagation();
                        onLocationClick(location);
                      }
                    }}
                    style={{
                      cursor: isAddMode
                        ? "crosshair"
                        : "pointer",
                    }}
                    className="hover:scale-110 transition-transform"
                  >
                    {/* Sombra del marcador */}
                    <ellipse
                      cx={x + 3}
                      cy={y + 30}
                      rx={18 * scale}
                      ry={6 * scale}
                      fill="black"
                      opacity="0.3"
                    />

                    {/* Pin del marcador (estilo Google Maps) - más grande */}
                    <path
                      d={`M ${x} ${y - 37.5} C ${x - 22.5} ${y - 37.5} ${x - 30} ${y - 22.5} ${x - 30} ${y - 7.5} C ${x - 30} ${y + 15} ${x} ${y + 22.5} ${x} ${y + 22.5} C ${x} ${y + 22.5} ${x + 30} ${y + 15} ${x + 30} ${y - 7.5} C ${x + 30} ${y - 22.5} ${x + 22.5} ${y - 37.5} ${x} ${y - 37.5} Z`}
                      fill={
                        location.hasBook ? "#dc2626" : "#9ca3af"
                      }
                      stroke="#7f1d1d"
                      strokeWidth="2"
                    />

                    {/* Brillo en el pin */}
                    <ellipse
                      cx={x - 7.5}
                      cy={y - 27}
                      rx={6}
                      ry={9}
                      fill="white"
                      opacity="0.4"
                    />

                    {/* Círculo central */}
                    <circle
                      cx={x}
                      cy={y - 15}
                      r={10.5}
                      fill="white"
                      opacity="0.95"
                    />

                    {/* Indicador de libro disponible */}
                    {location.hasBook && (
                      <g>
                        <circle
                          cx={x + 21}
                          cy={y - 30}
                          r={10.5}
                          fill="#22c55e"
                          stroke="white"
                          strokeWidth="3.5"
                        />
                        <text
                          x={x}
                          y={y - 15}
                          textAnchor="middle"
                          fontSize="13.5"
                          fill="white"
                          fontWeight="bold"
                        >
                          ✓
                        </text>
                      </g>
                    )}

                    {/* Número de ID del punto */}
                    <circle
                      cx={x}
                      cy={y - 15}
                      r={7.5}
                      fill={
                        location.hasBook ? "#dc2626" : "#6b7280"
                      }
                    />
                    <text
                      x={x}
                      y={y - 10.5}
                      textAnchor="middle"
                      fontSize="12"
                      fill="white"
                      fontWeight="bold"
                    >
                      {location.id}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Botones para añadir punto */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Button
              onClick={onToggleAddMode}
              variant={isAddMode ? "default" : "outline"}
              className={
                isAddMode
                  ? "bg-red-600 hover:bg-red-700 shadow-lg"
                  : "bg-white shadow-lg"
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              {isAddMode ? "Cancelar" : "Añadir en mapa"}
            </Button>
            {onAddByAddress && !isAddMode && (
              <Button
                onClick={onAddByAddress}
                variant="outline"
                className="bg-white shadow-lg"
              >
                <Search className="h-4 w-4 mr-2" />
                Añadir por dirección
              </Button>
            )}
          </div>

          {/* Instrucción cuando está en modo añadir */}
          {isAddMode && (
            <div className="absolute top-16 left-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-xl animate-pulse">
              <p className="text-sm font-medium">
                Haz clic en el mapa para añadir un punto
              </p>
            </div>
          )}

          {/* Leyenda mejorada */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur p-4 rounded-lg shadow-xl border-2 border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
              Leyenda
            </h4>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-red-600 border-2 border-white shadow"></div>
              <span className="text-sm">
                Con libro disponible
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gray-400 border-2 border-white shadow"></div>
              <span className="text-sm">Sin libros</span>
            </div>
          </div>

          {/* Brújula decorativa */}
          <div className="absolute top-20 right-4 bg-white/90 backdrop-blur p-3 rounded-full shadow-xl border-2 border-slate-300">
            <svg width="50" height="50" viewBox="0 0 50 50">
              <circle
                cx="25"
                cy="25"
                r="23"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="2"
              />
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="white"
                stroke="#94a3b8"
                strokeWidth="1"
              />
              {/* Norte */}
              <polygon
                points="25,8 28,20 25,18 22,20"
                fill="#dc2626"
              />
              <text
                x="25"
                y="7"
                textAnchor="middle"
                fontSize="10"
                fontWeight="bold"
                fill="#dc2626"
              >
                N
              </text>
              {/* Sur */}
              <polygon
                points="25,42 28,30 25,32 22,30"
                fill="#64748b"
              />
              {/* Este y Oeste */}
              <line
                x1="25"
                y1="25"
                x2="40"
                y2="25"
                stroke="#94a3b8"
                strokeWidth="1"
              />
              <line
                x1="25"
                y1="25"
                x2="10"
                y2="25"
                stroke="#94a3b8"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Indicador de zoom */}
          {!isAddMode && (
            <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-lg shadow-xl border-2 border-amber-600">
              <p className="text-xs font-semibold">
                📍 Haz clic en los puntos
              </p>
            </div>
          )}
        </div>

        {/* Lista de ubicaciones en sidebar */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-4 max-w-xs max-h-96 overflow-y-auto hidden lg:block">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-red-600" />
            Ubicaciones ({locations.length})
          </h3>
          <div className="space-y-2">
            {[...locations]
              .sort((a, b) => a.street.localeCompare(b.street))
              .map((location) => (
                <button
                  key={location.id}
                  onClick={() =>
                    !isAddMode && onLocationClick(location)
                  }
                  className="w-full text-left p-2 rounded hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                  disabled={isAddMode}
                >
                  <div className="text-sm font-medium">
                    {location.street}
                  </div>
                  <div className="text-xs text-gray-500">
                    {location.hasBook ? (
                      <span className="text-green-600">
                        ✓ Libro disponible
                      </span>
                    ) : (
                      <span>Sin libros</span>
                    )}
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}