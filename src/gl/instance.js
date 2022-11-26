import { InstancedMesh, InstancedBufferAttribute } from "three";
import Material from "./mat/instance-raw/";

export default class extends InstancedMesh {
  constructor(data = {}) {
    super();

    this.count = 100;
    this.geometry = window.assets.planes;
    this.setAttributes();
    this.material = new Material();
  }

  setAttributes() {
    const attributes = calcAttributes(this.count);
    for (const key in attributes) {
      const { name, data } = attributes[key];
      this.geometry.setAttribute(name, data);
    }
  }

  render(t) {
    this.material.time = t;
  }

  resize() {}
}

function calcAttributes(num) {
  const a_rot = new Float32Array(num * 1);
  const a_pos = new Float32Array(num * 3);
  const a_rand = new Float32Array(num * 1);

  for (let i = 0; i < num; i++) {
    a_rot.set([Math.random() - 0.5], i * 1);

    const x = Math.random() - 0.5;
    const y = Math.random() - 0.5;
    const z = 0; // (Math.random() - 0.5) * 0.3;
    a_pos.set([x, y, z], i * 3);

    a_rand.set([Math.random()], i * 1);
  }

  return {
    a_rotation: {
      name: "a_rotation",
      data: new InstancedBufferAttribute(a_rot, 1),
    },
    a_position: {
      name: "a_position",
      data: new InstancedBufferAttribute(a_pos, 3),
    },
    a_rand: {
      name: "a_rand",
      data: new InstancedBufferAttribute(a_rand, 1),
    },
  };
}
