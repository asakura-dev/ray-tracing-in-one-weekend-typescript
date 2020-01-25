import { Material, ScatterResult } from "../Material";
import Ray from "../Ray";
import Vec3 from "../vec3";
import { HitRecord } from "../Hittable";
export default class DefaultMaterial implements Material {
  scatter(rayIn: Ray, hitRecord: HitRecord): ScatterResult {
    return {
      scattered: rayIn,
      attenuation: new Vec3(1.0, 1.0, 1.0),
      isScat: true
    };
  }
}
