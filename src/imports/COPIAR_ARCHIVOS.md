# 📋 Archivos para Copiar - Maki Book

## ⚠️ IMPORTANTE: Cómo obtener los archivos

Todos los archivos están disponibles en este proyecto. Aquí tienes **3 opciones** para obtenerlos:

---

## 🔥 OPCIÓN 1: Copiar archivos directamente (RECOMENDADO)

Los archivos principales que necesitas copiar a tu proyecto son:

### 1️⃣ **MapView.tsx** (Componente del mapa)
📁 Ubicación: `src/app/components/MapView.tsx`
```bash
# En tu proyecto nuevo:
mkdir -p src/components
# Copia el contenido del archivo MapView.tsx que verás abajo
```

### 2️⃣ **LocationModal.tsx** (Modal de detalles)
📁 Ubicación: `src/app/components/LocationModal.tsx`

### 3️⃣ **StatsCard.tsx** (Tarjeta de estadísticas)
📁 Ubicación: `src/app/components/StatsCard.tsx`

### 4️⃣ **googleSheets.ts** (Integración con Google Sheets)
📁 Ubicación: `src/app/utils/googleSheets.ts`

### 5️⃣ **streetData.ts** (Tipos y datos de ejemplo)
📁 Ubicación: `src/app/data/streetData.ts`

### 6️⃣ **leaflet-custom.css** (Estilos del mapa)
📁 Ubicación: `src/styles/leaflet-custom.css`

### 7️⃣ **App.tsx** (Componente principal - OPCIONAL)
📁 Ubicación: `src/app/App.tsx`

---

## 🎯 OPCIÓN 2: Crear nuevo proyecto desde cero

```bash
# 1. Crear nuevo proyecto React + TypeScript
npm create vite@latest maki-book -- --template react-ts
cd maki-book

# 2. Instalar dependencias
npm install leaflet react-leaflet lucide-react
npm install -D @types/leaflet tailwindcss @tailwindcss/vite

# 3. Configurar Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

# 4. Copiar los archivos que te proporcionaré abajo
```

---

## 📦 OPCIÓN 3: Usar Git Clone (si tienes Git configurado)

Si este proyecto está en un repositorio Git, puedes clonarlo directamente.

---

## 📄 CONTENIDO DE LOS ARCHIVOS PRINCIPALES

A continuación te proporciono el contenido completo de cada archivo para que lo copies:

