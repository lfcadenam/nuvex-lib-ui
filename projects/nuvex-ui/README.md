# Nuvex UI (@nuvex/ui)

Design System & Librería de Componentes oficial de **Nuvex Tecnología**.
Construido con las prácticas modernas de **Angular 22**: componentes standalone, arquitectura zoneless/signals, renderizado SSR-safe, sub-entrypoints para tree-shaking óptimo y el lenguaje de diseño **Nuvex Capsule & Modern Curve UI**.

---

## ⚡ Instalación Rápida

### Opción A: Desde el Registro Privado NPM de Nuvex
```bash
npm install nuvex-ui --registry https://npm.nuvex-tecnologia.com/
```
*O configurando tu `.npmrc` con:*
```ini
registry=https://npm.nuvex-tecnologia.com/
```
*Y ejecutando:*
```bash
npm install nuvex-ui
```

### Opción B: Enlace Local en Monorepos del Workspace Nuvex
Si estás enlazando un proyecto hermano (ContabNuvex, BebéGenial, StoreControl, etc.):
```json
{
  "dependencies": {
    "nuvex-ui": "file:../nuvex-lib-ui/dist/nuvex-ui"
  }
}
```

---

## 🛠️ Configuración Inicial

### 1. Registrar el Proveedor de Temas en `app.config.ts`
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTheme, auraPreset } from 'nuvex-ui';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideTheme({
      preset: auraPreset,
      options: {
        darkModeSelector: '.dark',
      },
    }),
  ],
};
```

### 2. Importar Fuente Oficial en `styles.css`
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

:root {
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}

body {
  background-color: var(--nvl-canvas-bg, #f2f4f7);
  color: var(--nvl-text-color, #0f172a);
}
```

---

## 🚀 Consumo de Componentes (Sub-Entrypoints)

Cada componente se importa individualmente desde su sub-entrypoint para garantizar bundle sizes mínimos:

```typescript
import { Component } from '@angular/core';
import { LogoComponent } from 'nuvex-ui/logo';
import { ButtonComponent } from 'nuvex-ui/button';
import { KpiCardComponent } from 'nuvex-ui/kpi-card';
import { SparklineComponent } from 'nuvex-ui/sparkline';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LogoComponent, ButtonComponent, KpiCardComponent, SparklineComponent],
  template: `
    <!-- 1. Isotipo oficial 3D Nuvex -->
    <nx-logo variant="full" size="md" [withGlow]="true" />

    <!-- 2. KPI Card Nuvex Modern Curve -->
    <nuvex-kpi-card
      variant="hero"
      label="Ingresos Recurrentes"
      value="$48,250"
      trend="+12.4%"
      trendDirection="up"
    />

    <!-- 3. Botón Interactivo -->
    <nuvex-button variant="primary">Crear Transacción</nuvex-button>
  `,
})
export class HomeComponent {}
```

---

## 📦 Componentes Disponibles

| Sub-módulo | Selector | Descripción |
| :--- | :--- | :--- |
| `nuvex-ui/logo` | `<nx-logo>`, `<nuvex-logo>` | Isotipo 3D oficial y logotipo completo vectorial |
| `nuvex-ui/capsule-dock` | `<nuvex-capsule-dock>` | Dock vertical flotante en cápsula obsidiana (`#111215`) |
| `nuvex-ui/topbar` | `<nuvex-topbar>` | Barra superior en píldora con menú de sesión superior |
| `nuvex-ui/kpi-card` | `<nuvex-kpi-card>` | Tarjetas analíticas con deltas temporales y variantes |
| `nuvex-ui/sparkline` | `<nuvex-sparkline>` | Curvas Bézier continuas SVG de tendencia |
| `nuvex-ui/drawer` | `<nuvex-drawer>` | Slide-Over Drawer para formularios y fichas técnicas |
| `nuvex-ui/spotlight-card` | `<nuvex-spotlight-card>` | Tarjeta de perfil destacado con carrusel |
| `nuvex-ui/segmented` | `<nuvex-segmented>` | Filtros segmentados táctiles en cápsula |
| `nuvex-ui/button` | `<nuvex-button>` | Botones con física de resortes y variantes de marca |
| `nuvex-ui/badge` | `<nuvex-badge>` | Píldoras de estado y contadores numéricos |
| `nuvex-ui/avatar` | `<nuvex-avatar>` | Avatares con presencia online y grupos apilados |
| `nuvex-ui/input` | `<nuvex-input>` | Captura de texto con validación y estados de foco |
| `nuvex-ui/select` | `<nuvex-select>` | Desplegable filtrable con diseño capsule |
| `nuvex-ui/switch` | `<nuvex-switch>` | Toggle switch con respuesta táctil |
| `nuvex-ui/table` | `<nuvex-table>` | Datatable con ordenamiento y paginación |
| `nuvex-ui/toast` | `ToastService` | Notificaciones flotantes inteligentes |

---

## 📜 Licencia
Propietario © Nuvex Tecnología. Todos los derechos reservados.
