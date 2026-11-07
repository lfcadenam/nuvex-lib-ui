import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { KpiCardVariant, KpiTrendDirection } from './kpi-card.types';

@Component({
  selector: 'nuvex-kpi-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.css',
  host: {
    class: 'nuvex-kpi-card',
    '[class.nuvex-kpi-card--hero]': 'variant() === "hero"',
    '[class.nuvex-kpi-card--emerald]': 'variant() === "emerald"',
    '[class.nuvex-kpi-card--purple]': 'variant() === "purple"',
    '[class.nuvex-kpi-card--blue]': 'variant() === "blue"',
    '[class.nuvex-kpi-card--amber]': 'variant() === "amber"',
    '[class.nuvex-kpi-card--outlined]': 'variant() === "outlined"',
    '[class.nuvex-kpi-card--hoverable]': 'hoverable()',
  },
})
export class KpiCardComponent {
  /** Título o métrica descriptiva (ej: "Saldo en Banco", "Ingresos del Mes") */
  readonly label = input<string>('');

  /** Cifra cuantitativa principal (ej: "$ 15.420.000", "42") */
  readonly value = input<string | number>('');

  /** Texto aclaratorio o contexto temporal al pie */
  readonly helperText = input<string>('');

  /** Porcentaje o valor de cambio temporal (ej: "+12.4%", "-3.1%") */
  readonly trend = input<string | number | null>(null);

  /** Dirección de la tendencia ('up', 'down', 'neutral', 'auto' según el signo) */
  readonly trendDirection = input<KpiTrendDirection>('auto');

  /** Etiqueta temporal de la comparación (ej: "vs mes anterior", "vs ayer") */
  readonly trendLabel = input<string>('');

  /** Estilo visual de la tarjeta */
  readonly variant = input<KpiCardVariant>('default');

  /** Texto para un badge píldora en la esquina superior */
  readonly badgeText = input<string>('');

  /** Si la tarjeta reacciona al cursor con elevación suave */
  readonly hoverable = input<boolean>(true);

  /** Dirección efectiva calculada para la flecha y color */
  readonly effectiveDirection = computed<'up' | 'down' | 'neutral'>(() => {
    const dir = this.trendDirection();
    if (dir !== 'auto') return dir;
    const str = String(this.trend() ?? '').trim();
    if (str.startsWith('+')) return 'up';
    if (str.startsWith('-')) return 'down';
    return 'neutral';
  });
}
