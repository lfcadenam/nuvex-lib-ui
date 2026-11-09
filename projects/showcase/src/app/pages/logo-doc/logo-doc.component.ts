import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent, LogoVariant, LogoSize } from 'nuvex-ui/logo';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

@Component({
  selector: 'app-logo-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LogoComponent, CodeSnippetComponent],
  templateUrl: './logo-doc.component.html',
  styleUrls: ['../doc-shared.css', './logo-doc.component.css'],
})
export class LogoDocComponent {
  readonly activeTab = signal<'preview' | 'code' | 'assets'>('preview');

  // Playground state
  readonly selectedVariant = signal<LogoVariant>('full');
  readonly selectedSize = signal<LogoSize>('lg');
  readonly withGlow = signal<boolean>(true);

  readonly importSnippet = `import { Component } from '@angular/core';
import { LogoComponent } from 'nuvex-ui/logo';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LogoComponent],
  template: \`
    <!-- 1. Isotipo en Barra de Navegación o Dock -->
    <nx-logo variant="icon" size="sm" [withGlow]="true" />

    <!-- 2. Logotipo Completo en Login / Hero -->
    <nx-logo variant="full" size="xl" />

    <!-- 3. Versión Monocromática para Marcas de Agua o Pie de Página -->
    <nx-logo variant="monochrome" size="md" class="text-slate-400" />
  \`,
})
export class NavbarComponent {}`;

  readonly usageSnippet = `<!-- Selector oficial: nuvex-logo o nx-logo -->
<nx-logo variant="full" size="lg" [withGlow]="true" />
<nx-logo variant="icon" size="md" />
<nx-logo variant="monochrome" size="sm" />`;
}
