import {
  Component,
  input,
  output,
  model,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DockItem } from './capsule-dock.types';

@Component({
  selector: 'nuvex-capsule-dock',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './capsule-dock.component.html',
  styleUrl: './capsule-dock.component.css',
  host: {
    'class': 'nuvex-capsule-dock',
  },
})
export class CapsuleDockComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly items = input<DockItem[]>([]);
  readonly activeId = model<string>('');

  readonly onSelect = output<DockItem>();

  protected selectItem(item: DockItem) {
    this.activeId.set(item.id);
    this.onSelect.emit(item);
  }

  protected getSafeIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}
