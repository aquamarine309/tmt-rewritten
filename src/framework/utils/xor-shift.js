export class XorShift {
  constructor(seed) {
    this.seed = seed;
    this.x = seed;
  }
  next() {
    let x = this.x;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    this.x = x;
    return x;
  }
}