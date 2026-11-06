import {
  Component,
  input,
  output,
  model,
  forwardRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SwitchSize } from './switch.types';

@Component({
  selector: 'nuvex-switch',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
  host: {
    'class': 'nuvex-switch',
    '[class.nuvex-switch--checked]': 'checked()',
    '[class.nuvex-switch--disabled]': 'disabled()',
    '[class.nuvex-switch--sm]': 'size() === "sm"',
  },
})
export class SwitchComponent implements ControlValueAccessor {
  readonly label = input<string>('');
  readonly size = input<SwitchSize>('md');

  readonly checked = model<boolean>(false);
  readonly disabled = model<boolean>(false);

  readonly onChangeEvent = output<boolean>();

  private onChange: (val: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(val: boolean): void {
    this.checked.set(Boolean(val));
  }

  registerOnChange(fn: (val: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  toggle(): void {
    if (this.disabled()) return;
    const next = !this.checked();
    this.checked.set(next);
    this.onChange(next);
    this.onTouched();
    this.onChangeEvent.emit(next);
  }

  onSpaceKey(event: Event): void {
    event.preventDefault();
    this.toggle();
  }
}
