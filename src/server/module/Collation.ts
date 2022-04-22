import { StatusOfProposedSolutionType } from '../../module/numberleConfig';

type ConditionAndStatus = {
  condition: () => boolean;
  status: StatusOfProposedSolutionType;
};

const pattern = (
  condition: () => boolean,
  status: StatusOfProposedSolutionType
): ConditionAndStatus => {
  return {
    condition,
    status,
  };
};

export default class Collation {
  public statusOfProposedSolution(
    proposedSolution: string,
    answer: string
  ): StatusOfProposedSolutionType[] {
    if (proposedSolution.length !== answer.length)
      throw new Error('提示された文字列長と回答の文字列長が異なります。');

    return [...proposedSolution].map(
      (
        proposedSolutionCharacter: string,
        proposedSolutionCharacterNo: number
      ): StatusOfProposedSolutionType => {
        const conditionAndStatus: ConditionAndStatus[] = [
          pattern(
            () =>
              proposedSolutionCharacter ===
              answer.charAt(proposedSolutionCharacterNo),
            'correct'
          ),
          pattern(
            () => answer.includes(proposedSolutionCharacter),
            'differentLocation'
          ),
          pattern(() => true, 'wrong'),
        ];
        return conditionAndStatus.find(({ condition }): boolean => condition())!
          .status;
      }
    );
  }
}
