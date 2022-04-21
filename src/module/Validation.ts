type ValidationAndResult<T> = {
  validation: () => boolean;
  result: T;
};

export default class Validation<T> {
  private validationAndResults: ValidationAndResult<T>[] = [];

  private doesPassValidation = (target: {
    validation: () => boolean;
  }): boolean => target.validation();
  private doesFallForValidation = (target: {
    validation: () => boolean;
  }): boolean => !target.validation();

  private ensure = <S>(argument: S | undefined | null): S => {
    if (argument === undefined || argument === null)
      throw new Error('ensureの引数がnullもしくはundefinedになっています。');

    return argument;
  };

  public next = (validation: () => boolean, result: T): Validation<T> => {
    this.validationAndResults.push({ validation, result });
    return this;
  };

  public result = (defaultResult: T, whetherToPassValidation: boolean): T => {
    const discriminant = whetherToPassValidation
      ? this.doesPassValidation
      : this.doesFallForValidation;
    return this.validationAndResults.some(discriminant)
      ? this.ensure(this.validationAndResults.find(discriminant)).result
      : defaultResult;
  };

  public emptyValidationAndResults = (): void => {
    this.validationAndResults = [];
  };
}
