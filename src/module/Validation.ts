export default class Validation {
  protected doesPassValidation = (target: {
    validation: () => boolean;
  }): boolean => target.validation();
  protected doesFallForValidation = (target: {
    validation: () => boolean;
  }): boolean => !target.validation();

  protected ensure = <T>(argument: T | undefined | null): T => {
    if (argument === undefined || argument === null)
      throw new Error('ensureの引数がnullもしくはundefinedになっています。');

    return argument;
  };
}
