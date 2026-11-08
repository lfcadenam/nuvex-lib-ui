import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { AvatarComponent, AvatarGroupComponent } from 'nuvex-ui/avatar';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

@Component({
  selector: 'app-avatar-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvatarComponent, AvatarGroupComponent, CodeSnippetComponent],
  templateUrl: './avatar-doc.component.html',
  styleUrl: '../doc-shared.css',
})
export class AvatarDocComponent {
  readonly activeTab = signal<'preview' | 'code'>('preview');

  readonly importSnippet = `import { Component } from '@angular/core';
import { AvatarComponent, AvatarGroupComponent } from 'nuvex-ui/avatar';

@Component({
  selector: 'app-ejemplo',
  standalone: true,
  imports: [AvatarComponent, AvatarGroupComponent],
  templateUrl: './ejemplo.component.html',
})
export class EjemploComponent {}`;

  readonly usageSnippet = `<!-- 1. Con foto de perfil -->
<nuvex-avatar
  image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160"
  label="Camila Restrepo"
  size="md"
  shape="circle"
  status="online"
/>

<!-- 2. Iniciales automáticas con paleta Esmeralda Nuvex -->
<nuvex-avatar
  label="Paola Aguilera"
  variant="emerald"
  size="lg"
  shape="rounded"
  [ring]="true"
/>

<!-- 3. Con badge de notificación / estado -->
<nuvex-avatar
  label="Vivian M."
  variant="purple"
  size="md"
  badge="VIP"
/>

<!-- 4. Avatar Group (Equipo / Participantes de Cita) -->
<nuvex-avatar-group spacing="md" [hoverEffect]="true">
  <nuvex-avatar image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160" />
  <nuvex-avatar image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160" />
  <nuvex-avatar label="Sofia Diaz" variant="primary" />
  <nuvex-avatar label="+4" variant="dark" />
</nuvex-avatar-group>`;
}
