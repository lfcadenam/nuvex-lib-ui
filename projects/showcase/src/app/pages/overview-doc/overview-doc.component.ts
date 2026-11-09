import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from 'nuvex-ui/logo';
import { ButtonComponent } from 'nuvex-ui/button';
import { BadgeComponent } from 'nuvex-ui/badge';
import { KpiCardComponent } from 'nuvex-ui/kpi-card';
import { CodeSnippetComponent } from '../../shared/code-snippet.component';

@Component({
  selector: 'app-overview-doc',
  standalone: true,
  imports: [
    RouterLink,
    LogoComponent,
    ButtonComponent,
    BadgeComponent,
    KpiCardComponent,
    CodeSnippetComponent,
  ],
  templateUrl: './overview-doc.component.html',
  styleUrl: './overview-doc.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewDocComponent {
  readonly quickInstallCode = `npm install nuvex-ui --registry https://npm.nuvex-tecnologia.com/`;

  readonly quickStartSnippet = `import { Component } from '@angular/core';
import { LogoComponent } from 'nuvex-ui/logo';
import { ButtonComponent } from 'nuvex-ui/button';
import { KpiCardComponent } from 'nuvex-ui/kpi-card';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [LogoComponent, ButtonComponent, KpiCardComponent],
  template: \`
    <header class="flex items-center justify-between p-6 bg-white rounded-3xl shadow-sm">
      <nx-logo variant="horizontal" size="md"></nx-logo>
      <nuvex-button variant="primary">Nuevo Registro</nuvex-button>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <nuvex-kpi-card
        label="Facturación Mensual"
        value="$ 48.950.000"
        trend="+14.2%"
        trendDirection="up"
        variant="emerald"
      ></nuvex-kpi-card>
    </div>
  \`
})
export class AdminHomeComponent {}`;
}
