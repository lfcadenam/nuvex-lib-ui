import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SparklineComponent, SparklineColor } from 'nuvex-ui/sparkline';
import { CardComponent } from 'nuvex-ui/card';
import { BadgeComponent } from 'nuvex-ui/badge';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

@Component({
  selector: 'app-sparkline-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    UpperCasePipe,
    FormsModule,
    SparklineComponent,
    CardComponent,
    BadgeComponent,
    CodeSnippetComponent,
  ],
  templateUrl: './sparkline-doc.component.html',
  styleUrls: ['../doc-shared.css', './sparkline-doc.component.css'],
})
export class SparklineDocComponent {
  readonly activeTab = signal<'preview' | 'code'>('preview');

  // Interactive controls
  readonly selectedColor = signal<SparklineColor>('emerald');
  readonly isFilled = signal<boolean>(true);
  readonly isCurved = signal<boolean>(true);
  readonly showLastPoint = signal<boolean>(true);
  readonly isAnimated = signal<boolean>(true);
  readonly currentHeight = signal<number>(40);

  // Sample data presets
  readonly sampleDatasets: { [key: string]: number[] } = {
    bullish: [12, 18, 15, 27, 24, 38, 35, 48, 55, 62],
    growth: [30, 32, 35, 34, 38, 42, 45, 48, 52],
    volatile: [20, 45, 28, 58, 32, 60, 40, 70, 50, 80],
    bearish: [65, 58, 50, 52, 45, 41, 35, 30, 22],
  };

  readonly activeDatasetKey = signal<string>('bullish');

  readonly importSnippet = `import { Component } from '@angular/core';
import { SparklineComponent } from 'nuvex-ui/sparkline';
import { CardComponent } from 'nuvex-ui/card';
import { BadgeComponent } from 'nuvex-ui/badge';

@Component({
  selector: 'app-dashboard-kpi',
  standalone: true,
  imports: [SparklineComponent, CardComponent, BadgeComponent],
  templateUrl: './dashboard-kpi.component.html',
})
export class DashboardKpiComponent {
  readonly revenueTrend = [12, 18, 15, 27, 24, 38, 35, 48, 55, 62];
  readonly ordersTrend = [45, 52, 48, 56, 50, 58, 62, 59, 65];
}`;

  readonly usageSnippet = `<!-- 1. Sparkline en Tarjeta Hero Nuvex (Obsidiana con trazo esmeralda o blanco) -->
<nuvex-card variant="hero" [hoverable]="true">
  <div class="flex items-center justify-between">
    <span class="text-xs font-semibold text-gray-400">Ingresos Totales</span>
    <nuvex-badge variant="success" size="sm">↑ 14.8%</nuvex-badge>
  </div>
  <div class="text-3xl font-extrabold text-white mt-1 mb-4">$37,163 USD</div>
  
  <!-- Minigráfico SVG integrado al fondo de la tarjeta -->
  <nuvex-sparkline
    [data]="revenueTrend"
    color="emerald"
    [filled]="true"
    [showLastPoint]="true"
    [height]="36"
  />
</nuvex-card>

<!-- 2. Sparkline Estándar para Tarjeta KPI Blanca -->
<nuvex-card [hoverable]="true">
  <div class="flex items-center justify-between">
    <span class="text-xs font-semibold text-gray-500">Volumen de Pedidos</span>
    <nuvex-badge variant="info" size="sm">532 pedidos</nuvex-badge>
  </div>
  <div class="text-3xl font-extrabold text-gray-900 dark:text-white mt-1 mb-4">532</div>
  
  <nuvex-sparkline
    [data]="ordersTrend"
    color="emerald"
    [strokeWidth]="2.5"
    [curved]="true"
    [height]="32"
  />
</nuvex-card>

<!-- 3. Sparkline Compacto para Tablas de Datos (Tendencia 7D) -->
<td class="w-32 py-2">
  <nuvex-sparkline
    [data]="[10, 14, 12, 19, 17, 22]"
    color="neutral"
    [height]="20"
    [animated]="false"
  />
</td>`;

  setDataset(key: string) {
    this.activeDatasetKey.set(key);
  }

  randomizeData() {
    const count = 9;
    const newData: number[] = [];
    let current = 25 + Math.floor(Math.random() * 30);
    for (let i = 0; i < count; i++) {
      current += Math.floor(Math.random() * 20) - 8;
      if (current < 5) current = 8;
      newData.push(current);
    }
    this.sampleDatasets['random'] = newData;
    this.activeDatasetKey.set('random');
  }
}
