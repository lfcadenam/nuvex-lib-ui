import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from 'nuvex-ui/logo';
import { CapsuleDockComponent, DockItem } from 'nuvex-ui/capsule-dock';
import { TopbarComponent, TopbarTab, UserProfile, UserMenuOption } from 'nuvex-ui/topbar';
import { KpiCardComponent } from 'nuvex-ui/kpi-card';
import { SparklineComponent } from 'nuvex-ui/sparkline';
import { SegmentedComponent, SegmentedItem } from 'nuvex-ui/segmented';
import { DrawerComponent } from 'nuvex-ui/drawer';
import { ButtonComponent } from 'nuvex-ui/button';
import { BadgeComponent } from 'nuvex-ui/badge';
import { AvatarComponent } from 'nuvex-ui/avatar';
import { InputComponent } from 'nuvex-ui/input';
import { SelectComponent, SelectOption } from 'nuvex-ui/select';
import { SwitchComponent } from 'nuvex-ui/switch';
import { ToastService } from 'nuvex-ui/toast';
import { CodeSnippetComponent } from '../../../shared/code-snippet.component';

interface Transaction {
  id: string;
  customerName: string;
  customerEmail: string;
  avatarText: string;
  plan: 'Starter' | 'Pro Cloud' | 'Enterprise';
  amount: string;
  status: 'Completado' | 'Pendiente' | 'En Revisión';
  date: string;
}

@Component({
  selector: 'app-saas-dashboard-template',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    LogoComponent,
    CapsuleDockComponent,
    TopbarComponent,
    KpiCardComponent,
    SparklineComponent,
    SegmentedComponent,
    DrawerComponent,
    ButtonComponent,
    BadgeComponent,
    AvatarComponent,
    InputComponent,
    SelectComponent,
    SwitchComponent,
    CodeSnippetComponent,
  ],
  templateUrl: './saas-dashboard.component.html',
  styleUrls: ['../../doc-shared.css', './saas-dashboard.component.css'],
})
export class SaasDashboardTemplateComponent {
  private readonly toast = inject(ToastService);

  readonly activeViewMode = signal<'preview' | 'code'>('preview');
  readonly isFullscreen = signal<boolean>(false);
  readonly isDrawerOpen = signal<boolean>(false);

  // Time & Filter Segments
  readonly timeRange = signal<string>('30D');
  readonly timeRanges: SegmentedItem<string>[] = [
    { label: '7 Días', value: '7D' },
    { label: '30 Días', value: '30D' },
    { label: '90 Días', value: '90D' },
    { label: 'Año 2026', value: '1Y' },
  ];

  readonly channelFilter = signal<string>('all');
  readonly channelFilters: SegmentedItem<string>[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Online SaaS', value: 'online' },
    { label: 'Corporativo', value: 'corp' },
  ];

  // Dock items
  readonly dockItems = signal<DockItem[]>([
    {
      id: 'dashboard',
      label: 'Panel Principal',
      active: true,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/></svg>`,
    },
    {
      id: 'orders',
      label: 'Órdenes',
      badge: 14,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/></svg>`,
    },
    {
      id: 'customers',
      label: 'Clientes',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>`,
    },
    {
      id: 'analytics',
      label: 'Analítica',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>`,
    },
  ]);

  // Topbar configuration
  readonly topbarTabs = signal<TopbarTab[]>([
    { id: 'overview', label: 'Resumen Ejecutivo', active: true },
    { id: 'orders', label: 'Transacciones', badge: 14 },
    { id: 'billing', label: 'Suscripciones' },
    { id: 'reports', label: 'Exportables' },
  ]);

  readonly activeTabId = signal<string>('overview');

  readonly currentUser: UserProfile = {
    name: 'Luis Cadena',
    role: 'Director Comercial',
    avatarText: 'LC',
  };

  // Sparkline data
  readonly mrrData = [32, 35, 34, 38, 41, 40, 44, 46, 45, 48.2];
  readonly customersData = [80, 85, 92, 90, 99, 105, 114, 120, 128];
  readonly ticketData = [65, 68, 70, 72, 75, 78, 80, 82, 84.2];

