import Vec3 from "./vec3";

export default class Ray {
  private a: Vec3;
  private b: Vec3;
  constructor(a: Vec3, b: Vec3) {
    this.a = a;
    this.b = b;
  }
  origin() {
    return this.a;
  }
  direction() {
    return this.b;
  }
  // p(t) = a + t * b
  point_at_parameter(t: number) {
    return this.a.plus(this.b.multiply(t));
  }
}
