---
name: nuvex-ui
description: >-
  Guía completa, automatización de publicación (npm publish), instalación y consumo de la librería
  oficial de componentes Nuvex UI (nuvex-ui) para aplicaciones Angular en Nuvex Tecnología.
  Cubre comandos de compilación (ng build nuvex-ui), versionado semántico, publicación en el registro privado
  https://npm.nuvex-tecnologia.com/, enlace local en monorepos del workspace (ContabNuvex, BebéGenial, StoreControl),
  inyección de Theme Provider (provideTheme), tokens CSS y uso de plantillas completas (SaaS Executive Dashboard).
---

# Nuvex UI — Design System Library & Workflow Skill

Esta skill proporciona los estándares, scripts y flujos automatizados para **publicar**, **instalar** y **utilizar** la librería oficial **`nuvex-ui`** en cualquier proyecto del ecosistema **Nuvex Tecnología**.

---

## 📦 1. Arquitectura de la Librería (`nuvex-lib-ui`)

* **Ubicación en el Workspace:** [`d:/Users/Usuario/Documents/Nuvex/nuvex-lib-ui/`](file:///d:/Users/Usuario/Documents/Nuvex/nuvex-lib-ui/)
* **Proyectos internos:**
  * `projects/nuvex-ui`: La librería Angular empaquetable con `ng-packagr`.
  * `projects/showcase`: La aplicación de demostración, pruebas y documentación viva en tiempo real.
* **Paradigma técnico:**
  * Angular 22+, **Standalone Components** exclusivamente.
  * Reactividad con **Signals** (`input()`, `model()`, `computed()`, `output()`).
  * Arquitectura **Zoneless** y renderizado **SSR-Safe** (sin acceso directo a `window` o `document` en el servidor).
  * **Sub-Entrypoints Independientes:** Cada componente se empaqueta en su propio sub-módulo (`nuvex-ui/button`, `nuvex-ui/kpi-card`, `nuvex-ui/logo`, `nuvex-ui/drawer`, etc.) para permitir **Tree-Shaking total**.

---

## 🚀 2. Flujo Oficial para Publicar una Nueva Versión

Cuando se agregue un nuevo componente, se corrijan estilos o se actualicen tokens en `nuvex-ui`:

### Paso 2.1: Verificar que los tests y compilación pasen
En la carpeta `nuvex-lib-ui/`:
```bash
npm run build:all
```
Esto compila la librería (`ng build nuvex-ui`) y valida que el showcase compile sin advertencias ni errores (`ng build showcase`).

### Paso 2.2: Incrementar la versión semántica
Edita [`projects/nuvex-ui/package.json`](file:///d:/Users/Usuario/Documents/Nuvex/nuvex-lib-ui/projects/nuvex-ui/package.json#L3):
* Para correcciones de bugs o estilos: Patch (`0.0.4` -> `0.0.5`)
* Para nuevos componentes o features (ej: `<nx-logo>`): Minor (`0.0.4` -> `0.1.0`)

### Paso 2.3: Publicar en el Registro Privado de Nuvex
Ejecuta el script oficial configurado en `package.json`:
```bash
npm run publish:lib
```
*Comando equivalente bajo el capó:*
```bash
ng build nuvex-ui && npm publish ./dist/nuvex-ui --registry https://npm.nuvex-tecnologia.com/
```

> **Nota de Autenticación:** Si es la primera vez que publicas en una máquina nueva, inicia sesión con:
> `npm login --registry https://npm.nuvex-tecnologia.com/`

---

## 📥 3. Cómo Instalar `nuvex-ui` en un Proyecto Destino

Existen dos modalidades oficiales según el entorno de trabajo:

### Modalidad A: Registro Privado NPM (Producción y CI/CD)
En la raíz del proyecto destino (ej: `contabnuvex/`, `bebegenial/`, `storecontrol/`):
```bash
npm install nuvex-ui --registry https://npm.nuvex-tecnologia.com/
```

O agrega en el archivo `.npmrc` del proyecto:
```ini
registry=https://npm.nuvex-tecnologia.com/
```
Y luego instala normalmente:
```bash
npm install nuvex-ui
```

### Modalidad B: Enlace Local en Workspace Nuvex (Desarrollo Rápido)
Si estás desarrollando simultáneamente la librería y una app dentro del workspace de Nuvex sin publicar en npm:
1. En el `package.json` de la app destino agrega:
```json
{
  "dependencies": {
    "nuvex-ui": "file:../nuvex-lib-ui/dist/nuvex-ui"
  }
}
```
2. Ejecuta `npm install` en la app destino.

---

## 🛠️ 4. Configuración Obligatoria en la Aplicación Destino

Para que los componentes de Nuvex UI adopten los tokens, fuentes y el modo oscuro:

### Paso 4.1: Registrar el `provideTheme` en `app.config.ts`
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTheme, auraPreset } from 'nuvex-ui';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Proveedor del sistema de diseño Nuvex UI
    provideTheme({
      preset: auraPreset,
      options: {
        darkModeSelector: '.dark',
      },
    }),
  ],
};
```

### Paso 4.2: Importar la Tipografía Oficial en `styles.css`
El sistema de diseño exige la tipografía **Plus Jakarta Sans**:
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

:root {
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  color-scheme: light dark;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--nvl-canvas-bg, #f2f4f7);
  color: var(--nvl-text-color, #0f172a);
}
```

