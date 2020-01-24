import FileWriter from "./utils/FireWriter";
import { byteColorText, gammaCorrection } from "./utils/Utils";
import Vec3 from "./vec3";
import Ray from "./Ray";
import { Hittable } from "./Hittable";
import HittableList from "./HittableList";
import Sphere from "./Sphere";
import Camera3 from "./Camera3";
import Lambertian from "./material/Lambertian";
import Metal from "./material/Metal";
import Dielectric from './material/Dielectric';

function color(r: Ray, world: Hittable, depth: number) {
  const { hitRecord, isHit } = world.hit(r, 0.001, 1000000000);
  if (isHit) {
    const { attenuation, scattered, isScat } = hitRecord.material.scatter(
      r,
      hitRecord
    );
    if (depth < 50 && isScat) {
      return attenuation.multiply(color(scattered, world, depth + 1));
    } else {
      return new Vec3(0, 0, 0);
    }
  } else {
    const unit_direction = Vec3.unit_vector(r.direction());
    const t2 = 0.5 * (unit_direction.y + 1.0);
    const white = new Vec3(1.0, 1.0, 1.0);
    const blue = new Vec3(0.5, 0.7, 1.0);
    return white.multiply(1.0 - t2).plus(blue.multiply(t2));
  }
}

function main() {
  const writer = new FileWriter(`./dist/11_defocus_blur.ppm`);
  const nx = 200;
  const ny = 100;
  const ns = 100;
  writer.append(`P3\n`);
  writer.append(`${nx} ${ny}\n`);
  writer.append(`255\n`);
  const world = new HittableList([
    new Sphere(
      new Vec3(0, 0, -1),
      0.5,
      new Lambertian(new Vec3(0.1, 0.2, 0.5))
    ),
    new Sphere(
      new Vec3(0, -100.5, -1),
      100,
      new Lambertian(new Vec3(0.8, 0.8, 0.0))
    ),
    new Sphere(
      new Vec3(1, 0, -1),
      0.5,
      new Metal(new Vec3(0.8, 0.6, 0.2), 0.5)
    ),
    new Sphere(
      new Vec3(-1, 0, -1),
      0.5,
      new Dielectric(1.5)
    )
  ]);
  const lookFrom = new Vec3(3, 3, 2);
  const lookAt = new Vec3(0, 0, -1);
  const distToFocus = (lookFrom.minus(lookAt)).length();
  const aperture = 2.0;
  const camera = new Camera3(
    lookFrom,
    lookAt,
    new Vec3(0, 1, 0),
    20,
    nx / ny,
    aperture,
    distToFocus
  );
  for (let j = ny - 1; j >= 0; j--) {
    for (let i = 0; i < nx; i++) {
      let col = new Vec3(0, 0, 0);
      for (let s = 0; s < ns; s++) {
        const u = (i + Math.random()) / nx;
        const v = (j + Math.random()) / ny;
        const r = camera.getRay(u, v);
        col = col.plus(color(r, world, 0));
      }
      col = col.divide(ns);
      col = gammaCorrection(col);
      writer.append(`${byteColorText(col)}\n`);
    }
  }
}

main();
