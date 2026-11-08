export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default';

export type ToastPosition =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

export interface ToastAction {
  label: string;
  onClick: (toast: ToastItem) => void;
}

export interface ToastOptions {
  id?: string;
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number; // ms, 0 para no cerrar automáticamente
  action?: ToastAction;
  dismissible?: boolean;
}

export interface ToastItem extends Required<Omit<ToastOptions, 'action'>> {
  action?: ToastAction;
  createdAt: number;
}
