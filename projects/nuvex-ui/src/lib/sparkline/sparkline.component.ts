import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  computed,
  signal,
} from '@angular/core';
import { SparklineColor, SparklinePoint } from './sparkline.types';

let nextId = 0;

@Component({
  selector: 'nuvex-sparkline',
  standalone: true,
  templateUrl: './sparkline.component.html',
  styleUrl: './sparkline.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'nuvex-sparkline-host block w-full',
    'role': 'img',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class SparklineComponent {
  private readonly instanceId = ++nextId;
  readonly gradientId = `nuvex-sparkline-grad-${this.instanceId}`;

  // Inputs
  readonly data = input<number[]>([]);
  readonly color = input<SparklineColor>('emerald');
  readonly customStroke = input<string>('');
  readonly customFill = input<string>('');
  readonly filled = input<boolean>(false);
  readonly strokeWidth = input<number>(2);
  readonly height = input<number | string>(32);
  readonly width = input<string>('100%');
  readonly curved = input<boolean>(true);
  readonly showLastPoint = input<boolean>(false);
  readonly animated = input<boolean>(true);
  readonly ariaLabel = input<string>('Tendencia de métrica');

  // Height style formatted as px or string
  readonly computedHeight = computed(() => {
    const h = this.height();
    return typeof h === 'number' ? `${h}px` : h;
  });

  // Color mapping
  readonly resolvedStroke = computed(() => {
    const c = this.color();
    if (c === 'custom' && this.customStroke()) return this.customStroke();

    switch (c) {
      case 'emerald':
        return '#00C975';
      case 'obsidian':
        return '#111215';
      case 'neutral':
        return '#64748B';
      case 'rose':
        return '#F43F5E';
      case 'sky':
        return '#0284C7';
      case 'white':
        return '#FFFFFF';
      default:
        return '#00C975';
    }
  });

  readonly resolvedFill = computed(() => {
    if (this.customFill()) return this.customFill();
    return this.resolvedStroke();
  });

  // Calculate coordinates in a 100 x 30 viewBox
  readonly points = computed<SparklinePoint[]>(() => {
    const raw = this.data();
    if (!raw || raw.length === 0) return [];

    const viewBoxWidth = 100;
    const viewBoxHeight = 30;
    const paddingX = 2;
    const paddingY = 4;
    const usableW = viewBoxWidth - paddingX * 2;
    const usableH = viewBoxHeight - paddingY * 2;

    const min = Math.min(...raw);
    const max = Math.max(...raw);
    const range = max - min || 1;
    const n = raw.length;

    if (n === 1) {
      const midY = viewBoxHeight / 2;
      return [
        { x: paddingX, y: midY, val: raw[0] },
        { x: viewBoxWidth - paddingX, y: midY, val: raw[0] },
      ];
    }

    return raw.map((val, i) => {
      const x = paddingX + (i / (n - 1)) * usableW;
      const normalized = (val - min) / range;
      const y = viewBoxHeight - paddingY - normalized * usableH;
      return { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)), val };
    });
  });

  // Path data for stroke
  readonly linePath = computed<string>(() => {
    const pts = this.points();
    if (pts.length < 2) return '';

    if (!this.curved()) {
      return pts.reduce(
        (acc, p, i) => (i === 0 ? `M ${p.x},${p.y}` : `${acc} L ${p.x},${p.y}`),
        ''
      );
    }

    // Bézier Catmull-Rom smoothing
    let d = `M ${pts[0].x},${pts[0].y}`;
    const n = pts.length;

    for (let i = 0; i < n - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(n - 1, i + 2)];

      const cp1x = (p1.x + (p2.x - p0.x) / 6).toFixed(2);
      const cp1y = (p1.y + (p2.y - p0.y) / 6).toFixed(2);
      const cp2x = (p2.x - (p3.x - p1.x) / 6).toFixed(2);
      const cp2y = (p2.y - (p3.y - p1.y) / 6).toFixed(2);

      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }

    return d;
  });

  // Path data for area fill (closed to bottom)
  readonly areaPath = computed<string>(() => {
    const line = this.linePath();
    const pts = this.points();
    if (!line || pts.length < 2) return '';

    const last = pts[pts.length - 1];
    const first = pts[0];
    const bottom = 30;

    return `${line} L ${last.x},${bottom} L ${first.x},${bottom} Z`;
  });

  // Last point coordinates for indicator dot
  readonly lastPoint = computed<SparklinePoint | null>(() => {
    const pts = this.points();
    return pts.length > 0 ? pts[pts.length - 1] : null;
  });
}
