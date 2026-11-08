export type TabVariant = 'pill' | 'underline' | 'card';
export type TabSize = 'sm' | 'md' | 'lg';

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  disabled?: boolean;
  icon?: string;
}
