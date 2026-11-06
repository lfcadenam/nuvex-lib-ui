import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { provideMyUITheme } from './provide-theme';
import { auraPreset } from '../themes/aura';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        provideMyUITheme({
          preset: auraPreset,
          options: {
            darkModeSelector: 'nvl-dark',
          },
        }),
      ],
    });
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with light mode by default', () => {
    expect(service.darkMode()).toBe(false);
  });

  it('should toggle dark mode on toggleDarkMode()', () => {
    expect(service.darkMode()).toBe(false);
    service.toggleDarkMode();
    expect(service.darkMode()).toBe(true);
    service.toggleDarkMode();
    expect(service.darkMode()).toBe(false);
  });

  it('should have aura preset loaded', () => {
    expect(service.preset()).toBe(auraPreset);
    expect(service.prefix()).toBe('nvl');
  });

  it('should allow configuring custom prefix and preset', () => {
    service.configure(auraPreset, { prefix: 'custom-ui' });
    expect(service.prefix()).toBe('custom-ui');
  });
});
