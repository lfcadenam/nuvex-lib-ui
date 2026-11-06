import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent } from 'nuvex-ui/button';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

@Component({
  selector: 'app-button-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, CodeSnippetComponent],
  templateUrl: './button-doc.component.html',
  styleUrl: '../doc-shared.css',
})
export class ButtonDocComponent {
  readonly activeTab = signal<'preview' | 'code'>('preview');
  readonly isLoading = signal(true);

  toggleLoading() {
    this.isLoading.update((v) => !v);
  }

  readonly importSnippet = `import { Component } from '@angular/core';
import { ButtonComponent } from 'nuvex-ui/button';

@Component({
  selector: 'app-mi-vista',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './mi-vista.component.html',
})
export class MiVistaComponent {
  // Manejador de evento click
  guardar() {
    console.log('Botón clickeado');
  }
}`;

  readonly usageSnippet = `<!-- Variantes visuales -->
<nuvex-button variant="primary" (onClick)="guardar()">Guardar</nuvex-button>
<nuvex-button variant="secondary">Cancelar</nuvex-button>
<nuvex-button variant="danger">Eliminar</nuvex-button>
<nuvex-button variant="ghost">Ver más</nuvex-button>

<!-- Tamaños disponibles -->
<nuvex-button size="sm">Pequeño</nuvex-button>
<nuvex-button size="md">Normal (default)</nuvex-button>
<nuvex-button size="lg">Grande</nuvex-button>

<!-- Uso como directiva sobre elementos HTML estándar -->
<button type="submit" nuvexButton variant="primary">Enviar Formulario</button>
<a href="/dashboard" nuvexButton variant="ghost">Ir al Dashboard</a>`;

  readonly advancedSnippet = `<!-- Estado de carga con spinner integrado -->
<nuvex-button [loading]="cargando()" variant="primary">
  Guardar Cambios
</nuvex-button>

<!-- Botón con icono en slot dedicado -->
<nuvex-button variant="secondary" [icon]="true">
  <svg slot="icon" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
  </svg>
  Nuevo Registro
</nuvex-button>`;
}
