import { renderComponent } from "../../presentation/components/components.js";

const BASE_PATH = "src/presentation/components";

class ComponentProps {
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

class Component {
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

    this.name = name;
    this.props = props;
  }

  async render() {
    const rendered = await renderComponent(this.name, this.props);

    if (rendered === "") {
      throw new Error(`failed to render component: ${JSON.stringify}`);
    }

    return rendered;
  }
}

export default {
  ComponentProps,
  Component,
};
