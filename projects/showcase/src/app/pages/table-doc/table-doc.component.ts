import {
  Component,
  signal,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableComponent } from 'nuvex-ui/table';
import { TableColumn, TableDensity, TableSelectionMode, TableVariant } from 'nuvex-ui/table';
import { BadgeComponent } from 'nuvex-ui/badge';
import { ButtonComponent } from 'nuvex-ui/button';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

interface OrderItem {
  id: string;
  client: string;
  service: string;
  amount: number;
  date: string;
  status: 'completado' | 'pendiente' | 'cancelado';
}

@Component({
  selector: 'app-table-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    TableComponent,
    BadgeComponent,
    ButtonComponent,
    CodeSnippetComponent,
  ],
  templateUrl: './table-doc.component.html',
  styleUrl: '../doc-shared.css',
})
export class TableDocComponent implements OnInit {
  @ViewChild('statusTemplate', { static: true })
  statusTemplate!: TemplateRef<any>;

  readonly activeTab = signal<'preview' | 'code'>('preview');

  // Controles interactivos
  readonly currentVariant = signal<TableVariant>('default');
  readonly currentDensity = signal<TableDensity>('normal');
  readonly currentStriped = signal<boolean>(false);
  readonly currentSelectionMode = signal<TableSelectionMode>('multiple');
  readonly currentLoading = signal<boolean>(false);

  // Registro seleccionado
  readonly selectedOrders = signal<OrderItem[]>([]);
  readonly lastClickedRow = signal<OrderItem | null>(null);

  // Columnas
  readonly tableColumns: TableColumn<OrderItem>[] = [
    { key: 'id', label: 'ID Factura', width: '110px', sortable: true },
    { key: 'client', label: 'Cliente', sortable: true },
    { key: 'service', label: 'Servicio / Tratamiento', sortable: true },
    {
      key: 'amount',
      label: 'Monto Total',
      sortable: true,
      align: 'right',
      formatter: (val) => `$ ${Number(val).toLocaleString('es-CO')}`,
    },
    { key: 'date', label: 'Fecha Cita', sortable: true, width: '120px' },
    { key: 'status', label: 'Estado', width: '130px', align: 'center' },
  ];

  ngOnInit(): void {
    const statusCol = this.tableColumns.find((c) => c.key === 'status');
    if (statusCol) {
      statusCol.cellTemplate = this.statusTemplate;
    }
  }

  // Datos mock
  readonly ordersData: OrderItem[] = [
    { id: 'FAC-1001', client: 'María Fernanda Ruiz', service: 'Balayage + Keratina', amount: 320000, date: '2026-11-06', status: 'completado' },
    { id: 'FAC-1002', client: 'Carlos Andrés Morales', service: 'Corte Ejecutivo + Barba', amount: 65000, date: '2026-11-06', status: 'completado' },
    { id: 'FAC-1003', client: 'Valeria Cárdenas', service: 'Manicura Rusa Premium', amount: 85000, date: '2026-11-07', status: 'pendiente' },
    { id: 'FAC-1004', client: 'Sebastián Pinzón', service: 'Tratamiento Capilar Botox', amount: 140000, date: '2026-11-07', status: 'pendiente' },
    { id: 'FAC-1005', client: 'Diana Marcela Castro', service: 'Diseño de Cejas con Henna', amount: 50000, date: '2026-11-07', status: 'cancelado' },
    { id: 'FAC-1006', client: 'Juliana Restrepo', service: 'Pedicura Spa Hidratante', amount: 75000, date: '2026-11-08', status: 'completado' },
    { id: 'FAC-1007', client: 'Andrés Felipe Gómez', service: 'Coloración Barba + Tónico', amount: 90000, date: '2026-11-08', status: 'pendiente' },
    { id: 'FAC-1008', client: 'Camila Villamizar', service: 'Lifting de Pestañas', amount: 110000, date: '2026-11-08', status: 'completado' },
    { id: 'FAC-1009', client: 'Natalia Bermúdez', service: 'Masaje Relajante Piedras', amount: 160000, date: '2026-11-09', status: 'pendiente' },
    { id: 'FAC-1010', client: 'Gabriel Ospina', service: 'Limpieza Facial Profunda', amount: 130000, date: '2026-11-09', status: 'completado' },
    { id: 'FAC-1011', client: 'Paula Andrea López', service: 'Extensiones de Uñas Acrílicas', amount: 120000, date: '2026-11-10', status: 'pendiente' },
    { id: 'FAC-1012', client: 'Laura Victoria Soto', service: 'Hidratación Capilar Profunda', amount: 95000, date: '2026-11-10', status: 'completado' },
  ];

  onRowClick(row: OrderItem): void {
    this.lastClickedRow.set(row);
  }

  onSelectionChange(rows: OrderItem[]): void {
    this.selectedOrders.set(rows);
  }

  toggleLoading(): void {
    this.currentLoading.update((l) => !l);
  }

  getStatusBadgeVariant(status: string): 'success' | 'warning' | 'danger' {
    switch (status) {
      case 'completado':
        return 'success';
      case 'pendiente':
        return 'warning';
      case 'cancelado':
        return 'danger';
      default:
        return 'success';
    }
  }

  readonly basicUsageCode = `import { Component } from '@angular/core';
import { TableComponent, TableColumn } from 'nuvex-ui/table';

interface Invoice {
  id: string;
  client: string;
  amount: number;
  date: string;
}

@Component({
  standalone: true,
  imports: [TableComponent],
  template: \`
    <nuvex-table
      [columns]="columns"
      [data]="invoices"
      title="Historial de Facturación"
      subtitle="Control de servicios y citas atendidas"
      [pageSize]="10"
      [searchable]="true"
      (rowClick)="onRowClick($event)"
    />
  \`,
})
export class MyTableComponent {
  columns: TableColumn<Invoice>[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'client', label: 'Cliente', sortable: true },
    { key: 'amount', label: 'Monto', sortable: true, align: 'right', formatter: (val) => \`$ \${val}\` },
    { key: 'date', label: 'Fecha' },
  ];

  invoices: Invoice[] = [ /* ... */ ];

  onRowClick(row: Invoice) {
    console.log('Fila:', row);
  }
}`;
}
