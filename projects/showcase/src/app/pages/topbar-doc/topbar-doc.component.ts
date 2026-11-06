import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { TopbarComponent, TopbarTab, UserProfile, UserMenuOption } from 'nuvex-ui/topbar';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

@Component({
  selector: 'app-topbar-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TopbarComponent, CodeSnippetComponent],
  templateUrl: './topbar-doc.component.html',
  styleUrl: '../doc-shared.css',
})
export class TopbarDocComponent {
  readonly activeTab = signal<'preview' | 'code'>('preview');

  readonly selectedTabId = signal('dashboard');
  readonly lastSelectedOption = signal<string>('');

  readonly tabs: TopbarTab[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Orders', badge: '14' },
    { id: 'products', label: 'Products' },
    { id: 'customers', label: 'Customers' },
    { id: 'messages', label: 'Messages', badge: '3' },
    { id: 'analytics', label: 'Analytics' },
  ];

  readonly demoUser: UserProfile = {
    name: 'Luis Fernando Cadena',
    role: 'Tech Lead · Nuvex',
    avatarText: 'LF',
  };

  handleMenuOption(option: UserMenuOption) {
    this.lastSelectedOption.set(option.toUpperCase());
    if (option === 'logout') {
      alert('¿Deseas cerrar tu sesión segura en Nuvex Cloud?');
    }
  }

  readonly importSnippet = `import { Component, signal } from '@angular/core';
import { TopbarComponent, TopbarTab, UserProfile, UserMenuOption } from 'nuvex-ui/topbar';

@Component({
  selector: 'app-header-layout',
  standalone: true,
  imports: [TopbarComponent],
  templateUrl: './header-layout.component.html',
})
export class HeaderLayoutComponent {
  tabActivo = signal('dashboard');

  tabs: TopbarTab[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Órdenes', badge: '12' },
  ];

  usuario: UserProfile = {
    name: 'Luis Fernando',
    role: 'Tech Lead',
    avatarText: 'LF',
  };

  onMenuClick(option: UserMenuOption) {
    console.log('Opción seleccionada:', option);
  }
}`;

  readonly usageSnippet = `<!-- Topbar Oficial Nuvex Capsule UI -->
<nuvex-topbar
  brandTitle="Nuvex Cloud"
  [tabs]="tabs"
  [(activeTabId)]="tabActivo"
  liveMetric="1.2k live now"
  [user]="usuario"
  (onMenuSelect)="onMenuClick($event)"
>
  <!-- Logo en ranura de marca -->
  <div slot="brand" class="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center font-bold">
    N
  </div>
</nuvex-topbar>`;
}
