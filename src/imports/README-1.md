# 📚 Maki Book - Sistema de Book Crossing Sant Andreu

> Aplicación web interactiva para el seguimiento de libros compartidos en el barrio de Sant Andreu, Barcelona

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1.12-38bdf8)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-green)

## ✨ Características

- 🗺️ **Mapa interactivo** con Leaflet mostrando puntos de intercambio de libros
- 📍 **Marcadores animados** con pulso y efectos hover
- 🔴 **Indicadores visuales** - círculos rojos (libro disponible) y grises (sin libro)
- 📊 **Integración con Google Sheets** - actualización en tiempo real de datos
- 🎨 **Diseño premium** con gradientes rosa-púrpura y efectos glassmorphism
- 📱 **Responsive** - sidebar colapsable en móviles
- 🔍 **Modal de detalles** con información completa de cada punto
- 📈 **StatsCard flotante** con estadísticas en tiempo real
- 🎯 **Geocodificación automática** de direcciones de Sant Andreu

## 🚀 Inicio Rápido

### Instalación

```bash
# Clonar el proyecto
tar -xzf maki-book-export.tar.gz
cd maki-book

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

### Construcción para Producción

```bash
pnpm build
```

## 📦 Estructura del Proyecto

```
maki-book/
├── src/
│   ├── app/
│   │   ├── App.tsx                  # Componente principal
│   │   ├── components/
│   │   │   ├── MapView.tsx          # Mapa interactivo con Leaflet
│   │   │   ├── LocationModal.tsx    # Modal de detalles
│   │   │   ├── StatsCard.tsx        # Tarjeta de estadísticas
│   │   │   └── ui/                  # Componentes UI de shadcn
│   │   ├── data/
│   │   │   └── streetData.ts        # Datos de ejemplo (fallback)
│   │   └── utils/
│   │       └── googleSheets.ts      # Integración Google Sheets
│   └── styles/
│       ├── index.css                # Estilos principales
│       ├── tailwind.css             # Config Tailwind
│       ├── theme.css                # Variables de tema
│       ├── fonts.css                # Fuentes
│       └── leaflet-custom.css       # Estilos del mapa
├── package.json
├── vite.config.ts
├── INTEGRACION.md                   # Guía de integración
├── EJEMPLOS_INTEGRACION.md          # Ejemplos de código
└── GOOGLE_SHEETS_CONFIG.md          # Config de Google Sheets
```

## 🎨 Tecnologías

### Core
- **React 18.3.1** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool

### UI & Styling
- **Tailwind CSS 4.1.12** - Framework CSS
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconos

### Mapa
- **Leaflet 1.9.4** - Librería de mapas
- **React-Leaflet 5.0.0** - Integración con React
- **OpenStreetMap** - Proveedor de tiles

### Extras
- **Motion** - Animaciones
- **Sonner** - Notificaciones toast

## 📊 Integración con Google Sheets

### Configuración

El proyecto está configurado para leer datos desde:
```
Sheet ID: 1pxOIesfv4LyxLpR8afXNR56S0z5Pgz9vZBUt1Nxph5c
```

### Estructura de Datos

| Columna | Contenido | Obligatorio |
|---------|-----------|-------------|
| A | Código del libro | No |
| B | Título del libro | No |
| C | Estado (1=disponible, 0=sin libro) | Sí |
| D | Dirección alternativa | Si F y G vacías |
| E | Resumen del libro | No |
| F | **Dirección principal** | Prioritaria |
| G | Dirección alternativa 2 | Si F y D vacías |

**Prioridad de búsqueda de direcciones:** F → D → G

Ver `GOOGLE_SHEETS_CONFIG.md` para instrucciones detalladas.

## 🗺️ Sistema de Geocodificación

El proyecto incluye un diccionario completo de calles de Sant Andreu con coordenadas reales:

- Gran de Sant Andreu
- Passeig de Santa Coloma
- Carrer de Fabra i Puig
- Carrer de Segre
- Y más de 30 calles adicionales

Para direcciones no encontradas, se generan coordenadas consistentes usando un sistema de hash.

## 🎯 Componentes Principales

### MapView
Mapa interactivo con:
- Marcadores personalizados animados
- Popup con preview de información
- StatsCard flotante
- Sidebar con lista de ubicaciones
- Leyenda del mapa

### LocationModal
Modal con detalles completos:
- Código del libro
- Título
- Ubicación
- Resumen
- Estado (disponible/no disponible)

### StatsCard
Tarjeta flotante mostrando:
- Total de ubicaciones
- Libros disponibles
- Puntos sin libro

## 🔧 Personalización

### Cambiar Colores

Los colores principales están en las clases de Tailwind:

```tsx
// Gradiente principal
className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600"

