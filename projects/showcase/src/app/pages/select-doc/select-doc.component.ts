import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from 'nuvex-ui/select';
import { SelectOption, SelectSize, SelectVariant } from 'nuvex-ui/select';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

@Component({
  selector: 'app-select-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, SelectComponent, CodeSnippetComponent],
  templateUrl: './select-doc.component.html',
  styleUrl: '../doc-shared.css',
})
export class SelectDocComponent {
  readonly activeTab = signal<'preview' | 'code'>('preview');

  // Opciones para las pruebas
  readonly stylistOptions: SelectOption[] = [
    { value: 'paola', label: 'Dra. Paola Aguilera', description: 'Coloración & Balayage Master' },
    { value: 'camila', label: 'Camila Restrepo', description: 'Manicura Rusa & Acrílicas' },
    { value: 'valentina', label: 'Valentina Gómez', description: 'Cosmetología & Facial' },
    { value: 'andres', label: 'Andrés Morales', description: 'Barbería Clásica & Degradados' },
    { value: 'laura', label: 'Laura Soto', description: 'Tratamientos Capilares & Botox' },
  ];

  readonly serviceOptions: SelectOption[] = [
    { value: 'balayage', label: 'Balayage Premium ($320.000)' },
    { value: 'corte', label: 'Corte Ejecutivo & Barba ($65.000)' },
    { value: 'manicura', label: 'Manicura Rusa ($85.000)' },
    { value: 'botox', label: 'Botox Capilar ($140.000)' },
    { value: 'facial', label: 'Limpieza Facial Profunda ($130.000)' },
    { value: 'pestañas', label: 'Lifting de Pestañas ($110.000)' },
  ];

  // Modelos reactivos
  readonly selectedStylist = signal<string>('paola');
  readonly selectedServices = signal<string[]>(['balayage', 'manicura']);
  readonly selectedFilter = signal<string | null>(null);

  // Estados interactivos
  readonly currentSize = signal<SelectSize>('md');
  readonly currentVariant = signal<SelectVariant>('default');
  readonly currentSearchable = signal<boolean>(true);
  readonly currentClearable = signal<boolean>(true);
  readonly currentDisabled = signal<boolean>(false);

  readonly basicUsageCode = `import { Component, signal } from '@angular/core';
import { SelectComponent, SelectOption } from 'nuvex-ui/select';

@Component({
  standalone: true,
  imports: [SelectComponent],
  template: \`
    <!-- Selección Simple con Búsqueda -->
    <nuvex-select
      label="Especialista Asignado"
      [options]="stylists"
      [(value)]="selectedStylist"
      [searchable]="true"
      [clearable]="true"
    />

    <!-- Selección Múltiple con Tags -->
    <nuvex-select
      label="Servicios a Realizar"
      [options]="services"
      [(value)]="selectedServices"
      [multiple]="true"
      [searchable]="true"
    />
  \`,
})
export class AppointmentFormComponent {
  selectedStylist = signal('paola');
  selectedServices = signal(['corte', 'barba']);

  stylists: SelectOption[] = [
    { value: 'paola', label: 'Dra. Paola Aguilera' },
    { value: 'camila', label: 'Camila Restrepo' },
  ];

  services: SelectOption[] = [
    { value: 'corte', label: 'Corte Ejecutivo' },
    { value: 'barba', label: 'Arreglo de Barba' },
  ];
}`;
}
