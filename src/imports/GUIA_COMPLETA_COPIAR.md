# 🚀 Guía Completa: Copia y Pega - Maki Book

## 📋 PASO 1: Crear estructura del proyecto

En tu computadora, crea un nuevo proyecto:

```bash
# Opción A: Con Vite (recomendado)
npm create vite@latest maki-book -- --template react-ts
cd maki-book

# Opción B: Con Create React App
npx create-react-app maki-book --template typescript
cd maki-book
```

## 📦 PASO 2: Instalar dependencias

```bash
# Dependencias principales
npm install leaflet react-leaflet lucide-react

# Dependencias de desarrollo
npm install -D @types/leaflet tailwindcss @tailwindcss/vite
```

## 🗂️ PASO 3: Crear estructura de carpetas

```bash
mkdir -p src/components
mkdir -p src/utils
mkdir -p src/data
mkdir -p src/styles
```

## 📄 PASO 4: Copiar archivos

### Archivo 1: `src/data/streetData.ts`

Crea el archivo y copia desde: **src/app/data/streetData.ts** de este proyecto

### Archivo 2: `src/utils/googleSheets.ts`

Crea el archivo y copia desde: **src/app/utils/googleSheets.ts** de este proyecto

### Archivo 3: `src/components/MapView.tsx`

Crea el archivo y copia desde: **src/app/components/MapView.tsx** de este proyecto

### Archivo 4: `src/components/LocationModal.tsx`

Crea el archivo y copia desde: **src/app/components/LocationModal.tsx** de este proyecto

### Archivo 5: `src/components/StatsCard.tsx`

Crea el archivo y copia desde: **src/app/components/StatsCard.tsx** de este proyecto

### Archivo 6: `src/styles/leaflet-custom.css`

Crea el archivo y copia desde: **src/styles/leaflet-custom.css** de este proyecto

### Archivo 7: `src/App.tsx` (ejemplo de uso)

Crea el archivo y copia desde: **src/app/App.tsx** de este proyecto

## 🎨 PASO 5: Configurar Tailwind CSS

### `tailwind.config.js`
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### `src/index.css`
```css
@import 'tailwindcss';
@import 'leaflet/dist/leaflet.css';
@import './styles/leaflet-custom.css';
```

## ⚙️ PASO 6: Configurar Vite

### `vite.config.ts`
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

## 🚀 PASO 7: Ejecutar el proyecto

```bash
npm run dev
```

---

## 📝 ALTERNATIVA: ACCESO DIRECTO A LOS ARCHIVOS

Si puedes acceder al sistema de archivos de este proyecto de Figma Make, todos los archivos están en:

```
/workspaces/default/code/src/app/
├── App.tsx
├── components/
│   ├── MapView.tsx
│   ├── LocationModal.tsx
│   └── StatsCard.tsx
├── data/
│   └── streetData.ts
└── utils/
    └── googleSheets.ts

/workspaces/default/code/src/styles/
└── leaflet-custom.css
```

---

## 🎯 RESUMEN DE DEPENDENCIAS

### package.json (dependencias principales)
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "leaflet": "^1.9.4",
    "react-leaflet": "^5.0.0",
    "lucide-react": "^0.487.0"
  },
  "devDependencies": {
    "@types/leaflet": "^1.9.21",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.7.0",
    "tailwindcss": "^4.1.12",
    "@tailwindcss/vite": "^4.1.12",
    "typescript": "^5.0.0",
    "vite": "^6.3.5"
  }
}
```

---

## ✅ CHECKLIST

- [ ] Crear proyecto nuevo (Vite/CRA)
- [ ] Instalar dependencias (leaflet, react-leaflet, lucide-react)
- [ ] Crear estructura de carpetas
- [ ] Copiar `streetData.ts`
- [ ] Copiar `googleSheets.ts`
- [ ] Copiar `MapView.tsx`
- [ ] Copiar `LocationModal.tsx`
- [ ] Copiar `StatsCard.tsx`
- [ ] Copiar `leaflet-custom.css`
- [ ] Configurar Tailwind CSS
- [ ] Configurar Vite
- [ ] Importar CSS de Leaflet en index.css
- [ ] Ejecutar `npm run dev`
- [ ] ¡Disfrutar! 🎉

