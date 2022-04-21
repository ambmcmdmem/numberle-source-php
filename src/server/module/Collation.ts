import { StatusOfProposedSolutionType } from '../../module/numberleConfig';
import Validation from '../../module/Validation';

const validation = new Validation<StatusOfProposedSolutionType>();
const toStatus =
  (answer: string) =>
  (
    proposedSolutionCharacter: string,
    proposedSolutionCharacterNo: number
  ): StatusOfProposedSolutionType => {
    return validation
      .next(
        () =>
          proposedSolutionCharacter ===
          answer.charAt(proposedSolutionCharacterNo),
        'correct'
      )
      .next(
        () => answer.includes(proposedSolutionCharacter),
        'differentLocation'
      )
      .result('wrong', true);
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
