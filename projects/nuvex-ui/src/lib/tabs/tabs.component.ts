import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  contentChildren,
  effect,
  input,
  model,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';
import { TabItem, TabSize, TabVariant } from './tabs.types';

@Component({
  selector: 'nuvex-tabs',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
  host: {
    class: 'nuvex-tabs',
    '[class.nuvex-tabs--pill]': 'variant() === "pill"',
    '[class.nuvex-tabs--underline]': 'variant() === "underline"',
    '[class.nuvex-tabs--card]': 'variant() === "card"',
    '[class.nuvex-tabs--sm]': 'size() === "sm"',
    '[class.nuvex-tabs--lg]': 'size() === "lg"',
    '[class.nuvex-tabs--full-width]': 'fullWidth()',
  },
})
export class TabsComponent {
  /** Pestañas declarativas mediante lista de objetos (alternativa a nuvex-tab proyectado) */
  readonly items = input<TabItem[]>([]);

  /** Pestañas proyectadas como componentes hijos <nuvex-tab> */
  readonly projectedTabs = contentChildren(TabComponent);

  /** Identificador de la pestaña activa (modelo bidireccional) */
  readonly value = model<string>('');

  /** Variante estética */
  readonly variant = input<TabVariant>('pill');

  /** Tamaño visual */
  readonly size = input<TabSize>('md');

  /** Si las pestañas ocupan el 100% del ancho divididas equitativamente */
  readonly fullWidth = input<boolean>(false);

  /** Evento emitido al cambiar de pestaña */
  readonly tabChange = output<string>();

  constructor() {
    // Sincronizar estado activo de las pestañas proyectadas
    effect(() => {
      const currentVal = this.value();
      const pTabs = this.projectedTabs();

      if (!currentVal && pTabs.length > 0) {
        // Seleccionar la primera no deshabilitada
        const firstEnabled = pTabs.find((t) => !t.disabled());
        if (firstEnabled) {
          this.value.set(firstEnabled.id());
          return;
        }
      }

      pTabs.forEach((tab) => {
        tab.active.set(tab.id() === currentVal);
      });
    });

    // Sincronizar con items declarativos si no hay proyectados
    effect(() => {
      const currentVal = this.value();
      const declItems = this.items();
      const pTabs = this.projectedTabs();

      if (pTabs.length === 0 && declItems.length > 0 && !currentVal) {
        const first = declItems.find((i) => !i.disabled);
        if (first) {
          this.value.set(first.id);
        }
      }
    });
  }

  /** Lista consolidada de cabeceras de pestañas */
  readonly headerItems = computed<TabItem[]>(() => {
    const pTabs = this.projectedTabs();
    if (pTabs.length > 0) {
      return pTabs.map((t) => ({
        id: t.id(),
        label: t.label(),
        badge: t.badge() ?? undefined,
        disabled: t.disabled(),
      }));
    }
    return this.items();
  });

  /** Pestaña activa proyectada */
  readonly activeProjectedTab = computed(() => {
    const currentId = this.value();
    return this.projectedTabs().find((t) => t.id() === currentId);
  });

  /** Selecciona una pestaña */
  selectTab(tab: TabItem): void {
    if (tab.disabled || tab.id === this.value()) return;
    this.value.set(tab.id);
    this.tabChange.emit(tab.id);
  }

  /** Navegación accesible con flechas del teclado */
  onKeyDown(event: KeyboardEvent, currentIndex: number): void {
    const tabs = this.headerItems().filter((t) => !t.disabled);
    if (tabs.length === 0) return;

    let targetTab: TabItem | null = null;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIdx = (currentIndex + 1) % tabs.length;
      targetTab = tabs[nextIdx];
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const prevIdx = (currentIndex - 1 + tabs.length) % tabs.length;
      targetTab = tabs[prevIdx];
    } else if (event.key === 'Home') {
      event.preventDefault();
      targetTab = tabs[0];
    } else if (event.key === 'End') {
      event.preventDefault();
      targetTab = tabs[tabs.length - 1];
    }

    if (targetTab) {
      this.selectTab(targetTab);
    }
  }
}
