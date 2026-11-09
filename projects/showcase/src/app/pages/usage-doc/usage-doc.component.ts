import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

interface ComponentEntry {
  name: string;
  subpath: string;
  selector: string;
  description: string;
}

@Component({
  selector: 'app-usage-doc',
  standalone: true,
  imports: [CodeSnippetComponent],
  templateUrl: './usage-doc.component.html',
  styleUrl: './usage-doc.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsageDocComponent {
  readonly activeTab = signal<'quickstart' | 'theming' | 'subentrypoints'>('quickstart');

  readonly setupAppConfigSnippet = `import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTheme, auraPreset } from 'nuvex-ui/theme';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Registra el proveedor global de tema Nuvex UI
    provideTheme({
      preset: auraPreset,
      defaultMode: 'light',
      persistKey: 'nuvex-theme-preference'
    })
  ]
};`;

  readonly componentTsSnippet = `import { Component, signal } from '@angular/core';
import { LogoComponent } from 'nuvex-ui/logo';
import { ButtonComponent } from 'nuvex-ui/button';
import { KpiCardComponent } from 'nuvex-ui/kpi-card';
import { DrawerComponent } from 'nuvex-ui/drawer';
import { BadgeComponent } from 'nuvex-ui/badge';

@Component({
  selector: 'app-ventas-dashboard',
  standalone: true,
  imports: [
    LogoComponent,
    ButtonComponent,
    KpiCardComponent,
    DrawerComponent,
    BadgeComponent
  ],
  templateUrl: './ventas-dashboard.component.html',
  styleUrl: './ventas-dashboard.component.css'
})
export class VentasDashboardComponent {
  // Manejo de estado con Signals de Angular 22
  readonly drawerAbierto = signal(false);
  readonly totalIngresos = signal('$ 48.920.500');

  abrirDrawer() {
    this.drawerAbierto.set(true);
  }

  cerrarDrawer() {
    this.drawerAbierto.set(false);
  }
}`;

  readonly componentHtmlSnippet = `<!-- 1. Cabecera con Logo Nuvex UI -->
<header class="flex items-center justify-between p-6 bg-white rounded-3xl shadow-sm mb-6">
  <nx-logo variant="horizontal" size="md" [withGlow]="true"></nx-logo>
  
  <div class="flex items-center gap-3">
    <nuvex-badge variant="success">Sistema Operativo</nuvex-badge>
    <nuvex-button variant="primary" (click)="abrirDrawer()">
      Crear Factura
    </nuvex-button>
  </div>
</header>

<!-- 2. Tarjetas KPI de Resumen -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
  <nuvex-kpi-card
    label="Ingresos del Mes"
    [value]="totalIngresos()"
    trend="+14.2%"
    trendDirection="up"
    trendLabel="vs mes anterior"
    variant="emerald"
  ></nuvex-kpi-card>
</div>

<!-- 3. Drawer Flotante Lateral -->
<nuvex-drawer
  [visible]="drawerAbierto()"
  title="Nueva Factura"
  subtitle="Complete los datos del cliente y los productos"
  (onClose)="cerrarDrawer()"
>
  <div class="space-y-4 p-4">
    <p class="text-sm text-slate-600">Formulario listo para capturar datos...</p>
    <nuvex-button variant="primary" (click)="cerrarDrawer()">Guardar Factura</nuvex-button>
  </div>
</nuvex-drawer>`;

  readonly themeServiceSnippet = `import { Component, inject } from '@angular/core';
import { ThemeService } from 'nuvex-ui/theme';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  template: \`
    <button (click)="toggleTema()" class="px-4 py-2 rounded-xl border border-slate-200">
      Modo actual: {{ isDark() ? 'Oscuro' : 'Claro' }}
    </button>
  \`
})
export class ThemeSwitcherComponent {
  private themeService = inject(ThemeService);

  // Signal reactiva que refleja si el modo oscuro está activo
  readonly isDark = this.themeService.darkMode;

  toggleTema() {
    this.themeService.toggleMode();
  }
}`;

  readonly componentsList: ComponentEntry[] = [
    {
      name: 'Logo Oficial',
      subpath: 'nuvex-ui/logo',
      selector: '<nx-logo>',
      description: 'Isotipo tridimensional, isotipo plano y logotipo horizontal corporativo.',
    },
    {
      name: 'Button',
      subpath: 'nuvex-ui/button',
      selector: '<nx-button>',
      description: 'Botón con estados, variantes (primary, secondary, outline, ghost) y soporte de icono.',
    },
    {
      name: 'KPI Card',
      subpath: 'nuvex-ui/kpi-card',
      selector: '<nx-kpi-card>',
      description: 'Métricas analíticas ejecutivas con badges circulares, tendencias y comparativas.',
    },
    {
      name: 'Spotlight Card',
      subpath: 'nuvex-ui/spotlight-card',
      selector: '<nx-spotlight-card>',
      description: 'Tarjeta destacada de perfil con avatar central, bio y navegación carrusel.',
    },
    {
      name: 'Drawer',
      subpath: 'nuvex-ui/drawer',
      selector: '<nx-drawer>',
      description: 'Panel lateral flotante tipo slide-over con backdrop desenfocado y animaciones suaves.',
    },
    {
      name: 'Modal / Dialog',
      subpath: 'nuvex-ui/modal',
      selector: '<nx-modal>',
      description: 'Ventana modal flotante con cabecera fija, cuerpo desplazable y botones de acción.',
    },
    {
      name: 'Table / Datatable',
      subpath: 'nuvex-ui/table',
      selector: '<nx-table>',
      description: 'Tabla de datos paginada con ordenamiento, filtrado y renderizado responsivo.',
    },
    {
      name: 'Capsule Dock',
      subpath: 'nuvex-ui/capsule-dock',
      selector: '<nx-capsule-dock>',
      description: 'Dock vertical flotante en cápsula oscura de radio completo (rounded-full).',
    },
    {
      name: 'Badge',
      subpath: 'nuvex-ui/badge',
      selector: '<nx-badge>',
      description: 'Píldoras de estado semántico (emerald, blue, amber, rose, slate).',
    },
    {
      name: 'Input',
      subpath: 'nuvex-ui/input',
      selector: '<nx-input>',
      description: 'Campo de texto con soporte para etiquetas flotantes, validaciones e iconos.',
    },
    {
      name: 'Select',
      subpath: 'nuvex-ui/select',
      selector: '<nx-select>',
      description: 'Dropdown desplegable accesible con búsqueda y selección múltiple.',
    },
    {
      name: 'Switch',
      subpath: 'nuvex-ui/switch',
      selector: '<nx-switch>',
      description: 'Control de activación/desactivación suave con física de transición Nuvex.',
    },
    {
      name: 'Sparkline',
      subpath: 'nuvex-ui/sparkline',
      selector: '<nx-sparkline>',
      description: 'Gráfico minimalista inline en curvas SVG Bézier para tendencias compactas.',
    },
  ];
}
