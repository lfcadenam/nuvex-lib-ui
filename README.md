# Nuvex UI

Librería de componentes Angular inspirada en PrimeNG, construida con las prácticas modernas de Angular 22: **standalone components**, **signals**, **zoneless**, **SSR-safe** y un sistema de **design tokens** en 3 capas.

---

## Stack

| Tecnología | Versión |
|---|---|
| Angular | ^22.2.0 |
| ng-packagr | ^22.2.0 |
| TypeScript | ~6.0.2 |
| Node.js | >= 22.x |

---

## Estructura del proyecto

```
nuvex-lib-ui/
├── projects/
│   ├── nuvex-ui/               # La librería
│   │   └── src/
│   │       ├── public-api.ts   # Entry point principal (exports públicos)
│   │       └── lib/
│   │           ├── shared/     # Theming (ThemeService, types, provider)
│   │           ├── themes/     # Presets (aura, ...)
│   │           └── button/     # Componente Button (secondary entry point)
│   └── showcase/               # App de demostración y documentación viva
│       └── src/
│           └── app/
│               └── page/
│                   └── button-demo/
├── tsconfig.json               # Paths para desarrollo local sin compilar
└── package.json
```

---

## Comandos principales

```bash
# Instalar dependencias
npm install

# Compilar la librería
ng build nuvex-ui

# Levantar el showcase (documentación viva)
ng serve showcase

# Compilar librería + levantar showcase juntos
ng build nuvex-ui && ng serve showcase
```

> **Nota**: Durante el desarrollo en el workspace, no necesitas compilar la librería cada vez que cambias un archivo. El `tsconfig.json` tiene path mappings que apuntan directamente al código fuente. Solo necesitas compilar cuando vayas a publicar en npm.

---

## Desarrollo local sin compilar

El `tsconfig.json` tiene dos path mappings que permiten importar desde el código fuente directamente:

```json
"paths": {
  "nuvex-ui": ["projects/nuvex-ui/src/public-api.ts"],
  "nuvex-ui/*": ["projects/nuvex-ui/src/lib/*/public-api.ts"]
}
```

Esto significa que `import { ButtonComponent } from 'nuvex-ui/button'` resuelve a `projects/nuvex-ui/src/lib/button/public-api.ts` sin necesidad de un `dist/`.

---

## Sistema de Theming

El sistema de theming usa **design tokens en 3 capas**, igual que PrimeNG v18+:

### Capa 1: Tokens primitivos
Valores sin contexto. Son la paleta de colores base.

```typescript
primitive: {
  blue: {
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },
  gray: { ... },
  red: { ... },
}
```

Generan CSS variables como: `--nvl-blue-500`, `--nvl-blue-600`, etc.

### Capa 2: Tokens semánticos
Tienen contexto y nombre significativo. Referencian primitivos con la sintaxis `{grupo.shade}`.

```typescript
semantic: {
  primary: {
    color: '{blue.600}',        // -> var(--nvl-blue-600)
    hoverColor: '{blue.700}',   // -> var(--nvl-blue-700)
  },
  surface: {
    0: '#ffffff',
    50: '{gray.50}',
  },
  text: {
    color: '{gray.700}',
    mutedColor: '{gray.500}',
  },
}
```

Generan CSS variables con camelCase → kebab-case automático:
- `hoverColor` → `--nvl-primary-hover-color`
- `mutedColor` → `--nvl-text-muted-color`

### Capa 3: Tokens de componente
Cada componente usa las variables semánticas en su CSS:

```css
/* button.component.css */
.nuvex-button--primary {
  background-color: var(--nvl-primary-color, #2563eb);
}
.nuvex-button--primary:hover {
  background-color: var(--nvl-primary-hover-color, #1d4ed8);
}
```

El segundo argumento (`#2563eb`) es el fallback para cuando el tema no está cargado.

### Dark mode

El preset puede definir overrides para dark mode:

```typescript
dark: {
  semantic: {
    surface: {
      0: '#0f172a',
      50: '#1e293b',
    },
    text: {
      color: '#e2e8f0',
    },
  },
}
```

Para activar el dark mode, agrega la clase `nvl-dark` al `<html>`:

```typescript
// En cualquier componente
import { ThemeService } from 'nuvex-ui';

const theme = inject(ThemeService);
theme.toggleDarkMode(); // agrega/quita la clase nvl-dark del document
```

---

## Configurar el tema en tu app

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideMyUITheme, auraPreset } from 'nuvex-ui';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideMyUITheme({
      preset: auraPreset,
      options: {
        prefix: 'nvl',              // prefijo de las CSS variables (--nvl-...)
        darkModeSelector: 'nvl-dark' // clase CSS que activa el dark mode
      }
    }),
  ],
};
```

### Crear un preset personalizado

```typescript
// mi-empresa-preset.ts
import { ThemePreset } from 'nuvex-ui';

