import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import {
  AvatarBadgePosition,
  AvatarShape,
  AvatarSize,
  AvatarStatus,
  AvatarStatusPosition,
  AvatarVariant,
} from './avatar.types';

@Component({
  selector: 'nuvex-avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
  host: {
    class: 'nuvex-avatar',
    '[class.nuvex-avatar--xs]': 'size() === "xs"',
    '[class.nuvex-avatar--sm]': 'size() === "sm"',
    '[class.nuvex-avatar--md]': 'size() === "md"',
    '[class.nuvex-avatar--lg]': 'size() === "lg"',
    '[class.nuvex-avatar--xl]': 'size() === "xl"',
    '[class.nuvex-avatar--2xl]': 'size() === "2xl"',
    '[class.nuvex-avatar--circle]': 'shape() === "circle"',
    '[class.nuvex-avatar--rounded]': 'shape() === "rounded"',
    '[class.nuvex-avatar--square]': 'shape() === "square"',
    '[class.nuvex-avatar--default]': 'variant() === "default"',
    '[class.nuvex-avatar--primary]': 'variant() === "primary"',
    '[class.nuvex-avatar--emerald]': 'variant() === "emerald"',
    '[class.nuvex-avatar--purple]': 'variant() === "purple"',
    '[class.nuvex-avatar--amber]': 'variant() === "amber"',
    '[class.nuvex-avatar--neutral]': 'variant() === "neutral"',
    '[class.nuvex-avatar--dark]': 'variant() === "dark"',
    '[class.nuvex-avatar--clickable]': 'clickable()',
    '[class.nuvex-avatar--ring]': 'ring()',
    '(click)': 'handleClick($event)',
  },
})
export class AvatarComponent {
  /** URL de la imagen de perfil */
  readonly image = input<string | null>(null);

  /** Texto o nombre completo para extraer iniciales si no hay foto */
  readonly label = input<string>('');

  /** Ícono opcional cuando no hay imagen ni texto */
  readonly icon = input<string | null>(null);

  /** Tamaño del avatar (xs: 24px, sm: 32px, md: 40px, lg: 48px, xl: 64px, 2xl: 80px) */
  readonly size = input<AvatarSize>('md');

  /** Geometría del borde (circle: 9999px, rounded: curva orgánica Nuvex, square: bordes suaves) */
  readonly shape = input<AvatarShape>('circle');

  /** Paleta tonal de superficie cuando se muestran iniciales */
  readonly variant = input<AvatarVariant>('default');

  /** Estado de presencia del usuario (online, offline, busy, away) */
  readonly status = input<AvatarStatus | null>(null);

  /** Ubicación del indicador de presencia */
  readonly statusPosition = input<AvatarStatusPosition>('bottom-right');

  /** Texto o número para una píldora de notificación */
  readonly badge = input<string | number | null>(null);

  /** Ubicación de la píldora de notificación */
  readonly badgePosition = input<AvatarBadgePosition>('top-right');

  /** Texto alternativo para accesibilidad */
  readonly alt = input<string>('Avatar');

  /** Activa cursor pointer y microinteracción hover */
  readonly clickable = input<boolean>(false);

  /** Anillo exterior sutil para distinguir al usuario */
  readonly ring = input<boolean>(false);

  /** Evento emitido al hacer clic */
  readonly clicked = output<MouseEvent>();

  /** Evento emitido si falla la carga de la imagen */
  readonly imageError = output<Event>();

  /** Estado reactivo si falló la carga de la imagen para fallback automático */
  readonly hasImageFailed = signal<boolean>(false);

  /** Determina si se renderiza la imagen o el fallback */
  readonly showImage = computed(() => {
    return !!this.image() && !this.hasImageFailed();
  });

  /** Extrae iniciales legibles del nombre o label */
  readonly computedInitials = computed<string>(() => {
    const raw = (this.label() ?? '').trim();
    if (!raw) return '';

    if (raw.length <= 3) {
      return raw.toUpperCase();
    }

    const words = raw.split(/[\s_-]+/).filter((w) => w.length > 0);
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }

    return (words[0][0] + words[1][0]).toUpperCase();
  });

  handleClick(event: MouseEvent): void {
    if (this.clickable()) {
      this.clicked.emit(event);
    }
  }

  handleImgError(event: Event): void {
    this.hasImageFailed.set(true);
    this.imageError.emit(event);
  }
}
