import { Component, input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { BadgeVariant, BadgeSize } from './badge.types';

@Component({
  selector: 'nuvex-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
  host: {
    'class': 'nuvex-badge',
    '[class.nuvex-badge--primary]':   'variant() === "primary"',
    '[class.nuvex-badge--secondary]': 'variant() === "secondary"',
    '[class.nuvex-badge--success]':   'variant() === "success"',
    '[class.nuvex-badge--warning]':   'variant() === "warning"',
    '[class.nuvex-badge--danger]':    'variant() === "danger"',
    '[class.nuvex-badge--info]':      'variant() === "info"',
    '[class.nuvex-badge--sm]':        'size() === "sm"',
    '[class.nuvex-badge--lg]':        'size() === "lg"',
  },
})
export class BadgeComponent {
  readonly variant = input<BadgeVariant>('primary');
  readonly size = input<BadgeSize>('md');
}
