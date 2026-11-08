import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { TableColumn } from './table.types';

interface TestUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const mockColumns: TableColumn<TestUser>[] = [
  { key: 'id', label: 'ID', width: '60px', sortable: true },
  { key: 'name', label: 'Nombre', sortable: true },
  { key: 'email', label: 'Correo', sortable: true },
  { key: 'role', label: 'Rol' },
  { key: 'status', label: 'Estado' },
];

const mockData: TestUser[] = [
  { id: 1, name: 'Carlos Mendoza', email: 'carlos@nuvex.app', role: 'Admin', status: 'Activo' },
  { id: 2, name: 'Ana Gómez', email: 'ana@nuvex.app', role: 'Editor', status: 'Activo' },
  { id: 3, name: 'Beatriz Silva', email: 'beatriz@nuvex.app', role: 'Viewer', status: 'Inactivo' },
  { id: 4, name: 'Daniel Ortiz', email: 'daniel@nuvex.app', role: 'Editor', status: 'Activo' },
  { id: 5, name: 'Elena Torres', email: 'elena@nuvex.app', role: 'Admin', status: 'Activo' },
  { id: 6, name: 'Fernando Ruiz', email: 'fernando@nuvex.app', role: 'Viewer', status: 'Inactivo' },
];

describe('TableComponent', () => {
  let component: TableComponent<TestUser>;
  let fixture: ComponentFixture<TableComponent<TestUser>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent<TestUser>);
    component = fixture.componentInstance;
  });

  it('should create the table component with defaults', () => {
    expect(component).toBeTruthy();
    expect(component.density()).toBe('normal');
    expect(component.variant()).toBe('default');
    expect(component.pagination()).toBe(true);
    expect(component.searchable()).toBe(true);
  });

  it('should render column headers and rows', () => {
    fixture.componentRef.setInput('columns', mockColumns);
    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const headers = compiled.querySelectorAll('.nuvex-table__th');
    expect(headers.length).toBe(mockColumns.length);

    const rows = compiled.querySelectorAll('.nuvex-table__tbody .nuvex-table__tr');
    expect(rows.length).toBe(mockData.length);
  });

  it('should filter rows client-side when typing in search', () => {
    fixture.componentRef.setInput('columns', mockColumns);
    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();

    component.onSearchInput({ target: { value: 'carlos' } } as any);
    fixture.detectChanges();

    expect(component.filteredData().length).toBe(1);
    expect(component.filteredData()[0].name).toBe('Carlos Mendoza');

    // Clear search
    component.clearSearch();
    fixture.detectChanges();
    expect(component.filteredData().length).toBe(mockData.length);
  });

  it('should sort rows ascending and descending when clicking sortable header', () => {
    fixture.componentRef.setInput('columns', mockColumns);
    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();

    const nameCol = mockColumns[1]; // name
    component.toggleSort(nameCol);
    fixture.detectChanges();

    expect(component.sortState().direction).toBe('asc');
    expect(component.sortedData()[0].name).toBe('Ana Gómez');

    component.toggleSort(nameCol);
    fixture.detectChanges();
    expect(component.sortState().direction).toBe('desc');
    expect(component.sortedData()[0].name).toBe('Fernando Ruiz');
  });

  it('should paginate items according to pageSize', () => {
    fixture.componentRef.setInput('columns', mockColumns);
    fixture.componentRef.setInput('data', mockData);
    fixture.componentRef.setInput('pageSize', 3);
    fixture.detectChanges();

    expect(component.totalPages()).toBe(2);
    expect(component.pagedData().length).toBe(3);
    expect(component.pagedData()[0].id).toBe(1);

    component.goToPage(2);
    fixture.detectChanges();
    expect(component.pagedData().length).toBe(3);
    expect(component.pagedData()[0].id).toBe(4);
  });

  it('should select rows and toggle select all', () => {
    fixture.componentRef.setInput('columns', mockColumns);
    fixture.componentRef.setInput('data', mockData);
    fixture.componentRef.setInput('selectionMode', 'multiple');
    fixture.detectChanges();

    let emittedSelection: TestUser[] = [];
    component.selectionChange.subscribe((selected) => {
      emittedSelection = selected;
    });

    component.toggleRowSelection(mockData[0]);
    expect(component.isRowSelected(mockData[0])).toBe(true);
    expect(emittedSelection.length).toBe(1);

    // Toggle select all
    component.toggleSelectAll();
    expect(component.isAllSelected()).toBe(true);
    expect(emittedSelection.length).toBe(mockData.length);
  });

  it('should show empty state when no items match', () => {
    fixture.componentRef.setInput('columns', mockColumns);
    fixture.componentRef.setInput('data', []);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const emptyState = compiled.querySelector('.nuvex-table__empty-state');
    expect(emptyState).toBeTruthy();
    expect(compiled.querySelector('.nuvex-table__empty-title')?.textContent?.trim()).toBe(
      'No se encontraron registros'
    );
  });

  it('should emit rowClick when a row is clicked', () => {
    fixture.componentRef.setInput('columns', mockColumns);
    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();

    let clickedRow: TestUser | null = null;
    component.rowClick.subscribe((row) => {
      clickedRow = row;
    });

    const compiled = fixture.nativeElement as HTMLElement;
    const firstRow = compiled.querySelector('.nuvex-table__tbody .nuvex-table__tr') as HTMLElement;
    firstRow.click();

    expect(clickedRow).toEqual(mockData[0]);
  });
});
