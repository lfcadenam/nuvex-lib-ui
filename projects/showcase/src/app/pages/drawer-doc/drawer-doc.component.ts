import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { DrawerComponent, DrawerSize } from 'nuvex-ui/drawer';
import { ButtonComponent } from 'nuvex-ui/button';
import { InputComponent } from 'nuvex-ui/input';
import { SwitchComponent } from 'nuvex-ui/switch';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

@Component({
  selector: 'app-drawer-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DrawerComponent,
    ButtonComponent,
    InputComponent,
    SwitchComponent,
    CodeSnippetComponent,
  ],
  templateUrl: './drawer-doc.component.html',
  styleUrl: '../doc-shared.css',
})
export class DrawerDocComponent {
  readonly activeTab = signal<'preview' | 'code'>('preview');

  readonly drawerOpen = signal(false);
  readonly selectedSize = signal<DrawerSize>('md');

  openDrawer(size: DrawerSize) {
    this.selectedSize.set(size);
    this.drawerOpen.set(true);
  }

  saveData() {
    alert('¡Datos guardados con éxito!');
    this.drawerOpen.set(false);
  }

  readonly importSnippet = `import { Component, signal } from '@angular/core';
import { DrawerComponent } from 'nuvex-ui/drawer';
import { ButtonComponent } from 'nuvex-ui/button';
import { InputComponent } from 'nuvex-ui/input';

@Component({
  selector: 'app-clientes-lista',
  standalone: true,
  imports: [DrawerComponent, ButtonComponent, InputComponent],
  templateUrl: './clientes-lista.component.html',
})
export class ClientesListaComponent {
  drawerAbierto = signal(false);

  guardar() {
    // Procesar datos...
    this.drawerAbierto.set(false);
  }
}`;

  readonly usageSnippet = `<!-- Disparador -->
<nuvex-button variant="primary" (onClick)="drawerAbierto.set(true)">
  Nuevo Cliente
</nuvex-button>

<!-- Slide-Over Drawer Oficial Nuvex -->
<nuvex-drawer
  [(isOpen)]="drawerAbierto"
  size="md"
  title="Crear Nuevo Cliente"
  subtitle="Completa los datos fiscales de la entidad"
>
  <!-- Icono opcional en la cabecera -->
  <div slot="header-icon">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"/>
    </svg>
  </div>

  <!-- Cuerpo con scroll automático -->
  <div class="space-y-4">
    <nuvex-input label="Nombre Completo" [required]="true" />
    <nuvex-input label="NIT / Cédula" [required]="true" />
    <nuvex-input label="Email de Contacto" type="email" />
  </div>

  <!-- Sticky Footer siempre visible -->
  <div slot="footer">
    <nuvex-button variant="secondary" (onClick)="drawerAbierto.set(false)">
      Cancelar
    </nuvex-button>
    <nuvex-button variant="primary" (onClick)="guardar()">
      Guardar Cambios
    </nuvex-button>
  </div>
</nuvex-drawer>`;
}
