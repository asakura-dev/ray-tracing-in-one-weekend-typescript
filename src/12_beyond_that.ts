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
  const { hitRecord, isHit } = world.hit(r, 0.001, 100000000000000);
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

function randomScene() {
  const list: Hittable[] = [];
  list.push(new Sphere(new Vec3(0, -1000, 0), 1000, new Lambertian(
    new Vec3(0.5, 0.5, 0.5)
  )))
  for(let a = -11; a < 11; a++) {
    for(let b = -11; b < 11; b++) {
      const chooseMat = Math.random();
      const center = new Vec3(a + 0.9*Math.random(), 0.2, b + 0.9 * Math.random());
      if (center.minus(new Vec3(4, 0.2, 0)).length() > 0.9) {
        if(chooseMat < 0.8) { 
          // diffuse
          list.push(new Sphere(center, 0.2, new Lambertian(new Vec3(
            Math.random() * Math.random(),
            Math.random() * Math.random(),
            Math.random() * Math.random()
          ))));
        } else if(chooseMat < 0.95) {
          // metal
          list.push(new Sphere(center, 0.2, new Metal(
            new Vec3(
              0.5 * (1 + Math.random()),
              0.5 * (1 + Math.random()),
              0.5 * (1 + Math.random()),
            ),
            0.5 * Math.random()
          )));
        } else {
          // glass
          list.push(new Sphere(center, 0.2, new Dielectric(1.5)));
        }
      }
    }
  }
  list.push(new Sphere(new Vec3(0,1,0), 1.0, new Dielectric(1.5)));
  list.push(new Sphere(new Vec3(-4, 1, 0), 1.0, new Lambertian(new Vec3(0.4, 0.2, 0.1))));
  list.push(new Sphere(new Vec3(4,1,0), 1.0, new Metal(new Vec3(0.7,0.6,0.5), 0.0)));

  return new HittableList(list);
}

function main() {
  //const writer = new FileWriter(`./dist/12_beyond_that.ppm`);
  //const nx = 200;
  //const ny = 100;
  const writer = new FileWriter(`./dist/12_beyond_that_1200_800.ppm`);
  const nx = 1200;
  const ny = 800;
  const ns = 100;
  writer.append(`P3\n`);
  writer.append(`${nx} ${ny}\n`);
  writer.append(`255\n`);
  const world = randomScene();
  const lookFrom = new Vec3(13, 2, 3);
  const lookAt = new Vec3(0, 0, 0);
  const distToFocus = 10;
  const aperture = 0.1;
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
