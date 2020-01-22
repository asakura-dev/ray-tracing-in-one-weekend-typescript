import { HitRecord, Hittable, HitResult } from "./Hittable";
import Vec3 from "./vec3";
import Ray from "./Ray";

export default class Sphere implements Hittable {
  public center: Vec3;
  public radius: number;
  constructor(cen: Vec3, r: number) {
    this.center = cen.clone();
    this.radius = r;
  }

  hit(r: Ray, tMin: number, tMax: number): HitResult {
    const oc = r.origin().minus(this.center);
    const a = Vec3.dot(r.direction(), r.direction());
    const b = Vec3.dot(oc, r.direction());
    const c = Vec3.dot(oc, oc) - this.radius * this.radius;
    const discriminant = b * b - a * c;
    if (discriminant > 0) {
      let temp = (-b - Math.sqrt(discriminant)) / a;
      if (temp < tMax && temp > tMin) {
        const t = temp;
        const p = r.point_at_parameter(t);
        const normal = p.minus(this.center).divide(this.radius);
        const hitRecord: HitRecord = { t, p, normal };
        return { hitRecord, isHit: true };
      }
      temp = (-b + Math.sqrt(discriminant)) / a;
      if (temp < tMax && temp > tMin) {
        const t = temp;
        const p = r.point_at_parameter(t);
        const normal = p.minus(this.center).divide(this.radius);
        const hitRecord: HitRecord = { t, p, normal };
        return { hitRecord, isHit: true };
      }
    }
    return { isHit: false };
  }
}
