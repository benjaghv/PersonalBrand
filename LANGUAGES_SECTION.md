# Sección de Idiomas - Documentación

## Ubicación
La sección de idiomas se encuentra en la página principal, dentro de la sección "Sobre mí", justo después de las habilidades técnicas.

## Diseño Visual
- **Estilo consistente**: Usa el mismo diseño de las habilidades (border teal, fondo oscuro, sombra brillante)
- **Banderas**: Cada idioma muestra su bandera correspondiente usando flagcdn.com
- **Niveles**: Muestra el nivel de dominio entre paréntesis
- **Hover effect**: Los elementos se agrandan ligeramente al pasar el mouse
- **Responsive**: Se adapta perfectamente a móviles y desktop

## Idiomas Incluidos
1. **Español** 🇪🇸 - Nativo
2. **English** 🇺🇸 - Avanzado
3. **Deutsch** 🇩🇪 - Intermedio

## Traducciones
Los niveles de idioma se traducen automáticamente según el idioma seleccionado:

### Español
- Nativo
- Avanzado
- Intermedio

### English
- Native
- Advanced
- Intermediate

## Personalización

### Cambiar niveles de idioma
Edita los niveles en el archivo `src/app/page.tsx` líneas 216, 222, 228:
```tsx
<span className="text-xs text-slate-400">({t.about.languageLevels.native})</span>
```

### Agregar más idiomas
Agrega un nuevo bloque en `src/app/page.tsx`:
```tsx
<div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#64ffda] text-[#64ffda] bg-[#0a192f]/80 font-mono text-sm shadow-[0_0_8px_#64ffda99] backdrop-blur-sm hover:scale-105 transition-transform">
  <img src="https://flagcdn.com/[código].svg" alt="Idioma" className="w-6 h-4 rounded-sm" />
  <span>Nombre del Idioma</span>
  <span className="text-xs text-slate-400">({t.about.languageLevels.nivel})</span>
</div>
```

### Códigos de banderas
- España: `es`
- Estados Unidos: `us`
- Alemania: `de`
- Francia: `fr`
- Italia: `it`
- Portugal: `pt`
- Etc.

Fuente: https://flagcdn.com/

## Estructura de Archivos Modificados
- `src/locales/es.ts` - Agregado `languages` y `languageLevels`
- `src/locales/en.ts` - Agregado `languages` y `languageLevels`
- `src/app/page.tsx` - Agregada sección de idiomas después de skills
