import FileWriter from './utils/file_writer';
import Vec3 from './Vec3';

const writer = new FileWriter('./dist/02_create_image_with_vec3.ppm');

function main() {
  const nx = 200;
  const ny = 100;
  writer.append(`P3\n`);
  writer.append(`${nx} ${ny}\n`);
  writer.append(`255\n`);
  for (let iy = ny - 1; iy >= 0; iy --) {
    for (let ix = 0; ix < nx; ix ++) {
      const col = new Vec3(ix / nx, iy / ny, 0.2);
      const ir = Math.round(255.99 * col.get(0));
      const ig = Math.round(255.99 * col.get(1));
      const ib = Math.round(255.99 * col.get(2));
      writer.append(`${ir} ${ig} ${ib}\n`);
    }
  }
}

main();