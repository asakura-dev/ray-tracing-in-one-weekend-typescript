export default class Vec3 {
  private e: number[] = [];
  constructor(e0: number, e1: number, e2: number) {
    this.e[0] = e0;
    this.e[1] = e1;
    this.e[2] = e2;
  }
  get x() {
    return this.e[0];
  }
  get y() {
    return this.e[1];
  }
  get z() {
    return this.e[2];
  }
  get r() {
    return this.e[0];
  }
  get g() {
    return this.e[1];
  }
  get b() {
    return this.e[2];
  }
  get(index: number) {
    return this.e[index];
  }
  // +
  plus(v2: Vec3): Vec3 {
    return new Vec3(
      this.e[0] + v2.e[0],
      this.e[1] + v2.e[1],
      this.e[2] + v2.e[2]
    );
  }
  // -
  minus(v2: Vec3): Vec3 {
    return new Vec3(
      this.e[0] - v2.e[0],
      this.e[1] - v2.e[1],
      this.e[2] - v2.e[2]
    );
  }
  // *
  multiply(val: Vec3 | number): Vec3 {
    if (typeof val === "number") {
      return new Vec3(this.e[0] * val, this.e[1] * val, this.e[2] * val);
    } else {
      return new Vec3(
        this.e[0] * val.e[0],
        this.e[1] * val.e[1],
        this.e[2] * val.e[2]
      );
    }
  }
  // /
  divide(val: Vec3 | number): Vec3 {
    if (typeof val === "number") {
      return new Vec3(this.e[0] / val, this.e[1] / val, this.e[2] / val);
    } else {
      return new Vec3(
        this.e[0] / val.e[0],
        this.e[1] / val.e[1],
        this.e[2] / val.e[2]
      );
    }
  }
  length() {
    return Math.sqrt(
      this.e[0] * this.e[0] + this.e[1] * this.e[1] + this.e[2] * this.e[2]
    );
  }
  squared_length() {
    return (
      this.e[0] * this.e[0] + this.e[1] * this.e[1] + this.e[2] * this.e[2]
    );
  }
  make_unit_vector() {
    const k =
      1.0 /
      Math.sqrt(
        this.e[0] * this.e[0] + this.e[1] * this.e[1] + this.e[2] * this.e[2]
      );
    this.e[0] = this.e[0] * k;
    this.e[1] = this.e[1] * k;
    this.e[2] = this.e[2] * k;
  }
  clone() {
    return new Vec3(this.e[0], this.e[1], this.e[2]);
  }
  static zero() {
    return new Vec3(0, 0, 0);
  }
  static dot(v1: Vec3, v2: Vec3) {
    return v1.e[0] * v2.e[0] + v1.e[1] * v2.e[1] + v1.e[2] * v2.e[2];
  }
  static cross(v1: Vec3, v2: Vec3) {
    return new Vec3(
      v1.e[1] * v2.e[2] - v1.e[2] * v2.e[1],
      -(v1.e[0] * v2.e[2] - v1.e[2] * v2.e[0]),
      v1.e[0] * v2.e[1] - v1.e[1] * v2.e[0]
    );
  }
  static unit_vector(v: Vec3) {
    return v.divide(v.length());
  }
}
