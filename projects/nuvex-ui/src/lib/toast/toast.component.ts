import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastItem } from './toast.types';

@Component({
  selector: 'nuvex-toast',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  host: {
    class: 'nuvex-toast',
    '[class.nuvex-toast--success]': 'toast().type === "success"',
    '[class.nuvex-toast--error]': 'toast().type === "error"',
    '[class.nuvex-toast--warning]': 'toast().type === "warning"',
    '[class.nuvex-toast--info]': 'toast().type === "info"',
    '[class.nuvex-toast--default]': 'toast().type === "default"',
  },
})
export class ToastComponent {
  /** Notificación individual */
  readonly toast = input.required<ToastItem>();

  /** Evento emitido al cerrar el toast */
  readonly dismiss = output<string>();

  onClose(event?: Event): void {
    if (event) event.stopPropagation();
    this.dismiss.emit(this.toast().id);
  }

  onActionClick(event: Event): void {
    event.stopPropagation();
    const item = this.toast();
    if (item.action) {
      item.action.onClick(item);
    }
    this.onClose();
  }
}
