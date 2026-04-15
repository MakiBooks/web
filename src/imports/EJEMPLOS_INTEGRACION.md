# Ejemplos de Integración - Maki Book

## 🎯 Casos de Uso Comunes

### 1. Integrar en una Aplicación Next.js

```tsx
// app/book-crossing/page.tsx
'use client';

import dynamic from 'next/dynamic';

// Importar MapView sin SSR (Leaflet requiere window)
const MapView = dynamic(() => import('@/components/MapView').then(mod => ({ default: mod.MapView })), {
  ssr: false,
  loading: () => <div>Cargando mapa...</div>
});

export default function BookCrossingPage() {
  const [locations, setLocations] = useState([]);
  
  return (
    <div className="h-screen">
      <MapView locations={locations} onLocationClick={(loc) => console.log(loc)} />
    </div>
  );
}
```

### 2. Integrar con React Router

```tsx
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MakiBook from './pages/MakiBook';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-crossing" element={<MakiBook />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 3. Integrar Solo el Mapa (Sin UI Externa)

```tsx
// MiniMapWidget.tsx
import { MapView } from './components/MapView';
import { useState, useEffect } from 'react';
import { fetchGoogleSheetsData } from './utils/googleSheets';

export function MiniMapWidget({ height = '400px' }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchGoogleSheetsData().then(setLocations);
  }, []);

  return (
    <div style={{ height, width: '100%' }}>
      <MapView 
        locations={locations}
        onLocationClick={(loc) => window.open(`/detalle/${loc.id}`, '_blank')}
      />
    </div>
  );
}
```

### 4. Usar Tus Propios Datos (Sin Google Sheets)

```tsx
// MiMapaPersonalizado.tsx
import { MapView } from './components/MapView';
import type { BookLocation } from './data/streetData';

export function MiMapaPersonalizado() {
  const misUbicaciones: BookLocation[] = [
    {
      id: 1,
      street: "Tu Calle, 123",
      lat: 41.4355,
      lng: 2.1895,
      imageUrl: "https://example.com/image.jpg",
      hasBook: true,
      bookTitle: "Mi Libro",
      bookCode: "CODE001",
      bookSummary: "Descripción del libro"
    }
  ];

  return (
    <MapView 
      locations={misUbicaciones}
      onLocationClick={(loc) => alert(loc.bookTitle)}
    />
  );
}
```

### 5. Personalizar Colores del Tema

```tsx
// CustomThemeMap.tsx
// Modifica el archivo MapView.tsx o crea un wrapper

import { MapView as OriginalMapView } from './components/MapView';

export function CustomThemeMap(props) {
  return (
    <div className="custom-theme">
      <OriginalMapView {...props} />
      
      <style>{`
        .custom-theme {
          /* Cambiar colores de gradientes */
          --color-primary: #3b82f6; /* blue-500 */
          --color-secondary: #8b5cf6; /* purple-500 */
        }
        
        /* Override de clases específicas */
        .custom-theme .bg-gradient-to-r.from-rose-500 {
          background: linear-gradient(to right, var(--color-primary), var(--color-secondary)) !important;
        }
      `}</style>
    </div>
  );
}
```

### 6. Integrar con Redux/Context API

```tsx
// BookCrossingContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { fetchGoogleSheetsData } from './utils/googleSheets';
import type { BookLocation } from './data/streetData';

interface BookCrossingContextType {
  locations: BookLocation[];
  selectedLocation: BookLocation | null;
  setSelectedLocation: (loc: BookLocation | null) => void;
  refreshLocations: () => Promise<void>;
  isLoading: boolean;
}

const BookCrossingContext = createContext<BookCrossingContextType | null>(null);

export function BookCrossingProvider({ children }) {
  const [locations, setLocations] = useState<BookLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<BookLocation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshLocations = async () => {
    setIsLoading(true);
    try {
      const data = await fetchGoogleSheetsData();
      setLocations(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshLocations();
  }, []);

  return (
    <BookCrossingContext.Provider value={{
      locations,
      selectedLocation,
      setSelectedLocation,
      refreshLocations,
      isLoading
    }}>
      {children}
    </BookCrossingContext.Provider>
  );
}

export const useBookCrossing = () => {
  const context = useContext(BookCrossingContext);
  if (!context) throw new Error('useBookCrossing must be used within BookCrossingProvider');
  return context;
};

// Uso:
// <BookCrossingProvider>
//   <MakiBookApp />
// </BookCrossingProvider>
```

### 7. Crear API Endpoints (Backend)

```typescript
// pages/api/locations.ts (Next.js API Route)
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchGoogleSheetsData } from '@/utils/googleSheets';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const locations = await fetchGoogleSheetsData();
    res.status(200).json({ success: true, data: locations });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch locations' });
  }
}

