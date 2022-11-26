import { Scene } from "three";
import Loader from "./util/loader.js";
import Instance from "./instance.js";

export default class extends Scene {
  constructor(data = {}) {
    super();
    this.data = data;

    this.load();
  }

  async load() {
    this.loader = new Loader();
    window.assets = await this.loader.load();

    this.create();
  }

  create() {
    this.instance = new Instance();
    this.add(this.instance);
    this.position.y = -0.5;
  }

  render(t) {
    if (this.instance) this.instance.render(t);
  }

  resize() {}
}
