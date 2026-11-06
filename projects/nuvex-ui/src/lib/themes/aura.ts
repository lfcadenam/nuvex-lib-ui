import { ThemePreset } from '../shared/theme.types';

export const auraPreset: ThemePreset = {
  primitive: {
    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    red: {
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
    },
  },
  semantic: {
    'primary': {
      'color': '{blue.600}',
      'hoverColor': '{blue.700}',
      'activeColor': '{blue.700}',
    },
    'surface': {
      '0': '#ffffff',
      '50': '{gray.50}',
      '100': '{gray.100}',
      '200': '{gray.200}',
      '500': '{gray.500}',
      '700': '{gray.700}',
      '900': '{gray.900}',
    },
    'text': {
      'color': '{gray.700}',
      'mutedColor': '{gray.500}',
    },
    'danger': {
      'color': '{red.500}',
      'hoverColor': '{red.600}',
    },
  },
  dark: {
    semantic: {
      'surface': {
        '0': '#0f172a',
        '50': '#1e293b',
        '100': '#334155',
        '500': '#64748b',
        '700': '#94a3b8',
        '900': '#f1f5f9',
      },
      'text': {
        'color': '#e2e8f0',
        'mutedColor': '#94a3b8',
      },
    },
  },
};
