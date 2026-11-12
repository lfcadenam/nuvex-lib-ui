import { Component, inject, signal, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService } from 'nuvex-ui';
import { LogoComponent } from 'nuvex-ui/logo';

interface NavItem {
  name: string;
  route: string;
  tag?: string;
  badge?: string;
  disabled?: boolean;
}

interface NavCategory {
  title: string;
  items: NavItem[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, LogoComponent],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private theme = inject(ThemeService);
  readonly isDark = this.theme.darkMode;
  readonly searchQuery = signal('');

  readonly categories: NavCategory[] = [
    {
      title: 'Comenzar (Getting Started)',
      items: [
        { name: 'Presentación (Overview)', route: '/overview', tag: 'Inicio' },
        { name: 'Instalación & Setup', route: '/installation', tag: 'Guía Rápida' },
        { name: 'Guía de Uso & Código', route: '/usage', tag: 'Paso a Paso' },
        { name: 'Brand & Foundations', route: '/brand', tag: 'Identidad' },
        { name: 'Logo Oficial', route: '/logo', tag: 'Vector 3D' },
      ],
    },
    {
      title: 'Plantillas Completas',
      items: [
        {
          name: 'SaaS Executive Dashboard',
          route: '/templates/saas-dashboard',
          tag: 'Producción',
        },
      ],
    },
    {
      title: 'Ecosistema & APIs Nuvex',
      items: [
        {
          name: 'WhatsApp Cloud API & MCP',
          route: '/ecosystem/whatsapp-hub',
          tag: 'Hub & MCP',
          badge: 'Nuevo',
        },
      ],
    },
    {
      title: 'Componentes Base',
      items: [
        { name: 'Button', route: '/button', tag: 'Interactivo' },
        { name: 'Badge', route: '/badge', tag: 'Pill' },
        { name: 'Avatar', route: '/avatar', tag: 'Nuevo v0.0.4' },
        { name: 'Spinner', route: '/spinner', tag: 'Feedback' },
        { name: 'Toast', route: '/toast', tag: 'Alerta' },
      ],
    },
    {
      title: 'Formularios & Datos',
      items: [
        { name: 'Input', route: '/input', tag: 'Captura' },
        { name: 'Select', route: '/select', tag: 'Dropdown' },
        { name: 'Switch', route: '/switch', tag: 'Toggle' },
        { name: 'Table', route: '/table', tag: 'Datatable' },
      ],
    },
    {
      title: 'Nuvex Modern Curve',
      items: [
        { name: 'Card', route: '/card', tag: '32px' },
        { name: 'KPI Card', route: '/kpi-card', tag: 'Analytics' },
        { name: 'Spotlight Card', route: '/spotlight-card', tag: 'Hero' },
        { name: 'Segmented', route: '/segmented', tag: 'Pill' },
        { name: 'Drawer', route: '/drawer', tag: 'Slide-Over' },
        { name: 'Modal', route: '/modal', tag: 'Nuevo v0.0.3' },
        { name: 'Sparkline', route: '/sparkline', tag: 'Bézier SVG' },
      ],
    },
    {
      title: 'Navegación & Cápsula',
      items: [
        { name: 'Capsule Dock', route: '/capsule-dock', tag: 'Obsidian' },
        { name: 'Topbar', route: '/topbar', tag: 'Pill Nav' },
        { name: 'Tabs', route: '/tabs', tag: 'Pill / Line' },
      ],
    },
    {
      title: 'Infraestructura & QA',
      items: [
        { name: 'Vitest (66 Tests)', route: '#', badge: '100% Pass', disabled: true },
        { name: 'Build FESM/DTS', route: '#', badge: '17 Bundles', disabled: true },
      ],
    },
  ];

  readonly filteredCategories = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.categories;

    return this.categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => item.name.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.items.length > 0);
  });

  readonly mobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.mobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  toggleDark() {
    this.theme.toggleDarkMode();
  }
}
