type ValidationAndResult<T> = {
  validation: () => boolean;
  result: T;
};

export default class Validation<T> {
  private validationAndResults: ValidationAndResult<T>[] = [];

  public next = (validation: () => boolean, result: T): Validation<T> => {
    this.validationAndResults.push({ validation, result });
    return this;
  };

  public doesPassValidation = (target: {
    validation: () => boolean;
  }): boolean => target.validation();
  public doesFallForValidation = (target: {
    validation: () => boolean;
  }): boolean => !target.validation();

  public ensure = <S>(argument: S | undefined | null): S => {
    if (argument === undefined || argument === null)
      throw new Error('ensureの引数がnullもしくはundefinedになっています。');

    return argument;
  };

  public result = (defaultResult: T, whetherToPassValidation: boolean): T => {
    const discriminant = whetherToPassValidation
      ? this.doesPassValidation
      : this.doesFallForValidation;
    const result = this.validationAndResults.some(discriminant)
      ? this.ensure(this.validationAndResults.find(discriminant)).result
      : defaultResult;
    this.validationAndResults = [];

    return result;
  };
}
