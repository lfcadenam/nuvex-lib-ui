import {
  Component,
  input,
  output,
  model,
  computed,
  forwardRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SegmentedOption, SegmentedItem, SegmentedSize } from './segmented.types';

@Component({
  selector: 'nuvex-segmented',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './segmented.component.html',
  styleUrl: './segmented.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SegmentedComponent),
      multi: true,
    },
  ],
  host: {
    'class': 'nuvex-segmented',
    '[class.nuvex-segmented--sm]': 'size() === "sm"',
  },
})
export class SegmentedComponent implements ControlValueAccessor {
  readonly options = input.required<SegmentedOption[]>();
  readonly size = input<SegmentedSize>('md');
  readonly disabled = input<boolean>(false);

  readonly value = model<any>(null);
  readonly onValueChange = output<any>();

  protected readonly normalizedOptions = computed<SegmentedItem[]>(() => {
    return this.options().map((opt) => {
      if (typeof opt === 'string' || typeof opt === 'number') {
        return { label: String(opt), value: opt };
      }
      return opt;
    });
  });

  private onChange: (val: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(val: any): void {
    this.value.set(val);
  }

  registerOnChange(fn: (val: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  protected isSelected(val: any): boolean {
    const current = this.value();
    if (current === null || current === undefined) {
      // Si no hay valor seleccionado por defecto, toma el primero
      const first = this.normalizedOptions()[0]?.value;
      return first === val;
    }
    return current === val;
  }

  protected selectItem(val: any): void {
    if (this.disabled()) return;
    this.value.set(val);
    this.onChange(val);
    this.onTouched();
    this.onValueChange.emit(val);
  }
}
