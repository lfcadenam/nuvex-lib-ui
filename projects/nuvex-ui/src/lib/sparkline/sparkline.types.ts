export type SparklineColor =
  | 'emerald'
  | 'obsidian'
  | 'neutral'
  | 'rose'
  | 'sky'
  | 'white'
  | 'custom';

export interface SparklinePoint {
  x: number;
  y: number;
  val: number;
}
