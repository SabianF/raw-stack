import { validateString } from "../repositories/utilities.js";

export default class Link {
  /**
   * @type {string}
   */
  url;

  /**
   * @type {string}
   */
  name;

  constructor(url, name) {
    if (validateString(url)) {
      throw new Error("valid url string not provided");
    }
    if(validateString(name)) {
      throw new Error("valid name string not provided");
    }

    this.url = url;
    this.name = name;
  }
}
