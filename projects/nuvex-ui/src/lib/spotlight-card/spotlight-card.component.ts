import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
} from '@angular/core';
import { SpotlightCardVariant, SpotlightStat } from './spotlight-card.types';

@Component({
  selector: 'nuvex-spotlight-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './spotlight-card.component.html',
  styleUrl: './spotlight-card.component.css',
  host: {
    class: 'nuvex-spotlight-card',
    '[class.nuvex-spotlight-card--default]': 'variant() === "default"',
    '[class.nuvex-spotlight-card--hero]': 'variant() === "hero"',
    '[class.nuvex-spotlight-card--emerald]': 'variant() === "emerald"',
    '[class.nuvex-spotlight-card--outlined]': 'variant() === "outlined"',
    '[class.nuvex-spotlight-card--hoverable]': 'hoverable()',
  },
})
export class SpotlightCardComponent {
  /** Nombre completo o título principal (ej: "Dra. Paola Aguilera") */
  readonly name = input<string>('');

  /** Especialidad, cargo o subtítulo descriptivo */
  readonly role = input<string>('');

  /** URL de la fotografía de perfil */
  readonly avatarImage = input<string | null>(null);

  /** Texto para iniciales si no hay foto */
  readonly avatarLabel = input<string>('');

  /** Estado de presencia del avatar ('online', 'busy', 'away', etc.) */
  readonly status = input<'online' | 'busy' | 'away' | 'offline' | null>('online');

  /** Texto para la píldora de estado superior (ej: "Disponible Hoy", "Top Rated") */
  readonly badgeText = input<string>('');

  /** Variante de color para la píldora superior */
  readonly badgeVariant = input<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'>('success');

  /** Franja horaria o disponibilidad (ej: "09:00 AM — 06:00 PM") */
  readonly availability = input<string>('');

  /** Métricas estadísticas al pie (Rating, Pacientes, Experiencia, etc.) */
  readonly stats = input<SpotlightStat[]>([]);

  /** Texto para el botón de acción principal (ej: "Agendar Cita") */
  readonly actionLabel = input<string>('');

  /** Muestra los botones de navegación carrusel (< y >) */
  readonly showNavigation = input<boolean>(true);

  /** Permite retroceder en el carrusel */
  readonly canNavigatePrev = input<boolean>(true);

  /** Permite avanzar en el carrusel */
  readonly canNavigateNext = input<boolean>(true);

  /** Texto indicador de posición (ej: "1 de 5" o "1 / 4") */
  readonly counterText = input<string>('');

  /** Variante visual de la tarjeta */
  readonly variant = input<SpotlightCardVariant>('default');

  /** Si la tarjeta reacciona al cursor con elevación suave */
  readonly hoverable = input<boolean>(true);

  /** Emite al presionar la flecha anterior (<) */
  readonly prev = output<void>();

  /** Emite al presionar la flecha siguiente (>) */
  readonly next = output<void>();

  /** Emite al presionar el botón de acción principal */
  readonly actionClick = output<void>();

  /** Iniciales calculadas automáticamente para el avatar fallback */
  readonly computedInitials = computed<string>(() => {
    const raw = (this.avatarLabel() || this.name() || '').trim();
    if (!raw) return '';
    if (raw.length <= 3) return raw.toUpperCase();
    const words = raw.split(/[\s_-]+/).filter((w) => w.length > 0);
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  });

  onPrev(): void {
    if (this.canNavigatePrev()) {
      this.prev.emit();
    }
  }

  onNext(): void {
    if (this.canNavigateNext()) {
      this.next.emit();
    }
  }

  onAction(): void {
    this.actionClick.emit();
  }
}
