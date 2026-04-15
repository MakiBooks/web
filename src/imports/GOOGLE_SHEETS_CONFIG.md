# Configuración de Google Sheets para Maki Book

## URL de la hoja de cálculo
https://docs.google.com/spreadsheets/d/1pxOIesfv4LyxLpR8afXNR56S0z5Pgz9vZBUt1Nxph5c/edit

## Para hacer pública la hoja de cálculo:

1. Abre la hoja de cálculo en Google Sheets
2. Haz clic en el botón "Compartir" en la esquina superior derecha
3. Haz clic en "Cambiar" junto a "Restringido"
4. Selecciona "Cualquier persona con el enlace"
5. Asegúrate de que el permiso esté establecido en "Visualizador"
6. Haz clic en "Listo"

## Formato esperado de la hoja:

| Columna A | Columna B | Columna C | Columna D | Columna E |
|-----------|-----------|-----------|-----------|-----------|
| Código | Libro | Estado | Dirección | Resumen |
| BCN001 | Cien años de soledad | 1 | Gran de Sant Andreu, 123 | Descripción del libro |
| BCN002 | Don Quijote | 0 | Carrer de Segre, 34 | Otra descripción |

### Notas:
- **Columna A (Código)**: Código único del libro
- **Columna B (Libro)**: Título del libro
- **Columna C (Estado)**: 1 = con libro disponible, 0 = sin libro
- **Columna D (Dirección)**: Dirección en Sant Andreu
- **Columna E (Resumen)**: Descripción o resumen del libro

## Si la hoja no es accesible públicamente:

La aplicación usará datos locales de ejemplo hasta que la hoja sea accesible.
Para verificar el acceso, puedes probar este enlace en el navegador:
https://docs.google.com/spreadsheets/d/1pxOIesfv4LyxLpR8afXNR56S0z5Pgz9vZBUt1Nxph5c/export?format=csv&gid=0

Si funciona, deberías ver el contenido CSV en lugar de HTML.
