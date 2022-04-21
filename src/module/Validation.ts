import { StatusOfProposedSolutionType } from './numberleConfig';

export default class Validation {
  public validationAndStatus = (
    validation: () => boolean,
    status: StatusOfProposedSolutionType
  ): {
    validation: () => boolean;
    status: StatusOfProposedSolutionType;
  } => {
    return {
      validation,
      status,
    };
  };
  public validationAndError = (
    validation: () => boolean,
    error: string
  ): {
    validation: () => boolean;
    error: string;
  } => {
    return {
      validation,
      error,
    };
  };

  public doesPassValidation = (target: {
    validation: () => boolean;
  }): boolean => target.validation();
  public doesFallForValidation = (target: {
    validation: () => boolean;
  }): boolean => !target.validation();

  public ensure = <T>(argument: T | undefined | null): T => {
    if (argument === undefined || argument === null)
      throw new Error('ensureの引数がnullもしくはundefinedになっています。');

    return argument;
  };
}
