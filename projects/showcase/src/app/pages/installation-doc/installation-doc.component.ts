import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

@Component({
  selector: 'app-installation-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CodeSnippetComponent],
  templateUrl: './installation-doc.component.html',
  styleUrls: ['../doc-shared.css', './installation-doc.component.css'],
})
export class InstallationDocComponent {
  readonly activeTab = signal<'npm' | 'local' | 'config'>('npm');

  // Snippets
  readonly npmInstallSnippet = `# 1. Instalación directa desde el registro oficial Nuvex
npm install nuvex-ui --registry https://npm.nuvex-tecnologia.com/

# O configurando tu archivo .npmrc en la raíz de tu proyecto:
# registry=https://npm.nuvex-tecnologia.com/
# Y luego ejecutando:
npm install nuvex-ui`;

  readonly localInstallSnippet = `// En el package.json de tu proyecto dentro del workspace Nuvex
// (ej: ContabNuvex, BebéGenial, StoreControl, etc.)
{
  "dependencies": {
    "nuvex-ui": "file:../nuvex-lib-ui/dist/nuvex-ui"
  }
}

// Luego ejecuta:
npm install`;

  readonly appConfigSnippet = `import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTheme, auraPreset } from 'nuvex-ui';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Proveedor oficial de tokens y tema Nuvex UI
    provideTheme({
      preset: auraPreset,
      options: {
        darkModeSelector: '.dark',
      },
    }),
  ],
};`;

  readonly stylesSnippet = `/* 1. Fuente Oficial Nuvex: Plus Jakarta Sans */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

/* 2. Configuración Base en styles.css */
:root {
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  color-scheme: light dark;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--nvl-canvas-bg, #f2f4f7);
  color: var(--nvl-text-color, #0f172a);
  -webkit-font-smoothing: antialiased;
}`;

  readonly firstComponentSnippet = `import { Component } from '@angular/core';
import { LogoComponent } from 'nuvex-ui/logo';
import { ButtonComponent } from 'nuvex-ui/button';
import { KpiCardComponent } from 'nuvex-ui/kpi-card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LogoComponent, ButtonComponent, KpiCardComponent],
  template: \`
    <div class="p-8 space-y-6">
      <!-- 1. Isotipo oficial Nuvex -->
      <nx-logo variant="full" size="md" [withGlow]="true" />

      <!-- 2. KPI Card Nuvex Modern Curve -->
      <nuvex-kpi-card
        variant="hero"
        label="Ingresos Recurrentes"
        value="$48,250"
        trend="+12.4%"
        trendDirection="up"
        trendLabel="vs mes ant."
      />

      <!-- 3. Botón Interactivo Nuvex -->
      <nuvex-button variant="primary">
        Crear Nueva Orden
      </nuvex-button>
    </div>
  \`,
})
export class DashboardComponent {}`;
}
