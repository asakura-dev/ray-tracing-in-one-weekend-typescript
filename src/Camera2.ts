import Vec3 from "./vec3";
import Ray from "./Ray";

// P55: New Camera
export default class Camera {
  public lowerLeftCorner: Vec3;
  public horizontal: Vec3;
  public vertical: Vec3;
  public origin: Vec3;
  constructor(
    lookFrom: Vec3,
    lookAt: Vec3,
    vUp: Vec3,
    vFov: number,
    aspect: number
  ) {
    const theta = (vFov * Math.PI) / 180;
    const halfHeight = Math.tan(theta / 2);
    const halfWidth = aspect * halfHeight;
    this.origin = lookFrom.clone();

    const w = Vec3.unit_vector(lookFrom.minus(lookAt));
    const u = Vec3.unit_vector(Vec3.cross(vUp, w));
    const v = Vec3.cross(w, u);

    this.lowerLeftCorner = this.origin
      .minus(u.multiply(halfWidth))
      .minus(v.multiply(halfHeight))
      .minus(w);
    this.horizontal = u.multiply(2 * halfWidth);
    this.vertical = v.multiply(2 * halfHeight);
  }
  getRay(s: number, t: number) {
    return new Ray(
      this.origin,
      // L + H * u + V * v - O;
      this.lowerLeftCorner
        .plus(this.horizontal.multiply(s))
        .plus(this.vertical.multiply(t))
        .minus(this.origin)
    );
  }
}
