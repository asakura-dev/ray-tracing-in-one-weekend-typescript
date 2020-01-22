import Vec3 from "../vec3";

export function byteColorText(col: Vec3) {
  const ir = Math.floor(255.99 * col.get(0));
  const ig = Math.floor(255.99 * col.get(1));
  const ib = Math.floor(255.99 * col.get(2));
  return `${ir} ${ig} ${ib}`;
}
