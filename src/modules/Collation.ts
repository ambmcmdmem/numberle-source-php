import { maxNumberOfInput } from './numberleModule';

export default class Collation {
  private x: number;
  private y: number;
  private z: number;
  private w: number;
  private answer: string;

  constructor(seed = 88675123) {
    this.x = 123456789;
    this.y = 362436069;
    this.z = 521288629;
    this.answer = this.shuffle([...Array(10).keys()])
      .slice(0, maxNumberOfInput)
      .join('');
    this.w = seed;
  }

  private next(): number {
    const t = this.x ^ (this.x << 11);
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    return (this.w = this.w ^ (this.w >>> 19) ^ (t ^ (t >>> 8)));
  }

  private shuffle<T>(target: T[]): T[] {
    [...Array(target.length).keys()]
      .filter((i) => i)
      .reverse()
      .forEach((i) => {
        const j = Math.floor((Math.abs(this.next()) % 2) * (i + 1));
        [target[i], target[j]] = [target[j], target[i]];
      });
    return target;
  }

  public getAnswer(): string {
    return this.answer;
  }

  public statusOfProposedSolution(
    proposedSolution: string
  ): ('correct' | 'differentLocation' | 'wrong')[] {
    return [...proposedSolution].map(
      (proposedSolutionCharacter, proposedSolutionCharacterNo) => {
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
