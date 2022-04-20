import { StatusOfProposedSolutionType } from '../../module/numberleConfig';
import Validation from '../../module/Validation';

const validation = new Validation();
const toStatus =
  (answer: string) =>
  (
    proposedSolutionCharacter: string,
    proposedSolutionCharacterNo: number
  ): StatusOfProposedSolutionType => {
    const validationAndStatus: {
      validation: () => boolean;
      status: StatusOfProposedSolutionType;
    }[] = [
      {
        validation: () =>
          proposedSolutionCharacter ===
          answer.charAt(proposedSolutionCharacterNo),
        status: 'correct',
      },
      {
        validation: () => answer.includes(proposedSolutionCharacter),
        status: 'differentLocation',
      },
    ];
    return validationAndStatus.some(validation.doesFallForValidation)
      ? validation.ensure(
          validationAndStatus.find(validation.doesFallForValidation)
        ).status
      : 'wrong';
  };

export default class Collation {
  public statusOfProposedSolution(
    proposedSolution: string,
    answer: string
  ): StatusOfProposedSolutionType[] {
    if (proposedSolution.length !== answer.length)
      throw new Error('提示された文字列長と回答の文字列長が異なります。');

    return [...proposedSolution].map(toStatus(answer));
  }
}
