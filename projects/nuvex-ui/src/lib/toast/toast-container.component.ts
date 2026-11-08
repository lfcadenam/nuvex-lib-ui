import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';
import { ToastComponent } from './toast.component';
import { ToastPosition } from './toast.types';

@Component({
  selector: 'nuvex-toast-container',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.css',
  host: {
    class: 'nuvex-toast-container',
    '[class.nuvex-toast-container--top-right]': 'effectivePosition() === "top-right"',
    '[class.nuvex-toast-container--top-left]': 'effectivePosition() === "top-left"',
    '[class.nuvex-toast-container--top-center]': 'effectivePosition() === "top-center"',
    '[class.nuvex-toast-container--bottom-right]': 'effectivePosition() === "bottom-right"',
    '[class.nuvex-toast-container--bottom-left]': 'effectivePosition() === "bottom-left"',
    '[class.nuvex-toast-container--bottom-center]': 'effectivePosition() === "bottom-center"',
  },
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);

  /** Sobrescribe la posición si se define por input */
  readonly position = input<ToastPosition | null>(null);

  get effectivePosition(): () => ToastPosition {
    return () => this.position() || this.toastService.position();
  }

  onDismiss(id: string): void {
    this.toastService.dismiss(id);
  }
}
