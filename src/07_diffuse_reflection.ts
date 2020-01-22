import FileWriter from "./utils/FireWriter";
import { byteColorText, gammaCorrection } from "./utils/Utils";
import Vec3 from "./vec3";
import Ray from "./Ray";
import { Hittable } from "./Hittable";
import HittableList from "./HittableList";
import Sphere from "./Sphere";
import Camera from "./Camera";

function randomInUnitSphere() {
  let p: Vec3;
  while (true) {
    p = new Vec3(Math.random(), Math.random(), Math.random())
      .multiply(2)
      .minus(new Vec3(1, 1, 1));
    if (p.squared_length() >= 1.0) {
      return p;
    }
  }
}

function color(r: Ray, world: Hittable) {
  const { hitRecord, isHit } = world.hit(r, 0.001, 1000000);
  if (isHit) {
    const target = hitRecord.p
      .plus(hitRecord.normal)
      .plus(randomInUnitSphere());
    return color(
      new Ray(hitRecord.p, target.minus(hitRecord.p)),
      world
    ).multiply(0.5);
  } else {
    const unit_direction = Vec3.unit_vector(r.direction());
    const t2 = 0.5 * (unit_direction.y + 1.0);
    const white = new Vec3(1.0, 1.0, 1.0);
    const blue = new Vec3(0.5, 0.7, 1.0);
    return white.multiply(1.0 - t2).plus(blue.multiply(t2));
  }
}

function main() {
  const writer = new FileWriter(`./dist/07_diffuse_reflection.ppm`);
  const nx = 200;
  const ny = 100;
  const ns = 100;
  writer.append(`P3\n`);
  writer.append(`${nx} ${ny}\n`);
  writer.append(`255\n`);
  const world = new HittableList([
    new Sphere(new Vec3(0, 0, -1), 0.5),
    new Sphere(new Vec3(0, -100.5, -1), 100)
  ]);
  const camera = new Camera();
  for (let j = ny - 1; j >= 0; j--) {
    for (let i = 0; i < nx; i++) {
      let col = new Vec3(0, 0, 0);
      for (let s = 0; s < ns; s++) {
        const u = (i + Math.random()) / nx;
        const v = (j + Math.random()) / ny;
        const r = camera.getRay(u, v);
        col = col.plus(color(r, world));
      }
      col = col.divide(ns);
      col = gammaCorrection(col);
      writer.append(`${byteColorText(col)}\n`);
    }
  }
}

main();
