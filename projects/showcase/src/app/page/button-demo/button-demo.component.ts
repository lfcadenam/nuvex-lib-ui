import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from 'nuvex-ui/button';
import { BadgeComponent } from 'nuvex-ui/badge';
import { SpinnerComponent } from 'nuvex-ui/spinner';
import { InputComponent, InputDirective } from 'nuvex-ui/input';
import { SwitchComponent } from 'nuvex-ui/switch';
import { ThemeService } from 'nuvex-ui';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [
    ButtonComponent,
    BadgeComponent,
    SpinnerComponent,
    InputComponent,
    InputDirective,
    SwitchComponent,
  ],
  templateUrl: './button-demo.component.html',
  styleUrl: './button-demo.component.css',
})
export class ButtonDemoComponent {
  private theme = inject(ThemeService);
  readonly isDark = this.theme.darkMode;

  // Estados interactivos para inputs y switches
  readonly demoUser = signal('admin@nuvex.co');
  readonly demoSearch = signal('');
  readonly demoErrorInput = signal('valor_invalido');
  readonly demoVsPeriod = signal(true);
  readonly demoNotifications = signal(false);
  readonly isSimulatedLoading = signal(true);

  toggleDark() {
    this.theme.toggleDarkMode();
  }

  toggleLoading() {
    this.isSimulatedLoading.update((v) => !v);
  }
}
