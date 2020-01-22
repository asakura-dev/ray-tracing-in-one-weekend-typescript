import { Hittable, HitResult, HitRecord } from "./Hittable";
import Ray from "./Ray";

export default class HittableList implements Hittable {
  private list: Hittable[] = [];

  constructor(list: Hittable[]) {
    this.list = [...list];
  }

  get size() {
    return this.list.length;
  }

  hit(r: Ray, tMin: number, tMax: number): HitResult {
    let closestHitRecord: HitRecord;
    let isHitAnything = false;
    let closestSoFar = tMax;
    this.list.forEach(hittable => {
      const { isHit, hitRecord } = hittable.hit(r, tMin, closestSoFar);
      if (isHit) {
        isHitAnything = true;
        closestSoFar = hitRecord.t;
        closestHitRecord = hitRecord;
      }
    });
    return {
      isHit: isHitAnything,
      hitRecord: closestHitRecord
    };
  }
}
