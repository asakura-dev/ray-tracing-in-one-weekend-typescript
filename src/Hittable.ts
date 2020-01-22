import Ray from "./Ray";
import Vec3 from "./vec3";

export interface HitRecord {
  t: number;
  p: Vec3;
  normal: Vec3;
}

export type HitResult = {
  hitRecord?: HitRecord;
  isHit: boolean;
}

export interface Hittable {
  hit(r: Ray, tMin: number, tMax: number): HitResult;
}
