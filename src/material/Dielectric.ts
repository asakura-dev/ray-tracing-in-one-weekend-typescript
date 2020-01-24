import { randomInUnitSphere, reflect } from "../utils/Utils";
import { Material, ScatterResult } from "../Material";
import Ray from "../Ray";
import Vec3 from "../vec3";
import { HitRecord } from "../Hittable";

function schlick(cosine: number, refIdx: number) {
  let r0 = (1 - refIdx) / (1 + refIdx);
  r0 = r0 * r0;
  return r0 + (1 - r0) * Math.pow(1 - cosine, 5);
}

type RefractResult = {
  refracted?: Vec3;
  isRefract: boolean;
};

function refract(v: Vec3, n: Vec3, ni_over_nt: number): RefractResult {
  const uv = Vec3.unit_vector(v);
  const dt = Vec3.dot(uv, n);
  const discriminant = 1.0 - ni_over_nt * ni_over_nt * (1 - dt * dt);
  if (discriminant > 0) {
    const refracted = uv
      .minus(n.multiply(dt))
      .multiply(ni_over_nt)
      .minus(n.multiply(Math.sqrt(discriminant)));
    return {
      refracted,
      isRefract: true
    };
  } else {
    return {
      isRefract: false
    };
  }
}

export default class Dielectric implements Material {
  private refIdx: number;

  constructor(ri: number) {
    this.refIdx = ri;
  }

  scatter(rayIn: Ray, hitRecord: HitRecord): ScatterResult {
    let scattered: Ray;
    let isScat: boolean;

    let outward_normal: Vec3;
    let ni_over_nt: number;
    const attenuation = new Vec3(1.0, 1.0, 1.0);
    let reflectProb: number;
    let cosine: number;

    if (Vec3.dot(rayIn.direction(), hitRecord.normal) > 0) {
      outward_normal = hitRecord.normal.multiply(-1);
      ni_over_nt = this.refIdx;
      cosine =
        (this.refIdx * Vec3.dot(rayIn.direction(), hitRecord.normal)) /
        rayIn.direction().length();
    } else {
      outward_normal = hitRecord.normal;
      ni_over_nt = 1.0 / this.refIdx;
      cosine =
        -Vec3.dot(rayIn.direction(), hitRecord.normal) /
        rayIn.direction().length();
    }

    const { refracted, isRefract } = refract(
      rayIn.direction(),
      outward_normal,
      ni_over_nt
    );
    if (isRefract) {
      reflectProb = schlick(cosine, this.refIdx);
    } else {
      reflectProb = 1.0;
    }

    if (Math.random() < reflectProb) {
      const reflected = reflect(rayIn.direction(), hitRecord.normal);
      scattered = new Ray(hitRecord.p, reflected);
    } else {
      scattered = new Ray(hitRecord.p, refracted);
    }
    
    return {
      attenuation,
      scattered,
      isScat: true
    };
  }
}
