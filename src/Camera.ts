import Vec3 from "./vec3";
import Ray from "./Ray";

export default class Camera {
  public lowerLeftCorner = new Vec3(-2.0, -1.0, -1.0);
  public horizontal = new Vec3(4.0, 0.0, 0.0);
  public vertical = new Vec3(0.0, 2.0, 0.0);
  public origin = new Vec3(0.0, 0.0, 0.0);
  constructor() {}
  getRay(u: number, v: number) {
    return new Ray(
      this.origin,
      // L + H * u + V * v - O;
      this.lowerLeftCorner
        .plus(this.horizontal.multiply(u))
        .plus(this.vertical.multiply(v))
        .minus(this.origin)
    );
  }
}
