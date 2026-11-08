import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { AvatarGroupSpacing } from './avatar.types';

@Component({
  selector: 'nuvex-avatar-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './avatar-group.component.html',
  styleUrl: './avatar-group.component.css',
  host: {
    class: 'nuvex-avatar-group',
    '[class.nuvex-avatar-group--sm]': 'spacing() === "sm"',
    '[class.nuvex-avatar-group--md]': 'spacing() === "md"',
    '[class.nuvex-avatar-group--lg]': 'spacing() === "lg"',
    '[class.nuvex-avatar-group--hoverable]': 'hoverEffect()',
  },
})
export class AvatarGroupComponent {
  /** Separación / margen negativo de solapamiento entre avatares */
  readonly spacing = input<AvatarGroupSpacing>('md');

  /** Efecto de elevación sutil en el eje Z al pasar el cursor sobre un avatar */
  readonly hoverEffect = input<boolean>(true);
}
