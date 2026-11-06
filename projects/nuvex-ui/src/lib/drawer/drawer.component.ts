import {
  Component,
  input,
  output,
  model,
  effect,
  inject,
  PLATFORM_ID,
  HostListener,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DrawerSize } from './drawer.types';

@Component({
  selector: 'nuvex-drawer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
  host: {
    'class': 'nuvex-drawer',
    '[class.nuvex-drawer--sm]': 'size() === "sm"',
    '[class.nuvex-drawer--md]': 'size() === "md"',
    '[class.nuvex-drawer--lg]': 'size() === "lg"',
    '[class.nuvex-drawer--full]': 'size() === "full"',
  },
})
export class DrawerComponent {
  private readonly platformId = inject(PLATFORM_ID);

  readonly isOpen = model<boolean>(false);
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly size = input<DrawerSize>('md');
  readonly closeOnBackdrop = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);

  readonly onClose = output<void>();

  constructor() {
    effect(() => {
      const open = this.isOpen();
      if (!isPlatformBrowser(this.platformId)) return;

      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  @HostListener('window:keydown.escape')
  onEscape() {
    if (this.isOpen() && this.closeOnEscape()) {
      this.close();
    }
  }

  onBackdropClick() {
    if (this.closeOnBackdrop()) {
      this.close();
    }
  }

  close() {
    this.isOpen.set(false);
    this.onClose.emit();
  }
}
