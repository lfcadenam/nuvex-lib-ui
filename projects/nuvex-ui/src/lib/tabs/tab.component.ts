import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nuvex-tab',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #contentTemplate>
      <ng-content />
    </ng-template>
  `,
  host: {
    class: 'nuvex-tab-pane',
    '[class.nuvex-tab-pane--active]': 'active()',
  },
})
export class TabComponent {
  /** Identificador único de la pestaña */
  readonly id = input.required<string>();

  /** Etiqueta visible en la barra de pestañas */
  readonly label = input.required<string>();

  /** Badge numérico o texto aclaratorio opcional */
  readonly badge = input<string | number | null>(null);

  /** Si la pestaña está deshabilitada */
  readonly disabled = input<boolean>(false);

  /** Template que envuelve el contenido proyectado */
  @ViewChild('contentTemplate', { static: true })
  readonly contentTemplate!: TemplateRef<any>;

  /** Estado activo gestionado por el contenedor padre */
  readonly active = signal<boolean>(false);
}
