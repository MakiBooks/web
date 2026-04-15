# 📁 Archivos Principales del Proyecto

## 🎯 Archivos Esenciales para Integración

### Componentes React (Obligatorios)

```
src/app/App.tsx
src/app/components/MapView.tsx
src/app/components/LocationModal.tsx
src/app/components/StatsCard.tsx
```

### Utilidades y Datos (Obligatorios)

```
src/app/utils/googleSheets.ts
src/app/data/streetData.ts
```

### Estilos CSS (Obligatorios)

```
src/styles/index.css
src/styles/tailwind.css
src/styles/theme.css
src/styles/leaflet-custom.css
src/styles/fonts.css
```

### Configuración (Obligatorios)

```
package.json
vite.config.ts
```

### Componentes UI de shadcn (Opcionales)

```
src/app/components/ui/accordion.tsx
src/app/components/ui/alert-dialog.tsx
src/app/components/ui/alert.tsx
src/app/components/ui/aspect-ratio.tsx
src/app/components/ui/avatar.tsx
src/app/components/ui/badge.tsx
src/app/components/ui/breadcrumb.tsx
src/app/components/ui/button.tsx
src/app/components/ui/calendar.tsx
src/app/components/ui/card.tsx
src/app/components/ui/carousel.tsx
src/app/components/ui/chart.tsx
src/app/components/ui/checkbox.tsx
src/app/components/ui/collapsible.tsx
src/app/components/ui/command.tsx
src/app/components/ui/context-menu.tsx
src/app/components/ui/dialog.tsx
src/app/components/ui/drawer.tsx
src/app/components/ui/dropdown-menu.tsx
src/app/components/ui/form.tsx
src/app/components/ui/hover-card.tsx
src/app/components/ui/input-otp.tsx
src/app/components/ui/input.tsx
src/app/components/ui/label.tsx
src/app/components/ui/menubar.tsx
src/app/components/ui/navigation-menu.tsx
src/app/components/ui/pagination.tsx
src/app/components/ui/popover.tsx
src/app/components/ui/progress.tsx
src/app/components/ui/radio-group.tsx
src/app/components/ui/resizable.tsx
src/app/components/ui/scroll-area.tsx
src/app/components/ui/select.tsx
src/app/components/ui/separator.tsx
src/app/components/ui/sheet.tsx
src/app/components/ui/sidebar.tsx
src/app/components/ui/skeleton.tsx
src/app/components/ui/slider.tsx
src/app/components/ui/sonner.tsx
src/app/components/ui/switch.tsx
src/app/components/ui/table.tsx
src/app/components/ui/tabs.tsx
src/app/components/ui/textarea.tsx
src/app/components/ui/toggle-group.tsx
src/app/components/ui/toggle.tsx
src/app/components/ui/tooltip.tsx
src/app/components/ui/use-mobile.ts
src/app/components/ui/utils.ts
```

**Nota:** Los componentes UI de shadcn NO son necesarios para la funcionalidad básica del mapa. Solo se usan si decides integrar componentes adicionales.

## 📦 Contenido del Archivo Exportado

El archivo `maki-book-export.tar.gz` contiene:

### ✅ Incluido

- Todos los archivos del directorio `src/`
- `package.json` con todas las dependencias
- `vite.config.ts` para configuración de Vite
- Archivos de documentación

### ❌ NO Incluido

- `node_modules/` (debes ejecutar `pnpm install`)
- `dist/` (se genera con `pnpm build`)
- `.git/` (historial de git)
- `__figma__entrypoint__.ts` (específico de Figma Make)

## 🎯 Archivos Mínimos para Funcionalidad Básica

Si solo quieres el mapa básico sin extras:

```
src/app/
├── components/
│   ├── MapView.tsx          # ⚠️ ESENCIAL
│   └── LocationModal.tsx    # ⚠️ ESENCIAL
├── data/
│   └── streetData.ts        # ⚠️ ESENCIAL
└── utils/
    └── googleSheets.ts      # ⚠️ ESENCIAL (si usas Google Sheets)

src/styles/
├── leaflet-custom.css       # ⚠️ ESENCIAL
└── tailwind.css             # ⚠️ ESENCIAL (si usas Tailwind)

package.json                 # ⚠️ ESENCIAL
```

**Total:** ~8 archivos para funcionalidad básica

## 🔧 Dependencias Críticas

### Mínimas Requeridas

```json
{
  "dependencies": {
    "leaflet": "^1.9.4",
    "react-leaflet": "^5.0.0",
    "@types/leaflet": "^1.9.21",
    "lucide-react": "0.487.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "4.1.12",
    "tailwindcss": "4.1.12"
  }
}
```

