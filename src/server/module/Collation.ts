import { StatusOfProposedSolutionType } from '../../module/numberleConfig';

type ConditionAndStatus = {
  condition: () => boolean;
  status: StatusOfProposedSolutionType;
};

export default class Collation {
  private conditionAndStatus: ConditionAndStatus[] = [];

  constructor(conditionAndStatus: ConditionAndStatus[] = []) {
    this.conditionAndStatus = conditionAndStatus;
  }

  private toStatus =
    (answer: string) =>
    (
      proposedSolutionCharacter: string,
      proposedSolutionCharacterNo: number
    ): StatusOfProposedSolutionType => {
      return this.next(
        () =>
          proposedSolutionCharacter ===
          answer.charAt(proposedSolutionCharacterNo),
        'correct'
      )
        .next(
          () => answer.includes(proposedSolutionCharacter),
          'differentLocation'
        )
        .result('wrong');
    };

  public statusOfProposedSolution(
    proposedSolution: string,
    answer: string
  ): StatusOfProposedSolutionType[] {
    if (proposedSolution.length !== answer.length)
      throw new Error('提示された文字列長と回答の文字列長が異なります。');

    return [...proposedSolution].map(this.toStatus(answer));
  }

  private doesMatchCondition = (target: {
    condition: () => boolean;
  }): boolean => target.condition();

  private next = (
    condition: () => boolean,
    status: StatusOfProposedSolutionType
  ): Collation => {
    return new Collation(this.conditionAndStatus.concat({ condition, status }));
  };

  private result = (
    defaultStatus: StatusOfProposedSolutionType
  ): StatusOfProposedSolutionType => {
    return (
      this.conditionAndStatus.find(this.doesMatchCondition)?.status ??
      defaultStatus
    );
  };
}
