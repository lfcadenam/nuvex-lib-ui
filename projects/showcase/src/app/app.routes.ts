import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/overview-doc/overview-doc.component').then(
        (m) => m.OverviewDocComponent
      ),
  },
  {
    path: 'overview',
    loadComponent: () =>
      import('./pages/overview-doc/overview-doc.component').then(
        (m) => m.OverviewDocComponent
      ),
  },
  {
    path: 'usage',
    loadComponent: () =>
      import('./pages/usage-doc/usage-doc.component').then(
        (m) => m.UsageDocComponent
      ),
  },
  {
    path: 'installation',
    loadComponent: () =>
      import('./pages/installation-doc/installation-doc.component').then(
        (m) => m.InstallationDocComponent
      ),
  },
  {
    path: 'brand',
    loadComponent: () =>
      import('./pages/brand-doc/brand-doc.component').then(
        (m) => m.BrandDocComponent
      ),
  },
  {
    path: 'logo',
    loadComponent: () =>
      import('./pages/logo-doc/logo-doc.component').then(
        (m) => m.LogoDocComponent
      ),
  },
  {
    path: 'templates/saas-dashboard',
    loadComponent: () =>
      import(
        './pages/templates/saas-dashboard/saas-dashboard.component'
      ).then((m) => m.SaasDashboardTemplateComponent),
  },
  {
    path: 'ecosystem/whatsapp-hub',
    loadComponent: () =>
      import(
        './pages/whatsapp-hub-doc/whatsapp-hub-doc.component'
      ).then((m) => m.WhatsAppHubDocComponent),
  },
  {
    path: 'whatsapp-hub',
    redirectTo: 'ecosystem/whatsapp-hub',
  },
  {
    path: 'button',
    loadComponent: () =>
      import('./pages/button-doc/button-doc.component').then(
        (m) => m.ButtonDocComponent
      ),
  },
  {
    path: 'badge',
    loadComponent: () =>
      import('./pages/badge-doc/badge-doc.component').then(
        (m) => m.BadgeDocComponent
      ),
  },
  {
    path: 'avatar',
    loadComponent: () =>
      import('./pages/avatar-doc/avatar-doc.component').then(
        (m) => m.AvatarDocComponent
      ),
  },
  {
    path: 'spinner',
    loadComponent: () =>
      import('./pages/spinner-doc/spinner-doc.component').then(
        (m) => m.SpinnerDocComponent
      ),
  },
  {
    path: 'toast',
    loadComponent: () =>
      import('./pages/toast-doc/toast-doc.component').then(
        (m) => m.ToastDocComponent
      ),
  },
  {
    path: 'input',
    loadComponent: () =>
      import('./pages/input-doc/input-doc.component').then(
        (m) => m.InputDocComponent
      ),
  },
  {
    path: 'switch',
    loadComponent: () =>
      import('./pages/switch-doc/switch-doc.component').then(
        (m) => m.SwitchDocComponent
      ),
  },
  {
    path: 'select',
    loadComponent: () =>
      import('./pages/select-doc/select-doc.component').then(
        (m) => m.SelectDocComponent
      ),
  },
  {
    path: 'card',
    loadComponent: () =>
      import('./pages/card-doc/card-doc.component').then(
        (m) => m.CardDocComponent
      ),
  },
  {
    path: 'kpi-card',
    loadComponent: () =>
      import('./pages/kpi-card-doc/kpi-card-doc.component').then(
        (m) => m.KpiCardDocComponent
      ),
  },
  {
    path: 'spotlight-card',
    loadComponent: () =>
      import('./pages/spotlight-card-doc/spotlight-card-doc.component').then(
        (m) => m.SpotlightCardDocComponent
      ),
  },
  {
    path: 'table',
    loadComponent: () =>
      import('./pages/table-doc/table-doc.component').then(
        (m) => m.TableDocComponent
      ),
  },
  {
    path: 'segmented',
    loadComponent: () =>
      import('./pages/segmented-doc/segmented-doc.component').then(
        (m) => m.SegmentedDocComponent
      ),
  },
  {
    path: 'drawer',
    loadComponent: () =>
      import('./pages/drawer-doc/drawer-doc.component').then(
        (m) => m.DrawerDocComponent
      ),
  },
  {
    path: 'modal',
    loadComponent: () =>
      import('./pages/modal-doc/modal-doc.component').then(
        (m) => m.ModalDocComponent
      ),
  },
  {
    path: 'capsule-dock',
    loadComponent: () =>
      import('./pages/capsule-dock-doc/capsule-dock-doc.component').then(
        (m) => m.CapsuleDockDocComponent
      ),
  },
  {
    path: 'topbar',
    loadComponent: () =>
      import('./pages/topbar-doc/topbar-doc.component').then(
        (m) => m.TopbarDocComponent
      ),
  },
  {
    path: 'tabs',
    loadComponent: () =>
      import('./pages/tabs-doc/tabs-doc.component').then(
        (m) => m.TabsDocComponent
      ),
  },
  {
    path: 'sparkline',
    loadComponent: () =>
      import('./pages/sparkline-doc/sparkline-doc.component').then(
        (m) => m.SparklineDocComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'button',
  },
];
