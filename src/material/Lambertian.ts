import { randomInUnitSphere } from "../utils/Utils";
import { Material, ScatterResult } from "../Material";
import Ray from "../Ray";
import Vec3 from "../vec3";
import { HitRecord } from "../Hittable";
export default class Lambertian implements Material {
  private albedo: Vec3;

  constructor(a: Vec3) {
    this.albedo = a.clone();
  }

  scatter(rayIn: Ray, hitRecord: HitRecord): ScatterResult {
    const target = hitRecord.p
      .plus(hitRecord.normal)
      .plus(randomInUnitSphere());
    const scattered = new Ray(hitRecord.p, target.minus(hitRecord.p));
    const attenuation = this.albedo;
    return {
      scattered,
      attenuation,
      isScat: true
    };
  }
}
