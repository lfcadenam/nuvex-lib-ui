import { TemplateRef } from '@angular/core';

export type TableVariant = 'default' | 'card' | 'bordered' | 'minimal';
export type TableDensity = 'compact' | 'normal' | 'relaxed';
export type TableSelectionMode = 'none' | 'single' | 'multiple';
export type TableSortDirection = 'asc' | 'desc' | null;
export type TableColumnAlign = 'left' | 'center' | 'right';

export interface TableColumn<T = any> {
  /** Clave de la propiedad en el objeto de datos (soporta propiedad anidada simple ej: 'user.name') */
  key: string;
  /** Encabezado visible de la columna */
  label: string;
  /** Si la columna permite ordenamiento */
  sortable?: boolean;
  /** Ancho CSS sugerido (ej: '120px', '25%') */
  width?: string;
  /** Alineación del texto en la celda y cabecera */
  align?: TableColumnAlign;
  /** Si la columna está oculta */
  hidden?: boolean;
  /** Función opcional para formatear el valor crudo en texto */
  formatter?: (value: any, row: T) => string;
  /** Template personalizado opcional para renderizar la celda */
  cellTemplate?: TemplateRef<{ $implicit: any; row: T; column: TableColumn<T> }>;
}

export interface TableSortState {
  column: string;
  direction: TableSortDirection;
}

export interface TablePaginationState {
  page: number;
  pageSize: number;
  total: number;
}
