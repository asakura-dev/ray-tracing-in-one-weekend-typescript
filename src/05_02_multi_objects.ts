import FileWriter from "./utils/FireWriter";
import { byteColorText } from "./utils/Utils";
import Ray from "./Ray";
import Vec3 from "./vec3";
import Sphere from "./Sphere";
import HittableList from "./HittableList";
import { Hittable } from "./Hittable";

const writer = new FileWriter("./dist/05_02_multi_objects.ppm");

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

function main() {
  const nx = 200;
  const ny = 100;
  writer.append(`P3\n`);
  writer.append(`${nx} ${ny}\n`);
  writer.append(`255\n`);
  const lower_left_corner = new Vec3(-2.0, -1.0, -1.0);
  const horizontal = new Vec3(4.0, 0.0, 0.0);
  const vertical = new Vec3(0.0, 2.0, 0.0);
  const origin = new Vec3(0.0, 0.0, 0.0);
  const list: Hittable[] = [
    new Sphere(new Vec3(0, 0, -1), 0.5),
    new Sphere(new Vec3(0, -100.5, -1), 100),
  ];
  const world = new HittableList(list);
  for (let j = ny - 1; j >= 0; j--) {
    for (let i = 0; i < nx; i++) {
      const u = i / nx;
      const v = j / ny;
      const r = new Ray(
        origin,
        // L + H * u + V * v;
        lower_left_corner
          .plus(horizontal.multiply(u))
          .plus(vertical.multiply(v))
      );
      const col = color(r, world);
      writer.append(`${byteColorText(col)}\n`);
    }
  }
}

main();
