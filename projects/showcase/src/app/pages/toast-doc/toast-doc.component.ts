import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastContainerComponent } from 'nuvex-ui/toast';
import { ToastPosition } from 'nuvex-ui/toast';
import { ButtonComponent } from 'nuvex-ui/button';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

@Component({
  selector: 'app-toast-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ButtonComponent, ToastContainerComponent, CodeSnippetComponent],
  templateUrl: './toast-doc.component.html',
  styleUrl: '../doc-shared.css',
})
export class ToastDocComponent {
  private readonly toast = inject(ToastService);

  readonly activeTab = signal<'preview' | 'code'>('preview');
  readonly currentPosition = signal<ToastPosition>('top-right');

  setPosition(pos: ToastPosition): void {
    this.currentPosition.set(pos);
    this.toast.setPosition(pos);
  }

  showSuccess(): void {
    this.toast.success(
      'La reserva de Paola Aguilera ha sido confirmada y sincronizada.',
      'Cita Confirmada'
    );
  }

  showError(): void {
    this.toast.error(
      'No se pudo conectar con el servidor de pagos. Reintenta en unos instantes.',
      'Error de Transacción'
    );
  }

  showWarning(): void {
    this.toast.warning(
      'La suscripción al plan Pro vence en 3 días. Revisa tu facturación.',
      'Suscripción por Vencer'
    );
  }

  showInfo(): void {
    this.toast.info(
      'El reporte consolidado de noviembre se ha exportado en segundo plano.',
      'Reporte Generado'
    );
  }

  showWithAction(): void {
    this.toast.show({
      title: 'Cliente Archivado',
      message: 'El registro de Carlos Morales se movió a la papelera.',
      type: 'default',
      duration: 6000,
      action: {
        label: 'Deshacer',
        onClick: () => {
          this.toast.success('El cliente ha sido restaurado con éxito.', 'Acción Revertida');
        },
      },
    });
  }

  clearAll(): void {
    this.toast.clearAll();
  }

  readonly basicUsageCode = `import { Component, inject } from '@angular/core';
import { ToastService, ToastContainerComponent } from 'nuvex-ui/toast';
import { ButtonComponent } from 'nuvex-ui/button';

@Component({
  standalone: true,
  imports: [ButtonComponent, ToastContainerComponent],
  template: \`
    <!-- Contenedor flotante (se puede ubicar en app.component.html) -->
    <nuvex-toast-container />

    <!-- Disparadores de Toast -->
    <nuvex-button (click)="notifySuccess()">Guardar Cita</nuvex-button>
    <nuvex-button variant="danger" (click)="notifyError()">Simular Error</nuvex-button>
  \`,
})
export class AppointmentPageComponent {
  private toast = inject(ToastService);

  notifySuccess() {
    this.toast.success('La cita fue agendada exitosamente', 'Confirmación');
  }

  notifyError() {
    this.toast.error('Ocurrió un problema de red', 'Fallo de Conexión');
  }

  notifyWithAction() {
    this.toast.show({
      title: 'Elemento Eliminado',
      message: 'Se archivó el servicio seleccionado.',
      type: 'default',
      duration: 5000,
      action: {
        label: 'Deshacer',
        onClick: () => console.log('Revertido'),
      },
    });
  }
}`;
}
