import Validation from '../../module/Validation';

export default class ErrorValidation extends Validation {
  public next = (
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

  public result = (
    validationAndErrors: {
      validation: () => boolean;
      error: string;
    }[]
  ): string => {
    return validationAndErrors.some(this.doesFallForValidation)
      ? this.ensure(validationAndErrors.find(this.doesFallForValidation)).error
      : '';
  };
}
