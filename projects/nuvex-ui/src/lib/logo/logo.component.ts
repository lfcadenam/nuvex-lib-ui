import { Component, input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { LogoVariant, LogoSize } from './logo.types';

@Component({
  selector: 'nuvex-logo, nx-logo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css',
  host: {
    'class': 'nuvex-logo-host',
  },
})
export class LogoComponent {
  readonly variant = input<LogoVariant>('full');
  readonly size = input<LogoSize>('md');
  readonly withGlow = input<boolean>(false);
  readonly showSubtitle = input<boolean>(true);
}
