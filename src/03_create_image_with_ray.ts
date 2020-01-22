import FileWriter from "./utils/file_writer";
import Ray from "./Ray";
import Vec3 from "./vec3";

const writer = new FileWriter("./dist/03_create_image_with_ray.ppm");

function color(r: Ray) {
  const unit_direction = Vec3.unit_vector(r.direction());
  const t = 0.5 * (unit_direction.y + 1.0);
  const white = new Vec3(1.0, 1.0, 1.0);
  const blue = new Vec3(0.5, 0.7, 1.0);
  return white.multiply(1.0 - t).plus(blue.multiply(t));
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
      const col = color(r);
      const ir = Math.floor(255.99 * col.get(0));
      const ig = Math.floor(255.99 * col.get(1));
      const ib = Math.floor(255.99 * col.get(2));
      writer.append(`${ir} ${ig} ${ib}\n`);
    }
  }
}

main();
