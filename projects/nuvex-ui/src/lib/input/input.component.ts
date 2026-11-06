import {
  Component,
  Directive,
  input,
  output,
  model,
  signal,
  forwardRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputSize, InputType } from './input.types';

@Component({
  selector: 'nuvex-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  host: {
    'class': 'nuvex-input',
    '[class.nuvex-input--sm]': 'size() === "sm"',
    '[class.nuvex-input--lg]': 'size() === "lg"',
    '[class.nuvex-input--invalid]': 'invalid()',
    '[class.nuvex-input--disabled]': 'disabled()',
  },
})
export class InputComponent implements ControlValueAccessor {
  readonly label = input<string>('');
  readonly placeholder = input<string>('');
  readonly type = input<InputType>('text');
  readonly size = input<InputSize>('md');
  readonly helperText = input<string>('');
  readonly errorMessage = input<string>('');
  readonly required = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly invalid = input<boolean>(false);

  // Valor reactivo bidireccional
  readonly value = model<string>('');
  readonly disabled = model<boolean>(false);

  readonly onBlurEvent = output<FocusEvent>();
  readonly onFocusEvent = output<FocusEvent>();

  protected readonly isFocused = signal<boolean>(false);

  // ControlValueAccessor handlers
  private onChange: (val: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(val: string | null): void {
    this.value.set(val ?? '');
  }

  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newVal = target.value;
    this.value.set(newVal);
    this.onChange(newVal);
  }

  protected onFocus(event?: FocusEvent): void {
    this.isFocused.set(true);
    if (event) this.onFocusEvent.emit(event);
  }

  protected onBlur(event?: FocusEvent): void {
    this.isFocused.set(false);
    this.onTouched();
    if (event) this.onBlurEvent.emit(event);
  }
}

/** Directiva para inputs HTML nativos: <input nuvexInput /> */
@Directive({
  selector: 'input[nuvexInput], textarea[nuvexInput]',
  standalone: true,
  host: {
    'class': 'nuvex-input-native',
  },
})
export class InputDirective {}
