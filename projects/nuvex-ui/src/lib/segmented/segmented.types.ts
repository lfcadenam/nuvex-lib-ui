export type SegmentedSize = 'sm' | 'md';

export interface SegmentedItem<T = any> {
  label: string;
  value: T;
  disabled?: boolean;
}

export type SegmentedOption<T = any> = string | number | SegmentedItem<T>;
