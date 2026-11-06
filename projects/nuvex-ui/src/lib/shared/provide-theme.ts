import { EnvironmentProviders, makeEnvironmentProviders, provideAppInitializer, inject } from '@angular/core';
import { ThemeService } from './theme.service';
import { ThemePreset, ThemeOptions } from './theme.types';

export function provideMyUITheme(config: {
  preset: ThemePreset;
  options?: ThemeOptions;
}): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer(() => {
      const theme = inject(ThemeService);
      theme.configure(config.preset, config.options);
    }),
  ]);
}