  // Table Data
  readonly transactions = signal<Transaction[]>([
    {
      id: 'NX-8901',
      customerName: 'Finanzas Global S.A.',
      customerEmail: 'contabilidad@finanzasglobal.com',
      avatarText: 'FG',
      plan: 'Enterprise',
      amount: '$12,450.00',
      status: 'Completado',
      date: 'Hoy, 10:45 AM',
    },
    {
      id: 'NX-8902',
      customerName: 'Bebé Genial Store',
      customerEmail: 'operaciones@bebegenial.cl',
      avatarText: 'BG',
      plan: 'Pro Cloud',
      amount: '$3,890.00',
      status: 'Completado',
      date: 'Hoy, 09:12 AM',
    },
    {
      id: 'NX-8903',
      customerName: 'Logística Transandina',
      customerEmail: 'despachos@transandina.net',
      avatarText: 'LT',
      plan: 'Enterprise',
      amount: '$8,120.00',
      status: 'Pendiente',
      date: 'Ayer, 18:20 PM',
    },
    {
      id: 'NX-8904',
      customerName: 'Talleres del Valle',
      customerEmail: 'servicio@talleresvalle.com',
      avatarText: 'TV',
      plan: 'Starter',
      amount: '$1,250.00',
      status: 'Completado',
      date: 'Ayer, 14:05 PM',
    },
    {
      id: 'NX-8905',
      customerName: 'Agencia Digital Nexus',
      customerEmail: 'admin@nexusagency.io',
      avatarText: 'NX',
      plan: 'Pro Cloud',
      amount: '$4,300.00',
      status: 'En Revisión',
      date: '07 Nov, 11:30 AM',
    },
  ]);

  // Drawer Form State
  readonly drawerModel = signal({
    clientName: '',
    clientEmail: '',
    plan: 'enterprise',
    amount: '',
    annualBilling: true,
    notes: '',
  });

  readonly planOptions: SelectOption[] = [
    { label: 'Starter ($1,250 / mes)', value: 'starter' },
    { label: 'Pro Cloud ($3,890 / mes)', value: 'pro' },
    { label: 'Enterprise Suite ($12,450 / mes)', value: 'enterprise' },
  ];

