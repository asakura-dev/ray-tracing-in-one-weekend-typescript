import FileWriter from "./utils/FireWriter";
import { byteColorText } from "./utils/Utils";
import Vec3 from "./vec3";
import Ray from "./Ray";
import { Hittable } from "./Hittable";
import HittableList from "./HittableList";
import Sphere from "./Sphere";
import Camera from './Camera';


function color(r: Ray, world: Hittable) {
  const { hitRecord, isHit } = world.hit(r, 0.0, 1000000);
  if (isHit) {
    return new Vec3(
      hitRecord.normal.x + 1,
      hitRecord.normal.y + 1,
      hitRecord.normal.z + 1
    ).multiply(0.5);
  } else {
    const unit_direction = Vec3.unit_vector(r.direction());
    const t2 = 0.5 * (unit_direction.y + 1.0);
    const white = new Vec3(1.0, 1.0, 1.0);
    const blue = new Vec3(0.5, 0.7, 1.0);
    return white.multiply(1.0 - t2).plus(blue.multiply(t2));
  }
}

function main(ns: number) {
  const writer = new FileWriter(`./dist/06_anti_aliasing_${String(ns).padStart(3, '0')}.ppm`);
  const nx = 200;
  const ny = 100;
  writer.append(`P3\n`);
  writer.append(`${nx} ${ny}\n`);
  writer.append(`255\n`);
  const world = new HittableList([
    new Sphere(new Vec3(0, 0, -1), 0.5),
    new Sphere(new Vec3(0, -100.5, -1), 100),
  ]);
  const camera = new Camera();
  for (let j = ny - 1; j >= 0; j--) {
    for (let i = 0; i < nx; i++) {
      let col = new Vec3(0, 0, 0);
      for(let s = 0; s < ns; s++) {
        const u = (i + Math.random()) / nx;
        const v = (j + Math.random()) / ny;
        const r = camera.getRay(u, v);
        col = col.plus(color(r, world));
      }
      col = col.divide(ns);
      writer.append(`${byteColorText(col)}\n`);
    }
  }
}

// 1ピクセルに飛ばすRayの数を1から101の範囲で変更して出力
for(let ns = 1; ns <= 101; ns = ns + 10 ){
  main(ns);
}
