export type StatusOfProposedSolutionType =
  | 'correct'
  | 'differentLocation'
  | 'wrong';
export const apiCheckDigit = (seed: number): number => seed * 1234509876;
