import { StatusOfProposedSolutionType } from '../../module/numberleConfig';
import StatusValidation from './StatusValidation';

const statusValidation = new StatusValidation();
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
      statusValidation.next(
        () =>
          proposedSolutionCharacter ===
          answer.charAt(proposedSolutionCharacterNo),
        'correct'
      ),
      statusValidation.next(
        () => answer.includes(proposedSolutionCharacter),
        'differentLocation'
      ),
    ];
    return statusValidation.result(validationAndStatus);
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
