export const seedRange = {
  min: 1,
  max: 1000,
} as const;
export type StatusOfProposedSolutionType =
  | 'correct'
  | 'differentLocation'
  | 'wrong';
export const apiCheckDigit = (seed: number): number => seed * 1234509876;
