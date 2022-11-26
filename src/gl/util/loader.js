import { ASSETS } from "../../assets/";
import loadModel from "./model-loader";

export default class {
  constructor(data) {
    this.data = data;
  }

  async load() {
    const [model] = await Promise.all([loadModel(ASSETS.model)]);

    return {
      model,
      planes: model.children[0].geometry,
    };
  }
}
