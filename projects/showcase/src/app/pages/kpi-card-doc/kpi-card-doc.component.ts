import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { KpiCardComponent } from 'nuvex-ui/kpi-card';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

@Component({
  selector: 'app-kpi-card-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KpiCardComponent, CodeSnippetComponent],
  templateUrl: './kpi-card-doc.component.html',
  styleUrl: '../doc-shared.css',
  styles: [`
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.25rem;
    }
  `],
})
export class KpiCardDocComponent {
  readonly activeTab = signal<'preview' | 'code'>('preview');

  readonly importSnippet = `import { Component } from '@angular/core';
import { KpiCardComponent } from 'nuvex-ui/kpi-card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [KpiCardComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}`;

  readonly usageSnippet = `<!-- 1. Tarjeta Hero Invertida (Obsidiana) para la métrica principal -->
<nuvex-kpi-card
  label="Saldo Total Cuentas"
  value="$1,240,500"
  helperText="Consolidado de 6 cuentas y 4 cajas"
  trend="+12.4%"
  trendDirection="up"
  trendLabel="vs mes ant."
  variant="hero"
/>

<!-- 2. Tarjetas Temáticas Nuvex Modern Curve -->
<nuvex-kpi-card
  label="Cajas Operativas"
  value="4 activas"
  helperText="Caja Chica, Tesorería y Puntos de Venta"
  badgeText="100% Ok"
  variant="purple"
/>

<nuvex-kpi-card
  label="Ingresos Mes"
  value="$48,250"
  trend="+8.1%"
  trendDirection="up"
  variant="emerald"
/>

<nuvex-kpi-card
  label="Egresos Pendientes"
  value="$12,800"
  trend="-3.2%"
  trendDirection="down"
  variant="amber"
/>

<!-- 3. Tarjeta Estándar Adaptive (Light/Dark) -->
<nuvex-kpi-card
  label="Transacciones Hoy"
  value="182"
  helperText="Promedio $145.20 por operación"
  trend="0%"
  trendDirection="neutral"
  variant="default"
/>`;
}
