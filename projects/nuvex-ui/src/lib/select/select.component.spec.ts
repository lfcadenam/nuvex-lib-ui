import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';
import { SelectOption } from './select.types';

const mockOptions: SelectOption[] = [
  { value: 'colombia', label: 'Colombia' },
  { value: 'mexico', label: 'México' },
  { value: 'peru', label: 'Perú' },
  { value: 'chile', label: 'Chile', disabled: true },
  { value: 'argentina', label: 'Argentina' },
];

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', mockOptions);
    fixture.detectChanges();
  });

  it('should create the select component with defaults', () => {
    expect(component).toBeTruthy();
    expect(component.isOpen()).toBe(false);
    expect(component.size()).toBe('md');
    expect(component.variant()).toBe('default');
    expect(component.multiple()).toBe(false);
  });

  it('should toggle dropdown open/close on trigger click', () => {
    expect(component.isOpen()).toBe(false);

    component.toggleDropdown();
    fixture.detectChanges();
    expect(component.isOpen()).toBe(true);

    component.toggleDropdown();
    fixture.detectChanges();
    expect(component.isOpen()).toBe(false);
  });

  it('should select single option and close dropdown', () => {
    component.open();
    fixture.detectChanges();

    let emittedVal: any = null;
    component.selectionChange.subscribe((val) => {
      emittedVal = val;
    });

    component.selectOption(mockOptions[0]); // Colombia
    fixture.detectChanges();

    expect(component.value()).toBe('colombia');
    expect(emittedVal).toBe('colombia');
    expect(component.displayLabel()).toBe('Colombia');
    expect(component.isOpen()).toBe(false);
  });

  it('should not select a disabled option', () => {
    component.open();
    fixture.detectChanges();

    const chileOption = mockOptions.find((o) => o.value === 'chile')!;
    component.selectOption(chileOption);
    fixture.detectChanges();

    expect(component.value()).toBeNull();
  });

  it('should support multiple selection and tags removal', () => {
    fixture.componentRef.setInput('multiple', true);
    fixture.detectChanges();

    component.selectOption(mockOptions[0]); // Colombia
    component.selectOption(mockOptions[1]); // México
    fixture.detectChanges();

    expect(component.value()).toEqual(['colombia', 'mexico']);
    expect(component.selectedOptions().length).toBe(2);

    // Remove one tag
    component.removeTag(mockOptions[0], new MouseEvent('click'));
    fixture.detectChanges();

    expect(component.value()).toEqual(['mexico']);
  });

  it('should filter options by search query', () => {
    fixture.componentRef.setInput('searchable', true);
    component.open();
    fixture.detectChanges();

    component.onSearchInput({ target: { value: 'mex' } } as any);
    fixture.detectChanges();

    expect(component.filteredOptions().length).toBe(1);
    expect(component.filteredOptions()[0].value).toBe('mexico');
  });

  it('should clear selection when clearSelection is called', () => {
    fixture.componentRef.setInput('clearable', true);
    component.selectOption(mockOptions[0]);
    fixture.detectChanges();

    expect(component.value()).toBe('colombia');

    component.clearSelection(new MouseEvent('click'));
    fixture.detectChanges();

    expect(component.value()).toBeNull();
  });

  it('should support ControlValueAccessor writeValue', () => {
    component.writeValue('peru');
    fixture.detectChanges();

    expect(component.value()).toBe('peru');
    expect(component.displayLabel()).toBe('Perú');
  });
});