// Libro disponible: pink-500 (#ec4899)
// Sin libro: slate-400 (#94a3b8)
```

### Cambiar Ubicación del Mapa

```typescript
// En MapView.tsx
const SANT_ANDREU_CENTER: [number, number] = [41.4355, 2.1895];
```

### Personalizar Marcadores

Modifica la función `createCustomIcon()` en `MapView.tsx`:
- Tamaño: variable `size`
- Colores: gradientes CSS
- Animación: keyframes `pulse`
- Icono: emoji 📚 o SVG

## 📱 Responsive Design

- **Desktop (lg+):** Sidebar visible + StatsCard flotante
- **Tablet:** StatsCard visible, sidebar oculto
- **Mobile:** Solo mapa + botones esenciales

## 🚀 Scripts Disponibles

```bash
pnpm dev        # Servidor de desarrollo
pnpm build      # Build para producción
pnpm preview    # Preview del build
```

## 📖 Documentación Adicional

- [`INTEGRACION.md`](./INTEGRACION.md) - Guía completa de integración
- [`EJEMPLOS_INTEGRACION.md`](./EJEMPLOS_INTEGRACION.md) - 12 ejemplos de código
- [`GOOGLE_SHEETS_CONFIG.md`](./GOOGLE_SHEETS_CONFIG.md) - Configuración de Google Sheets

## 🎯 Casos de Uso

### Integrar en Next.js

```tsx
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('./MapView'), { ssr: false });
```

### Usar con tus propios datos

```tsx
const locations: BookLocation[] = [
  {
    id: 1,
    street: "Tu Calle, 123",
    lat: 41.4355,
    lng: 2.1895,
    hasBook: true,
    // ...
  }
];

<MapView locations={locations} onLocationClick={...} />
```

### Añadir filtros

Ver ejemplo completo en `EJEMPLOS_INTEGRACION.md`

## 🌟 Características Visuales

- ✨ Gradientes rosa-púrpura premium
- 🔮 Efectos glassmorphism (`backdrop-blur-xl`)
- 💫 Animaciones suaves con CSS transitions
- 🎯 Marcadores con pulso animado
- 🎨 Hover effects en todos los elementos
- 📊 Scrollbar personalizada
- 🎭 Modales con animaciones de entrada

## 📝 Licencia

Código abierto para uso personal y comercial.

## 🤝 Contribuir

Este es un proyecto completo listo para usar. Puedes:
- Modificar el diseño
- Cambiar colores y estilos
- Adaptar la funcionalidad
- Integrar en tu aplicación
- Usar componentes individualmente

## 🐛 Problemas Comunes

### Marcadores no aparecen
```tsx
// Asegúrate de importar el CSS de Leaflet
import 'leaflet/dist/leaflet.css';
```

### Error de SSR (Next.js)
```tsx
// Usa dynamic import con ssr: false
const MapView = dynamic(() => import('./MapView'), { ssr: false });
```

Ver más soluciones en `INTEGRACION.md`

## 📞 Soporte

- Revisa los ejemplos en `EJEMPLOS_INTEGRACION.md`
- Consulta la documentación de [Leaflet](https://leafletjs.com/)
- Documentación de [React-Leaflet](https://react-leaflet.js.org/)

---

**Hecho con ❤️ para la comunidad de Sant Andreu, Barcelona**

🚀 **¿Listo para integrar?** → Lee [`INTEGRACION.md`](./INTEGRACION.md)
