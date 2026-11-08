import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  TableColumn,
  TableDensity,
  TablePaginationState,
  TableSelectionMode,
  TableSortDirection,
  TableSortState,
  TableVariant,
} from './table.types';

@Component({
  selector: 'nuvex-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  host: {
    class: 'nuvex-table-container',
    '[class.nuvex-table-container--card]': 'variant() === "card"',
    '[class.nuvex-table-container--bordered]': 'variant() === "bordered"',
    '[class.nuvex-table-container--minimal]': 'variant() === "minimal"',
    '[class.nuvex-table-container--compact]': 'density() === "compact"',
    '[class.nuvex-table-container--relaxed]': 'density() === "relaxed"',
  },
})
export class TableComponent<T = any> {
  /** Definición de columnas de la tabla */
  readonly columns = input<TableColumn<T>[]>([]);

  /** Conjunto de datos a mostrar */
  readonly data = input<T[]>([]);

  /** Título del encabezado superior (opcional) */
  readonly title = input<string>('');

  /** Subtítulo descriptivo del encabezado (opcional) */
  readonly subtitle = input<string>('');

  /** Variante visual de la tabla */
  readonly variant = input<TableVariant>('default');

  /** Densidad o espaciado vertical de las celdas */
  readonly density = input<TableDensity>('normal');

  /** Si muestra filas alternadas sombreadas (striped) */
  readonly striped = input<boolean>(false);

  /** Si resalta suavemente las filas al posar el cursor */
  readonly hoverable = input<boolean>(true);

  /** Si muestra buscador integrado en la barra de herramientas */
  readonly searchable = input<boolean>(true);

  /** Placeholder del campo de búsqueda */
  readonly searchPlaceholder = input<string>('Buscar en la tabla...');

  /** Si activa la barra de paginación inferior */
  readonly pagination = input<boolean>(true);

  /** Cantidad de registros por página inicial */
  readonly pageSize = input<number>(10);

  /** Opciones disponibles para tamaño de página */
  readonly pageSizeOptions = input<number[]>([5, 10, 20, 50]);

  /** Total de registros (útil cuando serverSide es true) */
  readonly total = input<number | null>(null);

  /** Si el filtrado, paginación y ordenamiento se delegan al servidor */
  readonly serverSide = input<boolean>(false);

  /** Estado de carga (muestra indicador sobrio) */
  readonly loading = input<boolean>(false);

  /** Mensaje cuando no hay registros disponibles */
  readonly emptyMessage = input<string>('No se encontraron registros');

  /** Modo de selección de filas */
  readonly selectionMode = input<TableSelectionMode>('none');

  /** Clave única por registro para trackBy y selección (ej: 'id') */
  readonly trackByProperty = input<string>('id');

  // Eventos de salida
  readonly sortChange = output<TableSortState>();
  readonly pageChange = output<TablePaginationState>();
  readonly searchChange = output<string>();
  readonly selectionChange = output<T[]>();
  readonly rowClick = output<T>();

  // Estados reactivos internos (Signals)
  readonly searchQuery = signal<string>('');
  readonly sortState = signal<TableSortState>({ column: '', direction: null });
  readonly currentPage = signal<number>(1);
  readonly currentPageSize = signal<number>(10);
  readonly selectedKeys = signal<Set<any>>(new Set());

  constructor() {
    // Sincronizar pageSize inicial
    effect(() => {
      this.currentPageSize.set(this.pageSize());
    });
  }

  /** Columnas visibles */
  readonly visibleColumns = computed(() => {
    return this.columns().filter((col) => !col.hidden);
  });

  /** Datos filtrados por la búsqueda */
  readonly filteredData = computed(() => {
    const rawData = this.data() || [];
    if (this.serverSide()) return rawData;

    const query = this.searchQuery().trim().toLowerCase();
    if (!query) return rawData;

    const cols = this.visibleColumns();
    return rawData.filter((row) => {
      return cols.some((col) => {
        const val = this.getCellValue(row, col);
        if (val === null || val === undefined) return false;
        return String(val).toLowerCase().includes(query);
      });
    });
  });

  /** Datos ordenados */
  readonly sortedData = computed(() => {
    const list = [...this.filteredData()];
    if (this.serverSide()) return list;

    const { column, direction } = this.sortState();
    if (!column || !direction) return list;

    const colDef = this.columns().find((c) => c.key === column);

    return list.sort((a, b) => {
      const valA = this.getCellValue(a, colDef || { key: column, label: '' });
      const valB = this.getCellValue(b, colDef || { key: column, label: '' });

      if (valA === valB) return 0;
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      let comparison = 0;
      if (typeof valA === 'number' && typeof valB === 'number') {
        comparison = valA - valB;
      } else {
        comparison = String(valA).localeCompare(String(valB), undefined, {
          numeric: true,
          sensitivity: 'base',
        });
      }

      return direction === 'asc' ? comparison : -comparison;
    });
  });

  /** Total efectivo de registros */
  readonly totalRecords = computed(() => {
    if (this.serverSide() && this.total() !== null) {
      return this.total()!;
    }
    return this.filteredData().length;
  });

  /** Total de páginas */
  readonly totalPages = computed(() => {
    const total = this.totalRecords();
    const size = this.currentPageSize();
    return Math.max(1, Math.ceil(total / size));
  });