---

## 🧩 5. Catálogo de Sub-Entrypoints y Uso

Importa siempre desde el submódulo específico para optimizar el bundle final:

```typescript
import { Component } from '@angular/core';

// 1. Marca & Identidad
import { LogoComponent } from 'nuvex-ui/logo';

// 2. Métricas & Analítica
import { KpiCardComponent } from 'nuvex-ui/kpi-card';
import { SparklineComponent } from 'nuvex-ui/sparkline';
import { SpotlightCardComponent } from 'nuvex-ui/spotlight-card';

// 3. Navegación & Estructura
import { CapsuleDockComponent } from 'nuvex-ui/capsule-dock';
import { TopbarComponent } from 'nuvex-ui/topbar';
import { SegmentedComponent } from 'nuvex-ui/segmented';

// 4. Formularios & Fichas (Regla: Slide-Over Drawer)
import { DrawerComponent } from 'nuvex-ui/drawer';
import { ButtonComponent } from 'nuvex-ui/button';
import { InputComponent } from 'nuvex-ui/input';
import { SelectComponent } from 'nuvex-ui/select';
import { SwitchComponent } from 'nuvex-ui/switch';
import { TableComponent } from 'nuvex-ui/table';
import { BadgeComponent } from 'nuvex-ui/badge';
import { AvatarComponent } from 'nuvex-ui/avatar';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    LogoComponent,
    KpiCardComponent,
    SparklineComponent,
    CapsuleDockComponent,
    TopbarComponent,
    SegmentedComponent,
    DrawerComponent,
    ButtonComponent,
    InputComponent,
  ],
  template: `
    <!-- Isotipo Nuvex 3D -->
    <nx-logo variant="icon" size="sm" [withGlow]="true" />

    <!-- KPI Card Hero Obsidiana -->
    <nuvex-kpi-card
      variant="hero"
      label="Ingresos Recurrentes"
      value="$48,250"
      trend="+12.4%"
      trendDirection="up"
    />

    <!-- Botón Primario Nuvex -->
    <nuvex-button variant="primary">Crear Registro</nuvex-button>
  `,
})
export class AdminPanelComponent {}
```

---

## 🏆 6. Uso de Plantillas Completas

Cuando un desarrollador necesite maquetar un módulo de analítica o administración completo, debe consultar la plantilla oficial:
* **Showcase:** `http://localhost:4200/templates/saas-dashboard`
* **Código de referencia:** [`projects/showcase/src/app/pages/templates/saas-dashboard/`](file:///d:/Users/Usuario/Documents/Nuvex/nuvex-lib-ui/projects/showcase/src/app/pages/templates/saas-dashboard/)
* Integra:
  * Dock vertical flotante (`nuvex-capsule-dock`)
  * Barra superior en píldora con menú de 4 opciones autorizadas (`nuvex-topbar`)
  * Fila de 3 KPIs balanceados con curvas Bézier Sparkline (`nuvex-kpi-card`)
  * Datatable a ancho completo con badges y avatares (`nuvex-table`)
  * Slide-Over Drawer interactivo para formularios (`nuvex-drawer`)
