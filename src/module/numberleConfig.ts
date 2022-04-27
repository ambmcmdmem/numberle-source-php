import numberleConfig from './numberleConfig.json';

export const maxNumberOfTries = numberleConfig.maxNumberOfTries;
export const maxNumberOfInput = numberleConfig.maxNumberOfInput;
export type StatusOfProposedSolutionType =
  | 'correct'
  | 'differentLocation'
  | 'wrong';
export const apiCheckDigit = (seed: number): number => seed * 1234509876;
