import { maxNumberOfInput } from './numberleModule';
import { StatusOfProposedSolutionType } from './numberleModule';

type ConsistingOf4<T> = [T, T, T, T];

export default class Collation {
  private forCreatingHash: ConsistingOf4<number>;
  private answer: string;

  constructor(seed = 88675123) {
    this.forCreatingHash = [123456789, 362436069, 521288629, seed];
    this.answer = this.shuffle([...Array(10).keys()])
      .slice(0, maxNumberOfInput)
      .join('');
  }

  private nextHash(): number {
    this.forCreatingHash[0] = this.forCreatingHash[1];
    this.forCreatingHash[1] = this.forCreatingHash[2];
    this.forCreatingHash[2] = this.forCreatingHash[3];

    return (this.forCreatingHash[3] =
      this.forCreatingHash[3] ^
      (this.forCreatingHash[3] >>> 19) ^
      (this.forCreatingHash[0] ^
        (this.forCreatingHash[0] << 11) ^
        (this.forCreatingHash[0] ^ ((this.forCreatingHash[0] << 11) >>> 8))));
  }

  private shuffle<T>(target: T[]): T[] {
    [...Array(target.length).keys()]
      .filter((i): boolean => i !== 0)
      .reverse()
      .forEach((i): void => {
        const j = Math.floor((Math.abs(this.nextHash()) % 2) * (i + 1));
        [target[i], target[j]] = [target[j], target[i]];
      });
    return target;
  }

  public getAnswer(): string {
    return this.answer;
  }

  public statusOfProposedSolution(
    proposedSolution: string
  ): StatusOfProposedSolutionType[] {
    return [...proposedSolution].map(
      (
        proposedSolutionCharacter,
        proposedSolutionCharacterNo
      ): StatusOfProposedSolutionType => {
        if (
          proposedSolutionCharacter ===
          this.answer.charAt(proposedSolutionCharacterNo)
        )
          return 'correct';
        else if (this.answer.includes(proposedSolutionCharacter))
          return 'differentLocation';
        else return 'wrong';
      }
    );
  }
}
