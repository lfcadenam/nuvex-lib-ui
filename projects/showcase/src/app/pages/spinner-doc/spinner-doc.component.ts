import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { SpinnerComponent } from 'nuvex-ui/spinner';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

@Component({
  selector: 'app-spinner-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SpinnerComponent, CodeSnippetComponent],
  templateUrl: './spinner-doc.component.html',
  styleUrl: '../doc-shared.css',
})
export class SpinnerDocComponent {
  readonly activeTab = signal<'preview' | 'code'>('preview');

  readonly importSnippet = `import { Component } from '@angular/core';
import { SpinnerComponent } from 'nuvex-ui/spinner';

@Component({
  selector: 'app-mi-vista',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './mi-vista.component.html',
})
export class MiVistaComponent {}`;

  readonly usageSnippet = `<!-- Tamaños disponibles -->
<nuvex-spinner size="sm" />
<nuvex-spinner size="md" />
<nuvex-spinner size="lg" />

<!-- Variantes de color -->
<nuvex-spinner variant="primary" />
<nuvex-spinner variant="secondary" />
<nuvex-spinner variant="white" />
<nuvex-spinner variant="current" /> <!-- Hereda currentColor -->`;
}
