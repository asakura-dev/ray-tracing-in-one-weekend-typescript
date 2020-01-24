import Vec3 from './vec3';
import Ray from './Ray';
import { HitRecord } from './Hittable';


export type ScatterResult = {
  attenuation: Vec3;
  scattered: Ray;
  isScat: boolean;
}

export interface Material {
  scatter(rayIn: Ray, hitRecord: HitRecord): ScatterResult
}