### Opcionales (para funcionalidad completa)

```json
{
  "dependencies": {
    "motion": "12.23.24",      // Animaciones
    "sonner": "2.0.3",          // Toasts
    "@radix-ui/*": "*"          // Componentes UI
  }
}
```

## 📄 Interfaces TypeScript Clave

### BookLocation (en `streetData.ts`)

```typescript
export interface BookLocation {
  id: number;
  street: string;
  lat: number;
  lng: number;
  imageUrl: string;
  hasBook: boolean;
  bookTitle?: string;
  bookCode?: string;
  bookSummary?: string;
}
```

### Props de MapView

```typescript
interface MapViewProps {
  onLocationClick: (location: BookLocation) => void;
  locations: BookLocation[];
}
```

### Props de LocationModal

```typescript
interface LocationModalProps {
  location: BookLocation | null;
  onClose: () => void;
}
```

## 📊 Tamaños de Archivos (aproximados)

```
maki-book-export.tar.gz     ~55 KB
node_modules/ (instalado)   ~250 MB
dist/ (build)               ~500 KB
```

## 🚀 Orden de Integración Recomendado

1. **Extraer archivo:**
   ```bash
   tar -xzf maki-book-export.tar.gz
   ```

2. **Instalar dependencias:**
   ```bash
   cd maki-book
   pnpm install
   ```

3. **Probar localmente:**
   ```bash
   pnpm dev
   ```

4. **Copiar archivos esenciales a tu proyecto:**
   - Componentes (`MapView.tsx`, `LocationModal.tsx`)
   - Utilidades (`googleSheets.ts`, `streetData.ts`)
   - Estilos (`leaflet-custom.css`)

5. **Instalar dependencias en tu proyecto:**
   ```bash
   pnpm add leaflet react-leaflet @types/leaflet lucide-react
   ```

6. **Importar CSS de Leaflet:**
   ```tsx
   import 'leaflet/dist/leaflet.css';
   import './styles/leaflet-custom.css';
   ```

7. **Usar componentes:**
   ```tsx
   import { MapView } from './components/MapView';
   ```

## 🎨 Archivos de Configuración

### vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### package.json (scripts)

```json
{
  "scripts": {
    "build": "vite build"
  }
}
```

## 💾 Cómo Extraer Solo lo Necesario

### Opción A: Copiar Manualmente

```bash
# Crear estructura en tu proyecto
mkdir -p src/components/maki-book
mkdir -p src/utils
mkdir -p src/data
mkdir -p src/styles

# Copiar componentes
cp maki-book/src/app/components/MapView.tsx src/components/maki-book/
cp maki-book/src/app/components/LocationModal.tsx src/components/maki-book/

# Copiar utils y data
cp maki-book/src/app/utils/googleSheets.ts src/utils/
cp maki-book/src/app/data/streetData.ts src/data/

# Copiar estilos
cp maki-book/src/styles/leaflet-custom.css src/styles/
```

### Opción B: Script Automatizado

```bash
#!/bin/bash
# extract-essentials.sh

SOURCE="maki-book"
DEST="mi-proyecto"

echo "Extrayendo archivos esenciales..."

# Componentes
cp $SOURCE/src/app/components/MapView.tsx $DEST/src/components/
cp $SOURCE/src/app/components/LocationModal.tsx $DEST/src/components/

# Utils
cp $SOURCE/src/app/utils/googleSheets.ts $DEST/src/utils/

# Data
cp $SOURCE/src/app/data/streetData.ts $DEST/src/data/

# Styles
cp $SOURCE/src/styles/leaflet-custom.css $DEST/src/styles/

echo "✓ Archivos copiados"
echo "Ahora ejecuta: pnpm add leaflet react-leaflet @types/leaflet lucide-react"
```

## 📋 Checklist de Integración

- [ ] Extraer `maki-book-export.tar.gz`
- [ ] Ejecutar `pnpm install`
- [ ] Probar con `pnpm dev`
- [ ] Copiar archivos esenciales a tu proyecto
- [ ] Instalar dependencias en tu proyecto
- [ ] Importar CSS de Leaflet
- [ ] Ajustar rutas de imports
- [ ] Personalizar colores/estilos
- [ ] Configurar Google Sheets (si aplica)
- [ ] Probar en tu entorno

---

**¿Dudas?** Revisa `INTEGRACION.md` y `EJEMPLOS_INTEGRACION.md`
