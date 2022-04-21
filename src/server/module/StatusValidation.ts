import Validation from '../../module/Validation';
import { StatusOfProposedSolutionType } from '../../module/numberleConfig';

export default class StatusValidation extends Validation {
  public next = (
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

  public result = (
    validationAndStatus: {
      validation: () => boolean;
      status: StatusOfProposedSolutionType;
    }[]
  ): StatusOfProposedSolutionType => {
    return validationAndStatus.some(this.doesPassValidation)
      ? this.ensure(validationAndStatus.find(this.doesPassValidation)).status
      : 'wrong';
  };
}
