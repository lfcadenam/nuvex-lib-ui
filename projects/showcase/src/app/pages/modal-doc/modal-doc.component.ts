import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ModalComponent } from 'nuvex-ui/modal';
import { ButtonComponent } from 'nuvex-ui/button';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

@Component({
  selector: 'app-modal-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ModalComponent, ButtonComponent, CodeSnippetComponent],
  templateUrl: './modal-doc.component.html',
  styleUrl: '../doc-shared.css',
  styles: [`
    .demo-buttons-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      align-items: center;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      margin-bottom: 1rem;
    }
    .form-label {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--nvl-text-muted-color, #64748b);
    }
    .form-input {
      width: 100%;
      padding: 0.625rem 0.875rem;
      font-size: 0.875rem;
      border: 1px solid var(--nvl-border-color, #cbd5e1);
      border-radius: 0.75rem;
      background: var(--nvl-surface-0, #ffffff);
      color: var(--nvl-text-color, #0f172a);
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .form-input:focus {
      border-color: #00c975;
      box-shadow: 0 0 0 3px rgba(0, 201, 117, 0.15);
    }
  `],
})
export class ModalDocComponent {
  readonly activeTab = signal<'preview' | 'code'>('preview');

  // Modales de prueba
  readonly isStandardOpen = signal(false);
  readonly isConfirmOpen = signal(false);
  readonly isLargeOpen = signal(false);
  readonly isScrollOpen = signal(false);

  readonly importSnippet = `import { Component, signal } from '@angular/core';
import { ModalComponent } from 'nuvex-ui/modal';
import { ButtonComponent } from 'nuvex-ui/button';

@Component({
  selector: 'app-mi-vista',
  standalone: true,
  imports: [ModalComponent, ButtonComponent],
  templateUrl: './mi-vista.component.html',
})
export class MiVistaComponent {
  readonly isModalOpen = signal(false);

  abrirModal() {
    this.isModalOpen.set(true);
  }

  cerrarModal() {
    this.isModalOpen.set(false);
  }
}`;

  readonly usageSnippet = `<!-- 1. Modal Estándar de Formulario (Nuvex Modern Curve) -->
<nuvex-modal
  [(isOpen)]="isModalOpen"
  title="Nueva Caja de Dinero"
  subtitle="Crea una caja independiente para gestionar flujos propios"
  size="md"
>
  <!-- Slot de Icono Opcional en Cabecera -->
  <div slot="header-icon">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  </div>

  <!-- Contenido del Modal -->
  <form class="space-y-4">
    <div>
      <label class="form-label">Nombre de la caja</label>
      <input type="text" placeholder="Ej: Caja Menor" class="form-input" />
    </div>
    <div>
      <label class="form-label">Saldo Inicial</label>
      <input type="number" placeholder="$0" class="form-input" />
    </div>
  </form>

  <!-- Acciones / Footer -->
  <div slot="footer" class="flex gap-2 justify-end">
    <nuvex-button variant="secondary" (click)="cerrarModal()">Cancelar</nuvex-button>
    <nuvex-button variant="primary" (click)="guardar()">Guardar Caja</nuvex-button>
  </div>
</nuvex-modal>

<!-- 2. Modal de Confirmación Compacto (size="sm") -->
<nuvex-modal
  [(isOpen)]="isConfirmOpen"
  title="¿Eliminar esta caja?"
  subtitle="Esta acción no se puede deshacer"
  size="sm"
>
  <p class="text-sm text-slate-600">
    Se transferirán los fondos restantes a la cuenta bancaria principal.
  </p>

  <div slot="footer" class="flex gap-2 justify-end">
    <nuvex-button variant="secondary" (click)="isConfirmOpen.set(false)">Cancelar</nuvex-button>
    <nuvex-button variant="danger" (click)="confirmarEliminar()">Eliminar</nuvex-button>
  </div>
</nuvex-modal>`;
}
