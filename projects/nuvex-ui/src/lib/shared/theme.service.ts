import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { ThemePreset, ThemeOptions } from './theme.types';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  readonly prefix = signal('nvl');
  readonly darkMode = signal(false);

  private styleEl: HTMLStyleElement | null = null;
  private darkModeSelector = 'nvl-dark';

  private _preset = signal<ThemePreset | null>(null);
  get preset() {
    return this._preset.asReadonly();
  }

  constructor() {
    effect(() => {
      const preset = this._preset();
      if (!preset) return;
      this.generateCSS(preset, this.prefix());
    });
  }

  configure(preset: ThemePreset, options?: ThemeOptions) {
    if (options?.prefix) this.prefix.set(options.prefix);
    if (options?.darkModeSelector) this.darkModeSelector = options.darkModeSelector;
    this._preset.set(preset);
  }

  toggleDarkMode() {
    this.darkMode.update(v => !v);
    if (isPlatformBrowser(this.platformId)) {
      this.document.documentElement.classList.toggle(
        this.darkModeSelector,
        this.darkMode()
      );
    }
  }

  private generateCSS(preset: ThemePreset, prefix: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    let css = ':root {\n';

    for (const [colorName, shades] of Object.entries(preset.primitive)) {
      for (const [shade, value] of Object.entries(shades)) {
        css += `  --${prefix}-${colorName}-${shade}: ${value};\n`;
      }
    }

    if (preset.semantic) {
      for (const [group, tokens] of Object.entries(preset.semantic)) {
        for (const [name, value] of Object.entries(tokens)) {
          const resolved = this.resolveToken(value as string, prefix);
          css += `  --${prefix}-${group}-${this.camelToKebab(name)}: ${resolved};\n`;
        }
      }
    }

    css += '}\n';

    if (preset.dark?.semantic) {
      css += `.${this.darkModeSelector} {\n`;
      for (const [group, tokens] of Object.entries(preset.dark.semantic)) {
        for (const [name, value] of Object.entries(tokens)) {
          const resolved = this.resolveToken(value as string, prefix);
          css += `  --${prefix}-${group}-${this.camelToKebab(name)}: ${resolved};\n`;
        }
      }
      css += '}\n';
    }

    this.injectCSS(css);
  }

  private camelToKebab(str: string): string {
    return str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
  }

  private resolveToken(value: string, prefix: string): string {
    return value.replace(/\{(\w+)\.(\w+)\}/g, (_, group, shade) => {
      return `var(--${prefix}-${group}-${shade})`;
    });
  }

  private injectCSS(css: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (!this.styleEl) {
      this.styleEl = this.document.createElement('style');
      this.styleEl.setAttribute('data-nuvex-theme', '');
      this.document.head.appendChild(this.styleEl);
    }
    this.styleEl.textContent = css;
  }
}
