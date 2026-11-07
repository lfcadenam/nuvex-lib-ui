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
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ModalSize } from './modal.types';

@Component({
  selector: 'nuvex-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  host: {
    'class': 'nuvex-modal',
    '[class.nuvex-modal--sm]': 'size() === "sm"',
    '[class.nuvex-modal--md]': 'size() === "md"',
    '[class.nuvex-modal--lg]': 'size() === "lg"',
    '[class.nuvex-modal--xl]': 'size() === "xl"',
    '[class.nuvex-modal--full]': 'size() === "full"',
  },
})
export class ModalComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  readonly isOpen = model<boolean>(false);
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly size = input<ModalSize>('md');
  readonly closeOnBackdrop = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);
  readonly closable = input<boolean>(true);
  readonly centered = input<boolean>(true);
  readonly scrollable = input<boolean>(true);

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

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }
}
