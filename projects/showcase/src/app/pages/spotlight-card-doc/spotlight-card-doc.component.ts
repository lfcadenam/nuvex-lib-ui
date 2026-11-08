import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { SpotlightCardComponent } from 'nuvex-ui/spotlight-card';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

@Component({
  selector: 'app-spotlight-card-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SpotlightCardComponent, CodeSnippetComponent],
  templateUrl: './spotlight-card-doc.component.html',
  styleUrl: '../doc-shared.css',
})
export class SpotlightCardDocComponent {
  readonly activeTab = signal<'preview' | 'code'>('preview');

  readonly profiles = [
    {
      name: 'Dra. Paola Aguilera',
      role: 'Estilista Master & Fundadora',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240',
      status: 'online' as const,
      badgeText: 'Disponible Hoy',
      badgeVariant: 'success' as const,
      availability: '08:00 AM — 06:00 PM',
      stats: [
        { label: 'Rating', value: '4.9 ★' },
        { label: 'Citas', value: '142' },
        { label: 'Exp', value: '10 Años' },
      ],
      actionLabel: 'Agendar Cita Directa',
    },
    {
      name: 'Camila Restrepo',
      role: 'Especialista en Manicura Rusa',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240',
      status: 'busy' as const,
      badgeText: 'Top Solicitada',
      badgeVariant: 'primary' as const,
      availability: '10:00 AM — 07:00 PM',
      stats: [
        { label: 'Rating', value: '5.0 ★' },
        { label: 'Citas', value: '98' },
        { label: 'Exp', value: '6 Años' },
      ],
      actionLabel: 'Ver Agenda y Turnos',
    },
    {
      name: 'Valentina Gómez',
      role: 'Cosmetóloga & Tratamiento Facial',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240',
      status: 'online' as const,
      badgeText: 'Nueva Especialista',
      badgeVariant: 'info' as const,
      availability: '09:00 AM — 04:00 PM',
      stats: [
        { label: 'Rating', value: '4.8 ★' },
        { label: 'Citas', value: '54' },
        { label: 'Exp', value: '4 Años' },
      ],
      actionLabel: 'Consultar Disponibilidad',
    },
  ];

  readonly currentIndex = signal(0);

  nextProfile(): void {
    this.currentIndex.update((i) => (i + 1) % this.profiles.length);
  }

  prevProfile(): void {
    this.currentIndex.update((i) => (i - 1 + this.profiles.length) % this.profiles.length);
  }

  readonly currentProfile = () => this.profiles[this.currentIndex()];

  readonly importSnippet = `import { Component } from '@angular/core';
import { SpotlightCardComponent } from 'nuvex-ui/spotlight-card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SpotlightCardComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}`;

  readonly usageSnippet = `<!-- 1. Tarjeta Spotlight Estándar con Carrusel -->
<nuvex-spotlight-card
  [name]="currentProfile().name"
  [role]="currentProfile().role"
  [avatarImage]="currentProfile().avatar"
  [status]="currentProfile().status"
  [badgeText]="currentProfile().badgeText"
  [availability]="currentProfile().availability"
  [stats]="currentProfile().stats"
  [actionLabel]="currentProfile().actionLabel"
  [counterText]="(currentIndex() + 1) + ' / ' + profiles.length"
  (prev)="prevProfile()"
  (next)="nextProfile()"
  (actionClick)="onBookingClick()"
/>

<!-- 2. Variante Hero Invertida (Obsidiana Nuvex) -->
<nuvex-spotlight-card
  variant="hero"
  name="Dr. Alejandro Nuñez"
  role="Director Médico & Cirugía"
  badgeText="Destacado del Mes"
  badgeVariant="warning"
  availability="Lunes a Viernes"
  actionLabel="Ver Ficha Clínica"
/>`;
}
