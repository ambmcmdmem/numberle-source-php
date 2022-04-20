export default class Validation {
  public doesFallForValidation = (target: {
    validation: () => boolean;
  }): boolean => target.validation();

  public ensure = <T>(argument: T | undefined | null): T => {
    if (argument === undefined || argument === null)
      throw new Error('ensureの引数がnullもしくはundefinedになっています。');

    return argument;
  };
}