export const miEmpresaPreset: ThemePreset = {
  primitive: {
    brand: {
      500: '#6d28d9',  // violeta
      600: '#5b21b6',
      700: '#4c1d95',
    },
    // ...
  },
  semantic: {
    primary: {
      color: '{brand.500}',
      hoverColor: '{brand.600}',
    },
    // ...
  },
};
```

```typescript
// app.config.ts
provideMyUITheme({ preset: miEmpresaPreset, options: { prefix: 'nvl' } })
```

---

## Componentes disponibles

### Button

**Import:**
```typescript
import { ButtonComponent } from 'nuvex-ui/button';
```

**Uso básico:**
```html
<nuvex-button>Click me</nuvex-button>
```

**Como atributo en elemento nativo:**
```html
<button type="submit" nuvexButton variant="primary">Enviar</button>
<a href="/home" nuvexButton variant="ghost">Inicio</a>
```

**API:**

| Input | Tipo | Default | Descripción |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'primary'` | Variante visual |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño |
| `disabled` | `boolean` | `false` | Estado deshabilitado |
| `loading` | `boolean` | `false` | Estado de carga |
| `icon` | `boolean` | `false` | Muestra slot de ícono |

| Output | Tipo | Descripción |
|---|---|---|
| `onClick` | `OutputEmitterRef<MouseEvent>` | Click del botón |

**Variantes:**
```html
<nuvex-button variant="primary">Primary</nuvex-button>
<nuvex-button variant="secondary">Secondary</nuvex-button>
<nuvex-button variant="danger">Danger</nuvex-button>
<nuvex-button variant="ghost">Ghost</nuvex-button>
```

**Tamaños:**
```html
<nuvex-button size="sm">Small</nuvex-button>
<nuvex-button size="md">Medium</nuvex-button>
<nuvex-button size="lg">Large</nuvex-button>
```

**Estados:**
```html
<nuvex-button [disabled]="true">Disabled</nuvex-button>
<nuvex-button [loading]="true">Loading</nuvex-button>
```

---

## Agregar un nuevo componente

El patrón es siempre el mismo. Ejemplo para agregar un `Badge`:

```bash
# 1. Crear la carpeta
mkdir projects/nuvex-ui/src/lib/badge

# 2. Crear los archivos
touch projects/nuvex-ui/src/lib/badge/badge.types.ts
touch projects/nuvex-ui/src/lib/badge/badge.component.ts
touch projects/nuvex-ui/src/lib/badge/badge.component.html
touch projects/nuvex-ui/src/lib/badge/badge.component.css
touch projects/nuvex-ui/src/lib/badge/public-api.ts
touch projects/nuvex-ui/src/lib/badge/ng-package.json
```

**Checklist de cada componente:**

- [ ] `ng-package.json` → declara el secondary entry point
- [ ] `public-api.ts` → exporta el componente y sus tipos
- [ ] `*.types.ts` → tipos y enums del componente
- [ ] `*.component.ts` → `standalone: true`, `ChangeDetectionStrategy.OnPush`, `ViewEncapsulation.None`, signal inputs
- [ ] `*.component.html` → usar `@if`, `@for` (no `*ngIf`, `*ngFor`)
- [ ] `*.component.css` → usar CSS variables `var(--nvl-...)` con fallback

**Contenido del `ng-package.json`:**
```json
{
  "$schema": "../../../../../../node_modules/ng-packagr/ng-package.schema.json",
  "lib": {
    "entryFile": "public-api.ts"
  }
}
```

---

## Principios de arquitectura

### Standalone + Signals (no NgModules, no @Input legacy)

```typescript
// ✅ Correcto
export class MiComponente {
  readonly variant = input<string>('primary');
  readonly disabled = input<boolean>(false);
  readonly onClick = output<MouseEvent>();
}

// ❌ Evitar
export class MiComponente {
  @Input() variant = 'primary';
  @Output() onClick = new EventEmitter<MouseEvent>();
}
```

### ViewEncapsulation.None

Todos los componentes usan `ViewEncapsulation.None` para que los estilos sean globales y las CSS variables del tema apliquen correctamente.

```typescript
@Component({
  encapsulation: ViewEncapsulation.None,
  // ...
})
```

### SSR-safe: nunca usar `document` o `window` directamente

```typescript
// ✅ Correcto
private readonly document = inject(DOCUMENT);
private readonly platformId = inject(PLATFORM_ID);

if (isPlatformBrowser(this.platformId)) {
  this.document.createElement('style');
}

// ❌ Evitar
document.createElement('style'); // explota en SSR
```

### Control flow moderno

```html
<!-- ✅ Correcto -->
@if (mostrar()) {
  <span>Visible</span>
}

@for (item of items(); track item.id) {
  <li>{{ item.name }}</li>
}

<!-- ❌ Evitar -->
<span *ngIf="mostrar()">Visible</span>
<li *ngFor="let item of items()">{{ item.name }}</li>
```

---

- [x] Toggle de dark mode en el showcase
- [x] Componente `Badge` (`nuvex-ui/badge`)
- [x] Componente `Spinner` (`nuvex-ui/spinner`)
- [x] Componente `Input` (`nuvex-ui/input`)
- [x] Componente `Switch` (`nuvex-ui/switch`)
- [x] Componente `Card` (`nuvex-ui/card`)
- [x] Componente `Segmented` (`nuvex-ui/segmented`)
- [x] Componente `Drawer` (`nuvex-ui/drawer`)
- [ ] Storybook para documentación interactiva
- [ ] Tests con Vitest
- [ ] Publicación en npm
