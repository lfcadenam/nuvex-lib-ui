import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

interface ColorToken {
  name: string;
  variable: string;
  hex: string;
  rgb: string;
  usage: string;
  category: 'brand' | 'accent' | 'surface';
  textColor: string;
}

@Component({
  selector: 'app-brand-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CodeSnippetComponent],
  templateUrl: './brand-doc.component.html',
  styleUrls: ['../doc-shared.css', './brand-doc.component.css'],
})
export class BrandDocComponent {
  readonly activeTab = signal<'preview' | 'tokens' | 'typography'>('preview');
  readonly copiedColor = signal<string | null>(null);

  readonly brandColors: ColorToken[] = [
    {
      name: 'Azul Marino Nuvex',
      variable: '--nx-brand-navy',
      hex: '#152B58',
      rgb: '21, 43, 88',
      usage: 'Color institucional, tipografía primaria, botones corporativos y contraste base.',
      category: 'brand',
      textColor: '#ffffff',
    },
    {
      name: 'Verde Esmeralda Nuvex',
      variable: '--nx-brand-emerald',
      hex: '#00C975',
      rgb: '0, 201, 117',
      usage: 'Acento primario interactivo, estados de éxito, métricas positivas y pulso Live.',
      category: 'brand',
      textColor: '#0f172a',
    },
    {
      name: 'Celeste / Cian Tecnológico',
      variable: '--nx-brand-cyan',
      hex: '#00D2FF',
      rgb: '0, 210, 255',
      usage: 'Ala frontal del isotipo, gráficos de tendencias y analítica interactiva.',
      category: 'accent',
      textColor: '#0f172a',
    },
    {
      name: 'Violeta / Púrpura Futurista',
      variable: '--nx-brand-purple',
      hex: '#7C3AED',
      rgb: '124, 58, 237',
      usage: 'Ala posterior del isotipo, acentos secundarios SaaS y micro-badges.',
      category: 'accent',
      textColor: '#ffffff',
    },
    {
      name: 'Lila Acento',
      variable: '--nx-brand-lilac',
      hex: '#B58AFF',
      rgb: '181, 138, 255',
      usage: 'Puntos de acento tipográfico, símbolos técnicos y destellos suaves.',
      category: 'accent',
      textColor: '#0f172a',
    },
    {
      name: 'Obsidiana Dock / Hero',
      variable: '--nx-surface-obsidian',
      hex: '#111215',
      rgb: '17, 18, 21',
      usage: 'Dock vertical flotante, tarjetas Hero invertidas y barras de navegación oscura.',
      category: 'surface',
      textColor: '#ffffff',
    },
    {
      name: 'Canvas Fondo Claro',
      variable: '--nx-canvas-light',
      hex: '#F8FAFC',
      rgb: '248, 250, 252',
      usage: 'Lienzo exterior en modo claro para máxima legibilidad y descanso visual.',
      category: 'surface',
      textColor: '#0f172a',
    },
    {
      name: 'Canvas Fondo Oscuro',
      variable: '--nx-canvas-dark',
      hex: '#0C0D0E',
      rgb: '12, 13, 14',
      usage: 'Lienzo exterior en modo oscuro profundo sin negros puros que cansen la vista.',
      category: 'surface',
      textColor: '#ffffff',
    },
  ];

  readonly cssTokensSnippet = `/* ==========================================================================
   Nuvex UI - Tokens Oficiales de Identidad y Marca
   ========================================================================== */

:root {
  /* Colores Fundacionales */
  --nx-brand-navy: #152B58;
  --nx-brand-navy-rgb: 21, 43, 88;
  --nx-brand-emerald: #00C975;
  --nx-brand-emerald-rgb: 0, 201, 117;
  --nx-brand-cyan: #00D2FF;
  --nx-brand-cyan-rgb: 0, 210, 255;
  --nx-brand-purple: #7C3AED;
  --nx-brand-purple-rgb: 124, 58, 237;
  --nx-brand-lilac: #B58AFF;

  /* Superficies Nuvex Capsule UI */
  --nx-surface-obsidian: #111215;
  --nx-surface-card-light: #FFFFFF;
  --nx-surface-card-dark: #16171A;
  --nx-canvas-light: #F8FAFC;
  --nx-canvas-dark: #0C0D0E;

  /* Radios de Curvatura Orgánica (Modern Curve) */
  --nx-radius-sm: 0.75rem;     /* 12px - Badges e Inputs */
  --nx-radius-md: 1rem;        /* 16px - Botones y Chips */
  --nx-radius-lg: 1.5rem;       /* 24px - Tarjetas intermedias */
  --nx-radius-xl: 2rem;         /* 32px - Tarjetas principales y Modales */
  --nx-radius-full: 9999px;     /* Cápsulas y Docks Flotantes */

  /* Sombras Difusas Soft-Clay (Sin bordes toscos) */
  --nx-shadow-soft-clay: 0 10px 30px -5px rgba(0, 0, 0, 0.04), 0 20px 40px -10px rgba(0, 0, 0, 0.06);
  --nx-shadow-float: 0 20px 50px -12px rgba(0, 0, 0, 0.18);
  --nx-shadow-emerald-glow: 0 8px 24px -4px rgba(0, 201, 117, 0.35);

  /* Tipografía */
  --nx-font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --nx-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}`;

  copyColor(color: ColorToken) {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(color.hex);
      this.copiedColor.set(color.hex);
      setTimeout(() => this.copiedColor.set(null), 2000);
    }
  }
}
