import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { SwitchComponent } from 'nuvex-ui/switch';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

@Component({
  selector: 'app-switch-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SwitchComponent, CodeSnippetComponent],
  templateUrl: './switch-doc.component.html',
  styleUrl: '../doc-shared.css',
})
export class SwitchDocComponent {
  readonly activeTab = signal<'preview' | 'code'>('preview');

  readonly demoVsPeriod = signal(true);
  readonly demoNotif = signal(false);

  readonly importSnippet = `import { Component, signal } from '@angular/core';
import { SwitchComponent } from 'nuvex-ui/switch';

@Component({
  selector: 'app-mi-vista',
  standalone: true,
  imports: [SwitchComponent],
  templateUrl: './mi-vista.component.html',
})
export class MiVistaComponent {
  activado = signal(true);
}`;

  readonly usageSnippet = `<!-- Switch básico con label y two-way binding -->
<nuvex-switch
  label="vs previous period"
  [(checked)]="activado"
/>

<!-- Tamaños disponibles -->
<nuvex-switch size="sm" label="Compacto" />
<nuvex-switch size="md" label="Normal (default)" />

<!-- Deshabilitado -->
<nuvex-switch [disabled]="true" [checked]="true" label="Bloqueado" />`;
}
