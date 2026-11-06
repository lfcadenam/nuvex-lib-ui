import { Component, input, output, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ButtonVariant, ButtonSize } from './button.types';
// Secondary entry point import
import { SpinnerComponent } from 'nuvex-ui/src/lib/spinner';

@Component({
  selector: 'nuvex-button, button[nuvexButton], a[nuvexButton]',
  standalone: true,
  imports: [SpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  host: {
    'class': 'nuvex-button',
    '[class.nuvex-button--primary]': 'variant() === "primary"',
    '[class.nuvex-button--secondary]': 'variant() === "secondary"',
    '[class.nuvex-button--danger]': 'variant() === "danger"',
    '[class.nuvex-button--ghost]': 'variant() === "ghost"',
    '[class.nuvex-button--sm]': 'size() === "sm"',
    '[class.nuvex-button--lg]': 'size() === "lg"',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[attr.aria-disabled]': 'disabled() || loading()',
    '(click)': 'onHostClick($event)',
  },
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly icon = input<boolean>(false);

  readonly onClick = output<MouseEvent>();

  protected onHostClick(event: MouseEvent) {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    this.onClick.emit(event);
  }
}
