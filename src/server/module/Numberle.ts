import { maxNumberOfInput } from '../../module/numberleConfig';

export default class Numberle {
  private answer: string;
  /**
   *
   * x, y, z, wはXorShiftアルゴリズム実行のためのパラメータ
   * https://www.jstatsoft.org/article/view/v008i14
   */
  private x: number;
  private y: number;
  private z: number;
  private w: number;

  constructor(seed: number) {
    this.x = 31415926535;
    this.y = 8979323846;
    this.z = 2643383279;
    this.w = seed;

    this.answer = this.shuffle([...Array(10).keys()])
      .slice(0, maxNumberOfInput)
      .join('');
  }

  private xorshift(): number {
    const tmp = this.x ^ (this.x << 11);
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    return (this.w = this.w ^ (this.w >>> 19) ^ (tmp ^ (tmp >>> 8)));
  }

  private shuffle<T>(target: T[]): T[] {
    return [...Array(target.length).keys()]
      .filter((targetNo): boolean => targetNo !== 0)
      .reverse()
      .reduce((toBeShuffled: T[], i: number): T[] => {
        const j = Math.floor(Math.abs(this.xorshift()) % (i + 1));
        [toBeShuffled[i], toBeShuffled[j]] = [toBeShuffled[j], toBeShuffled[i]];
        return toBeShuffled;
      }, target);
  }

  public getAnswer(): string {
    if (this.answer.length !== maxNumberOfInput)
      throw new Error('回答の文字列長が指定されたものと一致しません。');
    return this.answer;
  }
}
