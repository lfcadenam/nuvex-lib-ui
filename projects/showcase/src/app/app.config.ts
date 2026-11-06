import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideMyUITheme, auraPreset } from 'nuvex-ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideMyUITheme({ preset: auraPreset, options: { prefix: 'nvl' } }),
  ],
};