  /** Filas a mostrar en la página actual */
  readonly pagedData = computed(() => {
    if (!this.pagination() || this.serverSide()) {
      return this.sortedData();
    }
    const page = this.currentPage();
    const size = this.currentPageSize();
    const start = (page - 1) * size;
    return this.sortedData().slice(start, start + size);
  });

  /** Rango visual de paginación (ej: "1 - 10 de 45") */
  readonly paginationRange = computed(() => {
    const total = this.totalRecords();
    if (total === 0) return { start: 0, end: 0, total: 0 };
    const page = this.currentPage();
    const size = this.currentPageSize();
    const start = (page - 1) * size + 1;
    const end = Math.min(page * size, total);
    return { start, end, total };
  });

  /** Lista de números de página visibles para navegación */
  readonly pageNumbers = computed<number[]>(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      let start = Math.max(1, current - 2);
      let end = Math.min(total, current + 2);

      if (current <= 3) {
        start = 1;
        end = 5;
      } else if (current >= total - 2) {
        start = total - 4;
        end = total;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  });

  /** Si todas las filas de la vista actual están seleccionadas */
  readonly isAllSelected = computed(() => {
    const rows = this.pagedData();
    if (rows.length === 0) return false;
    const keys = this.selectedKeys();
    return rows.every((r) => keys.has(this.getRowKey(r)));
  });

  /** Si algunas (pero no todas) están seleccionadas en la vista actual */
  readonly isPartiallySelected = computed(() => {
    const rows = this.pagedData();
    if (rows.length === 0) return false;
    const keys = this.selectedKeys();
    const some = rows.some((r) => keys.has(this.getRowKey(r)));
    return some && !this.isAllSelected();
  });

  /** Obtiene la clave única de la fila */
  getRowKey(row: T): any {
    const prop = this.trackByProperty();
    return (row as any)?.[prop] ?? row;
  }

  /** Si una fila específica está seleccionada */
  isRowSelected(row: T): boolean {
    return this.selectedKeys().has(this.getRowKey(row));
  }

  /** Manejo de búsqueda */
  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const val = target.value;
    this.searchQuery.set(val);
    this.currentPage.set(1);
    this.searchChange.emit(val);
  }

  /** Limpia el término de búsqueda */
  clearSearch(): void {
    this.searchQuery.set('');
    this.currentPage.set(1);
    this.searchChange.emit('');
  }

  /** Alterna ordenamiento por columna */
  toggleSort(col: TableColumn<T>): void {
    if (!col.sortable) return;

    const current = this.sortState();
    let nextDirection: TableSortDirection = 'asc';

    if (current.column === col.key) {
      if (current.direction === 'asc') nextDirection = 'desc';
      else if (current.direction === 'desc') nextDirection = null;
    }

    const nextState: TableSortState = {
      column: nextDirection ? col.key : '',
      direction: nextDirection,
    };

    this.sortState.set(nextState);
    this.sortChange.emit(nextState);
  }

  /** Cambio de página */
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.currentPage()) {
      return;
    }
    this.currentPage.set(page);
    this.pageChange.emit({
      page,
      pageSize: this.currentPageSize(),
      total: this.totalRecords(),
    });
  }

  /** Cambio de tamaño de página */
  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newSize = Number(target.value) || 10;
    this.currentPageSize.set(newSize);
    this.currentPage.set(1);
    this.pageChange.emit({
      page: 1,
      pageSize: newSize,
      total: this.totalRecords(),
    });
  }

  /** Alterna selección de todas las filas en página */
  toggleSelectAll(): void {
    const nextKeys = new Set(this.selectedKeys());
    const rows = this.pagedData();

    if (this.isAllSelected()) {
      rows.forEach((r) => nextKeys.delete(this.getRowKey(r)));
    } else {
      rows.forEach((r) => nextKeys.add(this.getRowKey(r)));
    }

    this.selectedKeys.set(nextKeys);
    this.emitSelection();
  }

  /** Alterna selección de una sola fila */
  toggleRowSelection(row: T, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    const mode = this.selectionMode();
    if (mode === 'none') return;

    const key = this.getRowKey(row);
    const nextKeys = new Set(mode === 'single' ? [] : this.selectedKeys());

    if (nextKeys.has(key)) {
      nextKeys.delete(key);
    } else {
      nextKeys.add(key);
    }

    this.selectedKeys.set(nextKeys);
    this.emitSelection();
  }

  /** Emite el array de objetos seleccionados */
  private emitSelection(): void {
    const keys = this.selectedKeys();
    const allData = this.data() || [];
    const selected = allData.filter((r) => keys.has(this.getRowKey(r)));
    this.selectionChange.emit(selected);
  }

  /** Click en fila */
  onRowClick(row: T): void {
    this.rowClick.emit(row);
  }

  /** Extrae valor de celda con soporte para formato o ruta anidada */
  getCellValue(row: T, col: TableColumn<T>): any {
    if (!row) return '';
    const key = col.key;
    const rawVal = key.includes('.')
      ? key.split('.').reduce((acc, part) => (acc as any)?.[part], row)
      : (row as any)[key];

    if (col.formatter) {
      return col.formatter(rawVal, row);
    }
    return rawVal;
  }
}