// Luego en tu componente:
// const response = await fetch('/api/locations');
// const { data } = await response.json();
```

### 8. Añadir Filtros y Búsqueda

```tsx
// FilteredMapView.tsx
import { useState, useMemo } from 'react';
import { MapView } from './components/MapView';
import type { BookLocation } from './data/streetData';

export function FilteredMapView({ locations }: { locations: BookLocation[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const filteredLocations = useMemo(() => {
    return locations.filter(loc => {
      const matchesSearch = 
        loc.street.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loc.bookTitle?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesAvailability = !showOnlyAvailable || loc.hasBook;
      
      return matchesSearch && matchesAvailability;
    });
  }, [locations, searchTerm, showOnlyAvailable]);

  return (
    <div>
      {/* Barra de filtros */}
      <div className="p-4 bg-white shadow-md">
        <input
          type="text"
          placeholder="Buscar por calle o libro..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        
        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={showOnlyAvailable}
            onChange={(e) => setShowOnlyAvailable(e.target.checked)}
          />
          Solo mostrar libros disponibles
        </label>
        
        <p className="text-sm text-gray-600 mt-2">
          Mostrando {filteredLocations.length} de {locations.length} ubicaciones
        </p>
      </div>

      {/* Mapa filtrado */}
      <div className="flex-1">
        <MapView 
          locations={filteredLocations}
          onLocationClick={(loc) => console.log(loc)}
        />
      </div>
    </div>
  );
}
```

### 9. Añadir Modo Oscuro

```tsx
// DarkModeMapView.tsx
import { useState } from 'react';
import { MapView } from './components/MapView';

export function DarkModeMapView({ locations }) {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="bg-white dark:bg-slate-900 transition-colors">
        <button
          onClick={() => setIsDark(!isDark)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
        >
          Toggle Dark Mode
        </button>
        
        <MapView locations={locations} onLocationClick={(loc) => {}} />
      </div>

      <style>{`
        .dark .leaflet-tile {
          filter: invert(1) hue-rotate(180deg);
        }
      `}</style>
    </div>
  );
}
```

### 10. Exportar Datos a JSON/CSV

```tsx
// ExportButton.tsx
import type { BookLocation } from './data/streetData';

export function ExportButton({ locations }: { locations: BookLocation[] }) {
  const exportToJSON = () => {
    const dataStr = JSON.stringify(locations, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'maki-book-locations.json';
    link.click();
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Street', 'Latitude', 'Longitude', 'Has Book', 'Title', 'Code', 'Summary'];
    const rows = locations.map(loc => [
      loc.id,
      loc.street,
      loc.lat,
      loc.lng,
      loc.hasBook ? '1' : '0',
      loc.bookTitle || '',
      loc.bookCode || '',
      loc.bookSummary || ''
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'maki-book-locations.csv';
    link.click();
  };

  return (
    <div className="flex gap-2">
      <button onClick={exportToJSON} className="px-4 py-2 bg-blue-500 text-white rounded">
        Export JSON
      </button>
      <button onClick={exportToCSV} className="px-4 py-2 bg-green-500 text-white rounded">
        Export CSV
      </button>
    </div>
  );
}
```

### 11. Cambiar el Provider de Mapas

```tsx
// En MapView.tsx, reemplaza el tile layer:

// OpenStreetMap (actual)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// Alternativas:

// CartoDB Dark
L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  attribution: '&copy; CartoDB',
}).addTo(map);

// CartoDB Light
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: '&copy; CartoDB',
}).addTo(map);

// Stamen Terrain
L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
  attribution: '&copy; Stamen Design',
}).addTo(map);
```

### 12. Añadir Notificaciones con Sonner

```tsx
// Ya está instalado en el proyecto
import { toast } from 'sonner';

// En tu componente
const handleLocationClick = (location: BookLocation) => {
  if (location.hasBook) {
    toast.success(`Libro disponible: ${location.bookTitle}`);
  } else {
    toast.info('No hay libro disponible en esta ubicación');
  }
  
  setSelectedLocation(location);
};
```

## 🎨 Personalización Avanzada

### Cambiar Iconos de Marcadores

```tsx
// En MapView.tsx, función createCustomIcon():

// Reemplazar emoji con SVG
html: `
  <div style="...">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
  </div>
`

// O usar Lucide icons
import { BookOpen } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';

const iconHtml = ReactDOMServer.renderToString(<BookOpen size={16} />);
```

---

**💡 Tip:** Combina estos ejemplos según tus necesidades. Todos son compatibles entre sí.
