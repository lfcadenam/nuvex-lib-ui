import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { SegmentedComponent } from 'nuvex-ui/segmented';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

@Component({
  selector: 'app-segmented-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SegmentedComponent, CodeSnippetComponent],
  templateUrl: './segmented-doc.component.html',
  styleUrl: '../doc-shared.css',
})
export class SegmentedDocComponent {
  readonly activeTab = signal<'preview' | 'code'>('preview');

  readonly selectedPeriod = signal('30D');
  readonly selectedChannel = signal('Todos');

  readonly importSnippet = `import { Component, signal } from '@angular/core';
import { SegmentedComponent } from 'nuvex-ui/segmented';

@Component({
  selector: 'app-mi-dashboard',
  standalone: true,
  imports: [SegmentedComponent],
  templateUrl: './mi-dashboard.component.html',
})
export class MiDashboardComponent {
  periodo = signal('30D');
  canal = signal('Todos');
}`;

  readonly usageSnippet = `<!-- Selector de rango temporal -->
<nuvex-segmented
  [options]="['7D', '30D', '90D', '12M']"
  [(value)]="periodo"
/>

<!-- Selector de canales con opciones estructuradas o strings -->
<nuvex-segmented
  [options]="['Todos', 'En Línea', 'Tienda Física']"
  [(value)]="canal"
/>

<!-- Tamaño compacto para toolbars -->
<nuvex-segmented
  size="sm"
  [options]="['Día', 'Semana', 'Mes', 'Año']"
/>`;
}
