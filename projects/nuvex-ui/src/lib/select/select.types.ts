import { TemplateRef } from '@angular/core';

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectVariant = 'default' | 'pill' | 'ghost';

export interface SelectOption<T = any> {
  value: T;
  label: string;
  disabled?: boolean;
  group?: string;
  description?: string;
  icon?: string;
}

export interface SelectOptionGroup<T = any> {
  groupName: string;
  options: SelectOption<T>[];
}
