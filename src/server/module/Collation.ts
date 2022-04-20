import { StatusOfProposedSolutionType } from '../../module/numberleConfig';
import { ensure } from '../../module/typeModule';

const toStatus =
  (answer: string) =>
  (
    proposedSolutionCharacter: string,
    proposedSolutionCharacterNo: number
  ): StatusOfProposedSolutionType => {
    const conditionAndStatus: {
      condition: () => boolean;
      status: StatusOfProposedSolutionType;
    }[] = [
      {
        condition: () =>
          proposedSolutionCharacter ===
          answer.charAt(proposedSolutionCharacterNo),
        status: 'correct',
      },
      {
        condition: () => answer.includes(proposedSolutionCharacter),
        status: 'differentLocation',
      },
      {
        condition: () => true,
        status: 'wrong',
      },
    ];
    return ensure(conditionAndStatus.find(({ condition }) => condition)).status;
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
