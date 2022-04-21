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
      validation.validationAndStatus(
        () =>
          proposedSolutionCharacter ===
          answer.charAt(proposedSolutionCharacterNo),
        'correct'
      ),
      validation.validationAndStatus(
        () => answer.includes(proposedSolutionCharacter),
        'differentLocation'
      ),
    ];
    return validationAndStatus.some(validation.doesPassValidation)
      ? validation.ensure(
          validationAndStatus.find(validation.doesPassValidation)
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
