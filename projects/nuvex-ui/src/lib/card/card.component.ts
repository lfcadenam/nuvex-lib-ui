import { Component, input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CardVariant, CardPadding } from './card.types';

@Component({
  selector: 'nuvex-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  host: {
    'class': 'nuvex-card',
    '[class.nuvex-card--hero]': 'variant() === "hero"',
    '[class.nuvex-card--outlined]': 'variant() === "outlined"',
    '[class.nuvex-card--hoverable]': 'hoverable()',
    '[class.nuvex-card--padding-none]': 'padding() === "none"',
    '[class.nuvex-card--padding-sm]': 'padding() === "sm"',
    '[class.nuvex-card--padding-md]': 'padding() === "md"',
    '[class.nuvex-card--padding-lg]': 'padding() === "lg"',
  },
})
export class CardComponent {
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly variant = input<CardVariant>('default');
  readonly padding = input<CardPadding>('md');
  readonly hoverable = input<boolean>(false);

  protected readonly hasHeaderSlot = false;
}
