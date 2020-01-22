import FileWriter from './utils/FireWriter';

const writer = new FileWriter('./dist/01_create_image.ppm');

function main() {
  const nx = 200;
  const ny = 100;
  writer.append(`P3\n`);
  writer.append(`${nx} ${ny}\n`);
  writer.append(`255\n`);
  for (let iy = ny - 1; iy >= 0; iy --) {
    for (let ix = 0; ix < nx; ix ++) {
      const r = ix / nx;
      const g = iy / ny;
      const b = 0.2;
      const ir = Math.round(255.99 * r);
      const ig = Math.round(255.99 * g);
      const ib = Math.round(255.99 * b);
      writer.append(`${ir} ${ig} ${ib}\n`);
    }
  }
}

main();