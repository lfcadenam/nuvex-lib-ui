import {
  Component,
  input,
  output,
  model,
  signal,
  ElementRef,
  HostListener,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { TopbarTab, UserProfile, UserMenuOption } from './topbar.types';

@Component({
  selector: 'nuvex-topbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
  host: {
    'class': 'nuvex-topbar-wrapper',
    'style': 'display: block; width: 100%; max-width: 100%;',
  },
})
export class TopbarComponent {
  private readonly elementRef = inject(ElementRef);

  readonly brandTitle = input<string>('');
  readonly tabs = input<TopbarTab[]>([]);
  readonly activeTabId = model<string>('');
  readonly liveMetric = input<string>('');
  readonly user = input<UserProfile | null>(null);

  readonly onTabChange = output<TopbarTab>();
  readonly onMenuSelect = output<UserMenuOption>();

  protected readonly isMenuOpen = signal<boolean>(false);

  toggleUserMenu() {
    this.isMenuOpen.update((v) => !v);
  }

  triggerMenuOption(option: UserMenuOption) {
    this.isMenuOpen.set(false);
    this.onMenuSelect.emit(option);
  }

  selectTab(tab: TopbarTab) {
    this.activeTabId.set(tab.id);
    this.onTabChange.emit(tab);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen.set(false);
    }
  }
}
