type ValidationAndResult<T> = {
  validation: () => boolean;
  result: T;
};

export default class Validation<T> {
  private validationAndResults: ValidationAndResult<T>[] = [];

  constructor(validationAndResults: ValidationAndResult<T>[] = []) {
    this.validationAndResults = validationAndResults;
  }

  private doesFailValidation = (target: {
    validation: () => boolean;
  }): boolean => !target.validation();

  public next = (validation: () => boolean, result: T): Validation<T> => {
    return new Validation(
      this.validationAndResults.concat({ validation, result })
    );
  };

  public result = (defaultResult: T): T => {
    return (
      this.validationAndResults.find(this.doesFailValidation)?.result ??
      defaultResult
    );
  };
}
