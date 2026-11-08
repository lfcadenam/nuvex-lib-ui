import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent, TabComponent } from 'nuvex-ui/tabs';
import { TabSize, TabVariant } from 'nuvex-ui/tabs';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

@Component({
  selector: 'app-tabs-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TabsComponent, TabComponent, CodeSnippetComponent],
  templateUrl: './tabs-doc.component.html',
  styleUrl: '../doc-shared.css',
})
export class TabsDocComponent {
  readonly activeTab = signal<'preview' | 'code'>('preview');

  // Estados interactivos
  readonly selectedMainTab = signal<string>('citas');
  readonly currentVariant = signal<TabVariant>('pill');
  readonly currentSize = signal<TabSize>('md');
  readonly isFullWidth = signal<boolean>(false);

  readonly basicUsageCode = `import { Component, signal } from '@angular/core';
import { TabsComponent, TabComponent } from 'nuvex-ui/tabs';

@Component({
  standalone: true,
  imports: [TabsComponent, TabComponent],
  template: \`
    <!-- Pestañas con Contenido Proyectado -->
    <nuvex-tabs [(value)]="activeTab" variant="pill">
      <nuvex-tab id="general" label="General" badge="3">
        <p>Configuración básica del establecimiento y horarios.</p>
      </nuvex-tab>

      <nuvex-tab id="servicios" label="Servicios & Tarifas">
        <p>Catálogo de tratamientos capilares, manicura y estética.</p>
      </nuvex-tab>

      <nuvex-tab id="notificaciones" label="WhatsApp & Notificaciones">
        <p>Plantillas automáticas y recordatorios por Meta API.</p>
      </nuvex-tab>

      <nuvex-tab id="seguridad" label="Seguridad" [disabled]="true">
        <p>Control de accesos y roles administrativos.</p>
      </nuvex-tab>
    </nuvex-tabs>
  \`,
})
export class SettingsPageComponent {
  activeTab = signal('general');
}`;
}
