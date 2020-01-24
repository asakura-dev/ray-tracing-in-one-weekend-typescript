import Vec3 from "../vec3";

export function byteColorText(col: Vec3) {
  const ir = Math.floor(255.99 * col.get(0));
  const ig = Math.floor(255.99 * col.get(1));
  const ib = Math.floor(255.99 * col.get(2));
  return `${ir} ${ig} ${ib}`;
}

export function gammaCorrection(original: Vec3) {
  return new Vec3(
    Math.sqrt(original.get(0)),
    Math.sqrt(original.get(1)),
    Math.sqrt(original.get(2))
  );
}

export function randomInUnitSphere() {
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

export function reflect(v: Vec3, n: Vec3) {
  return v.minus(n.multiply(Vec3.dot(v, n) * 2));
}
