import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { BadgeComponent } from 'nuvex-ui/badge';
import { ButtonComponent } from 'nuvex-ui/button';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

@Component({
  selector: 'app-badge-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent, ButtonComponent, CodeSnippetComponent],
  templateUrl: './badge-doc.component.html',
  styleUrl: '../doc-shared.css',
})
export class BadgeDocComponent {
  readonly activeTab = signal<'preview' | 'code'>('preview');

  readonly importSnippet = `import { Component } from '@angular/core';
import { BadgeComponent } from 'nuvex-ui/badge';

@Component({
  selector: 'app-mi-vista',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './mi-vista.component.html',
})
export class MiVistaComponent {}`;

  readonly usageSnippet = `<!-- Variantes de estado -->
<nuvex-badge variant="primary">Primary</nuvex-badge>
<nuvex-badge variant="secondary">Secondary</nuvex-badge>
<nuvex-badge variant="success">Activo</nuvex-badge>
<nuvex-badge variant="warning">Pendiente</nuvex-badge>
<nuvex-badge variant="danger">Error</nuvex-badge>
<nuvex-badge variant="info">Nuevo</nuvex-badge>

<!-- Tamaños disponibles -->
<nuvex-badge size="sm">Compacto</nuvex-badge>
<nuvex-badge size="md">Normal (default)</nuvex-badge>
<nuvex-badge size="lg">Destacado</nuvex-badge>

<!-- Incrustado en botones -->
<nuvex-button variant="secondary">
  Alertas
  <nuvex-badge variant="danger" size="sm">3</nuvex-badge>
</nuvex-button>`;
}
