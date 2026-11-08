export type SpotlightCardVariant = 'default' | 'hero' | 'emerald' | 'outlined';

export interface SpotlightStat {
  label: string;
  value: string | number;
  helper?: string;
}
