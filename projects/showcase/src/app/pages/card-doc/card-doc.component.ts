import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CardComponent } from 'nuvex-ui/card';
import { BadgeComponent } from 'nuvex-ui/badge';
import { ButtonComponent } from 'nuvex-ui/button';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

@Component({
  selector: 'app-card-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, BadgeComponent, ButtonComponent, CodeSnippetComponent],
  templateUrl: './card-doc.component.html',
  styleUrl: '../doc-shared.css',
  styles: [`
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
  `],
})
export class CardDocComponent {
  readonly activeTab = signal<'preview' | 'code'>('preview');

  readonly importSnippet = `import { Component } from '@angular/core';
import { CardComponent } from 'nuvex-ui/card';
import { BadgeComponent } from 'nuvex-ui/badge';
import { ButtonComponent } from 'nuvex-ui/button';

@Component({
  selector: 'app-mi-dashboard',
  standalone: true,
  imports: [CardComponent, BadgeComponent, ButtonComponent],
  templateUrl: './mi-dashboard.component.html',
})
export class MiDashboardComponent {}`;

  readonly usageSnippet = `<!-- 1. Tarjeta KPI Estándar Nuvex Modern Curve -->
<nuvex-card [hoverable]="true">
  <div slot="header">
    <nuvex-badge variant="info" size="sm">532 órdenes</nuvex-badge>
  </div>
  <div>
    <h3>Ticket Promedio</h3>
    <div class="text-3xl font-extrabold">$69.87 USD</div>
  </div>
</nuvex-card>

<!-- 2. Tarjeta Hero Invertida (Obsidiana) para métricas clave -->
<nuvex-card variant="hero" [hoverable]="true">
  <div slot="header">
    <nuvex-badge variant="success" size="sm">↑ 8.1% vs anterior</nuvex-badge>
  </div>
  <div>
    <h3>Ingresos Totales</h3>
    <div class="text-3xl font-extrabold">$37,163 USD</div>
  </div>
</nuvex-card>

<!-- 3. Tarjeta completa con título y footer de acciones -->
<nuvex-card
  title="Título de la Sección"
  subtitle="Descripción breve o metadato"
  padding="lg"
>
  <p>Contenido del cuerpo...</p>

  <div slot="footer" class="flex justify-end gap-2">
    <nuvex-button variant="secondary" size="sm">Cancelar</nuvex-button>
    <nuvex-button variant="primary" size="sm">Guardar</nuvex-button>
  </div>
</nuvex-card>`;
}
