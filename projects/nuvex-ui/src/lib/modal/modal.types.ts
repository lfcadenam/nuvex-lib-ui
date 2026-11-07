export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalAction {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}
