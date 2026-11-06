import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { InputComponent, InputDirective } from 'nuvex-ui/input';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

@Component({
  selector: 'app-input-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputComponent, InputDirective, CodeSnippetComponent],
  templateUrl: './input-doc.component.html',
  styleUrl: '../doc-shared.css',
})
export class InputDocComponent {
  readonly activeTab = signal<'preview' | 'code'>('preview');

  readonly demoEmail = signal('admin@nuvex.co');
  readonly demoError = signal('dato_invalido');

  readonly importSnippet = `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent, InputDirective } from 'nuvex-ui/input';

@Component({
  selector: 'app-mi-formulario',
  standalone: true,
  imports: [FormsModule, InputComponent, InputDirective],
  templateUrl: './mi-formulario.component.html',
})
export class MiFormularioComponent {
  correo = signal('');
}`;

  readonly usageSnippet = `<!-- Componente completo con label, helper y two-way binding -->
<nuvex-input
  label="Correo electrónico"
  type="email"
  placeholder="usuario@empresa.com"
  [required]="true"
  helperText="No compartiremos tu correo con terceros"
  [(value)]="correo"
/>

<!-- Estado de error -->
<nuvex-input
  label="Contraseña"
  type="password"
  [invalid]="passwordInvalido()"
  errorMessage="La contraseña debe tener al menos 8 caracteres"
/>

<!-- Tamaños disponibles -->
<nuvex-input size="sm" placeholder="Compacto" />
<nuvex-input size="md" placeholder="Normal (default)" />
<nuvex-input size="lg" placeholder="Grande" />

<!-- Directiva sobre input nativo -->
<input type="text" nuvexInput placeholder="Input nativo estilizado" />`;
}
