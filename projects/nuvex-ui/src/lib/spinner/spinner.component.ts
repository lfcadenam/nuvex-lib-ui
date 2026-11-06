import { Component, input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { SpinnerSize, SpinnerVariant } from './spinner.types';

@Component({
  selector: 'nuvex-spinner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
  host: {
    'class': 'nuvex-spinner',
    '[class.nuvex-spinner--sm]': 'size() === "sm"',
    '[class.nuvex-spinner--md]': 'size() === "md"',
    '[class.nuvex-spinner--lg]': 'size() === "lg"',
    '[class.nuvex-spinner--primary]': 'variant() === "primary"',
    '[class.nuvex-spinner--secondary]': 'variant() === "secondary"',
    '[class.nuvex-spinner--white]': 'variant() === "white"',
    '[class.nuvex-spinner--current]': 'variant() === "current"',
    'role': 'status',
    'aria-label': 'Cargando...',
  },
})
export class SpinnerComponent {
  readonly size = input<SpinnerSize>('md');
  readonly variant = input<SpinnerVariant>('current');
}
