import { StatusOfProposedSolutionType } from '../modules/numberleModule';

export default class Collation {
  public static statusOfProposedSolution(
    proposedSolution: string,
    answer: string
  ): StatusOfProposedSolutionType[] {
    if (proposedSolution.length !== answer.length)
      throw new Error('提示された文字列長と回答の文字列長が異なります。');

    return [...proposedSolution].map(
      (proposedSolutionCharacter, proposedSolutionCharacterNo) => {
        if (
          proposedSolutionCharacter ===
          answer.charAt(proposedSolutionCharacterNo)
        )
          return 'correct';
        else if (answer.includes(proposedSolutionCharacter))
          return 'differentLocation';
        else return 'wrong';
      }
    );
  }
}
