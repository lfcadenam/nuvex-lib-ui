import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CapsuleDockComponent, DockItem } from 'nuvex-ui/capsule-dock';
import { ThemeService } from 'nuvex-ui';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

@Component({
  selector: 'app-capsule-dock-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CapsuleDockComponent, CodeSnippetComponent],
  templateUrl: './capsule-dock-doc.component.html',
  styleUrl: '../doc-shared.css',
})
export class CapsuleDockDocComponent {
  private theme = inject(ThemeService);

  readonly activeTab = signal<'preview' | 'code'>('preview');
  readonly selectedDockId = signal('dashboard');

  readonly dockItems: DockItem[] = [
    {
      id: 'dashboard',
      label: 'Workspace Principal',
      badge: '11',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>`,
    },
    {
      id: 'analytics',
      label: 'Métricas & Tendencias',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>`,
    },
    {
      id: 'messages',
      label: 'Mensajes & Canales',
      badge: '3',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>`,
    },
    {
      id: 'ai',
      label: 'Nuvex AI Assistant',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>`,
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
    },
    {
      id: 'help',
      label: 'Ayuda y Soporte',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    },
  ];

  handleDockSelect(item: DockItem) {
    this.selectedDockId.set(item.id);
  }

  toggleTheme() {
    this.theme.toggleDarkMode();
  }

  readonly importSnippet = `import { Component, signal } from '@angular/core';
import { CapsuleDockComponent, DockItem } from 'nuvex-ui/capsule-dock';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CapsuleDockComponent],
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {
  moduloActivo = signal('dashboard');

  items: DockItem[] = [
    { id: 'dashboard', label: 'Workspace', badge: '5' },
    { id: 'settings', label: 'Configuración' },
  ];
}`;

  readonly usageSnippet = `<!-- Sidebar Vertical en Cápsula Oscura -->
<nuvex-capsule-dock
  [items]="items"
  [(activeId)]="moduloActivo"
>
  <!-- Ranura Superior para Búsqueda -->
  <div slot="top">
    <button type="button" title="Buscar">🔍</button>
  </div>

  <!-- Ranura Inferior para Tema -->
  <div slot="bottom">
    <button type="button" (click)="toggleTheme()" title="Modo Oscuro">🌙</button>
  </div>
</nuvex-capsule-dock>`;
}
