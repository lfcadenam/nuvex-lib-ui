import { Injectable, signal } from '@angular/core';
import { ToastItem, ToastOptions, ToastPosition, ToastType } from './toast.types';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  /** Lista reactiva de notificaciones activas */
  readonly toasts = signal<ToastItem[]>([]);

  /** Posición en pantalla del contenedor */
  readonly position = signal<ToastPosition>('top-right');

  private counter = 0;
  private readonly timerMap = new Map<string, any>();

  /** Muestra una notificación con opciones completas */
  show(options: ToastOptions): string {
    const id = options.id || `toast-${++this.counter}-${Date.now()}`;
    const duration = options.duration !== undefined ? options.duration : 4000;

    const item: ToastItem = {
      id,
      title: options.title || '',
      message: options.message,
      type: options.type || 'default',
      duration,
      dismissible: options.dismissible !== undefined ? options.dismissible : true,
      action: options.action,
      createdAt: Date.now(),
    };

    // Añadir al inicio o fin según la posición
    this.toasts.update((current) => {
      // Remover si ya existe con el mismo ID
      const filtered = current.filter((t) => t.id !== id);
      return [item, ...filtered];
    });

    if (duration > 0) {
      this.scheduleDismiss(id, duration);
    }

    return id;
  }

  /** Atajo para toast de éxito */
  success(message: string, title = 'Operación Exitosa', options?: Partial<ToastOptions>): string {
    return this.show({
      title,
      message,
      type: 'success',
      ...options,
    });
  }

  /** Atajo para toast de error */
  error(message: string, title = 'Error', options?: Partial<ToastOptions>): string {
    return this.show({
      title,
      message,
      type: 'error',
      ...options,
    });
  }

  /** Atajo para toast de advertencia */
  warning(message: string, title = 'Atención', options?: Partial<ToastOptions>): string {
    return this.show({
      title,
      message,
      type: 'warning',
      ...options,
    });
  }

  /** Atajo para toast informativo */
  info(message: string, title = 'Información', options?: Partial<ToastOptions>): string {
    return this.show({
      title,
      message,
      type: 'info',
      ...options,
    });
  }

  /** Cierra y remueve un toast por su ID */
  dismiss(id: string): void {
    if (this.timerMap.has(id)) {
      clearTimeout(this.timerMap.get(id));
      this.timerMap.delete(id);
    }

    this.toasts.update((current) => current.filter((t) => t.id !== id));
  }

  /** Limpia todos los toasts */
  clearAll(): void {
    this.timerMap.forEach((timer) => clearTimeout(timer));
    this.timerMap.clear();
    this.toasts.set([]);
  }

  /** Configura la posición del contenedor en pantalla */
  setPosition(pos: ToastPosition): void {
    this.position.set(pos);
  }

  private scheduleDismiss(id: string, duration: number): void {
    if (this.timerMap.has(id)) {
      clearTimeout(this.timerMap.get(id));
    }

    const timer = setTimeout(() => {
      this.dismiss(id);
    }, duration);

    this.timerMap.set(id, timer);
  }
}
