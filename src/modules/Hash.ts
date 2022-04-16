export default class Hash {
  private x: number;
  private y: number;
  private z: number;
  private w: number;

  constructor(seed = 88675123) {
    this.x = 123456789;
    this.y = 362436069;
    this.z = 521288629;
    this.w = seed;
  }

  public next(): number {
    let t: number;

    t = this.x ^ (this.x << 11);
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    return (this.w = this.w ^ (this.w >>> 19) ^ (t ^ (t >>> 8)));
  }

  public nextInt(min: number, max: number) {
    if (min >= max) throw new Error('minはmaxより小さい値にしてください。');
    return min + (Math.abs(this.next()) % (max + 1 - min));
  }

  public shuffle<T>(target: T[]): T[] {
    for (let i = target.length - 1; i >= 0; i--) {
      const j = Math.floor(this.nextInt(0, 1) * (i + 1));
      [target[i], target[j]] = [target[j], target[i]];
    }
    return target;
  }
}
