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
      const hitResult = hittable.hit(r, tMin, closestSoFar);
      if (hitResult.isHit) {
        const hitRecord = hitResult.hitRecord;
        isHitAnything = true;
        closestSoFar = hitRecord.t;
        closestHitRecord = hitRecord;
      }
    });
    if (isHitAnything) {
      return {
        isHit: true,
        hitRecord: closestHitRecord!
      };
    } else {
      return {
        isHit: false,
        hitRecord: null
      };
    }
  }
}
