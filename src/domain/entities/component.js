import { getAndRenderCss, getAndRenderHtml, getAndRenderJs } from "../repositories/utilities.js";

const BASE_PATH = "src/presentation/components";

export class ComponentProps {
  /**
   * @type {object?} Placeholders to replace in the CSS
   */
  css;

  /**
   * @type {object?} Placeholders to replace in the HTML
   */
  html;

  /**
   * @type {object?} Placeholders to replace in the JavaScript
   */
  js;

  /**
   *
   * @param {object} props
   */
  addCss(props) {
    console.log("Logging placeholder variable names to replace in CSS (keys):");

    for (const key in props) {
      console.log(key);
    }
  }
}

export class Component {
  /**
   * @type {string}
   */
  name;

  /**
   * @type {object} Names of placeholder variables to replace
   */
  props;

  /**
   *
   * @param {string} name
   * @param {object} props Names of placeholder variables to replace
   */
  constructor(name, props) {
    if (
      !name ||
      name === null ||
      typeof name !== "string" ||
      name.includes(" ") ||
      name.includes("-")
    ) {
      throw new Error(`valid name not provided: [${JSON.stringify(name)}]`);
    }

    if (!props) {
      props = {};
    }

    this.name = name;
    this.props = props;
  }

  async render() {
    const prefixed_component_name = `${BASE_PATH}/${this.name}`;

    const rendered_css = await getAndRenderCss(prefixed_component_name + ".css", this.props);
    const rendered_js = await getAndRenderJs(prefixed_component_name + "_client.js", this.props);
    const rendered_component = await getAndRenderHtml(prefixed_component_name + ".html", this.props);

    if (rendered_component === "") {
      throw new Error(`failed to render component: ${JSON.stringify}`);
    }

    return rendered_css + rendered_component + rendered_js;
  }

  async getHtml() {
    return getAndRenderHtml(this.name, this.props);
  }

  async getCss() {
    return getAndRenderCss(this.name, this.props);
  }

  async getJs() {
    return getAndRenderJs(this.name, this.props);
  }
}

export default {
  ComponentProps,
  Component,
};
