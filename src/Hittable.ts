import Ray from "./Ray";
import Vec3 from "./vec3";
import { Material } from './Material';

export interface HitRecord {
  t: number;
  p: Vec3;
  normal: Vec3;
  material: Material;
}

export type HitResult = {
  hitRecord?: HitRecord;
  isHit: boolean;
}

export interface Hittable {
  hit(r: Ray, tMin: number, tMax: number): HitResult;
}
