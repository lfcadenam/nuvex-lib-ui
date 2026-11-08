import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewEncapsulation,
  computed,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption, SelectSize, SelectVariant } from './select.types';

@Component({
  selector: 'nuvex-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  host: {
    class: 'nuvex-select-wrapper',
    '[class.nuvex-select--open]': 'isOpen()',
    '[class.nuvex-select--disabled]': 'effectiveDisabled()',
    '[class.nuvex-select--error]': '!!errorText()',
    '[class.nuvex-select--sm]': 'size() === "sm"',
    '[class.nuvex-select--lg]': 'size() === "lg"',
    '[class.nuvex-select--pill]': 'variant() === "pill"',
    '[class.nuvex-select--ghost]': 'variant() === "ghost"',
  },
})
export class SelectComponent implements ControlValueAccessor {
  private readonly elementRef = inject(ElementRef);

  /** Opciones disponibles */
  readonly options = input<SelectOption[]>([]);

  /** Texto guía si no hay opción seleccionada */
  readonly placeholder = input<string>('Seleccionar...');

  /** Si habilita el buscador interno */
  readonly searchable = input<boolean>(false);

  /** Placeholder del buscador */
  readonly searchPlaceholder = input<string>('Buscar opción...');

  /** Selección múltiple */
  readonly multiple = input<boolean>(false);

  /** Si permite deseleccionar con un botón (x) */
  readonly clearable = input<boolean>(false);

  /** Estado deshabilitado desde input */
  readonly disabled = input<boolean>(false);

  /** Tamaño visual */
  readonly size = input<SelectSize>('md');

  /** Variante estética */
  readonly variant = input<SelectVariant>('default');

  /** Etiqueta superior del campo */
  readonly label = input<string>('');

  /** Texto aclaratorio al pie */
  readonly helperText = input<string>('');

  /** Mensaje de error */
  readonly errorText = input<string>('');

  /** Valor bidireccional mediante signal model */
  readonly value = model<any>(null);

  /** Emite el cambio de valor */
  readonly selectionChange = output<any>();

  // Estados reactivos internos
  readonly isOpen = signal<boolean>(false);
  readonly searchQuery = signal<string>('');
  readonly cvaDisabled = signal<boolean>(false);
  readonly activeIndex = signal<number>(-1);

  // CVA callbacks
  private onChange: (val: any) => void = () => {};
  private onTouched: () => void = () => {};

  /** Estado efectivo de deshabilitado (combinación de input y CVA) */
  readonly effectiveDisabled = computed(() => this.disabled() || this.cvaDisabled());

  /** Opciones filtradas por el buscador (insensible a mayúsculas y acentos) */
  readonly filteredOptions = computed(() => {
    const list = this.options() || [];
    const query = this.normalizeText(this.searchQuery().trim());
    if (!query) return list;
    return list.filter((opt) => {
      const label = this.normalizeText(opt.label);
      const val = this.normalizeText(String(opt.value));
      return label.includes(query) || val.includes(query);
    });
  });

  private normalizeText(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  /** Opciones seleccionadas (soporta valor singular o array) */
  readonly selectedOptions = computed<SelectOption[]>(() => {
    const currentVal = this.value();
    const opts = this.options() || [];

    if (this.multiple()) {
      if (!Array.isArray(currentVal)) return [];
      return opts.filter((opt) => currentVal.includes(opt.value));
    }

    const match = opts.find((opt) => opt.value === currentVal);
    return match ? [match] : [];
  });

  /** Texto representativo a mostrar en el trigger */
  readonly displayLabel = computed<string>(() => {
    const selected = this.selectedOptions();
    if (selected.length === 0) return '';
    if (this.multiple()) {
      return `${selected.length} seleccionados`;
    }
    return selected[0].label;
  });

  /** Alterna la apertura del menú desplegable */
  toggleDropdown(): void {
    if (this.effectiveDisabled()) return;
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  /** Abre el desplegable */
  open(): void {
    if (this.effectiveDisabled()) return;
    this.isOpen.set(true);
    this.searchQuery.set('');
    this.activeIndex.set(-1);
  }

  /** Cierra el desplegable */
  close(): void {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    this.onTouched();
  }

  /** Selección de una opción */
  selectOption(opt: SelectOption, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (opt.disabled || this.effectiveDisabled()) return;

    if (this.multiple()) {
      const current = Array.isArray(this.value()) ? [...this.value()] : [];
      const idx = current.indexOf(opt.value);
      if (idx > -1) {
        current.splice(idx, 1);
      } else {
        current.push(opt.value);
      }
      this.setValue(current);
    } else {
      this.setValue(opt.value);
      this.close();
    }
  }

  /** Si una opción está actualmente seleccionada */
  isSelected(opt: SelectOption): boolean {
    const current = this.value();
    if (this.multiple()) {
      return Array.isArray(current) && current.includes(opt.value);
    }
    return current === opt.value;
  }

  /** Elimina un tag en selección múltiple */
  removeTag(opt: SelectOption, event: Event): void {
    event.stopPropagation();
    if (this.effectiveDisabled()) return;
    const current = Array.isArray(this.value()) ? [...this.value()] : [];
    const filtered = current.filter((v) => v !== opt.value);
    this.setValue(filtered);
  }

  /** Limpia completamente la selección */
  clearSelection(event: Event): void {
    event.stopPropagation();
    if (this.effectiveDisabled()) return;
    this.setValue(this.multiple() ? [] : null);
  }

  /** Aplica el nuevo valor y notifica a Forms y outputs */
  private setValue(newVal: any): void {
    this.value.set(newVal);
    this.onChange(newVal);
    this.selectionChange.emit(newVal);
  }

  /** Búsqueda en vivo */
  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  /** Navegación por teclado */
  onKeyDown(event: KeyboardEvent): void {
    if (this.effectiveDisabled()) return;

    const opts = this.filteredOptions();
    if (!opts.length) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.open();
        } else {
          this.activeIndex.update((i) => (i + 1 >= opts.length ? 0 : i + 1));
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen()) {
          this.activeIndex.update((i) => (i - 1 < 0 ? opts.length - 1 : i - 1));
        }
        break;
      case 'Enter':
        if (this.isOpen() && this.activeIndex() >= 0 && this.activeIndex() < opts.length) {
          event.preventDefault();
          this.selectOption(opts[this.activeIndex()]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
    }
  }

  /** Cierre automático al hacer clic fuera del componente */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen()) return;
    const nativeEl = this.elementRef.nativeElement;
    if (!nativeEl.contains(event.target)) {
      this.close();
    }
  }

  // Métodos de ControlValueAccessor
  writeValue(val: any): void {
    this.value.set(val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }
}
