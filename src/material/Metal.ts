import { randomInUnitSphere, reflect } from "../utils/Utils";
import { Material, ScatterResult } from "../Material";
import Ray from "../Ray";
import Vec3 from "../vec3";
import { HitRecord } from "../Hittable";
export default class Metal implements Material {
  private albedo: Vec3;
  private fuzz: number;

  constructor(a: Vec3, f: number) {
    this.albedo = a.clone();
    this.fuzz = f;
  }

  scatter(rayIn: Ray, hitRecord: HitRecord): ScatterResult {
    const reflected = reflect(
      Vec3.unit_vector(rayIn.direction()),
      hitRecord.normal
    );
    const scattered = new Ray(
      hitRecord.p,
      reflected.plus(randomInUnitSphere().multiply(this.fuzz))
    );
    const attenuation = this.albedo;
    const isScat = Vec3.dot(scattered.direction(), hitRecord.normal) > 0;
    return {
      scattered,
      attenuation,
      isScat
    };
  }
}