  // Template Code Export
  readonly templateCodeSnippet = `<!-- ==========================================================================
     Nuvex UI - Plantilla Oficial: SaaS Executive Dashboard (Capsule UI)
     ========================================================================== -->

<div class="nuvex-dashboard-shell">
  <!-- DOCK VERTICAL FLOTANTE (Cápsula Obsidiana #111215) -->
  <aside class="nuvex-dock-container">
    <nuvex-capsule-dock [items]="dockItems" [(activeId)]="activeDockId" />
  </aside>

  <!-- CONTENIDO PRINCIPAL -->
  <main class="nuvex-main-stage">
    <!-- TOPBAR EN PÍLDORA TRANSLÚCIDA CON BACKDROP-BLUR -->
    <nuvex-topbar
      brandTitle="Nuvex Cloud SaaS"
      liveMetric="+$1,450 hoy"
      [tabs]="topbarTabs"
      [(activeTabId)]="activeTabId"
      [user]="currentUser"
      (onMenuSelect)="handleUserMenu($event)"
    />

    <!-- FILA DE ENCABEZADO Y CONTROLES SEGMENTADOS -->
    <div class="stage-header">
      <div>
        <h1 class="stage-title">Rendimiento Operativo</h1>
        <p class="stage-subtitle">Consolidado general de ingresos, suscripciones y actividad en tiempo real.</p>
      </div>

      <div class="header-actions">
        <nuvex-segmented [options]="timeRanges" [(value)]="timeRange" />
        <nuvex-button variant="primary" (onClick)="openDrawer()">
          + Nueva Transacción
        </nuvex-button>
      </div>
    </div>

    <!-- FILA DE KPI CARDS (HERO + CARDS CON SPARKLINES BÉZIER) -->
    <div class="kpi-grid">
      <!-- Tarjeta Hero Invertida en Obsidiana -->
      <nuvex-kpi-card
        variant="hero"
        label="Ingresos Recurrentes (MRR)"
        value="$48,250"
        trend="+12.4%"
        trendDirection="up"
        trendLabel="vs mes ant."
        helperText="482 suscripciones activas"
      />

      <nuvex-kpi-card
        variant="emerald"
        label="Nuevos Clientes"
        value="128"
        trend="+8.1%"
        trendDirection="up"
        trendLabel="este ciclo"
        helperText="Meta de 120 cumplida"
      />

      <nuvex-kpi-card
        variant="purple"
        label="Ticket Promedio"
        value="$84.20"
        trend="+2.3%"
        trendDirection="up"
        trendLabel="vs promedio"
        helperText="Expansión en Enterprise"
      />

      <nuvex-kpi-card
        variant="blue"
        label="Tasa Conversión"
        value="4.8%"
        trend="+0.4 pt"
        trendDirection="up"
        trendLabel="vs meta"
        helperText="Lead a Suscripción"
      />
    </div>

    <!-- SECCIÓN PRINCIPAL: TABLA + SPOTLIGHT CARD -->
    <div class="content-split-grid">
      <div class="table-container-card">
        <div class="card-head">
          <h2 class="card-title">Transacciones Recientes</h2>
          <nuvex-segmented [options]="channelFilters" [(value)]="channelFilter" size="sm" />
        </div>
        <nuvex-table [data]="transactions" [columns]="tableColumns" />
      </div>

      <!-- SPOTLIGHT CARD: ASESOR DESTACADO -->
      <nuvex-spotlight-card
        name="Carlos Mendoza"
        role="Senior Account Executive"
        badgeText="Top Performer"
        avatarLabel="CM"
        status="online"
      />
    </div>
  </main>

  <!-- SLIDE-OVER DRAWER OFICIAL (Regla mandatoria para formularios) -->
  <nuvex-drawer
    [(isOpen)]="isDrawerOpen"
    title="Registrar Transacción"
    subtitle="Alta de contrato SaaS en Nuvex Cloud"
    size="md"
  >
    <div class="drawer-body-form">
      <nuvex-input label="Nombre del Cliente" placeholder="Ej: Corporación Andina" />
      <nuvex-input label="Correo Electrónico" placeholder="contacto@empresa.com" />
      <nuvex-select label="Plan Contratado" [options]="planOptions" />
      <nuvex-switch label="Facturación Anual (20% Desc.)" [checked]="true" />
    </div>

    <div footer class="drawer-footer-actions">
      <nuvex-button variant="secondary" (onClick)="isDrawerOpen.set(false)">Cancelar</nuvex-button>
      <nuvex-button variant="primary" (onClick)="saveTransaction()">Guardar Transacción</nuvex-button>
    </div>
  </nuvex-drawer>
</div>`;

  openNewTransactionDrawer() {
    this.drawerModel.set({
      clientName: '',
      clientEmail: '',
      plan: 'enterprise',
      amount: '$12,450.00',
      annualBilling: true,
      notes: '',
    });
    this.isDrawerOpen.set(true);
  }

  saveTransaction() {
    const data = this.drawerModel();
    if (!data.clientName) {
      this.toast.warning('Ingresa el nombre del cliente');
      return;
    }

    const newTx: Transaction = {
      id: `NX-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: data.clientName,
      customerEmail: data.clientEmail || 'contacto@empresa.com',
      avatarText: data.clientName.substring(0, 2).toUpperCase(),
      plan: data.plan === 'enterprise' ? 'Enterprise' : data.plan === 'pro' ? 'Pro Cloud' : 'Starter',
      amount: data.amount || '$3,890.00',
      status: 'Completado',
      date: 'Justo ahora',
    };

    this.transactions.update((list) => [newTx, ...list]);
    this.isDrawerOpen.set(false);
    this.toast.success(`Transacción ${newTx.id} creada exitosamente`);
  }

  handleUserMenu(option: UserMenuOption) {
    if (option === 'perfil') this.toast.info('Navegando a Perfil de Usuario');
    if (option === 'facturas') this.toast.info('Abriendo Historial de Facturas');
    if (option === 'clave') this.toast.info('Módulo de Seguridad y Clave');
    if (option === 'logout') this.toast.warning('Cierre de sesión solicitado');
  }

  toggleFullscreen() {
    this.isFullscreen.update((v) => !v);
  }
}
