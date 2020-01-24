import Vec3 from "./vec3";
import Ray from "./Ray";

// P64
function randomInUnitDisk() {
  while (true) {
    const p = new Vec3(Math.random(), Math.random(), 0)
      .multiply(2)
      .minus(new Vec3(1, 1, 0));
    if (Vec3.dot(p, p) >= 1.0) {
      return p;
    }
  }
}

export default class Camera {
  public lowerLeftCorner: Vec3;
  public horizontal: Vec3;
  public vertical: Vec3;
  public origin: Vec3;
  public u: Vec3;
  public v: Vec3;
  public w: Vec3;
  public lensRadius: number;
  constructor(
    lookFrom: Vec3,
    lookAt: Vec3,
    vUp: Vec3,
    vFov: number,
    aspect: number,
    aperture: number,
    focusDist: number
  ) {
    this.lensRadius = aperture / 2;
    const theta = (vFov * Math.PI) / 180;
    const halfHeight = Math.tan(theta / 2);
    const halfWidth = aspect * halfHeight;
    this.origin = lookFrom.clone();

    this.w = Vec3.unit_vector(lookFrom.minus(lookAt));
    this.u = Vec3.unit_vector(Vec3.cross(vUp, this.w));
    this.v = Vec3.cross(this.w, this.u);

    this.lowerLeftCorner = this.origin
      .minus(this.u.multiply(halfWidth * focusDist))
      .minus(this.v.multiply(halfHeight * focusDist))
      .minus(this.w.multiply(focusDist));
    this.horizontal = this.u.multiply(2 * halfWidth * focusDist);
    this.vertical = this.v.multiply(2 * halfHeight * focusDist);
  }
  getRay(s: number, t: number) {
    const rd = randomInUnitDisk().multiply(this.lensRadius);
    const offset = this.u.multiply(rd.x).plus(this.v.multiply(rd.y));
    return new Ray(
      this.origin.plus(offset),
      // L + H * u + V * v - O;
      this.lowerLeftCorner
        .plus(this.horizontal.multiply(s))
        .plus(this.vertical.multiply(t))
        .minus(this.origin)
        .minus(offset)
    );
  }
}
