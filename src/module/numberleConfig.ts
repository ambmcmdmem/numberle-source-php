export const seedRange = {
  min: 1,
  max: 1000,
} as const;
export type StatusOfProposedSolutionType =
  | 'correct'
  | 'differentLocation'
  | 'wrong';
export const apiCheckDigit = (seed: number): number => seed * 1234509876;
export type totallingType = {
  count: number;
  numberOfTries: number;
};
export type totallingForDisplayType = {
  doIInclude: boolean;
  title: number | '未クリア';
  count: number;
};
